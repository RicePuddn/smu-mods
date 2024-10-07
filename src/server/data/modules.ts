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
    moduleCode: "COR-STAT1202",
    exam: { dateTime: new Date("2024-11-28") },
    description: `The purpose of this course is to introduce the basic concepts of statistics through illustrative use of statistical methods for solving applied problems. Emphasis will be placed on statistical reasoning, rather than derivation of theoretical details. Students will learn to solve common statistical problems using statistical software. This course is designed for students who wish to pursue a non-quantitative major at SMU. Students who intend to pursue a quantitative major should take its companion course, COR-STAT1203 Introduction to Statistical Theory.`,
    sections: [
      { code: "G1", professor: { name: "WU ZHENGXIAO" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
      { code: "G2", professor: { name: "WU ZHENGXIAO" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Tue", startTime: "08:15",duration: 3.25}]},
      { code: "G3", professor: { name: "WU ZHENGXIAO" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Wed", startTime: "08:15" ,duration: 3.25}]},
      { code: "G4", professor: { name: "WU ZHENGXIAO" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Thu", startTime: "08:15" ,duration: 3.25}]},
      { code: "G5", professor: { name: "DENIS LEUNG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Tue", startTime: "19:00" ,  duration: 3.25}]},
      { code: "G6", professor: { name: "DENIS LEUNG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Wed", startTime: "12:00" , duration: 3.25 }]},
      { code: "G7", professor: { name: "DENIS LEUNG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Wed", startTime: "15:30" , duration: 3.25}]},
      { code: "G8", professor: { name: "LIU SHEW FAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Mon", startTime: "08:15" ,duration: 3.25}]},
      { code: "G9", professor: { name: "LIU SHEW FAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-5", level: 2 }, classes: [{ day: "Tue", startTime: "08:15" ,duration: 3.25}]},
      { code: "G10", professor: { name: "ROSIE CHING" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Mon", startTime: "08:15" ,duration: 3.25}]},
      { code: "G11", professor: { name: "ROSIE CHING" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Mon", startTime: "12:00" , duration: 3.25}]},
      { code: "G12", professor: { name: "ROSIE CHING" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Tue", startTime: "08:15" ,duration: 3.25}]},
      { code: "G13", professor: { name: "ROSIE CHING" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Tue", startTime: "12:00" , duration: 3.25 }]},
      { code: "G14", professor: { name: "ROSIE CHING" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Wed", startTime: "08:15" ,duration: 3.25}]},
      { code: "G15", professor: { name: "DANIEL SOH" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-5", level: 2 }, classes: [{ day: "Thu", startTime: "08:15" ,duration: 3.25}]},
      { code: "G16", professor: { name: "GAN CHUI GOH" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-10", level: 2 }, classes: [{ day: "Tue", startTime: "08:15",duration: 3.25}]},
    ],
    coRequisite: [
        {
          or: ["IS112", "IS105"],
        },
      ],
      mutuallyExclusive: [],
      credit: 1,
      terms: [],
      preReq: {
        or: [],
      },
    },
    // ================================================================================================================================================================================================================================================================================================


  "COR-IS1702": {
    name: "Computational Thinking",
    moduleCode: "COR-IS1702",
    exam: { dateTime: new Date("2024-11-28") },
    description: `Computational Thinking equips students to tackle complex computational problems; it trains students to design solutions to solve those problems using a computer program. It draws upon concepts from mathematics and computer science – more precisely, discrete mathematics, data structures and algorithm design. This course will hone students’ analytical skills as they are challenged to think abstractly and computationally. Their minds will be open to the wonders of computing, as they go behind the scene to unravel the fundamental analytics that empower Google, consulting agencies and service companies. NOTE: To facilitate learning in this course, you are required to know and use programming. You are advised to pick up the Python programming language before the course, for instance by practising with online tutorials such as http://learnpython.org. By taking this course, students will: • discover the science of computing • model problems and learn practical problem-solving techniques to tackle complex computational problems (beyond what a spreadsheet is capable of solving) • apply problem-solving techniques to develop more elegant and efficient programs • learn to write programs to represent and manipulate with complex data objects • understand the challenge of scale, not only in dealing with large data sets, but also in appreciating the nature of computing and computability`,
    sections: [
            { code: "G1", professor: { name: "KOH KWAN CHIN" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
            { code: "G2", professor: { name: "MAI ANH TIEN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
            { code: "G3", professor: { name: "SOON HUI SHIN VIVIEN" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
            { code: "G4", professor: { name: "SOON HUI SHIN VIVIEN" }, location: { building: "SCIS1", room: "Seminar Room B1-1", level: "B1" }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
            { code: "G5", professor: { name: "MA DAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
            { code: "G6", professor: { name: "MA DAN" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
          ],
        coRequisite: [
        {
            or: ["IS112", "IS105"],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: [],
        preReq: {
        or: [],
        },
    },

// ================================================================================================================================================================================================================================================================================================

    "COR-MGMT1302": {
        name: "Business, Government and Society",
        moduleCode: "COR-MGMT1302",
        exam: { dateTime: new Date("2024-12-02") },
        description: `This course overviews the economic, legal, social, and ecological responsibilities of business and their implications for managerial decision-making. The primary theoretical perspective taken is the stakeholder view of the firm which allows for close examination of apparently conflicting goals between different stakeholders' interests. Related frameworks and applications discussed in this course include corporate social responsibility, globalization, corporate governance, and public policy measures affecting business. The frameworks and issues discussed are critical to understanding how firms can be both financially successful and valuable to society, a concern which is increasingly influencing managerial decision-making. Illustrations and applications to the Singapore context as a small open economy will be discussed.`,
        sections: [
                { code: "G1", professor: { name: "CHAN KAY MIN" }, location: { building: "YPHSL", room: "Seminar Room 2-11", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "CHAN KAY MIN" }, location: { building: "YPHSL", room: "Seminar Room 2-11", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "LIEW YAH LING" }, location: { building: "SMUC", room: "Active Learning CR 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "LIEW YAH LING" }, location: { building: "SMUC", room: "Active Learning CR 3-2", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G5", professor: { name: "GILBERT TAN YIP WEI" }, location: { building: "LKCSB", room: "Seminar Room 1-1", level: 1 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G6", professor: { name: "GILBERT TAN YIP WEI" }, location: { building: "LKCSB", room: "Seminar Room 3-7", level: 3 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }]},
                { code: "G7", professor: { name: "ELIZABETH SU" }, location: { building: "SOA", room: "Seminar Room 1-2", level: 1 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G8", professor: { name: "ELIZABETH SU" }, location: { building: "SOA", room: "Seminar Room 1-2", level: 1 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G9", professor: { name: "LOO KHEE SHENG" }, location: { building: "LKCSB", room: "Seminar Room 3-6", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G10", professor: { name: "LOO KHEE SHENG" }, location: { building: "LKCSB", room: "Seminar Room 3-7", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G11", professor: { name: "LOO KHEE SHENG" }, location: { building: "LKCSB", room: "Seminar Room 3-6", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G12", professor: { name: "MOHAMED IRSHAD ABBAS ALI" }, location: { building: "LKCSB", room: "Seminar Room 1-2", level: 1 }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }]},
                { code: "G13", professor: { name: "MOHAMED IRSHAD ABBAS ALI" }, location: { building: "LKCSB", room: "Seminar Room 2-7", level: 2 }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }]},
                { code: "G14", professor: { name: "MOHAMED IRSHAD ABBAS ALI" }, location: { building: "LKCSB", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: [],
            preReq: {
            or: [],
            },
        },

// ================================================================================================================================================================================================================================================================================================

    "COR-1305": {
        name: "Spreadsheet Modelling and Analytics",
        moduleCode: "COR-1305",
        exam: { dateTime: new Date("2024-12-05") },
        description: `Data Science has become one of the main drivers in transforming businesses and organizations. With proper data collection, preparation, analysis and modelling, insights can be achieved leading to better decision making and actions that create positive impact. Data analytics is divided into different levels namely, descriptive analytics, predictive analytics, prescriptive analytics and automated (or embedded) analytics. In this course, students will acquire practical skills in modelling and analysis to resolve business problems using software tools including Excel and Tableau. Knowing how to effectively use these tools to build models and analyse data to solve problems will add tremendous value in our students’ future professional career. This course’s primary focus is on using Excel spreadsheet as a platform to build mathematical models from scratch to represent business problems for detailed analysis. The use of such models to drive understanding and consensus towards generating insights and actions enhanced the assurance of execution success. With the data collected, data manipulation and transformation will be needed to prepare the data into useful forms for analysis. In terms of data analytics, this course will cover descriptive analytics, predictive analytics and prescriptive analytics, using both Excel and Tableau. In-class exercises would be used to present business problem modeling and analysis. Students would interactively develop the skills and experience to deal with open-ended questions, unclear assumptions and incomplete information. In addition to the individual assessments (take-home assignments and in-class quizzes), a group project will allow students to apply the knowledge and skills acquired to solve a business problem of their choice end-to-end where they will define the business questions, collect the necessary data, build the models, perform the data analytics, to draw insights and conclusions.`,
        sections: [
                { code: "G1", professor: { name: "ZHOU KANKAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "KOH CHUAN LEONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G3", professor: { name: "MICHELLE CHEONG LEE FONG" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "WANG HAI" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G5", professor: { name: "WANG HAI" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: [],
            preReq: {
            or: [],
            },
            },

// ================================================================================================================================================================================================================================================================================================

    "COR-1301": {
        name: "Leadership and Team Building",
        moduleCode: "COR-1301",
        exam: { dateTime: new Date("") },
        description: `
            The overall objective of this module is to build and develop students' competency in leadership and teamwork skills. The course employs both a theoretical and an experiential learning approach with the aim of fulfilling the objectives as outlined below.

            Students will gain knowledge and skills about leadership development and team-building skills based on theories, principles, concepts, application, exercises/class activities, self-assessments/instruments, and experiential learning.

            Central to the course is the action-based and experiential Group Project Assignment that offers an opportunity for students to work in groups to collaborate with a non-profit organization or profit-based organization that upholds community development and/or corporate social responsibility or sustainability initiatives1, that is, they initiate and act as idea champions to contribute to community with a project of their own and approach beneficiaries along the way to amend or improve on their ideas. Students are also free to work with any profit and/or non-profit organization on an existing or new project they may have, provided such opportunities exist and are offered to students.

            As idea champions, students work in groups, to develop/invent a prototype/model or mobile application or put into place a process, program or plan such as a business plan that will value-add and contribute to the needs of the beneficiary or organization of their choice. It is entirely up to the leadership of the organization concerned whether they would consider implementing or not implementing what students have designed. In other words, there is no compulsion for any organization to eventually sponsor the proposed ideas to the organization(s) concerned or may be collaborating with.

            The outcomes of the group project for students are outlined as follows:
            (i) Students will learn about leadership from the leaders they are connecting with. For example, they will learn how and why today's leaders are engaged in community-based or social initiatives in Singapore and beyond.
            (ii) Students will also learn from the leaders lessons on leadership and/or teamwork based on the leaders' experiences.
            (iii) By undertaking a hands-on group project, students will also learn practical lessons as well as the complexities of teamwork based on their OWN experience and process of working internally, with their group mates and externally, with organizations outside of school.
            (iv) Each student will also reflect on his/her own learning throughout the project from start to end as outlined below (see 'Reflection Essay' for details).
            (v) Students will also fulfill other learning objectives that include cognitive and academic development as outlined below in the section, 'Learning Objectives'`,
        sections: [
                { code: "G1", professor: { name: "RANI TAN" }, location: { building: "LKCSB", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "RANI TAN" }, location: { building: "LKCSB", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "RANI TAN" }, location: { building: "LKCSB", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G4", professor: { name: "RANI TAN" }, location: { building: "LKCSB", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G5", professor: { name: "RANI TAN" }, location: { building: "LKCSB", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G6", professor: { name: "THOMAS MENKHOFF, KAN SIEW NING, KEVIN CHEONG" }, location: { building: "LKCSB", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G7", professor: { name: "HANOI LOK" }, location: { building: "LKCSB", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G8", professor: { name: "HANOI LOK" }, location: { building: "LKCSB", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
                { code: "G9", professor: { name: "ROGER LOW" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G10", professor: { name: "ROGER LOW" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: [],
            preReq: {
            or: [],
            },
            },

// ================================================================================================================================================================================================================================================================================================

    "COR-COMM1304": {
        name: "Management Communication",
        moduleCode: "COR-COMM1304",
        exam: { dateTime: new Date("") },
        description: `Management Communication equips students with strategies that will enable them to successfully communicate their solutions to organizational problems. Since the course emphasizes the importance of effective written and spoken communication within a business setting, students will be exposed to strategies that will enable them to communicate their ideas and values in a clear, persuasive and memorable way. Students will, therefore, learn the art of producing impactful business documents and delivering engaging presentations in various business contexts. By the end of the course, students will be able to function as proficient communicators who are ready to embrace the communicative challenges inherent in today's dynamic business environment.`,
        sections: [
                { code: "G1", professor: { name: "SHYAMALA DEENATHAYALAN" }, location: { building: "SOA", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G2", professor: { name: "SHYAMALA DEENATHAYALAN" }, location: { building: "LKCSB", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G3", professor: { name: "SHYAMALA DEENATHAYALAN" }, location: { building: "LKCSB", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "TRACY LOH" }, location: { building: "LKCSB", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G5", professor: { name: "TRACY LOH" }, location: { building: "LKCSB", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G6", professor: { name: "YEO SU LIN" }, location: { building: "LKCSB", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G7", professor: { name: "YEO SU LIN" }, location: { building: "LKCSB", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G8", professor: { name: "AKANKSHA RATH" }, location: { building: "YPHSL", room: "Seminar Room 2-03", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G9", professor: { name: "AKANKSHA RATH" }, location: { building: "YPHSL", room: "Seminar Room 2-03", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G10", professor: { name: "AKANKSHA RATH" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
                { code: "G11", professor: { name: "CHAN BOH YEE" }, location: { building: "YPHSL", room: "Seminar Room 2-03", level: 2 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }]},
                { code: "G12", professor: { name: "CLARENCE FU" }, location: { building: "SOA", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G13", professor: { name: "CLARENCE FU" }, location: { building: "LKCSB", room: "Classroom 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }]},
                { code: "G14", professor: { name: "CLARENCE FU" }, location: { building: "LKCSB", room: "Classroom 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G15", professor: { name: "GWENDOLINE ANNE LIM SIU KIAO" }, location: { building: "SOA", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G16", professor: { name: "GWENDOLINE ANNE LIM SIU KIAO" }, location: { building: "SOA", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G17", professor: { name: "GWENDOLINE ANNE LIM SIU KIAO" }, location: { building: "LKCSB", room: "Seminar Room 3-10", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G18", professor: { name: "HO JACK YONG" }, location: { building: "LKCSB", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }]},
                { code: "G19", professor: { name: "KIRTI HARNAL" }, location: { building: "LKCSB", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G20", professor: { name: "KIRTI HARNAL" }, location: { building: "SOA", room: "Seminar Room 1-2", level: 1 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G21", professor: { name: "LINDY ONG" }, location: { building: "SOA", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G22", professor: { name: "LINDY ONG" }, location: { building: "SOA", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G23", professor: { name: "LINDY ONG" }, location: { building: "YPHSL", room: "Seminar Room 2-03", level: 2 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G24", professor: { name: "LYNETTE WAN" }, location: { building: "SOA", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G25", professor: { name: "LYNETTE WAN" }, location: { building: "SOA", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G27", professor: { name: "PETRINA TEE" }, location: { building: "SOA", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G28", professor: { name: "PETRINA TEE" }, location: { building: "LKCSB", room: "Seminar Room 3-6", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G29", professor: { name: "SERENA LIM" }, location: { building: "SOA", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G30", professor: { name: "SERENA LIM" }, location: { building: "SOA", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G31", professor: { name: "SERENA LIM" }, location: { building: "SOA", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G32", professor: { name: "SHAMALA RAMAKRESININ" }, location: { building: "SOA", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }]},
                { code: "G33", professor: { name: "SHAMALA RAMAKRESININ" }, location: { building: "SOA", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G34", professor: { name: "SUMATHI KRISHNA" }, location: { building: "SOA", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G35", professor: { name: "SUMATHI KRISHNA" }, location: { building: "SOA", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G36", professor: { name: "SUMATHI KRISHNA" }, location: { building: "LKCSB", room: "Seminar Room 1-1", level: 1 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G37", professor: { name: "VANDANA ADVANI" }, location: { building: "SOA", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G38", professor: { name: "VANDANA ADVANI" }, location: { building: "SOA", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G39", professor: { name: "VANDANA ADVANI" }, location: { building: "SOA", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }]},
                { code: "G49", professor: { name: "SHYAMALA DEENATHAYALAN" }, location: { building: "LKCSB", room: "Classroom 3-5", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]}
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: [],
            preReq: {
            or: [],
            },
            },

// ================================================================================================================================================================================================================================================================================================

    "COR-MGMT1303": {
        name: "Management Communication",
        moduleCode: "COR-MGMT1303",
        exam: { dateTime: new Date("") },
        description: `This course is a core course for the Entrepreneurship track of the management concentration offered at the Lee Kong Chian School of Business. It can also be taken as a secondary elective for students majoring in Strategy and Organization.

    This course traces the steps that entrepreneurs likely encounter between a first recognition of a potential business opportunity to the nascent operation of the actual company. This course teaches students the basic ingredients of a business plan and a short ‘pitch’ for their ideas, yet shows the limitations of a static document in the changing marketplace. Through the use of real business cases, this course helps students understand various issues that require analysis and resolution before their company can be on a more financially sustainable footing.`,
        sections: [
                { code: "G1", professor: { name: "NG XU WEN" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G2", professor: { name: "DAVID GOMULYA" }, location: { building: "YPHSL", room: "Seminar Room 2-04", level: 2 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "JOLYN ANG" }, location: { building: "LKCSB", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: [],
            preReq: {
            or: [],
            },
    },

// ================================================================================================================================================================================================================================================================================================

    "COR-1100": {
        name: "Writing and Reasoning",
        moduleCode: "COR-1100",
        exam: { dateTime: new Date("") },
        description: `Using Problem-Based Learning strategies, the Writing and Reasoning course equips students with key communication strategies to write cogently in academic, business and professional settings. Through authentic communication problems, students will learn to clarify context, define relevant audience, determine communication goals and use appropriate genres to deliver their intended message clearly, concisely and coherently. Students will also learn to read critically, formulate a position convincingly using appropriate evidence, and convey their ideas persuasively.`,
        sections: [
                { code: "G1", professor: { name: "CHONG YIN TENG" }, location: { building: "LKCSB", room: "Classroom 3-5", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 1.5 }, { day: "Fri", startTime: "12:00", duration: 1.5 }]},
                { code: "G2", professor: { name: "LOKE MICHELLE" }, location: { building: "LKCSB", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "13:45", duration: 1.5 }, { day: "Thu", startTime: "13:45", duration: 1.5 }]},
                { code: "G3", professor: { name: "TAN CHIA MIEN" }, location: { building: "SOE/SCIS2", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "10:00", duration: 1.5 }, { day: "Fri", startTime: "10:00", duration: 1.5 }]},
                { code: "G4", professor: { name: "FERNANDEZ CLAUDINE JEAN" }, location: { building: "SOE/SCIS2", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 1.5 }, { day: "Fri", startTime: "12:00", duration: 1.5 }]},
                { code: "G5", professor: { name: "TIMOTHY CHAN" }, location: { building: "LKCSB", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Mon", startTime: "10:00", duration: 1.5 }, { day: "Wed", startTime: "10:00", duration: 1.5 }]},
                { code: "G6", professor: { name: "TIMOTHY CHAN" }, location: { building: "LKCSB", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 1.5 }, { day: "Wed", startTime: "12:00", duration: 1.5 }]},
                { code: "G7", professor: { name: "TIMOTHY CHAN" }, location: { building: "LKCSB", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Mon", startTime: "13:45", duration: 1.5 }, { day: "Wed", startTime: "13:45", duration: 1.5 }]},
                { code: "G8", professor: { name: "CHAN TSU AI IVY" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Tue", startTime: "08:15", duration: 1.5 }, { day: "Fri", startTime: "08:15", duration: 1.5 }]},
                { code: "G9", professor: { name: "CHAN TSU AI IVY" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Tue", startTime: "10:00", duration: 1.5 }, { day: "Fri", startTime: "10:00", duration: 1.5 }]},
                { code: "G10", professor: { name: "CHAN TSU AI IVY" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Wed", startTime: "13:45", duration: 1.5 }, { day: "Fri", startTime: "13:45", duration: 1.5 }]},
                { code: "G11", professor: { name: "CLAIRE TAN LEE FANG" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "12:00", duration: 1.5 }, { day: "Fri", startTime: "12:00", duration: 1.5 }]},
                { code: "G12", professor: { name: "OUYANG XIN" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "13:45", duration: 1.5 }, { day: "Fri", startTime: "13:45", duration: 1.5 }]},
                { code: "G13", professor: { name: "THANUSHA RAJ" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "13:45", duration: 1.5 }, { day: "Thu", startTime: "13:45", duration: 1.5 }]},
                { code: "G14", professor: { name: "JULYN KANG" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "10:00", duration: 1.5 }, { day: "Wed", startTime: "10:00", duration: 1.5 }]},
                { code: "G15", professor: { name: "JULYN KANG" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 1.5 }, { day: "Wed", startTime: "12:00", duration: 1.5 }]},
                { code: "G16", professor: { name: "NORA SAHEER" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Tue", startTime: "12:00", duration: 1.5 }, { day: "Thu", startTime: "12:00", duration: 1.5 }]},
                { code: "G17", professor: { name: "NORA SAHEER" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Tue", startTime: "13:45", duration: 1.5 }, { day: "Thu", startTime: "13:45", duration: 1.5 }]},
                { code: "G18", professor: { name: "NORA SAHEER" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "08:15", duration: 1.5 }, { day: "Fri", startTime: "08:15", duration: 1.5 }]},
                { code: "G19", professor: { name: "VINEETHA NAIR" }, location: { building: "SOE/SCIS2", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "13:45", duration: 1.5 }, { day: "Thu", startTime: "13:45", duration: 1.5 }]},
                { code: "G20", professor: { name: "VINEETHA NAIR" }, location: { building: "SOE/SCIS2", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 1.5 }, { day: "Thu", startTime: "15:30", duration: 1.5 }]},
                { code: "G21", professor: { name: "VINEETHA NAIR" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "10:00", duration: 1.5 }, { day: "Fri", startTime: "10:00", duration: 1.5 }]},
                { code: "G22", professor: { name: "CHRISTINE LEE" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "10:00", duration: 1.5 }, { day: "Wed", startTime: "10:00", duration: 1.5 }]},
                { code: "G23", professor: { name: "CHRISTINE LEE" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 1.5 }, { day: "Wed", startTime: "12:00", duration: 1.5 }]},
                { code: "G24", professor: { name: "LOW BEE HONG" }, location: { building: "LKCSB", room: "Classroom 3-5", level: 3 }, classes: [{ day: "Mon", startTime: "13:45", duration: 1.5 }, { day: "Wed", startTime: "13:45", duration: 1.5 }]},
                { code: "G25", professor: { name: "LOW BEE HONG" }, location: { building: "LKCSB", room: "Classroom 3-5", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 1.5 }, { day: "Wed", startTime: "15:30", duration: 1.5 }]},
                { code: "G26", professor: { name: "LING CHIA YEN" }, location: { building: "SOE/SCIS2", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 1.5 }, { day: "Thu", startTime: "08:15", duration: 1.5 }]},
                { code: "G27", professor: { name: "LING CHIA YEN" }, location: { building: "SOE/SCIS2", room: "Classroom 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "10:00", duration: 1.5 }, { day: "Thu", startTime: "10:00", duration: 1.5 }]},
                { code: "G28", professor: { name: "NICOLA HELEN GREEN" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 1.5 }, { day: "Wed", startTime: "15:30", duration: 1.5 }]},
                { code: "G29", professor: { name: "NICOLA HELEN GREEN" }, location: { building: "SOE/SCIS2", room: "Classroom 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "17:15", duration: 1.5 }, { day: "Wed", startTime: "17:15", duration: 1.5 }]},
                { code: "G30", professor: { name: "MABEL TAN CHAI LIN" }, location: { building: "LKCSB", room: "Classroom 3-5", level: 3 }, classes: [{ day: "Mon", startTime: "10:00", duration: 1.5 }, { day: "Thu", startTime: "10:00", duration: 1.5 }]},
                { code: "G31", professor: { name: "MABEL TAN CHAI LIN" }, location: { building: "LKCSB", room: "Classroom 3-5", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 1.5 }, { day: "Thu", startTime: "12:00", duration: 1.5 }]},
                { code: "G32", professor: { name: "LEE SIEW YAN AGNES" }, location: { building: "SOE/SCIS2", room: "Classroom 4-3", level: 4 }, classes: [{ day: "Wed", startTime: "08:15", duration: 1.5 }, { day: "Fri", startTime: "08:15", duration: 1.5 }]},
                { code: "G33", professor: { name: "LEE SIEW YAN AGNES" }, location: { building: "SOE/SCIS2", room: "Classroom 4-3", level: 4 }, classes: [{ day: "Wed", startTime: "10:00", duration: 1.5 }, { day: "Fri", startTime: "10:00", duration: 1.5 }]},
                { code: "G34", professor: { name: "LIM SEE CHEN" }, location: { building: "SOE/SCIS2", room: "Classroom 4-3", level: 4 }, classes: [{ day: "Mon", startTime: "12:00", duration: 1.5 }, { day: "Thu", startTime: "12:00", duration: 1.5 }]},
                { code: "G35", professor: { name: "OUYANG XIN" }, location: { building: "SOE/SCIS2", room: "Classroom 4-3", level: 4 }, classes: [{ day: "Mon", startTime: "13:45", duration: 1.5 }, { day: "Thu", startTime: "13:45", duration: 1.5 }]},
                { code: "G36", professor: { name: "OUYANG XIN" }, location: { building: "SOE/SCIS2", room: "Classroom 4-3", level: 4 }, classes: [{ day: "Mon", startTime: "15:30", duration: 1.5 }, { day: "Thu", startTime: "15:30", duration: 1.5 }]},
                { code: "G37", professor: { name: "PHOEBE SEOW SU KIAN" }, location: { building: "LKCSB", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 1.5 }, { day: "Fri", startTime: "12:00", duration: 1.5 }]},
                { code: "G38", professor: { name: "PHOEBE SEOW SU KIAN" }, location: { building: "LKCSB", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "13:45", duration: 1.5 }, { day: "Fri", startTime: "13:45", duration: 1.5 }]},
                { code: "G39", professor: { name: "ESTHER SONG YIK SAN" }, location: { building: "SOE/SCIS2", room: "Classroom 4-3", level: 4 }, classes: [{ day: "Tue", startTime: "12:00", duration: 1.5 }, { day: "Fri", startTime: "12:00", duration: 1.5 }]},
                { code: "G40", professor: { name: "FERNANDEZ CLAUDINE JEAN" }, location: { building: "SOE/SCIS2", room: "Classroom 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 1.5 }, { day: "Thu", startTime: "15:30", duration: 1.5 }]},
                { code: "G41", professor: { name: "LIN XIUXIA" }, location: { building: "LKCSB", room: "Classroom 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "13:45", duration: 1.5 }, { day: "Thu", startTime: "13:45", duration: 1.5 }]},
                ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: [],
            preReq: {
            or: [],
            },
            },

// ================================================================================================================================================================================================================================================================================================

    "COR-2100": {
        name: "Economics and Society",
        moduleCode: "COR-2100",
        exam: { dateTime: new Date("2024-11-27")},
        description: `In this course, we introduce students to the economic way of thinking about societal issues. We use the themes of incentives and empiricism to illustrate the power of simple economic ideas, and their ability to explain, predict, and improve what happens in the world. The course will examine how market activities are shaped by both the private and public sector. It will allow students to appreciate how free markets and government policies affect society, creating winners and losers, and to understand the societal trade-offs implicated in an economy. The course will also examine debates on the importance of social institutions in contributing to economic growth, and on economic policies surrounding the world financial crisis. Two topics related to Growth in Asia will be covered in the course.`,
        sections: [
                { code: "G1", professor: { name: "BEI HONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
                { code: "G2", professor: { name: "BEI HONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G3", professor: { name: "BEI HONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G4", professor: { name: "BEI HONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G5", professor: { name: "ERIC FESSELMEYER" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G6", professor: { name: "ERIC FESSELMEYER" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] },
                { code: "G7", professor: { name: "ERIC FESSELMEYER" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
                { code: "G8", professor: { name: "BIAN XIAOCHEN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-7", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
                { code: "G9", professor: { name: "BIAN XIAOCHEN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-7", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G10", professor: { name: "KOSMAS MARINAKIS" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G11", professor: { name: "KOSMAS MARINAKIS" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }] },
                { code: "G12", professor: { name: "KOSMAS MARINAKIS" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G13", professor: { name: "KOSMAS MARINAKIS" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G14", professor: { name: "TAN KIM SONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
                { code: "G15", professor: { name: "TAN KIM SONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
                { code: "G16", professor: { name: "TAN KIM SONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G17", professor: { name: "TAN SWEE LIANG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-6", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G18", professor: { name: "TAN SWEE LIANG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G19", professor: { name: "TAN SWEE LIANG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G20", professor: { name: "LAM SAN LING" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-6", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] },
                { code: "G21", professor: { name: "LAM SAN LING" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G22", professor: { name: "VU HOANG PHUONG QUE" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G23", professor: { name: "VU HOANG PHUONG QUE" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G24", professor: { name: "WONG FOT CHYI" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G31", professor: { name: "VU HOANG PHUONG QUE" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G32", professor: { name: "LAM SAN LING" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }] },
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1', 'Term 2'],
            preReq: {
            or: [],
            },
    },
// ================================================================================================================================================================================================================================================================================================

    "COR-3001": {
        name: "Big Quesstions",
        moduleCode: "COR-3001",
        exam: { dateTime: new Date("")},
        description: `Big Questions will take a theme every year, or a major global challenge broadly defined as a thesis and its (seeming) antithesis. Big Questions will introduce students to the challenging ethical, theoretical, and operational debates that attend to these themes. Students in any given year will be able to choose from a menu of sub-themes, each using a different disciplinary lens and focusing on different aspects of the theme, while also sharing a canon of readings and attending public lectures dedicated to the year's theme for a shared intellectual experience. The themes may include Happiness and Suffering, Global and Local, Robots and Humans, Wealth and Poverty, War and Peace, amongst others.`,
        sections: [
                { code: "G1", professor: { name: "NGOEI WEN-QING" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G2", professor: { name: "NGOEI WEN-QING" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] },
                { code: "G3", professor: { name: "NGOEI WEN-QING" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G4", professor: { name: "AIDAN WONG" }, location: { building: "YPHSL", room: "Seminar Room 2-11", level: 2 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G5", professor: { name: "AIDAN WONG" }, location: { building: "YPHSL", room: "Seminar Room 2-11", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G6", professor: { name: "AIDAN WONG" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G7", professor: { name: "JOSHUA LUCZAK" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
                { code: "G8", professor: { name: "JOSHUA LUCZAK" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G9", professor: { name: "JOSHUA LUCZAK" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G10", professor: { name: "JOSHUA LUCZAK" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G11", professor: { name: "EMILY SOON" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G12", professor: { name: "TERRY VAN GEVELT" }, location: { building: "SOSS/CIS", room: "Classroom 1-2", level: 1 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G13", professor: { name: "TERRY VAN GEVELT" }, location: { building: "SOSS/CIS", room: "Classroom 1-2", level: 1 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
                { code: "G14", professor: { name: "TERRY VAN GEVELT" }, location: { building: "SOSS/CIS", room: "Classroom 1-2", level: 1 }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }] },
                { code: "G15", professor: { name: "GEORGE WONG" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G16", professor: { name: "GEORGE WONG" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }] },
                { code: "G17", professor: { name: "SOVAN PATRA" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G18", professor: { name: "SOVAN PATRA" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }] },
                { code: "G19", professor: { name: "SANDEEP SINGH" }, location: { building: "SOSS/CIS", room: "Classroom 1-2", level: 1 }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }] },
                { code: "G20", professor: { name: "SANDEEP SINGH" }, location: { building: "SOSS/CIS", room: "Classroom 1-2", level: 1 }, classes: [{ day: "Thu", startTime: "19:00", duration: 3.25 }] },
                { code: "G21", professor: { name: "PRESTON WONG" }, location: { building: "SOSS/CIS", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }] },
                { code: "G22", professor: { name: "PRESTON WONG" }, location: { building: "SOSS/CIS", room: "Seminar Room 1-1", level: 1 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }] },
                { code: "G23", professor: { name: "YEO WEE LOON" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }] },
                { code: "G24", professor: { name: "CHRIS TAN" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G25", professor: { name: "CHRIS TAN" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G26", professor: { name: "SONNY ROSENTHAL" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G27", professor: { name: "SONNY ROSENTHAL" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G28", professor: { name: "ADRIANA BANOZIC" }, location: { building: "SOSS/CIS", room: "Seminar Room B1-1", level: "B1" }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G29", professor: { name: "ADRIANA BANOZIC" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G30", professor: { name: "SIAN EIRA JAY" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
                { code: "G31", professor: { name: "SIAN EIRA JAY" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1', 'Term 2'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "COR-3301": {
        name: "Ethics and Social Responsibility",
        moduleCode: "COR-3301",
        exam: { dateTime: new Date("2024-11-29")},
        description: `The objective of the Course is to raise the awareness of students with regard to the multi-faceted ethical and social responsibility issues faced by businesses and corporate executives, whether individuals or organisations. The initial part of the Course will focus on critiquing various ethical and social theories developed by philosophers, economists, sociologists, management theorists and others. Both Western and non-Western theories will be examined. The Course also aims at developing the moral reasoning skills of students and applying them to the specific problems and dilemmas faced by individuals and organisations in the business and corporate world.`,
        sections: [
                { code: "G1", professor: { name: "DHIRAJ G CHAINANI" }, location: { building: "YPHSL", room: "Seminar Room 3-02", level: 3 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }] },
                { code: "G2", professor: { name: "FUN WEI XUAN, JOEL" }, location: { building: "YPHSL", room: "Seminar Room 2-03", level: 2 }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }] },
                { code: "G3", professor: { name: "WONG LI DE, BRIAN" }, location: { building: "YPHSL", room: "Seminar Room 3-11", level: 3 }, classes: [{ day: "Thu", startTime: "19:00", duration: 3.25 }] },
                { code: "G5", professor: { name: "DANIEL SEAH" }, location: { building: "YPHSL", room: "Seminar Room 3-01", level: 3 }, classes: [{ day: "Thu", startTime: "19:00", duration: 3.25 }] },
                { code: "G6", professor: { name: "DANIEL SEAH" }, location: { building: "YPHSL", room: "Seminar Room 2-01", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G7", professor: { name: "WANG HENG" }, location: { building: "YPHSL", room: "Seminar Room 3-11", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G8", professor: { name: "CHAN JUNHAO JUSTIN" }, location: { building: "YPHSL", room: "Seminar Room 3-01", level: 3 }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }] },
                { code: "G9", professor: { name: "WANG HENG" }, location: { building: "YPHSL", room: "Seminar Room 3-11", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
                { code: "G11", professor: { name: "STEFANIE SCHACHERER" }, location: { building: "YPHSL", room: "Seminar Room 3-12", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G12", professor: { name: "STEFANIE SCHACHERER" }, location: { building: "YPHSL", room: "Seminar Room 3-12", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G13", professor: { name: "OOI HUEY HIEN" }, location: { building: "YPHSL", room: "Seminar Room 3-12", level: 3 }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }] },
                { code: "G14", professor: { name: "NOEMI CHAW" }, location: { building: "YPHSL", room: "Seminar Room 3-11", level: 3 }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }] },
                { code: "G15", professor: { name: "RACHEL TAN XI'EN" }, location: { building: "YPHSL", room: "Seminar Room 2-04", level: 2 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }] }
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1', 'Term 2'],
            preReq: {
            or: [],
            },
    },

// ================================================================================================================================================================================================================================================================================================
    "IS114": {
        name: "Computing Fundamentals",
        moduleCode: "IS114",
        exam: { dateTime: new Date("2024-11-27")},
        description: `We begin our adventure by exploring the essential elements of Computing Systems — hardware, software, and network technologies — through a series of challenging yet fun learning activities. We grow our coding skills by building a networked, distributed computing system: starting with physical computing devices that unite the cyber and physical realms, we add fundamental networking capabilities for devices to exchange information and form networks, and finally integrate the system into the cloud. Equipped with newfound skills and knowledge, we unleash our creative energies, our youthful idealism, and our capacity to dream, by designing visionary technology to conquer a real-world societal challenge. This is a journey into the unknown. Yet, a still, small voice deep within us compels us: Courage! Do not be afraid! Put out into the deepest oceans and brave the stormiest seas! Let down your nets for an awesome catch! The adventure reaches its peak at the project showcase, where we witness the work of human hands come to fruition, leaving us inspired to reflect deeply and broadly about how we, as global citizens, can harness the power of Computing Systems as a potent force in the service of humanity.`,
        sections: [
                { code: "G1", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: "B1" }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] },
                { code: "G2", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: "B1" }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G3", professor: { name: "PIUS LEE" }, location: { building: "SCIS1", room: "Classroom B1-1", level: "B1" }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
                { code: "G4", professor: { name: "PIUS LEE" }, location: { building: "SCIS1", room: "Classroom B1-1", level: "B1" }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }] },
                { code: "G5", professor: { name: "PIUS LEE" }, location: { building: "SCIS1", room: "Classroom B1-1", level: "B1" }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }] },
                { code: "G6", professor: { name: "PIUS LEE" }, location: { building: "SCIS1", room: "Classroom B1-1", level: "B1" }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }] },
                { code: "G7", professor: { name: "SWAVEK WLODKOWSKI" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-5", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G8", professor: { name: "XU YIXIN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G9", professor: { name: "XU YIXIN" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G10", professor: { name: "XU YIXIN" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G11", professor: { name: "XU YIXIN" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS210": {
        name: "Business Process Analysis & Solutioning",
        moduleCode: "IS210",
        exam: { dateTime: new Date("2024-11-29")},
        description: `In practice, a management decision to invest in business process modeling is often motivated by the need to document requirements for an information technology project. So this course aims to help students:
                    - Understand and apply BPM project needs and life-cycle stages
                    - Gain knowledge of business process and its role in an industry.
                    - Understand business models and create models for the as-is business process.
                    - Understand analysis techniques static and dynamic and analyse the business process
                    - Apply dynamic analysis techniques using tools and analyse the simulation results
                    - Identify business needs in the process and convert them to the IT needs
                    - Understand techniques for solutioning and design solution models for the to-be process
                    - Understand enterprises and they are implemented in an organization.
                    - Gain understanding of the process innovation and identify the needs for process innovation.
                    - Analyze and review innovated business processes in industry cases where digital transformation is applied.
        `,
        sections: [
                { code: "G1", professor: { name: "KE PING FAN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }] },
                { code: "G2", professor: { name: "KE PING FAN" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }] },
                { code: "G3", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
                { code: "G4", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G5", professor: { name: "RAFAEL J. BARROS" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: 'B1' }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
                { code: "G6", professor: { name: "RAFAEL J. BARROS" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
                { code: "G7", professor: { name: "SWAPNA GOTTIPATI" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] },
                { code: "G8", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G9", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G10", professor: { name: "KE PING FAN" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS214": {
        name: "Enterprise Solution Management",
        moduleCode: "IS214",
        exam: { dateTime: new Date("2024-04-22")},
        description: `This course explores the elements in the IT ecosystem that is required to support enterprise systems. It is divided into three main areas: maintenance, change and disaster prevention and recovery. Using common tools in the industry for ticketing, automated testing and DevOps, students are given hands-on experience as well as the understanding for robust delivery, efficient change and deep resilience. Teams will be given their own system environment to maintain and protect. Real world use cases and examples are given to highlight the importance and complexity of managing applications in the enterprise.`,
        sections: [
                { code: "G1", professor: { name: "PAUL GRIFFIN" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
                { code: "G2", professor: { name: "PAUL GRIFFIN" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }] },
                { code: "G3", professor: { name: "TA NGUYEN BINH DUONG" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G4", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G5", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G6", professor: { name: "RAMANATHAN KIRUTHIKA" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G7", professor: { name: "RAFAEL J. BARROS" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
                { code: "G8", professor: { name: "RAFAEL J. BARROS" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
                { code: "G9", professor: { name: "TA NGUYEN BINH DUONG" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }] },
                { code: "G10", professor: { name: "LUM ENG KIT" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-9", level: 2 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] },
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 2'],
            preReq: {
            or: [],
            },
    },



// ================================================================================================================================================================================================================================================================================================
    "IS212": {
        name: "Software Project Management",
        moduleCode: "IS212",
        exam: { dateTime: new Date("")},
        description: `In IS212 (Software Project Management), students will learn about modern frameworks and tools for software project management. In particular, students will gain hands-on experience with the ‘scrum’ framework and several other agile techniques (e.g. test-driven development, pair programming, continuous integration) as they design and build the first release of a software system. Students will gain an appreciation for how these methods help to manage the inherent uncertainty of software projects, as well as how they ensure that developers work towards a common goal at a sustainable pace.`,
        sections: [
                { code: "G1", professor: { name: "CHRISTOPHER MICHAEL POSKITT" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] },
                { code: "G2", professor: { name: "CHRISTOPHER MICHAEL POSKITT" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }] },
                { code: "G3", professor: { name: "CHRISTOPH TREUDE" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G4", professor: { name: "CHRISTOPH TREUDE" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
                { code: "G5", professor: { name: "LAU YI MENG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G6", professor: { name: "LAU YI MENG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G7", professor: { name: "RAJESH KRISHNA BALAN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
                { code: "G8", professor: { name: "RAJESH KRISHNA BALAN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] },
                { code: "G9", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] },
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS215": {
        name: "Digital Business - Technologies and Transformation",
        moduleCode: "IS215",
        exam: { dateTime: new Date("2024-04-15")},
        description: `This course introduces students to the fundamentals of digital business, technologies and the principles and practices that lead to successful digital transformation. With the exploitation of digital technologies such as artificial intelligence, cloud, analytics, mobile networks, social media, and the Internet of Things, organizations can develop a competitive edge that can boost efficiency and drive new business models that lead to an increase in the top and bottom lines. The course focuses on digital strategies using four components namely reimagining the business, re-evaluating value chain, reconnecting with customers and rebuilding the organisation. Challenges such as data security and governance, regulatory constraints, and future directions of digital business will be discussed. Besides helping students to understand the key concepts, tools and API services are introduced to implement the digital and analytics solutions. Real world examples and case studies of how organizations innovate and drive digital transformation will also be covered.`,
        sections: [
                { code: "G1", professor: { name: "LO SIAW LING" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "LO SIAW LING" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "LO SIAW LING" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G4", professor: { name: "LO SIAW LING" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G5", professor: { name: "ARNE JONNI SUPPE" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G6", professor: { name: "ARNE JONNI SUPPE" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G8", professor: { name: "LAU YI MENG" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G9", professor: { name: "LAU YI MENG" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G10", professor: { name: "LAU YI MENG" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G11", professor: { name: "CHRISTOPH TREUDE" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
                { code: "G12", professor: { name: "ARNE JONNI SUPPE" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]}
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 2'],
            preReq: {
            or: [],
            },
    },

// ================================================================================================================================================================================================================================================================================================
    "IS112": {
        name: "Data Management",
        moduleCode: "IS112",
        exam: { dateTime: new Date("2024-04-24")},
        description: `This course will cover fundamentals of relational database theory, important data management concepts such as data modelling, database design, database implementation in current business information systems, and some basic concepts related to unstructured data. A series of in-class exercises, tests, pop quizzes and a course project will help students understand the covered topics. Students are expected to apply knowledge learned in the classroom to solve many problems based on real-life business scenarios, while gaining hands-on experience in designing, implementing, and managing database systems. Students are also expected to understand the differences between structured data and unstructured data. This course is applicable to students declaring a major from SIS.`,
        sections: [
                { code: "G14", professor: { name: "MOHAMED IRSHAD ABBAS ALI" }, location: { building: "LKCSB", room: "Seminar Room 3-5", level: 3 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }]},
                { code: "G1", professor: { name: "XU YIXIN" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "XU YIXIN" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "XU YIXIN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "NGO CHONG WAH" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-10", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G5", professor: { name: "HU NAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G6", professor: { name: "HU NAN" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G7", professor: { name: "HU NAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-10", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G8", professor: { name: "MOK HENG NGEE" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G9", professor: { name: "LIM EE-PENG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-10", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 2'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS211": {
        name: "Interaction Design and Prototyping",
        moduleCode: "IS211",
        exam: { dateTime: new Date("2024-12-6")},
        description: `This course introduces fundamental human-computer interaction principles and techniques for designing usable interactive systems. Topics include common methods for gathering user requirements, basic UI and graphics programming techniques, and common evaluation techniques. Hands-on experience with UI prototyping tools will be provided and students will complete a UI design and prototyping project as part of this course.`,
        sections: [
                { code: "G1", professor: { name: "BENJAMIN GAN KOK SIEW" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "BENJAMIN GAN KOK SIEW" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "KOTARO HARA" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "LEE MIN HUN" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G5", professor: { name: "LEE MIN HUN" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G6", professor: { name: "OUH ENG LIEH" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G7", professor: { name: "OUH ENG LIEH" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G8", professor: { name: "OUH ENG LIEH" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G9", professor: { name: "WENDY TAN" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-10", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G10", professor: { name: "BENJAMIN GAN KOK SIEW" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G11", professor: { name: "BENJAMIN GAN KOK SIEW" }, location: { building: "SOE/SCIS2", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
                { code: "G12", professor: { name: "WENDY TAN" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G13", professor: { name: "KOTARO HARA" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G14", professor: { name: "KOTARO HARA" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G15", professor: { name: "BENJAMIN GAN KOK SIEW" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS113": {
        name: "Web Application Development 1",
        moduleCode: "IS113",
        exam: { dateTime: new Date("2024-04-18")},
        description: `Web applications are commonly used today by governments, enterprises, and even individuals to provide information, market products, etc. Ability to create web applications is thus a crucial skill for graduates in Information Systems. This course is designed to equip students with the knowledge and skill to develop well-styled database-driven web applications. In the early weeks of the course, students would be introduced to web concepts and trained to build static web pages using HTML. Next, students will be taught on how to program dynamic web applications using PHP. Programming concepts that students have learned in Introduction to Programming (IS111) will be revisited (using PHP as the programming language), expanded, and used to allow students to program web applications that can adapt based on user inputs. After basic PHP programming has been introduced, students will then be taught on how they can connect to a database to store, retrieve, modify, and delete data. They can then design dynamic web pages that present different contents reflecting contents stored in a database as well as allow users to modify database contents through the webpages. In the final weeks of the course, students will be introduced to more advanced PHP concepts including session management to allow for stateful interactive information exchange between users and a web application.`,
        sections: [
                { code: "G1", professor: { name: "MANOJ THULASIDAS" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: 1 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G2", professor: { name: "LI JIANNAN" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G3", professor: { name: "LAU YI MENG" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: 1 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G4", professor: { name: "LAU YI MENG" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: 1 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G5", professor: { name: "LI JIANNAN" }, location: { building: "SCIS1", room: "Seminar Room B1-1", level: 1 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G6", professor: { name: "MANOJ THULASIDAS" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: 1 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G7", professor: { name: "MANOJ THULASIDAS" }, location: { building: "SCIS1", room: "Seminar Room B1-1", level: 1 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G8", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G9", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G10", professor: { name: "JASON CHUI" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: 1 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G11", professor: { name: "WONG CHEE CHEIN" }, location: { building: "SCIS1", room: "Seminar Room B1-1", level: 1 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: ["IS112", "IS105"],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 2'],
            preReq: {
            or: ["IS112", "IS105"],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS216": {
        name: "Web Application Development 2",
        moduleCode: "IS216",
        exam: { dateTime: new Date("2024-11-27")},
        description: `This course is designed to equip students with knowledge and skills to develop well-styled and responsive web applications that provide rich user experiences. Combining with the skills learnt in IS113 course, which focuses on developing database-driven web applications with basic web designs, after this course, the students will be equipped with full stack web development skills, who can build both front-end and back-end software. In the introductory weeks of the course, the students will revisit HTML and server-side programming (PHP) concepts learnt in IS113. Then, the students will learn the concept of “Styling” the web pages. The students will learn a style sheet language called cascading style sheets (CSS) and learn how to separate the content and presentation of web pages, how to control web page layout, colors and fonts, how to bring multiple styles into a web page, how to control the layout of multiple web pages efficiently, etc. Next, the students will learn the concept of adding responsive behaviors to web pages to enhance the user experience. The students will learn a client-side programming language called JavaScript to make ordinary web elements like input boxes, buttons, forms, tables, menus interactive and animated. Furthermore, they will learn how to connect to API gateways and process data from external sources like RESTful web services so that they can build practical applications. In the latter weeks of the course, the students will be introduced to programming with frameworks. The students will learn how to use frameworks to build complex web applications in an efficient, scalable manner. More specifically, the students will be introduced to Bootstrap, a popular CSS framework for developing responsive website and introduced to Vue, a progressive JavaScript framework for building rich user interfaces.`,
        sections: [
                { code: "G1", professor: { name: "FWA HUA LEONG" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }]},
                { code: "G2", professor: { name: "FWA HUA LEONG" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G3", professor: { name: "KYONG JIN SHIM" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G4", professor: { name: "KYONG JIN SHIM" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G5", professor: { name: "MOK HENG NGEE" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }]},
                { code: "G6", professor: { name: "MOK HENG NGEE" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G7", professor: { name: "MOK HENG NGEE" }, location: { building: "SCIS1", room: "Seminar Room 3-2", level: 3 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G8", professor: { name: "SHAR LWIN KHIN" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G9", professor: { name: "SHAR LWIN KHIN" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G10", professor: { name: "FWA HUA LEONG" }, location: { building: "SCIS1", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: ["IS113", "CS203"],
            },
    },

// ================================================================================================================================================================================================================================================================================================
    "IS213": {
        name: "Enterprise Solution Development",
        moduleCode: "IS213",
        exam: { dateTime: new Date("2024-04-16")},
        description: `With the emergence of new technologies and evolution of existing ones, organizations are changing the way they build enterprise solutions. Rather than build monolithic applications, the current emphasis is on building solutions by leveraging existing functionality exposed as services. This approach to composing solutions using services follows the Service Oriented Architecture (SOA) paradigm, where applications are structured as a collection of loosely coupled services. In this course students will learn how to design and implement enterprise solutions using SOA using suitable tools. The course will cover topics such as service-oriented architecture (SOA), microservices architecture (MSA), web services, JSON/XML, cloud computing, and Enterprise Service Bus (ESB).`,
        sections: [
                { code: "G1", professor: { name: "JIANG LINGXIAO" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "JIANG LINGXIAO" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "JIANG LINGXIAO" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }]},
                { code: "G5", professor: { name: "NICHOLAS TAN CHEE HIANG" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }]},
                { code: "G6", professor: { name: "CHRISTOPHER MICHAEL POSKITT" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }]},
                { code: "G7", professor: { name: "CHRISTOPHER MICHAEL POSKITT" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G8", professor: { name: "ALAN MEGARGEL" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G9", professor: { name: "ALAN MEGARGEL" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G10", professor: { name: "SWETHA GOTTIPATI" }, location: { building: "SCIS1", room: "Seminar Room B1-1", level: 'B1' }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },

// ================================================================================================================================================================================================================================================================================================
    "IS442": {
        name: "Object Oriented Programming",
        moduleCode: "IS442",
        exam: { dateTime: new Date("2024-12-05")},
        description: `This course focuses on fundamental concepts of developing programs using an object orientated approach. There will be an emphasis on writing clean and efficient code, and the ability to use an appropriate data structure or algorithm to solve problems. The Java programming language will be taught in depth. Students are expected to have a strong foundation in programming.

            This is a compulsory course for IS (Software Development Track) for 2017 intake and onwards.

            Upon completion of the course, students will be able to:
            1. Practice problem solving skills
            2. Read UML sequence and class diagrams
            3. Apply basic concepts of Object Orientation to a given scenario/context
            4. Apply good programming practices and design concepts to develop software
            5. Appreciate the role of algorithms and in problem solving`,
        sections: [
                { code: "G1", professor: { name: "BIN ZHU" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]},
                { code: "G2", professor: { name: "BIN ZHU" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-6", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "ZHANG ZHIYUAN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "ZHANG ZHIYUAN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]}
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1', 'Term 2'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "CS102": {
        name: "Programming Fundamentals II",
        moduleCode: "CS102",
        exam: { dateTime: new Date("2024-04-15")},
        description: `This course focuses on fundamental concepts of developing programs using an object oriented approach. There will be an emphasis on writing clean and efficient code, and the ability to use an appropriate data structure or algorithm to solve problems. The Java programming language will be taught in depth.`,
        sections: [
                { code: "G1", professor: { name: "LEE YEOW LEONG" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }]},
                { code: "G2", professor: { name: "LEE YEOW LEONG" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }]},
                { code: "G3", professor: { name: "ZHANG ZHIYUAN" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
                { code: "G4", professor: { name: "ZHANG ZHIYUAN" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]}
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1', 'Term 2'],
            preReq: {
            or: [],
            },
    },

// ================================================================================================================================================================================================================================================================================================
    "SE301": {
        name: "Advanced Programming and Design",
        moduleCode: "SE301",
        exam: { dateTime: new Date("2024-12-05")},
        description: `This is an advanced programming course designed to prepare students to become efficient and proficient software developers. Students are expected to be already familiar with object-oriented concepts with a strong working knowledge of Java. SE301 will build upon this foundation and introduce students to important clean coding concepts, continuous refactoring, test-driven development, (OO and architectural) design patterns and SOLID principles - all coupled with lots of hands-on coding exercises. Students will learn Node.js from a selected online course. Design patterns within the Node.js framework will be discussed in class. The course focuses on two aspects of testing: unit testing using JUnit and Web black-box testing using Selenium IDE and Selenium Webdriver scripts. Advanced programming concepts such as multi-threaded programming and advanced programming features will be covered using Java.`,
        sections: [
                {code: "G1", professor: { name: "MOK HENG NGEE" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }]},
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },

// ================================================================================================================================================================================================================================================================================================
    "IS458": {
        name: "Cloud Management and Engineering",
        moduleCode: "IS458",
        exam: { dateTime: new Date("2024-12-02")},
        description: `Cloud computing gain fast development within the past 15 years and continue penetrating to many aspects of our daily lives. It provides strong and reliable support for all kinds of information systems in various industries. It also greatly reduces the go-to-market time for high-tech start-up companies. Although many people are using cloud in their daily work, but few of them have structural understanding on how cloud functions. With more and more fancy features incorporated in Cloud, it seems difficult for beginners to understand their relations and apply them to real world problems. This course provides an introduction to the fundamental concept and basic structure of cloud computing. The topics covered include basic cloud concept, typical business and technical requirements on cloud infrastructure, basic building blocks for an cloud solution, and how to manage reliability and incident using cloud tools. All topics are designed based on actual commercial usage pattern to support real business requirements. Computing theory and mathematical analysis are included at a minimally needed level. Exercising and integration of knowledge learnt will be covered through assignments, labs, and a demonstrative project for real world problems. After this course, students are expected to gain a structural concept of how cloud operates and how to manipulate cloud resources to support information system and business needs. The principles and techniques learnt in this course will help students understand the common core structure of various commercial cloud platforms and how to go deeper to a specific function. With this foundation, students can easily build up their knowledge of a chosen commercial cloud on a systematic way using online resources.`,
        sections: [
                { code: "G1", professor: { name: "SIM CHER BOON" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }] }, 
                { code: "G2", professor: { name: "ZHOU YU XUAN, SOPHIA" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "19:00", duration: 3.25 }] }, 
                { code: "G3", professor: { name: "MOK HENG NGEE" }, location: { building: "SCIS1", room: "Seminar Room 2-3", level: 2 }, classes: [{ day: "Fri", startTime: "08:15", duration: 3.25 }] }
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS492": {
        name: "Cloud Solution Development Work-Study Elective",
        moduleCode: "IS492",
        exam: { dateTime: new Date("")},
        description: `The Cloud Solution Development Work-Study Elective is a six-month internship attachment program under the SMU-AWS-Accenture Cloud Solution Development Work-Study Program. During the vacation period, students work five days a week at Accenture. While undertaking the work-study elective, students may also enrol in 1-2 CUs of courses at SMU during the same term and are allowed to be back in campus up to one day each week. Students will be assigned to a SMU Faculty Advisor and an Internship Supervisor (from Accenture). This elective provides students with an opportunity to do an extended internship with Accenture and applies the solution development skillsets that they learnt to contribute to the industry sector in Singapore.`,
        sections: [
                // { code: "G1", professor: { name: "OUH ENG LIEH" }, location: { building: "SCIS1", room: "To be confirmed", level: null }, classes: [{ day: "To be confirmed", startTime: "To be confirmed", duration: null }] }
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "IS412": {
        name: "Enterprise Business Solutions",
        moduleCode: "IS412",
        exam: { dateTime: new Date("")},
        description: `The Enterprise Business Solutions Course is a SMU-X course that will be delivered in collaboration with SAP APJ Innovation Office. This SMU-X course offers an experiential learning opportunity that allows students to translate classroom knowledge and theory into practical solutions for a real organization. Through this student consultancy project, students learn how to work with industry professionals and help come up with innovative solutions for real world problems. The student teams will work under the guidance from the faculty and project sponsor mentors, from problem definition to final client presentation. The course will focus on helping students gain a good understanding of the concepts related to building innovative solutions by leveraging SAP Business Technology Platform (BTP). Students will also gain hands-on experience in building solutions using BTP along with other related technologies. Learning Objectives • Experience real-world problem solving through student consultancy project • Apply classroom learning and research to real-world challenges in order to envision innovative IT solutions using the cloud platform • Understand the changing role of IT modes of delivering solutions • Apply Design Thinking methodology when building an innovative IT solution • Build innovative solutions using a cloud platform (e.g. SAP Cloud Platform) • Use some of the services within a cloud platform (e.g. IoT, analytics, machine learning) • Learning to learn skills as demanded by the project • Learn how to work with industry professionals and deliver an IT solution • Learn how to handle uncertainty in a project`,
        sections:[
                { code: "G1", professor: { name: "LUM ENG KIT" }, location: { building: "SCIS1", room: "Seminar Room B1-1", level: 1 }, classes: [{ day: "Wed", startTime: "12:00", duration: 3.25 }] }
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "CS440": {
        name: "Foundations of Cybersecurity",
        moduleCode: "CS440",
        exam: { dateTime: new Date("2024-12-03")},
        description: `The Foundations of Cybersecurity course provides fundamental knowledge and technical skills for protecting computing and networking systems against various cyber-attacks. Topics covered include cryptographic algorithms, public key infrastructure, network security, authentication, access control, web security basics, and malware basics. Classroom instructions will be integrated with hands-on exercises and group projects.`,
        sections: [
                { code: "G1", professor: { name: "SHAR LWIN KHIN" }, location: { building: "SCIS1", room: "Seminar Room 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
                { code: "G2", professor: { name: "XIE XIAOFEI" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G3", professor: { name: "YANG GUOMIN" }, location: { building: "SCIS1", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
                { code: "G4", professor: { name: "YANG GUOMIN" }, location: { building: "SCIS1", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] }
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1', 'Term 2'],
            preReq: {
            or: [],
            },
    },


// ================================================================================================================================================================================================================================================================================================
    "CS301": {
        name: "IT Solution Architecture",
        moduleCode: "CS301",
        exam: { dateTime: new Date("2024-12-27")},
        description: `The IT Solution Architecture course integrates design concepts and methods to develop IT solutions from both the software and system-level perspectives. It focuses on the analysis, design and implementation of an IT solution through which business requirements, software qualities and solution elements are transformed into implementable artefacts. By combining critical analysis with hands-on design and development, the course prepares students to participate effectively in the architecture design and development stages of a software-intensive IT solution project. It is highly recommended that students are also proficient in IS442 Object Oriented Programming and Java programming language prior to reading this course.`,
        sections: [
                { code: "G1", professor: { name: "LEE YEOW LEONG" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Thu", startTime: "12:00", duration: 3.25 }] },
                { code: "G2", professor: { name: "LEE YEOW LEONG" }, location: { building: "SCIS1", room: "Seminar Room 2-1", level: 2 }, classes: [{ day: "Thu", startTime: "15:30", duration: 3.25 }] },
                { code: "G3", professor: { name: "OUH ENG LIEH" }, location: { building: "SCIS1", room: "Seminar Room 2-4", level: 2 }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] }
            ],
            coRequisite: [
            {
                or: [],
            },
            ],
            mutuallyExclusive: [],
            credit: 1,
            terms: ['Term 1'],
            preReq: {
            or: [],
            },
    },
// ISAIAH ADDED FROM HERE ================================================================================================================================================================================================================================================================================================
"CS462": {
    name: "Internet Of Things: Technology and Applications",
    moduleCode: "CS462",
    exam: { dateTime: new Date("2024-12-06")},
    description: `The Internet of Things (IoT) brings us a vision of a world in which trillions of devices can sense, communicate, and collaborate over the Internet, in the same way that humans interact and collaborate with one another over the World Wide Web. These interconnected devices offer exciting new services to improve our quality of lives and can be applied to various application domains - smart cities, smart homes, social services, and industrial automation. Sounds lit? Bring some bubble tea, come and see: what's the tea with IoT? This course may be conducted using both Flipped Learning and/or Blended Learning strategies. All lessons are on-site. Students will spend 2-3 hours weekly before lessons on flipped and/or blended learning preparatory activities such as readings, videos, meetups in small groups, meetups with the teacher, etc.`,
    sections: [
        { code: "G1", professor: { name: "MA DONG" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]}
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},
// ================================================================================================================================================================================================================================================================================================
"IS446": {
    name: "Managing Customer Relations with Analytics: Asian Insights",
    moduleCode: "IS446",
    exam: { dateTime: new Date("")},
    description: `The better any organization can manage the relationship with its customers, the more successful it will become. IT systems targeting the problems of dealing with customers are growing in popularity. Customer Relationship Management (CRM) is not just the use of a technology, or a hardcoded business process, it is a management strategy to help organizations understand and learn about customer behaviors, needs, preferences and expectations in order to improve and maintain a strong relationship with them. Managing Customer Relationship with Analytics: Asian Insights presents the concepts and methodologies required to execute a methodical approach to apply analytics and CRM principles into a business. The course will cover the customer-centric business culture, and the customer relationship process to attract, convert, retain and delight customers with the help of IT tools.`,
    sections: [
        { code: "G1", professor: { name: "ALAN HO" }, location: { building: "SOE/SCIS2", room: "Seminar Room 3-9", level: 3 }, classes: [{ day: "Fri", startTime: "12:00", duration: 3.25 }]},
        { code: "G2", professor: { name: "RAFAEL J. BARROS" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: "B1" }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }]},
        { code: "G3", professor: { name: "RAFAEL J. BARROS" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-1", level: "B1" }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }]}
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},
// ================================================================================================================================================================================================================================================================================================
"CS461": {
    name: "Mobile & Pervasive Computing and Applications",
    moduleCode: "CS461",
    exam: { dateTime: new Date("")},
    description: `This course aims to introduce the concept of mobile and pervasive technologies to the students while providing hands-on experience in building such systems. The focus will be mainly on the concepts of (i) mobile/pervasive computing and application development, (ii) applications of mobile systems, (iii) context-awareness, and (iv) improving usability and efficiency of mobile applications. The course examines the outline provided above, from both technical and real-world applications, hence involves the concepts of machine learning. Students of this class will be using development tools and techniques to build mobile Applications (using Android OS) and the main focus will be on making mobile applications faster (lower-latency), more energy-efficient, smarter (context-aware) and highly usable (multimodal UIs).`,
    sections: [],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},

// ================================================================================================================================================================================================================================================================================================
"CS443": {
    name: "Software & Systems Security",
    moduleCode: "CS443",
    exam: { dateTime: new Date("")},
    description: `Software and systems security aims in equipping students with the fundamental concepts in software and systems security, as well as basic hands-on skills in understanding, analyzing, and protecting a software program and a computer system. Each lesson spends roughly 50% of the time on fundamental concepts (lecturing) and 50% of the time on hands-on exercises/assessments. Assessments focus on hands-on projects.`,
    sections: [],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},
// ================================================================================================================================================================================================================================================================================================
"CS206": {
    name: "Software Product Management",
    moduleCode: "CS206",
    exam: { dateTime: new Date("2024-11-28")},
    description: `This course introduces students to the core concepts and skills underlying successful software product management. Students will learn about the distinct characteristics of software products vis-à-vis other industrial artefacts, and how these characteristics can be leveraged in managing the software product life cycle. With an emphasis on the elements of the software product management framework, students will acquire hands-on product management skills through classroom instruction, term projects, and presentations.`,
    sections: [
        { code: "G1", professor: { name: "KELVIN CHNG" }, location: { building: "SOE/SCIS2", room: "Seminar Room B1-2", level: "B1" }, classes: [{ day: "Tue", startTime: "12:00", duration: 3.25 }] }
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},

// TECH BASKET ================================================================================================================================================================================================================================================================================================
"COR-2201": {
    name: "Technology and World Change",
    moduleCode: "COR-2201",
    exam: { dateTime: new Date("2024-12-06")},
    description: `In Technology and World Change, we show our students how technology has changed and continues to change the lives of people and society. We study the processes by which technology and modern society have co-evolved, especially how the past provides insights on potential changes in the future. We study specific examples of how technological innovations have been created, refined and implemented by entrepreneurs, larger corporations or industrial systems. This course trains students to think critically in a broad-based, interdisciplinary manner, and to analyse matters of potential uncertainty and ambiguity. After this course, students should be more perceptive to opportunities for innovations and technological change, regardless of the industry they will be in.`,
    sections: [
        { code: "G1", professor: { name: "NEO KOK BENG" }, location: { building: "LKCSB", room: "Seminar Room 1-1", level: 1 }, classes: [{ day: "Mon", startTime: "12:00", duration: 3.25 }] },
        { code: "G2", professor: { name: "NEO KOK BENG" }, location: { building: "LKCSB", room: "Seminar Room 1-1", level: 1 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
        { code: "G3", professor: { name: "NEO KOK BENG" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
        { code: "G4", professor: { name: "SHIRISH RANGNEKAR" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Mon", startTime: "08:15", duration: 3.25 }] },
        { code: "G5", professor: { name: "SHIRISH RANGNEKAR" }, location: { building: "LKCSB", room: "Seminar Room 3-8", level: 3 }, classes: [{ day: "Wed", startTime: "08:15", duration: 3.25 }] },
        { code: "G6", professor: { name: "SHIRISH RANGNEKAR" }, location: { building: "SOA", room: "Seminar Room 1-3", level: 1 }, classes: [{ day: "Tue", startTime: "08:15", duration: 3.25 }] },
        { code: "G7", professor: { name: "ASHWIN CHARI" }, location: { building: "LKCSB", room: "Seminar Room 3-10", level: 3 }, classes: [{ day: "Wed", startTime: "19:00", duration: 3.25 }] }
],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},

// TECH BASKET ================================================================================================================================================================================================================================================================================================
"COR-2221": {
    name: "AI and Humanity",
    moduleCode: "COR-2221",
    exam: { dateTime: new Date("")},
    description: `Technology (specifically AI) has evolved beyond a technical proposition to a shaping force of our future, interwoven into social, cultural and political elements of human society. We are at the genesis of how the relationship between humans and AI is evolving. More than ever, it is crucial to examine a fundamental question of what does it mean to be a human (and AI). Can AI perceive, communicate and sense as well as humans do, or perhaps even better? Such pertinent questions require a multidisciplinary lens, which this course equips you with to dexterously navigate an unfolding future as leaders of today. Venture beyond an academic discourse and gain hands-on experience as a psychologist and AI scientist to develop an AI powered chatbot.`,
    sections: [
        { code: "G1", professor: { name: "ANDREW KOH" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 3.25 }] },
        { code: "G2", professor: { name: "ANDREW KOH" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-3", level: 3 }, classes: [{ day: "Tue", startTime: "15:30", duration: 3.25 }] },
        { code: "G3", professor: { name: "ANDREW KOH" }, location: { building: "SOSS/CIS", room: "Seminar Room 2-2", level: 2 }, classes: [{ day: "Wed", startTime: "15:30", duration: 3.25 }] },
        { code: "G4", professor: { name: "ANDREW KOH" }, location: { building: "SOSS/CIS", room: "Seminar Room 1-1", level: 1 }, classes: [{ day: "Thu", startTime: "08:15", duration: 3.25 }] }
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},

// TECH BASKET ================================================================================================================================================================================================================================================================================================
"COR-2210": {
    name: "Technological Innovations Enhancing Urban Sustainability",
    moduleCode: "COR-2210",
    exam: { dateTime: new Date("")},
    description: `This course provides students with a set of interweaving and interdisciplinary concepts across the social sciences regarding the what, the how and the why regarding the implementation of technology on urban sustainability issues.\n
                Topics to be covered include:\n
                1. Sustainability in cities, particularly in the context of environmental and climate change.\n
                2. The role of technology in enhancing and disrupting “normal” ways of life in the city, through the use of shared riding/food delivery apps, and social media.\n
                3. How technology applied judiciously can enhance livability and livelihoods for a wide range of urban residents who are both technology-savvy and residents uncomfortable using technology.\n
                
                Students will gain an understanding of how selected industries consider and apply these technologies towards urban sustainability issues. While there will be some in-class meetings to discuss theoretical concepts, learning will be primarily experiential in nature through class discussion, group exercises, and a team project. Guest speakers with practical and industrial experience may be invited as well. The course project will work with one or two industry sponsors. Students are expected to conceive a solution to address a defined problem statement, related to an aspect of urban sustainability with societal impact, and in accordance to the real-world needs of the industry sponsor.`,
    sections: [
        { code: "G1", professor: { name: "WINSTON CHOW" }, location: { building: "SMUC", room: "Active Learning CR 3-1", level: 3 }, classes: [{ day: "Tue", startTime: "19:00", duration: 3.25 }] }
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},
// CULTURES BASKET ================================================================================================================================================================================================================================================================================================
"COR-2406": {
    name: "French",
    moduleCode: "COR-2406",
    exam: { dateTime: new Date("2024-11-27")},
    description: `This course introduces the fundamental elements of the French language within a cultural context. Emphasis is on the development of basic listening, speaking, reading, and writing skills. Upon completion, students should be able to comprehend and respond with grammatical accuracy to spoken and written French as well as demonstrate cultural awareness. Students will be involved in a variety of reading, writing, listening and speaking activities. The development of oral communication skills provides the foundation for students to read and write effectively. Students will have opportunities both to listen and to speak French. Speaking and listening ability is developed through oral exercises, individual reports, class discussions, songs and videos. This course will also explore the cultural hurdles to understanding the French and sketch the context that forms “Frenchness”. Through the introduction to traditions, customs and daily life of the French, students will be given the opportunity to understand French behaviour and culture. The lessons will be conducted both in French and in English.
`,
    sections: [
        { code: "G1", professor: { name: "FRANCOIS BRETAULT" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 1.5 }, { day: "Wed", startTime: "15:30", duration: 1.5 }] },
        { code: "G2", professor: { name: "FRANCOIS BRETAULT" }, location: { building: "SOSS/CIS", room: "Classroom 3-2", level: 3 }, classes: [{ day: "Mon", startTime: "17:15", duration: 1.5 }, { day: "Wed", startTime: "17:15", duration: 1.5 }] }
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},

// CULTURES BASKET ================================================================================================================================================================================================================================================================================================
"COR-2407": {
    name: "Italian",
    moduleCode: "COR-2407",
    exam: { dateTime: new Date("2024-11-24")},
    description: `Italian is an elementary language course designed for beginners that focuses on intensive oral communication practice, and aims at developing basic oral expression, listening, comprehension and elementary reading and writing skills. The course will also focus on important aspects of the Italian culture. Classes are based on oral-aural communicative activities: there will be an extensive use of role-plays, class debates, individual and group quizzes and songs listening and singing.
        `,
    sections: [
        { code: "G1", professor: { name: "FRANCESCA BENVENUTI" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "12:00", duration: 1.5 }, { day: "Wed", startTime: "12:00", duration: 1.5 }] },
        { code: "G2", professor: { name: "FRANCESCA BENVENUTI" }, location: { building: "SOSS/CIS", room: "Seminar Room 3-1", level: 3 }, classes: [{ day: "Mon", startTime: "13:45", duration: 1.5 }, { day: "Wed", startTime: "13:45", duration: 1.5 }] }
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},

// CULTURES BASKET ================================================================================================================================================================================================================================================================================================
"COR-2408": {
    name: "Spanish",
    moduleCode: "COR-2408",
    exam: { dateTime: new Date("")},
    description: `It is meant to introduce the students to the learning of the Spanish language and through this, to discover other culture and ways of communicating. The Spanish taught is that from Spain but students will also be familiarized with Spanish of Latin American countries. After taking this course, the students will be able to acquire a basic knowledge of the Spanish language that will equip them to continue learning the language at higher levels later on. Learning a new language like Spanish will be very useful in your academic life if you decide to go for an exchange program with a Spanish speaking country as well as in your professional life (as Spanish is the third most spoken language in the world after English and Chinese). It will also allow you to be familiar with other cultures. 
                `,
    sections: [
        { code: "G1", professor: { name: "MARIJO ROMERO" }, location: { building: "SOSS/CIS", room: "Classroom 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "17:15", duration: 1.5 }, { day: "Wed", startTime: "17:15", duration: 1.5 }] },
        { code: "G2", professor: { name: "MARIJO ROMERO" }, location: { building: "SOSS/CIS", room: "Classroom 3-4", level: 3 }, classes: [{ day: "Mon", startTime: "15:30", duration: 1.5 }, { day: "Wed", startTime: "15:30", duration: 1.5 }] }
    ],
        coRequisite: [
        {
            or: [],
        },
        ],
        mutuallyExclusive: [],
        credit: 1,
        terms: ['Term 1'],
        preReq: {
        or: [],
        },
},
};


export async function getModule(moduleCode: ModuleCode) {
  return modules[moduleCode]!;
}
