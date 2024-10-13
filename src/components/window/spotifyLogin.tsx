"use client"; // Use client-side rendering for this component
import { env } from "@/env";

const CLIENT_ID = env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/window";

const state = "776f75220521c01edbfd721184112881";

export default function SpotifyLogin() {
  const handleLogin = () => {
    const scope = "user-read-private user-read-email";

    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

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
