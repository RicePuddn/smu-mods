import type { ModuleBank } from "@/types/banks/moduleBank";
import type { ModuleCode } from "@/types/primitives/module";

export const modules: ModuleBank = {
  IS216: {
    name: "Web Application Development II",
    moduleCode: "IS216",
    exam: {
      dateTime: new Date("2024-11-01"),
    },
    description: "",
    sections: [],
    credit: 4,
    offeredSem: [],
    preReq: {
      or: ["IS113", "CS203"],
    },
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
    credit: 4,
    offeredSem: [],
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
    credit: 4,
    offeredSem: [],
  },
  CS2309: {
    name: "Object Oriented Design & Programming",
    moduleCode: "CS2309",
    exam: {
      dateTime: new Date("2024-11-01"),
    },
    description: "",
    sections: [],
    credit: 4,
    offeredSem: [],
    preReq: {
      and: [
        { or: ["CS1231", "CS1231S", "IS1100", "IS1100T"] },
        {
          or: [
            {
              and: [
                { or: ["CS2030", "CS2030S"] },
                { or: ["CS2040", "CS2040S"] },
              ],
            },
            "CS2113",
            "CS2113T",
          ],
        },
        {
          nOf: [2, ["IS112", "IS105", "DSA307"]],
        },
      ],
    },
  },
};

export function getModule(moduleCode: ModuleCode) {
  return modules[moduleCode];
}
