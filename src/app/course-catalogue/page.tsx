"use client"

import ModuleDetails from "@/components/ModuleDetails"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import './ModuleCatalogue.css'

const modules = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    credits: 4,
    semester: "Fall",
    description: "Fundamental concepts of programming and computer science. Topics include algorithm design, problem-solving strategies, data structures, and an introduction to object-oriented programming. Students will gain hands-on experience with coding and software development practices."
  },
  {
    code: "MATH201",
    name: "Linear Algebra",
    credits: 3,
    semester: "Spring",
    description: "Study of linear equations, matrices, and vector spaces. This course covers systems of linear equations, matrix operations, determinants, vector spaces and subspaces, eigenvalues and eigenvectors, and their applications in various fields of science and engineering."
  },
  {
    code: "ENG102",
    name: "Academic Writing",
    credits: 3,
    semester: "Fall",
    description: "Developing critical thinking and writing skills for academic purposes. Students will learn to construct effective arguments, analyze texts, and write research papers. The course emphasizes clarity, coherence, and proper citation practices in academic writing."
  },
  {
    code: "PHYS205",
    name: "Modern Physics",
    credits: 4,
    semester: "Spring",
    description: "Introduction to quantum mechanics and special relativity. This course explores the fundamental principles of modern physics, including wave-particle duality, the Schrödinger equation, and the consequences of Einstein's theory of relativity."
  },
  {
    code: "BIO110",
    name: "Principles of Biology",
    credits: 4,
    semester: "Fall",
    description: "Exploration of fundamental biological concepts and processes. Topics include cell structure and function, genetics, evolution, and ecology. The course includes both lecture and laboratory components to provide a comprehensive understanding of biological systems."
  },
  {
    code: "CHEM202",
    name: "Organic Chemistry",
    credits: 4,
    semester: "Spring",
    description: "Study of structure, properties, and reactions of organic compounds. This course covers nomenclature, stereochemistry, reaction mechanisms, and synthesis of organic molecules. Laboratory work includes techniques for synthesis, purification, and characterization of organic compounds."
  },
  {
    code: "STAT150",
    name: "Introduction to Statistics",
    credits: 3,
    semester: "Fall",
    description: "Fundamentals of statistical concepts and methods. Topics include descriptive statistics, probability, inferential statistics, hypothesis testing, and regression analysis. The course emphasizes practical applications of statistics in various fields."
  },
  {
    code: "HIST101",
    name: "World History",
    credits: 3,
    semester: "Spring",
    description: "A survey of major historical events, movements, and figures that have shaped the world. The course covers ancient civilizations, medieval history, and modern global developments, encouraging critical analysis of historical sources."
  },
  {
    code: "ART205",
    name: "Art History",
    credits: 3,
    semester: "Fall",
    description: "Exploration of major art movements and works from various cultures throughout history. Students will analyze styles, techniques, and cultural significance, enhancing their appreciation of visual arts."
  },
  {
    code: "PSYCH110",
    name: "Introduction to Psychology",
    credits: 3,
    semester: "Spring",
    description: "Overview of psychological principles and theories. Topics include human behavior, cognitive processes, development, and social influences. The course aims to provide insights into the complexities of the human mind."
  },
  {
    code: "ECON201",
    name: "Microeconomics",
    credits: 3,
    semester: "Fall",
    description: "Study of individual economic agents and their interactions in markets. Topics include supply and demand, market structures, consumer behavior, and the role of government in the economy."
  },
  {
    code: "PHIL102",
    name: "Introduction to Philosophy",
    credits: 3,
    semester: "Spring",
    description: "Examination of fundamental philosophical questions and concepts. Students will engage with topics such as ethics, metaphysics, epistemology, and the philosophy of mind, fostering critical thinking skills."
  }
];

// // search bar



// Helper function to truncate text
const CourseCatalogue = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim();
}

export default function ModuleCatalogue() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
  
    

    // module cards
    <div className="container mx-auto px-4 py-8" >
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2" style={{color: '#F4F1E9'}}>Module Catalogue</h1>
        <p className="text-muted-foreground" style={{color: '#F4F1E9'}}>Explore our diverse range of academic offerings</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleDetails moduleCode={'IS216'}>
          <Card key={module.code} className="transition-shadow hover:shadow-lg" style={{backgroundColor:'#F4F1E9'}}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{module.name}</span>
                <span className="text-sm font-normal text-muted-foreground">{module.code}</span>
              </CardTitle>
              <CardDescription>
                {module.credits} credits | {module.semester} semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <Dialog open={openModal === module.code} onOpenChange={() => setOpenModal(null)}>
                <DialogTrigger asChild>
                  <p 
                    className="text-sm text-muted-foreground cursor-pointer"
                    onClick={() => setOpenModal(module.code)}
                  >
                    {CourseCatalogue(module.description, 100)}
                    <span className="text-primary font-semibold"> ...</span>
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{module.name} ({module.code})</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground mt-2">{module.description}</p>
                </DialogContent>
              </Dialog> */}
            </CardContent>
          </Card>
          </ModuleDetails>
        ))}
      </div>
    </div>
  )
}