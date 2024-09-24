import type { ModuleBank } from "@/types/banks/moduleBank";
import type { Module, ModuleCode } from "@/types/primitives/module";

export async function searchModule(query?: string): Promise<Module[]> {
  if (!query) {
    return Object.values(modules);
  }
  return Object.values(modules).filter((module) =>
    module.name.toLowerCase().includes(query.toLowerCase()),
  );
}

export const modules: ModuleBank = {
  "COR-STAT1202": {
    name: "Introductory Statistics",
    moduleCode: "COR1202",
    exam: { dateTime: new Date("2024-11-28") },
    description: `The course area(s) mentioned below, if any, serve only as a generic guide to the possible area(s) this course may fall under. Undergraduate students must verify the actual mapping of the course areas by updating their curriculum worksheet and running the degree progress report (Course List What-If) before bidding/enrolling for the course.
            Actuarial Science Electives
            Applied Statistics Major
            Information Systems Core (Intake 2018 and earlier)
            Smart-City Mgmt &Tech Core (Intake 2018 & earlier)
            Business Core (Intake 2018 and earlier)
            Accounting Core (Intake 2019 onwards)
            Business Subjects
            Actuarial Science Major: Actuarial Analyst Track
            Econ Major Rel/Econ Options
            Actuarial Science Major: Risk Analyst Track
            Business-Oriented Electives
            Information Systems Core (Intake 2019 to 2023)
            Smart-City Mgmt & Tech Core (Intake 2019 to 2021)
            Political Science Core (Intake 2019 onwards)
            Psychology Core (Intake 2019 onwards)
            Sociology Core (Intake 2019 onwards)
            SOSC Core (Intake 2018 and earlier)
            Law Related Electives
            Capabilities
            ENROLMENT REQUIREMENTS`,
    sections: [
      {
        code: "G1",
        professor: { name: "WU ZHENGXIAO" },
        location: { building: "SCIS1", room: "SR 2-1", level: 2 },
        classes: [
          {
            startTime: "08:15",
            duration: 3.25,
            day: "Monday",
          },
        ],
      },
    ],
    credit: 1,
    terms: [],
  },
  "COR-IS1704": {
    name: "Computational Thinking and Programming",
    moduleCode: "COR-IS1704",
    exam: { dateTime: new Date("2024-12-03") },
    description: `The course area(s) mentioned below, if any, serve only as a generic guide to the possible area(s) this course may fall under. Undergraduate students must verify the actual mapping of the course areas by updating their curriculum worksheet and running the degree progress report (Course List What-If) before bidding/enrolling for the course.
            Technology Studies Cluster
            Accounting Data and Analytics Electives
            Accounting Electives
            Business Options
            Digital Business Core
            Finance Major: Finance Analytics Track
            Marketing Major: Marketing Analytics Track
            Ops Mgmt Major: Operations Analytics Track
            Accounting Options
            Financial Forensics Electives
            Data Science and Analytics Core
            Information Systems Core (Intake 2024 onwards)
            Law Related Electives
            Law: Law and Technology Track
            Computing Studies Core
            Computing & Law Core (Intake 2024 onwards)
            Software Engineering Core (Intake 2024 onwards)
            Capabilities - Modes of Thinking`,

    sections: [
      {
        code: "G1",
        professor: { name: "ARNE JONNI SUPPE" },
        location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 },
        classes: [{ startTime: "08:15", duration: 3.25, day: "Monday" }],
      },
      {
        code: "G2",
        professor: { name: "ARNE JONNI SUPPE" },
        location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 },
        classes: [
          {
            startTime: "15:30",
            duration: 3.25,
            day: "Monday",
          },
        ],
      },
      {
        code: "G3",
        professor: { name: "ARNE JONNI SUPPE" },
        location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G4",
        professor: { name: "TA NGUYEN BINH DUONG" },
        location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G5",
        professor: { name: "TA NGUYEN BINH DUONG" },
        location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G6",
        professor: { name: "TANG QIAN" },
        location: { building: "SCIS2", room: "Seminar Room 3-9", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G7",
        professor: { name: "TANG QIAN" },
        location: { building: "SCIS2", room: "Seminar Room 3-9", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G8",
        professor: { name: "TANG QIAN" },
        location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G9",
        professor: { name: "TANG QIAN" },
        location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G10",
        professor: { name: "SERENA GOH" },
        location: { building: "SCIS2", room: "Seminar Room 3-4", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G11",
        professor: { name: "TONY TANG" },
        location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G12",
        professor: { name: "TONY TANG" },
        location: { building: "SCIS2", room: "Seminar Room 2-5", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G13",
        professor: { name: "JOELLE ELMALEH" },
        location: { building: "SCIS2", room: "Seminar Room 3-9", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G14",
        professor: { name: "JOELLE ELMALEH" },
        location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G15",
        professor: { name: "LOW SIOW MENG" },
        location: { building: "SCIS2", room: "Seminar Room 3-10", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G16",
        professor: { name: "GAN CHUI GOH" },
        location: { building: "SCIS2", room: "Seminar Room 2-10", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G17",
        professor: { name: "ROSIE CHING" },
        location: {
          building: "SCIS2",
          room: "Seminar Room B1-1",
          level: "B-1",
        },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G18",
        professor: { name: "RAYMOND TEO" },
        location: { building: "SCIS2", room: "Seminar Room 3-2", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G19",
        professor: { name: "JOELLE ELMALEH" },
        location: { building: "SCIS1", room: "Seminar Room 2-9", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G20",
        professor: { name: "LOW SIOW MENG" },
        location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G21",
        professor: { name: "TONY TANG" },
        location: { building: "SCIS2", room: "Seminar Room 2-5", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G22",
        professor: { name: "YEO KENG LEONG" },
        location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G23",
        professor: { name: "ZHANG YAJIE" },
        location: { building: "SCIS2", room: "Seminar Room 3-7", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "12:00",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G24",
        professor: { name: "ZHANG YAJIE" },
        location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 },
        classes: [
          {
            day: "Monday",
            startTime: "15:30",
            duration: 3.25,
          },
        ],
      },
      {
        code: "G25",
        professor: { name: "SOMI SHIN" },
        location: {
          building: "SCIS2",
          room: "Seminar Room B1-2",
          level: "B-1",
        },
        classes: [
          {
            day: "Monday",
            startTime: "08:15",
            duration: 3.25,
          },
        ],
      },
    ],
    credit: 1,
    terms: [],
    preReq: {
      or: [],
    },
  },

  COR1100: {
    name: "Writing and Reasoning",
    moduleCode: "COR1100",
    exam: { dateTime: new Date("") },
    description: `Using Problem-Based Learning strategies, the Writing and Reasoning course equips students with key communication strategies to write cogently in academic, business and professional settings. Through authentic communication problems, students will learn to clarify context, define relevant audience, determine communication goals and use appropriate genres to deliver their intended message clearly, concisely and coherently. Students will also learn to read critically, formulate a position convincingly using appropriate evidence, and convey their ideas persuasively.`,
    sections: [
      {
        code: "G1",
        professor: { name: "KOH KIM SENG" },
        location: { building: "SCIS1", room: "SR 2-1", level: 2 },
        classes: [
          {
            startTime: "08:15",
            duration: 3.25,
            day: "Monday",
          },
          {
            startTime: "08:15",
            duration: 3.25,
            day: "Wednesday",
          },
        ],
      },
    ],
    credit: 1,
    terms: [],
  },

  IS113: {
    name: "Web Application Development I",
    moduleCode: "IS113",
    exam: {
      dateTime: new Date("2024-11-01"),
    },
    description: "",
    sections: [],
    coRequisite: [
      {
        or: ["IS112", "IS105"],
      },
    ],
    mutuallyExclusive: [],
    credit: 1,
    terms: [],
    preReq: {
      or: ["IS111", "IS112"],
    },
  },
  IS112: {
    name: "Data Management",
    moduleCode: "IS112",
    exam: {
      dateTime: new Date("2024-11-01"),
    },
    description: "",
    sections: [],
    mutuallyExclusive: ["IS105", "DSA307"],
    credit: 1,
    terms: [],
  },
  IS216: {
    name: "Web Application Development II",
    moduleCode: "IS216",
    exam: {
      dateTime: new Date("2024-11-01"),
    },
    description: "",
    sections: [],
    credit: 1,
    terms: [],
    preReq: {
      or: ["IS113", "CS203"],
    },
  },
};

export async function getModule(moduleCode: ModuleCode) {
  return modules[moduleCode]!;
}
