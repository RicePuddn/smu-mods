export type AcademicYear = `${number}/${number}`;

export type Config = {
  academicYear: AcademicYear;
};

export const config: Config = {
  academicYear: "2024/2025",
};
