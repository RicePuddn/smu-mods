"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { atcb_action } from "add-to-calendar-button-react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { format } from "date-fns";
import { Calendar, Ghost, Loader2, Star, StarOff, Trash } from "lucide-react";

import EventTabs from "@/components/acad-clubs/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PADDING } from "@/config";
import { eventsData } from "@/server/data/events";
import { useEventStore } from "@/stores/event/provider";
import { api } from "@/trpc/react";
import { schoolEventSchema } from "@/types/primitives/event";
import { Logger } from "@/utils/Logger";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactTooltip from "react-tooltip";

export default function BeyondStudies() {
  const isMobile = useIsMobile();
  const { events, addEvent, removeEvent } = useEventStore((state) => state);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: uploadFile } = api.s3.upload.useMutation();
  const { mutateAsync: parseEvent } = api.chatgpt.parseEvent.useMutation();
  const [starredEvents, setStarredEvents] = useState<string[]>([]); 

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

     // Function to toggle the starred state of an event
    const toggleStar = (eventId: string) => {
        setStarredEvents((prev) =>
        prev.includes(eventId)
            ? prev.filter((id) => id !== eventId) // Unstar
            : [...prev, eventId] // Star
        );
    };


    // Function to hash the image
    async function hashImage(file: File) {
        try {
        const base64Image = (await getImageBase64(file)) as string;

        // Hash the Base64 string
        const hash = CryptoJS.SHA256(base64Image).toString(CryptoJS.enc.Hex);
        return hash;
        } catch (error) {
        console.error("Error hashing image:", error);
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
            console.error("Failed to upload image:", response.statusText);
        }
        } catch (error) {
        console.error("Error uploading image to S3:", error);
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
        console.error("Error processing the file:", error);
        } finally {
        setSelectedFile(null);
        setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: PADDING }} className="space-y-4">
        <h1 className="text-2xl font-bold">Beyond Studies</h1>

        <div className="flex items-start w-full gap-2">
            <Label htmlFor="picture">Upload Image</Label>

            <div className="flex-1">
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

        {/* Starred Events Section */}
        <div
            className={cn(
                "flex flex-col overflow-hidden rounded-lg bg-muted shadow-md",
                !isMobile && "mb-6 mr-6 w-full flex-shrink-0"
            )}
        >
            <div
            className={cn(
                "flex h-14 items-center justify-between bg-smu-blue p-3",
                isMobile && "cursor-pointer"
            )}
            >
            <h2 className="text-lg font-semibold text-primary-foreground">
                Your Starred Events
            </h2>

            {isMobile && <ChevronDown className="text-primary-foreground"/>}
            </div>

            <div className="p-4 ">
                <EventTabs
                tabsData={{
                    upcoming: events.filter(
                    (event) => new Date(event.startTime) > new Date()
                    ),
                    past: events.filter(
                    (event) => new Date(event.endTime) < new Date()
                    ),
                }}
                eventCardActions={[
                    (event, index) => (
                    <Button className='bg-slate-500'
                        key={index}
                        onClick={() =>
                        atcb_action({
                            name: event.title,
                            description: event.description,
                            startDate: format(new Date(event.startTime), "yyyy-MM-dd"),
                            startTime: format(new Date(event.startTime), "HH:mm"),
                            endTime: format(new Date(event.endTime), "HH:mm"),
                            location: event.venue,
                            options: ["Google", "Outlook.com", "iCal", "Apple"],
                            listStyle: "modal",
                            lightMode: "bodyScheme",
                        })
                        }
                    >
                        <div className="relative group">
                        <Calendar className="cursor-pointer" />

                        </div>


                    </Button>
                    ),
                    (event, index) => (
                    <Button
                        onClick={() => event.id && removeEvent(event.id)}
                        key={index}
                        variant={"destructive"}
                        size={"icon"}
                    >
                        <Trash />
                    </Button>
                    ),
                ]}
                />
            </div>
        </div>

        {/* Available Events Section */}
        <div
            className={cn(
                "flex flex-col overflow-hidden rounded-lg bg-muted shadow-md ",
                !isMobile && "mb-6 mr-6 w-full flex-shrink-0"
            )}
            >
            <div
                className={cn(
                "flex h-14 items-center justify-between bg-smu-gold p-3",
                isMobile && "cursor-pointer"
                )}
            >
                <h2 className="text-lg font-semibold text-primary-foreground">
                Available Events
                </h2>
                {isMobile && <ChevronDown className="text-primary-foreground" />}
            </div>


            <div className="p-4">
                <EventTabs
                    tabsData={eventsData}
                    eventCardActions={[
                    (event, index) => (
                        <Button onClick={() => addEvent(event)} key={index} variant={"ghost"}>
                        <Star className=""  />
                        </Button>
                    ),
                    ]}
                />
            </div>
            </div>
        </div>
    );
    }