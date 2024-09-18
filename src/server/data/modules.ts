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
  IS216: {
    name: "Web Application Development II",
    moduleCode: "IS216",
    exam: {
      dateTime: new Date("2024-11-01"),
    },
    description: "",
    sections: [],
    credit: 4,
    terms: [],
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
    credit: 4,
    terms: [],
  },
};

export async function getModule(moduleCode: ModuleCode) {
  return modules[moduleCode]!;
}
