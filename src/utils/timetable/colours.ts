export type ColorCode = `#${string}`;

export type TimetableColor = {
  backgroundColor: ColorCode;
  hoverBackgroundColor: ColorCode;
  textColor: ColorCode;
};

export type TimetableColors = TimetableColor[];

export const TimetableThemeNames = [
  "default",
  "softPastel",
  "darkRich",
] as const;

export type TimetableThemeName = (typeof TimetableThemeNames)[number];

export type TimetableTheme = Record<TimetableThemeName, TimetableColors>;

export const TIMETABLE_THEMES: TimetableTheme = {
  default: [
    // red
    {
      backgroundColor: "#f87171",
      hoverBackgroundColor: "#ef4444",
      textColor: "#450a0a",
    },
    // yellow
    {
      backgroundColor: "#facc15",
      hoverBackgroundColor: "#eab308",
      textColor: "#422006",
    },
    // green
    {
      backgroundColor: "#4ade80",
      hoverBackgroundColor: "#22c55e",
      textColor: "#052e16",
    },
    // teal
    {
      backgroundColor: "#2dd4bf",
      hoverBackgroundColor: "#14b8a6",
      textColor: "#042f2e",
    },
    // sky
    {
      backgroundColor: "#38bdf8",
      hoverBackgroundColor: "#0ea5e9",
      textColor: "#082f49",
    },
    // indigo
    {
      backgroundColor: "#818cf8",
      hoverBackgroundColor: "#6366f1",
      textColor: "#1e1b4b",
    },
    // purple
    {
      backgroundColor: "#c084fc",
      hoverBackgroundColor: "#a855f7",
      textColor: "#3b0764",
    },
    // fuchsia
    {
      backgroundColor: "#e879f9",
      hoverBackgroundColor: "#d946ef",
      textColor: "#4a044e",
    },
    // rose
    {
      backgroundColor: "#fb7185",
      hoverBackgroundColor: "#f43f5e",
      textColor: "#4c0519",
    },
  ],
  softPastel: [
    // red
    {
      backgroundColor: "#fca5a5",
      hoverBackgroundColor: "#f87171",
      textColor: "#7f1d1d",
    },
    // yellow
    {
      backgroundColor: "#fde68a",
      hoverBackgroundColor: "#facc15",
      textColor: "#713f12",
    },
    // green
    {
      backgroundColor: "#86efac",
      hoverBackgroundColor: "#4ade80",
      textColor: "#14532d",
    },
    // teal
    {
      backgroundColor: "#67e8f9",
      hoverBackgroundColor: "#2dd4bf",
      textColor: "#134e4a",
    },
    // sky
    {
      backgroundColor: "#7dd3fc",
      hoverBackgroundColor: "#38bdf8",
      textColor: "#0c4a6e",
    },
    // indigo
    {
      backgroundColor: "#a5b4fc",
      hoverBackgroundColor: "#818cf8",
      textColor: "#312e81",
    },
    // purple
    {
      backgroundColor: "#d8b4fe",
      hoverBackgroundColor: "#c084fc",
      textColor: "#581c87",
    },
    // fuchsia
    {
      backgroundColor: "#f0abfc",
      hoverBackgroundColor: "#e879f9",
      textColor: "#701a75",
    },
    // rose
    {
      backgroundColor: "#fdb6c7",
      hoverBackgroundColor: "#fb7185",
      textColor: "#881337",
    },
  ],
  darkRich: [
    // red
    {
      backgroundColor: "#b91c1c",
      hoverBackgroundColor: "#8e1717",
      textColor: "#fff5f5",
    },
    // yellow
    {
      backgroundColor: "#b45309",
      hoverBackgroundColor: "#8c4007",
      textColor: "#fdf7e1",
    },
    // green
    {
      backgroundColor: "#15803d",
      hoverBackgroundColor: "#106632",
      textColor: "#f2f9f2",
    },
    // teal
    {
      backgroundColor: "#0f766e",
      hoverBackgroundColor: "#0c5f59",
      textColor: "#e6f7f5",
    },
    // sky
    {
      backgroundColor: "#0369a1",
      hoverBackgroundColor: "#025480",
      textColor: "#ebf5ff",
    },
    // indigo
    {
      backgroundColor: "#3730a3",
      hoverBackgroundColor: "#2c267e",
      textColor: "#e8e6f8",
    },
    // purple
    {
      backgroundColor: "#6d28d9",
      hoverBackgroundColor: "#541fb0",
      textColor: "#f5eaff",
    },
    // fuchsia
    {
      backgroundColor: "#a21caf",
      hoverBackgroundColor: "#80198c",
      textColor: "#fde5fb",
    },
    // rose
    {
      backgroundColor: "#be123c",
      hoverBackgroundColor: "#961030",
      textColor: "#fbe7eb",
    },
  ],
};
