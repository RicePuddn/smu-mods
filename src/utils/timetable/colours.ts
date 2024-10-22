export type ColorCode = `#${string}`;

export type TimetableColor = {
  outOfFocusBackgroundColor: ColorCode;
  backgroundColor: ColorCode;
  textColor: ColorCode;
};

export type TimetableColors = TimetableColor[];

export const TimetableThemeNames = ["default", "name2", "name3"] as const;

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
  name2: [],
  name3: [],
};
