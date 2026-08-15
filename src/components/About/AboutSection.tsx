import EducationCard from "../About/EducationCard";
import FadeIn from "../ui/FadeIn";
import { Link } from "react-scroll";
import { FaBuilding, FaDatabase } from "react-icons/fa";

const workCategories = [
    { label: "Enterprise Solutions", count: 13, Icon: FaBuilding },
    { label: "NetSuite Projects", count: 5, Icon: FaDatabase },
];

const educationJourney = [
    {
        year: "2018 — 2022",
        title: "Computer Science & Engineering",
        institution: {
            name: "Jawaharlal Nehru Technological University",
            link: "https://www.jntuh.ac.in/",
            tooltipDescription: "One of India's leading technical universities, renowned for producing skilled engineers and technology professionals."
        },
        degree: "Bachelor of Technology in Computer Science and Engineering",
        achievements: {
            honors: [
                {
                    name: "GPA: 82%",
                    years: "Graduating Class",
                    tooltipDescription: "Graduated with a strong academic record, demonstrating consistent performance throughout the program."
                }
            ]
        },
        description: "Built a strong foundation in software engineering, algorithms, databases, and web development while developing practical programming skills."
    },
    {
        year: "2022 — 2023",
        title: "Front-End Development",
        degree: "Entering the Industry",
        description: "Began professional career as a Front-End Developer at Interny Internships, building responsive web pages and implementing UI components for student-facing platforms."
    },
    {
        year: "2023 — Present",
        title: "Full-Stack & Systems Developer",
        degree: "Building & Automating at Scale",
        description: "Progressed through Full-Stack development at Winmount Services to a broader Software Developer role at Specialized Industrial Services, automating workflows and integrating enterprise systems."
    }
];

const quickStats = [
    { value: "4+", label: "Years of Experience", accent: "text-foreground" },
    { value: "10+", label: "Projects Delivered", accent: "text-foreground" },
    { value: "3", label: "Companies Worked At", accent: "text-foreground" },
];

export default function About() {
  return (
    <section id="about" className="md:py-24 py-12 w-full border-b-4 border-foreground">
      {/* About Me Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">
              About Me
            </h2>
            <div className="w-16 h-2 bg-foreground mx-auto mt-3" />
          </div>
        </FadeIn>
        
        <div className="flex justify-center">
          <FadeIn delay={0.2} className="w-full max-w-3xl">
            <div className="flex flex-col gap-6 text-left text-foreground bg-card border-4 border-foreground p-6 sm:p-10 shadow-[8px_8px_0px_0px_var(--foreground)]">
              <p className="text-lg leading-relaxed font-medium text-justify">
                Full-Stack Developer specializing in <span className="underline underline-offset-4 decoration-2 decoration-foreground font-bold">React, Node.js, and workflow automation</span>. I design and build scalable, production-ready software solutions that simplify complex business processes and improve operational efficiency.
              </p>
              <p className="text-lg leading-relaxed font-medium text-justify">
                My experience includes developing internal portals, dashboards, approval systems, data-driven applications, and automated workflows. I focus on creating clean, responsive interfaces, reliable backend services, secure integrations, and maintainable software that solves real business challenges.
              </p>

              {/* Quick Stats - Updated with Neubrutalist boxes */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-6 border-t-4 border-foreground">
                {quickStats.map((stat, i) => (
                  <div key={i} className="text-center bg-background border-2 border-foreground p-3 shadow-[3px_3px_0px_0px_var(--foreground)]">
                    <div className={`text-xl sm:text-2xl font-black ${stat.accent}`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-tight text-muted-foreground mt-1.5 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* My Work Tiles */}
        <FadeIn delay={0.3}>
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs font-black tracking-wider uppercase bg-foreground text-background px-3 py-1.5 border-2 border-foreground select-none">
                My Work
              </span>
              <div className="flex-1 h-0.5 bg-foreground/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {workCategories.map((cat, i) => (
                <Link
                  key={i}
                  to="projects"
                  smooth={true}
                  duration={600}
                  offset={-64}
                  className="cursor-pointer group flex items-center gap-4 bg-card border-4 border-foreground px-5 py-4 shadow-[4px_4px_0px_0px_var(--foreground)] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_var(--foreground)] hover:bg-foreground hover:text-background transition-all duration-200 select-none"
                >
                  <cat.Icon size={22} className="shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-mono font-black text-sm uppercase tracking-wide leading-tight">{cat.label}</span>
                    <span className="font-mono text-xs font-bold opacity-60">{cat.count} projects</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Education Journey Section */}
      <div className="max-w-4xl mx-auto mt-28 px-6 sm:px-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
              My Journey
            </span>
            <h2 className="text-4xl font-black text-foreground mb-4 uppercase">Education & Growth</h2>
            <div className="w-24 h-1.5 bg-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-md sm:text-lg max-w-2xl mx-auto font-medium">
              From university studies to enterprise systems — a journey shaped by curiosity, practical problem-solving, and continuous growth.
            </p>
          </div>
        </FadeIn>
        
        {/* Timeline (Refactored to be thick, solid, and left-aligned for maximum card width) */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-foreground" />
          
          <div className="space-y-10 md:space-y-14">
            {educationJourney.map((edu, index) => (
              <FadeIn 
                key={index} 
                delay={index * 0.2}
                direction="right"
              >
                <div className="relative flex items-start">
                  {/* Robust Black Circle Marker */}
                  <div className="absolute left-4 sm:left-6 w-6 h-6 rounded-full bg-background border-4 border-foreground transform -translate-x-1/2 mt-8 z-10 shadow-[2px_2px_0px_var(--foreground)]" />
                  
                  <div className="w-full ml-10 sm:ml-14">
                    <EducationCard {...edu} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
