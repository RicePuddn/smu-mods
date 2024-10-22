export type ColorCode = `#${string}`;

export type TimetableColor = {
  outOfFocusBackgroundColor: ColorCode;
  backgroundColor: ColorCode;
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
      outOfFocusBackgroundColor: "#f87171",
      backgroundColor: "#ef4444",
      textColor: "#450a0a",
    },
    // yellow
    {
      outOfFocusBackgroundColor: "#facc15",
      backgroundColor: "#eab308",
      textColor: "#422006",
    },
    // green
    {
      outOfFocusBackgroundColor: "#4ade80",
      backgroundColor: "#22c55e",
      textColor: "#052e16",
    },
    // teal
    {
      outOfFocusBackgroundColor: "#2dd4bf",
      backgroundColor: "#14b8a6",
      textColor: "#042f2e",
    },
    // sky
    {
      outOfFocusBackgroundColor: "#38bdf8",
      backgroundColor: "#0ea5e9",
      textColor: "#082f49",
    },
    // indigo
    {
      outOfFocusBackgroundColor: "#818cf8",
      backgroundColor: "#6366f1",
      textColor: "#1e1b4b",
    },
    // purple
    {
      outOfFocusBackgroundColor: "#c084fc",
      backgroundColor: "#a855f7",
      textColor: "#1e1b4b",
    },
    // fuchsia
    {
      outOfFocusBackgroundColor: "#e879f9",
      backgroundColor: "#d946ef",
      textColor: "#4a044e",
    },
    // rose
    {
      outOfFocusBackgroundColor: "#fb7185",
      backgroundColor: "#f43f5e",
      textColor: "#4c0519",
    },
  ],
  softPastel: [
    // red
    {
      outOfFocusBackgroundColor: "#fca5a5",
      backgroundColor: "#fca5a5",
      textColor: "#450a0a",
    },
    // yellow
    {
      outOfFocusBackgroundColor: "#fde68a",
      backgroundColor: "#fde68a",
      textColor: "#422006",
    },
    // green
    {
      outOfFocusBackgroundColor: "#86efac",
      backgroundColor: "#86efac",
      textColor: "#052e16",
    },
    // teal
    {
      outOfFocusBackgroundColor: "#67e8f9",
      backgroundColor: "#67e8f9",
      textColor: "#042f2e",
    },
    // sky
    {
      outOfFocusBackgroundColor: "#7dd3fc",
      backgroundColor: "#7dd3fc",
      textColor: "#082f49",
    },
    // indigo
    {
      outOfFocusBackgroundColor: "#a5b4fc",
      backgroundColor: "#a5b4fc",
      textColor: "#1e1b4b",
    },
    // purple
    {
      outOfFocusBackgroundColor: "#d8b4fe",
      backgroundColor: "#d8b4fe",
      textColor: "#1e1b4b",
    },
    // fuchsia
    {
      outOfFocusBackgroundColor: "#f0abfc",
      backgroundColor: "#f0abfc",
      textColor: "#4a044e",
    },
    // rose
    {
      outOfFocusBackgroundColor: "#fdb6c7",
      backgroundColor: "#fdb6c7",
      textColor: "#4c0519",
    },
  ],
  darkRich: [
    // red
    {
      outOfFocusBackgroundColor: "#b91c1c",
      backgroundColor: "#b91c1c",
      textColor: "#450a0a",
    },
    // yellow
    {
      outOfFocusBackgroundColor: "#b45309",
      backgroundColor: "#b45309",
      textColor: "#422006",
    },
    // green
    {
      outOfFocusBackgroundColor: "#15803d",
      backgroundColor: "#15803d",
      textColor: "#052e16",
    },
    // teal
    {
      outOfFocusBackgroundColor: "#0f766e",
      backgroundColor: "#0f766e",
      textColor: "#042f2e",
    },
    // sky
    {
      outOfFocusBackgroundColor: "#0369a1",
      backgroundColor: "#0369a1",
      textColor: "#082f49",
    },
    // indigo
    {
      outOfFocusBackgroundColor: "#3730a3",
      backgroundColor: "#3730a3",
      textColor: "#1e1b4b",
    },
    // purple
    {
      outOfFocusBackgroundColor: "#6d28d9",
      backgroundColor: "#6d28d9",
      textColor: "#1e1b4b",
    },
    // fuchsia
    {
      outOfFocusBackgroundColor: "#a21caf",
      backgroundColor: "#a21caf",
      textColor: "#4a044e",
    },
    // rose
    {
      outOfFocusBackgroundColor: "#be123c",
      backgroundColor: "#be123c",
      textColor: "#4c0519",
    },
  ],
};
