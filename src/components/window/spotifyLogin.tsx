"use client"; // Use client-side rendering for this component
import { env } from "@/env";

const CLIENT_ID = env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/window";

export default function SpotifyLogin() {
  const generateRandomString = function (length: number) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  const handleLogin = () => {
    const scope =
      "user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state";
    const state = generateRandomString(16);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    });

    const authUrl = `https://accounts.spotify.com/authorize/?${params.toString()}`;

    // Redirect to Spotify's authorization page
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Login with Spotify</h1>
      <button
        className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
