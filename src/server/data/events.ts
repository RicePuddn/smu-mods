import type { Event } from "@/types/primitives/event";

export const eventsData: Record<string, Event[]> = {
  clubs: [
    {
      name: "Ellipsis",
      title: "SCIS Day",
      description:
        "SMU Computing & Information Systems Society, affectionately known as Ellipsis, is the student representative body of the School of Computing & Information Systems (SCIS).",
      date: "20 October",
      time: "12PM to 4PM",
      venue: "SMU Underground",
    },
    {
      name: "Business Intelligence & Analytics",
      title: "DAP Workshop",
      description:
        "SMUBIA provides a space for connecting students, alumni and institutions who are passionate about data analytics and business intelligence. As we integrate ourselves into the Information Age, data analytics has become an indispensable tool in our lives.",
      date: "21 October",
      time: "12PM to 4PM",
      venue: "SR 4-2",
    },
    {
      name: ".Hack",
      title: "HEAP",
      description:
        "SMU .Hack is a special interest group with a deep passion for tech, with a strong focus on software engineering and web development. With many new technologies, the bread and butter for human interaction with the digital world lies in well built, robust and scalable software systems, many of which reside on the web. Exploring the limits of software development can be daunting, therefore at SMU .Hack, we come together as a community of like-minded tech enthusiasts, sharing our experiences and knowledge as a tightly knitted group.",
      date: "30 November",
      time: "12PM to 4PM",
      venue: "B1 Computer Labs",
    },
    {
      name: "The Mentoring Circle",
      title: "Networking Night",
      description: `At The Mentoring Circle (TMC), we aim to transform outstanding individuals into strong people builders. Founded on the principles of giving and professional excellence, our club envisions an SMU where future generations are consistently better than the last. In each circle, each mentee will be able to grow under the guidance of a mentor, seeking advice in areas such as academics and career. This mentorship journey will be the start of a long lasting and symbiotic friendship, where both the mentor and mentee will learn together. Mentees and mentors will also have the opportunity to interact with other members from the Circle and as well as our alumni. With each Circle, our mentoring reach expands and new bonds are formed. We hope that through this endeavour, SMU can become a nexus for mentorship. The Mentoring Circle is proudly supported by the SMU Office of Alumni Relations.`,
      date: "20 October",
      time: "12PM to 4PM",
      venue: "SMU Underground",
    },
    {
      name: "SMU's Indian Cultural Society",
      title: "Alumni Networking Night",
      description:
        "SMU's Indian Cultural Society presents a chance to connect with its accomplished alumni across various sectors, including Finance, Consulting, Operations, Information Technology, Human Resources, and Accounting.",
      date: "19 October",
      time: "4PM - 6PM",
      venue: "SOL SR 2-4",
    },
  ],
  csp: [
    {
      name: "Project Moolah",
      title: "Recruitment Drive",
      description: `Financial Literacy for Secondary School Students`,
      date: "20 October",
      time: "12PM to 4PM",
      venue: "SMU Underground",
    },
    {
      name: "Project Luminaire",
      title: "CSP for Vietnam",
      description: "Look out for the kids",
      date: "19 October",
      time: "4PM - 6PM",
      venue: "SOL SR 2-4",
    },
  ],
  others: [
    {
      name: "Global Innovation Immersion ",
      title: "Early Bird Application",
      description: `securing an internship of a lifetime PLUS an eye-opening sponsored trip to the hottest innovation hubs in China or Southeast Asia!`,
      date: "20 October",
      time: "12PM to 4PM",
      venue: "SMU Underground",
    },
    {
      name: "Overseas Exchange Student Programme",
      title: "Applications",
      description: "Sign up for SMU's Overseas Exchange Programme",
      date: "19 October",
      time: "4PM - 6PM",
      venue: "SOL SR 2-4",
    },
  ],
};
