import type { ModuleBank } from "@/types/banks/moduleBank";
import type { ModuleCode } from "@/types/primitives/module";

export const modules: ModuleBank = {
    'COR-STAT1202': {
        name: "Introductory Statistics",
        moduleCode: "COR1202",
        exam: {dateTime: new Date("2024-11-28")},
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
            {code: 'G1', professor: { name: 'WU ZHENGXIAO'}, location: {building: 'SCIS1', room: 'SR 2-1', level: 2}, startTime: '08:15', duration: 3}

        ],
        credit: 1,
        offeredSem: [],
        preReq: {
        or: [],
        },
    },

    'COR-IS704': {
        name: "Computational Thinking and Programming",
        moduleCode: "COR-IS704",
        exam: {dateTime: new Date("2024-12-03")},
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
            { code: 'G1', professor: { name: 'ARNE JONNI SUPPE'}, location: { building: 'SCIS1', room: 'Seminar Room 2-3', level: 2 }, startTime: '08:15', duration: 3.25 },
            { code: 'G2', professor: { name: 'ARNE JONNI SUPPE'}, location: { building: 'SCIS1', room: 'Seminar Room 2-3', level: 2 }, startTime: '15:30', duration: 3.25 },
            { code: 'G3', professor: { name: 'ARNE JONNI SUPPE'}, location: { building: 'SCIS1', room: 'Seminar Room 2-2', level: 2 }, startTime: '08:15', duration: 3.25 },
            { code: 'G4', professor: { name: 'TA NGUYEN BINH DUONG'}, location: { building: 'SCIS1', room: 'Seminar Room 3-1', level: 3 }, startTime: '08:15', duration: 3.25 },
            { code: 'G5', professor: { name: 'TA NGUYEN BINH DUONG'}, location: { building: 'SCIS1', room: 'Seminar Room 2-4', level: 2 }, startTime: '15:30', duration: 3.25 },
            { code: 'G6', professor: { name: 'TANG QIAN'}, location: { building: 'SCIS2', room: 'Seminar Room 3-9', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G7', professor: { name: 'TANG QIAN'}, location: { building: 'SCIS2', room: 'Seminar Room 3-9', level: 3 }, startTime: '15:30', duration: 3.25 },
            { code: 'G8', professor: { name: 'TANG QIAN'}, location: { building: 'SCIS1', room: 'Seminar Room 3-3', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G9', professor: { name: 'TANG QIAN'}, location: { building: 'SCIS1', room: 'Seminar Room 3-3', level: 3 }, startTime: '15:30', duration: 3.25 },
            { code: 'G10', professor: { name: 'SERENA GOH'}, location: { building: 'SCIS2', room: 'Seminar Room 3-4', level: 3 }, startTime: '15:30', duration: 3.25 },
            { code: 'G11', professor: { name: 'TONY TANG'}, location: { building: 'SCIS1', room: 'Seminar Room 3-3', level: 3 }, startTime: '08:15', duration: 3.25 },
            { code: 'G12', professor: { name: 'TONY TANG'}, location: { building: 'SCIS2', room: 'Seminar Room 2-5', level: 2 }, startTime: '15:30', duration: 3.25 },
            { code: 'G13', professor: { name: 'JOELLE ELMALEH'}, location: { building: 'SCIS2', room: 'Seminar Room 3-9', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G14', professor: { name: 'JOELLE ELMALEH'}, location: { building: 'SCIS1', room: 'Seminar Room 3-1', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G15', professor: { name: 'LOW SIOW MENG'}, location: { building: 'SCIS2', room: 'Seminar Room 3-10', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G16', professor: { name: 'GAN CHUI GOH'}, location: { building: 'SCIS2', room: 'Seminar Room 2-10', level: 2 }, startTime: '08:15', duration: 3.25 },
            { code: 'G17', professor: { name: 'ROSIE CHING'}, location: { building: 'SCIS2', room: 'Seminar Room B1-1', level: 'B-1' }, startTime: '12:00', duration: 3.25 },
            { code: 'G18', professor: { name: 'RAYMOND TEO'}, location: { building: 'SCIS2', room: 'Seminar Room 3-2', level: 3 }, startTime: '15:30', duration: 3.25 },
            { code: 'G19', professor: { name: 'JOELLE ELMALEH'}, location: { building: 'SCIS1', room: 'Seminar Room 2-9', level: 2 }, startTime: '08:15', duration: 3.25 },
            { code: 'G20', professor: { name: 'LOW SIOW MENG'}, location: { building: 'SCIS1', room: 'Seminar Room 3-1', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G21', professor: { name: 'TONY TANG'}, location: { building: 'SCIS2', room: 'Seminar Room 2-5', level: 2 }, startTime: '15:30', duration: 3.25 },
            { code: 'G22', professor: { name: 'YEO KENG LEONG'}, location: { building: 'SCIS1', room: 'Seminar Room 2-4', level: 2 }, startTime: '08:15', duration: 3.25 },
            { code: 'G23', professor: { name: 'ZHANG YAJIE'}, location: { building: 'SCIS2', room: 'Seminar Room 3-7', level: 3 }, startTime: '12:00', duration: 3.25 },
            { code: 'G24', professor: { name: 'ZHANG YAJIE'}, location: { building: 'SCIS1', room: 'Seminar Room 3-3', level: 3 }, startTime: '15:30', duration: 3.25 },
            { code: 'G25', professor: { name: 'SOMI SHIN'}, location: { building: 'SCIS2', room: 'Seminar Room B1-2', level: 'B-1' }, startTime: '08:15', duration: 3.25 },
        ],
        credit: 1,
        offeredSem: [],
        preReq: {
        or: [],
        },
    },

    COR1100: {
        name: "Writing and Reasoning",
        moduleCode: "COR1100",
        exam: {dateTime: new Date("")},
        description: `Using Problem-Based Learning strategies, the Writing and Reasoning course equips students with key communication strategies to write cogently in academic, business and professional settings. Through authentic communication problems, students will learn to clarify context, define relevant audience, determine communication goals and use appropriate genres to deliver their intended message clearly, concisely and coherently. Students will also learn to read critically, formulate a position convincingly using appropriate evidence, and convey their ideas persuasively.`,
        sections: [
            {code: 'G1', professor: { name: 'CHONG YIN TENG'}, location: {building: 'LKCSB', room: 'Classroom 3-5', level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G1', professor: { name: 'CHONG YIN TENG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G1', professor: { name: 'VINEETHA NAIR'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G2', professor: { name: 'LOKE MICHELLE'}, location: {building: 'LKCSB', room: 'Classroom 2-1',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G2', professor: { name: 'CHONG YIN TENG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G2', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G3', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G3', professor: { name: 'CHUA CHELEEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G3', professor: { name: 'CHUA CHELEEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G4', professor: { name: 'FERNANDEZ CLAUDINE JEAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G4', professor: { name: 'CHUA CHELEEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G4', professor: { name: 'CHUA CHELEEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G5', professor: { name: 'TIMOTHY CHAN'}, location: {building: 'LKCSB', room: 'Classroom 3-2',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G5', professor: { name: 'OUYANG XIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G5', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G6', professor: { name: 'TIMOTHY CHAN'}, location: {building: 'LKCSB', room: 'Classroom 3-2',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G6', professor: { name: 'OUYANG XIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G6', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '10:00', duration: 1.5},
            {code: 'G7', professor: { name: 'TIMOTHY CHAN'}, location: {building: 'LKCSB', room: 'Classroom 3-2',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G7', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G7', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '08:15', duration: 1.5},
            {code: 'G8', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '08:15', duration: 1.5},
            {code: 'G8', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '10:00', duration: 1.5},
            {code: 'G8', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G9', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G9', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '10:00', duration: 1.5},
            {code: 'G9', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G10', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G10', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '12:00', duration: 1.5},
            {code: 'G10', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G11', professor: { name: 'CLAIRE TAN LEE FANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G11', professor: { name: 'NORA SAHEER'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G11', professor: { name: 'OUYANG XIN'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G12', professor: { name: 'OUYANG XIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G12', professor: { name: 'NORA SAHEER'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G13', professor: { name: 'THANUSHA RAJ'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G13', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '13:45', duration: 1.5},
            {code: 'G13', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G14', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G14', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G14', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '10:00', duration: 1.5},
            {code: 'G15', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G15', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G15', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G16', professor: { name: 'NORA SAHEER'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G16', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G16', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G17', professor: { name: 'NORA SAHEER'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G17', professor: { name: 'TIMOTHY CHAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G17', professor: { name: 'VIDHYA LOGENDRAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G18', professor: { name: 'NORA SAHEER'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '08:15', duration: 1.5},
            {code: 'G18', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G18', professor: { name: 'LIN XIUXIA'}, location: {building: 'LKCSB', room: 'Classroom 3-4',level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G19', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G19', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G19', professor: { name: 'CHONG YIN TENG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G20', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3', level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G20', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '17:15', duration: 1.5},
            {code: 'G20', professor: { name: 'JUSTYN OLBY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '12:00', duration: 1.5},
            {code: 'G13', professor: { name: 'THANUSHA RAJ'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2', level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G13', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '13:45', duration: 1.5},
            {code: 'G13', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G14', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2', level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G14', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G14', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '10:00', duration: 1.5},
            {code: 'G15', professor: { name: 'JULYN KANG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2', level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G15', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'LKCSB', room: 'Classroom 3-5', level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G15', professor: { name: 'CHAN TSU AI IVY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G16', professor: { name: 'NORA SAHEER'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1', level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G16', professor: { name: 'TAN CHIA MIEN'}, location: {building: 'LKCSB', room: 'Classroom 3-5', level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G16', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3', level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G17', professor: { name: 'NORA SAHEER'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1', level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G17', professor: { name: 'TIMOTHY CHAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G17', professor: { name: 'VIDHYA LOGENDRAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3', level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G18', professor: { name: 'NORA SAHEER'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2', level: 2}, startTime: '08:15', duration: 1.5},
            {code: 'G18', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G18', professor: { name: 'LIN XIUXIA'}, location: {building: 'LKCSB', room: 'Classroom 3-4', level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G19', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3', level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G19', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G19', professor: { name: 'CHONG YIN TENG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2', level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G20', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3', level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G20', professor: { name: 'VINEETHA NAIR'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '17:15', duration: 1.5},
            {code: 'G20', professor: { name: 'JUSTYN OLBY'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3', level: 4}, startTime: '12:00', duration: 1.5}
            {code: 'G29', professor: { name: 'ESTHER SONG YIK SAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G29', professor: { name: 'GRACE THAM WEI PING'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G29', professor: { name: 'CHEW PING LIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G30', professor: { name: 'MABEL TAN CHAI LIN'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G30', professor: { name: 'GRACE THAM WEI PING'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G30', professor: { name: 'GRACE THAM WEI PING'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G31', professor: { name: 'MABEL TAN CHAI LIN'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G31', professor: { name: 'LEE SIEW YAN AGNES'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '12:00', duration: 1.5},
            {code: 'G31', professor: { name: 'LIU KOOI LIN EVELYN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2,}, startTime: '12:00', duration: 1.5},
            {code: 'G32', professor: { name: 'LEE SIEW YAN AGNES'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '08:15', duration: 1.5},
            {code: 'G32', professor: { name: 'LEE SIEW YAN AGNES'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G32', professor: { name: 'LIU KOOI LIN EVELYN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '13:45', duration: 1.5},
            {code: 'G33', professor: { name: 'LEE SIEW YAN AGNES'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '10:00', duration: 1.5},
            {code: 'G33', professor: { name: 'LIU KOOI LIN EVELYN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G33', professor: { name: 'LEE SIEW YAN AGNES'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '12:00', duration: 1.5},
            {code: 'G34', professor: { name: 'LIM SEE CHEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '12:00', duration: 1.5},
            {code: 'G34', professor: { name: 'LIU KOOI LIN EVELYN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G34', professor: { name: 'LEE SIEW YAN AGNES'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '13:45', duration: 1.5},
            {code: 'G35', professor: { name: 'OUYANG XIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '13:45', duration: 1.5},
            {code: 'G35', professor: { name: 'LOW BEE HONG'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '13:45', duration: 1.5},
            {code: 'G35', professor: { name: 'LING CHIA YEN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G36', professor: { name: 'OUYANG XIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '15:30', duration: 1.5},
            {code: 'G36', professor: { name: 'VIDHYA LOGENDRAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G36', professor: { name: 'LING CHIA YEN'}, location: {building: 'LKCSB', room: 'Classroom 3-2',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G37', professor: { name: 'PHOEBE SEOW SU KIAN'}, location: {building: 'LKCSB', room: 'Classroom 3-2',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G37', professor: { name: 'PHOEBE SEOW SU KIAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '10:00', duration: 1.5},
            {code: 'G37', professor: { name: 'VIDHYA LOGENDRAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G38', professor: { name: 'PHOEBE SEOW SU KIAN'}, location: {building: 'LKCSB', room: 'Classroom 3-2',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G38', professor: { name: 'ESTHER SONG YIK SAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '10:00', duration: 1.5},
            {code: 'G38', professor: { name: 'CHEW PING LIN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G39', professor: { name: 'ESTHER SONG YIK SAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 4-3',level: 4}, startTime: '12:00', duration: 1.5},
            {code: 'G39', professor: { name: 'GRACE THAM WEI PING'}, location: {building: 'SOE/SCIS2', room: 'Classroom 3-3',level: 3}, startTime: '15:30', duration: 1.5},
            {code: 'G39', professor: { name: 'CHEW PING LIN'}, location: {building: 'LKCSB', room: 'Classroom 3-4',level: 3}, startTime: '12:00', duration: 1.5},
            {code: 'G40', professor: { name: 'FERNANDEZ CLAUDINE JEAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-2',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G40', professor: { name: 'ESTHER SONG YIK SAN'}, location: {building: 'SOE/SCIS2', room: 'Classroom 2-1',level: 2}, startTime: '15:30', duration: 1.5},
            {code: 'G41', professor: { name: 'LIN XIUXIA'}, location: {building: 'LKCSB', room: 'Classroom 3-4',level: 3}, startTime: '13:45', duration: 1.5},
            {code: 'G58', professor: { name: 'CHONG YIN TENG'}, location: {building: 'LKCSB', room: 'Classroom 3-5',level: 3}, startTime: '10:00', duration: 1.5},
        ],
        credit: 1,
        offeredSem: [],
        preReq: {
        or: [],
        },
    },

    COR704: {
    name: "Web Application Development I",
    moduleCode: "COR704",
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

export async function getModule(moduleCode: ModuleCode) {
  return modules[moduleCode]!;
}
