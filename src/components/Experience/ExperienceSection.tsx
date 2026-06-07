import ExperienceCard from "./ExperienceCard";
import FadeIn from "../ui/FadeIn";

const experiences = [
    {
        role: "Software Developer / Content Developer",
        company: "Specialized Industrial Services Co. LTD",
        duration: "Oct 2024 — Present",
        description: "Contributing to major digital transformation initiatives by developing internal portals, forms, and approval systems across HR, Finance, Procurement, and IT departments. Designing and refining automated workflows using Power Automate, Teams, SharePoint, and NetSuite integrations. Improving UI/UX of internal applications and producing training manuals and documentation to drive employee adoption of new systems.",
        technologies: ["Power Automate", "SharePoint", "NetSuite", "Microsoft Teams", "Azure", "HTML/CSS", "JavaScript"],
    },
    {
        role: "Full Stack Developer",
        company: "Winmount Services",
        duration: "May 2023 — Aug 2024",
        description: "Developed and maintained full-stack applications with front-end and back-end components. Designed RESTful API endpoints, data models, and server-side logic to support business processes. Implemented authentication, dashboards, and workflow features for internal users. Integrated external APIs to automate tasks and enhance system functionality.",
        technologies: ["React", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "Git"],
    },
    {
        role: "Front-End Developer",
        company: "Interny Internships",
        duration: "Mar 2022 — Apr 2023",
        description: "Built responsive web pages using HTML, CSS, and JavaScript for student-facing platforms. Implemented UI components, forms, and interactive elements to improve usability. Ensured cross-browser compatibility and mobile responsiveness. Collaborated with designers to convert mockups into functional web pages.",
        technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="md:py-24 py-12 w-full border-b-4 border-foreground">
            <div className="max-w-4xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            My Path
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">Experience</h2>
                        <div className="w-16 h-2 bg-foreground mx-auto mt-3 mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            My professional journey and the technical milestones I've achieved along the way.
                        </p>
                    </div>
                </FadeIn>
                
                {/* Timeline Layout with Single Left Vertical Robust Line */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Continuous Vertical Timeline Track */}
                    <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-1 bg-foreground" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <FadeIn key={index} delay={index * 0.2}>
                                <div className="relative flex items-start">
                                    {/* Robust Solid Timeline Circle Marker */}
                                    <div className="absolute left-4 sm:left-6 w-6 h-6 rounded-full bg-background border-4 border-foreground transform -translate-x-1/2 top-8 z-10 shadow-[2px_2px_0px_var(--foreground)]" />
                                    
                                    {/* Experience Card Wrapper */}
                                    <div className="w-full ml-10 sm:ml-14">
                                        <ExperienceCard 
                                            {...exp}
                                        />
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
