type BasketCode = "IS" | "CS" | "SE" | "COR" | "COR-CS" | "COR-IS" | "COR-STAT";

type Basket<N extends number, T extends boolean> = {
  name: string;
  basketCode: BasketCode;
  modules: ModuleCode[];
  requiredCredits: N;
  trackSpecific: T;
};

type MajorCode = "IS" | "CS" | "SE" | "C&L";

type Major = {
  majorCode: MajorCode;
  baskets: Basket<number, boolean>[];
};

type ModuleCode = `${BasketCode}${number}`;

type Module = {
  name: string;
  moduleCode: ModuleCode;
  exam: Exam;
  description: string;
  sections: Section[];
  coRequisite: Module[];
  mutuallyExclusive: Module[];
  credit: number;
  offeredSem: Term[];
  preRequisite: PrereqTree;
};

export type PrereqTree =
  | string
  | { and: PrereqTree[] }
  | { or: PrereqTree[] }
  | { nOf: [number, PrereqTree[]] };

const terms = ["Term 1", "Term 2", "Term 3A", "Term 3B"] as const;
type Term = (typeof terms)[number];

const startingTime = [
  "8:15",
  "10:00",
  "12:00",
  "13:45",
  "3:30",
  "5:15",
  "7:00",
  "8:45",
] as const;
const duration = [1.5, 3] as const;

type StartingTime = (typeof startingTime)[number];
type Duration = (typeof duration)[number];

type Section = {
  code: string;
  professor: Professor;
  location: Location;
  startTime: StartingTime;
  duration: Duration;
};

type Exam = {
  date: Date;
};

type Professor = {
  name: string;
};

type Location = {
  building: string;
  room: string;
  level: number | `B-${number}`;
};

const testMajor: Major = {
  majorCode: "IS",
  baskets: [
    {
      name: "Information Systems",
      basketCode: "COR-IS",
      modules: ["IS111", "CS301"],
      requiredCredits: 8,
      trackSpecific: true,
    },
  ],
};
