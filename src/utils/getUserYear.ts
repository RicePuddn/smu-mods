import { AcademicYear } from "@/config";
import { Year, years } from "@/types/planner";

export function getUserYear(
  matriculationYear: AcademicYear,
  currentAcademicYear: AcademicYear,
): Year {
  const [_, endYear] = currentAcademicYear.split("/").map(Number);
  const realMatriculationYear = Number(matriculationYear.split("/")[0]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // because JavaScript sets 0 as the first month
  const currentYear = currentDate.getFullYear();
  let userYear = currentYear - realMatriculationYear + 1;
  if (currentYear == endYear && currentMonth <= 4) {
    userYear -= 1;
  }
  if (userYear >= 1 && userYear <= parseInt(years.at(-1)!)) {
    return String(userYear) as Year;
  } else {
    console.warn("Invalid user year calculation");
    return "1";
  }
}
