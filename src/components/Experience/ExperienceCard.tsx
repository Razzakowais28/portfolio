interface ExperienceProps {
    role: string;
    company: string;
    companyLink?: string;
    duration: string;
    description: string;
    technologies: string[];
    projectLink?: string;
}

export default function ExperienceCard({ role, company, companyLink, duration, description, technologies, projectLink }: ExperienceProps) {
    return (
        <div className="group relative w-full">
            {/* Neubrutalist Experience Box */}
            <div className="relative bg-card text-foreground p-6 sm:p-8 rounded-none border-4 border-foreground shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-300 ease-out">
                
                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                            {role}
                        </h3>
                        {projectLink && (
                            <a 
                                href={projectLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-foreground hover:bg-foreground hover:text-background p-1 border-2 border-transparent hover:border-foreground transition-all"
                                title="View Project"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                            </a>
                        )}
                    </div>
                    <span className="font-mono text-xs font-black tracking-widest uppercase bg-foreground/10 px-2 py-1 border-2 border-foreground select-none self-start sm:self-center">
                        {duration}
                    </span>
                </div>

                {/* Company Label */}
                <div className="font-mono text-sm sm:text-base font-black uppercase text-foreground/80 mb-4 select-none">
                    {companyLink ? (
                        <a href={companyLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 hover:bg-foreground hover:text-background px-1 transition-all">
                            {company}
                        </a>
                    ) : (
                        company
                    )}
                </div>

                <div className="w-full h-1 bg-foreground/10 my-3" />

                {/* Description Paragraph */}
                <p className="text-foreground/80 leading-relaxed font-medium text-md">
                    {description}
                </p>

                {/* Horizontal blueprint line separator */}
                <div className="w-full h-0.5 border-b-2 border-dashed border-foreground/15 my-5" />

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <span 
                            key={index} 
                            className="px-2.5 py-1 text-xs font-mono font-black uppercase bg-background border-2 border-foreground hover:bg-foreground hover:text-background transition-colors select-none"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
