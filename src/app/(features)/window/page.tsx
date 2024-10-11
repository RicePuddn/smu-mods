"use client";

// import SpotifyPlayback from "../../../components/window/SpotifyPlaybackSDK";
import { useState } from "react";

export default function WindowPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
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
  );
}
