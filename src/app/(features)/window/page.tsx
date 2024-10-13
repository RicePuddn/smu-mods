"use client";

import SpotifyLogin from "@/components/window/spotifyLogin";
import { env } from "@/env";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WindowPage() {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTokenRequesting, setIsTokenRequesting] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const CLIENT_ID = env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const slides = [
    {
      video: "https://i.imgur.com/pnqLqHZ.mp4",
      label: "First slide label",
      description:
        "Some representative placeholder content for the first slide.",
    },
    {
      video: "https://i.imgur.com/tNPMXz0.mp4",
      label: "Second slide label",
      description:
        "Some representative placeholder content for the second slide.",
    },
    {
      video: "https://tecdn.b-cdn.net/img/video/Agua-natural.mp4",
      label: "Third slide label",
      description:
        "Some representative placeholder content for the third slide.",
    },
  ];
  const spotifyTrackUrl = "https://api.spotify.com/v1/tracks/";

  const default_songs = [{ id: "08Fo1zAY2piVFOD2Lv3n3z", name: "Okinawa" }];
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("URL Params:", urlParams.toString());
    console.log("Code found:", code);

    // Only call getAccessToken if code is not null
    if (code && !isTokenRequesting) {
      console.log("Attempting to get access token...");
      getAccessToken(code);
    } else {
      console.log("No authorization code found");
    }
  }, []);

  async function getAccessToken(code: string) {
    setIsTokenRequesting(true);
    const REDIRECT_URI = "http://localhost:3000/window";
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64",
    );
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: REDIRECT_URI,
    });
    // console.log(authString);

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${authString}`,
          },
        },
      );

      let accessToken = response.data.access_token;
      // console.log(accessToken);
      setAccessToken(accessToken);
      window.history.replaceState({}, document.title, "/window");
    } catch (error) {
      console.error("Error obtaining access token:", error);
    }
  }

  useEffect(() => {
    if (!accessToken) return; // Make sure the access token is available

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onload = () => {
      const player = new Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      // console.log(player);

      // Connect to the player
      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!",
          );
        }
      });
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
    };

    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [accessToken]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <SpotifyLogin></SpotifyLogin>
      <div className="relative" id="carouselExampleCaptions">
        <div className="relative h-screen w-full overflow-hidden bg-gray-800">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`duration-600 absolute w-full transition-opacity ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <video className="w-full" autoPlay loop muted>
                <source src={slide.video} type="video/mp4" />
              </video>
              <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-white">
                <h5 className="text-xl">{slide.label}</h5>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center text-white opacity-50 hover:opacity-90"
          onClick={prevSlide}
        >
          {/* SVG for Previous Icon */}
          <span className="inline-block h-8 w-8">{/* Icon SVG here */}</span>
        </button>
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center text-white opacity-50 hover:opacity-90"
          onClick={nextSlide}
        >
          {/* SVG for Next Icon */}
          <span className="inline-block h-8 w-8">{/* Icon SVG here */}</span>
        </button>
      </div>
    </>
  );
}
