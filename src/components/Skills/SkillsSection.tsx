import { Expressjs, JavaScript, Python, 
    Git, MongoDB, PostgreSQL, Postman, MySQL,
    React, Nodejs, GitHub, HTML5, CSS, Flask, Docker } from "../ui/DevIcons"
import SkillCard from "./SkillCard"
import FadeIn from "../ui/FadeIn"

const categories = [
    { 
        title: "Languages", 
        skills: [
            { name: "JavaScript", Icon: JavaScript },
            { name: "Python", Icon: Python }
        ] 
    },
    { 
        title: "Frontend", 
        skills: [
            { name: "HTML5", Icon: HTML5 },
            { name: "CSS", Icon: CSS },
            { name: "React.js", Icon: React },
            { name: "WordPress" },
        ]  
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", Icon: Nodejs },
            { name: "Express.js", Icon: Expressjs },
            { name: "Flask", Icon: Flask },
            { name: "REST APIs" },
        ]
    },
    {
        title: "Database",
        skills: [
            { name: "PostgreSQL", Icon: PostgreSQL },
            { name: "MongoDB", Icon: MongoDB },
            { name: "MySQL", Icon: MySQL },
        ]
    },
    {
        title: "Integration",
        skills: [
            { name: "Power Automate" },
            { name: "SharePoint" },
            { name: "Microsoft Azure" },
            { name: "NetSuite" },
            { name: "Power Platform" },
            { name: "Webhooks" },
        ]
    },
    {
        title: "Tools & DevOps",
        skills: [
            { name: "Git", Icon: Git },
            { name: "GitHub", Icon: GitHub },
            { name: "GitHub Actions", Icon: GitHub },
            { name: "Docker", Icon: Docker },
            { name: "Postman", Icon: Postman },
            { name: "CI/CD" },
        ]
    },
]

export default function Skills() {
    return (
        <section id="skills" className="md:py-24 py-12 w-full border-b-4 border-foreground">
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-20"> 
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">My Tech Stack</h2>
                        <div className="w-20 h-2 bg-foreground mx-auto mt-3" />
                        <p className="text-muted-foreground text-md sm:text-lg mt-4 font-medium">Technologies and tools I use to build, automate, and integrate systems.</p>
                    </div>
                </FadeIn>

                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 mb-12 border-b-2 border-dashed border-foreground/15 pb-8 last:border-b-0 last:pb-0">
                        {/* Category Left Header Block */}
                        <div className="w-full md:w-1/4 shrink-0 flex items-center md:items-start">
                            <FadeIn delay={index * 0.1}>
                                <div className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 border-3 border-foreground shadow-[3px_3px_0px_var(--foreground)] font-mono text-sm sm:text-base font-black uppercase tracking-wider select-none">
                                    {category.title}
                                </div>
                            </FadeIn>
                        </div>

                        {/* Category Skills Grid Box */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:flex xl:flex-wrap gap-4 w-full justify-start items-center">
                            {category.skills.map((skill, idx) => (
                                <FadeIn key={idx} delay={(index * 0.1) + (idx * 0.05)} className="w-full xl:w-auto">
                                    <SkillCard {...skill} />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
