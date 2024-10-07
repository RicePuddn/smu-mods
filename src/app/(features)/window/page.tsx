"use client";

// import SpotifyPlayback from "../../../components/window/SpotifyPlaybackSDK";

import { useEffect, useState } from "react";

export default function WindowPage() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const token =
    ""; // Replace with your access token

  useEffect(() => {
    // Dynamically load the Spotify SDK script
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.onload = () => {
      // Wait until the Spotify SDK is ready
      window.onSpotifyWebPlaybackSDKReady = () => {
        const spotifyPlayer = new window.Spotify.Player({
          name: "Web Playback SDK Player",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        // Add event listeners
        spotifyPlayer.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setIsPlayerReady(true);
        });

        spotifyPlayer.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
          setIsPlayerReady(false);
        });

        spotifyPlayer.connect();
        setPlayer(spotifyPlayer);
      };
    };

    document.body.appendChild(script);

    // Cleanup the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  const handleTogglePlay = () => {
    if (player) {
      player
        .togglePlay()
        .catch((err) => console.error("Error toggling play", err));
    }
  };

  return (
    <div>
      <h1>Spotify Web Playback SDK Player</h1>
      {isPlayerReady ? (
        <button onClick={handleTogglePlay}>Toggle Play</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
