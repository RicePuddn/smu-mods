"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { atcb_action } from "add-to-calendar-button-react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { format } from "date-fns";
import { Calendar, ChevronDown, Loader2, Star, StarOff } from "lucide-react";

import EventTabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PADDING } from "@/config";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { eventsData } from "@/server/data/events";
import { useEventStore } from "@/stores/event/provider";
import { api } from "@/trpc/react";
import { schoolEventSchema } from "@/types/primitives/event";
import { Logger } from "@/utils/Logger";

export default function BeyondStudies() {
  const isMobile = useIsMobile();
  const { events, addEvent, removeEvent } = useEventStore((state) => state);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: uploadFile } = api.s3.upload.useMutation();
  const { mutateAsync: parseEvent } = api.chatgpt.parseEvent.useMutation();
  // const [starredEvents, setStarredEvents] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target && target.files) {
      const file = target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    }
  };

  // Function to load an image and convert it to Base64
  function getImageBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result); // Ensure reader.result is a string
        } else {
          reject(new Error("Failed to convert file to Base64."));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Converts the file to Base64
    });
  }

  // // Function to toggle the starred state of an event
  // const toggleStar = (eventId: string) => {
  //   setStarredEvents(
  //     (prev) =>
  //       prev.includes(eventId)
  //         ? prev.filter((id) => id !== eventId) // Unstar
  //         : [...prev, eventId], // Star
  //   );
  // };

  // Function to hash the image
  async function hashImage(file: File) {
    try {
      const base64Image = (await getImageBase64(file)) as string;

      // Hash the Base64 string
      const hash = CryptoJS.SHA256(base64Image).toString(CryptoJS.enc.Hex);
      return hash;
    } catch (error) {
      Logger.error("Error hashing image:", error);
    }
  }

  async function uploadImageToS3(signedUrl: string, file: File) {
    try {
      const response = await axios.put(signedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        Logger.log("Image uploaded successfully");
      } else {
        Logger.error("Failed to upload image:", response.statusText);
      }
    } catch (error) {
      Logger.error("Error uploading image to S3:", error);
    }
  }

  // Function to handle file upload
  const handleAddCard = async () => {
    if (!selectedFile) return;
    try {
      setIsLoading(true);
      const hashedImg = await hashImage(selectedFile);

      if (hashedImg) {
        const response = await uploadFile({
          key: hashedImg,
          type: selectedFile.type,
        });
        await uploadImageToS3(response.signedUrl, selectedFile);

        const content = await parseEvent({
          srcUrl: response.srcUrl,
          key: response.key,
        });
        const parsed = schoolEventSchema.parse(JSON.parse(content));
        addEvent(parsed);
      }
    } catch (error) {
      Logger.error("Error processing the file:", error);
    } finally {
      setSelectedFile(null);
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: PADDING }} className="space-y-4">
      <h1 className="text-2xl font-bold">Beyond Studies</h1>

      <div className="w-full items-start gap-2">
        <Label htmlFor="picture">Upload Image</Label>

        <div className="flex gap-2">
          <div className="w-1/3">
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <Button
            onClick={handleAddCard}
            className="mb-4"
            disabled={isLoading || !selectedFile}
          >
            {isLoading && <Loader2 className="mr-2 animate-spin" />} Add Event
            Details
          </Button>
        </div>
      </div>

      {/* Starred Events Section */}
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-lg bg-muted shadow-md",
          !isMobile && "mb-6 mr-6 w-full flex-shrink-0",
        )}
      >
        <div
          className={cn(
            "flex h-14 items-center justify-between bg-smu-blue p-3",
            isMobile && "cursor-pointer",
          )}
        >
          <h2 className="p-3 text-lg font-semibold text-primary-foreground">
            Your Starred Events
          </h2>

          {isMobile && <ChevronDown className="text-primary-foreground" />}
        </div>

        <div className="p-3">
          <EventTabs
            tabsData={{
              upcoming: events.filter(
                (event) => new Date(event.startTime) > new Date(),
              ),
              past: events.filter(
                (event) => new Date(event.endTime) < new Date(),
              ),
            }}
            eventCardActions={[
              (event, index) => (
                <Button
                  onClick={() => event.id && removeEvent(event.id)}
                  key={index}
                  variant={"arin"}
                  size={"icon"}
                >
                  <Star className="fill-current text-yellow-500 hover:text-yellow-300" />
                </Button>
              ),

              (event, index) => (
                <Button
                  key={index}
                  variant={"arin"}
                  onClick={() =>
                    atcb_action({
                      name: event.title,
                      description: event.description,
                      startDate: format(
                        new Date(event.startTime),
                        "yyyy-MM-dd",
                      ),
                      startTime: format(new Date(event.startTime), "HH:mm"),
                      endTime: format(new Date(event.endTime), "HH:mm"),
                      location: event.venue,
                      options: ["Google", "Outlook.com", "iCal", "Apple"],
                      listStyle: "modal",
                      lightMode: "bodyScheme",
                    })
                  }
                >
                  <div className="group relative">
                    <Calendar className="cursor-pointer transition duration-300" />
                  </div>
                </Button>
              ),
            ]}
          />
        </div>
      </div>

      {/* Available Events Section */}
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-lg bg-muted shadow-md",
          !isMobile && "mb-6 mr-6 w-full flex-shrink-0",
        )}
      >
        <div
          className={cn(
            "flex h-14 items-center justify-between bg-smu-gold p-3",
            isMobile && "cursor-pointer",
          )}
        >
          <h2 className="p-3 text-lg font-semibold text-primary-foreground">
            Available Events
          </h2>
          {isMobile && <ChevronDown className="text-primary-foreground" />}
        </div>

        <div className="p-4">
          <EventTabs
            tabsData={eventsData}
            eventCardActions={[
              (event, index) => {
                Logger.log(events, event);
                const find = events.find((e) => e.id == event.id);
                Logger.log(find);
                return (
                  <Button
                    onClick={() => addEvent(event)}
                    key={index}
                    variant={"arin"}
                    size="icon"
                    disabled={!!find}
                    className="text-yellow-500"
                  >
                    {find ? (
                      <Star className="fill-current" />
                    ) : (
                      <StarOff className="hover:text-yellow-400" />
                    )}
                  </Button>
                );
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
