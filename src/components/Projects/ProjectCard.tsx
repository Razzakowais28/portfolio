import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";
import type { ComponentType } from "react";

interface ProjectProps {
    title: string;
    description: string;
    technologies: string[];
    githubLink?: string;
    liveLink?: string;
    Icon: ComponentType<{ className?: string; size?: number }>;
}

export default function ProjectCard({ title, description, technologies, githubLink, liveLink, Icon }: ProjectProps) {
    return (
        <div className="group relative w-full h-full flex flex-col">
            <div className="relative flex flex-col grow bg-card text-foreground border-4 border-foreground shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-300 ease-out overflow-hidden">

                {/* Icon Header */}
                <div className="relative h-28 flex items-center justify-center bg-foreground/5 border-b-4 border-foreground select-none">
                    <Icon className="text-foreground/70" size={52} />

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 border-2 border-foreground bg-card text-foreground shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer flex items-center justify-center"
                                title="View Code"
                            >
                                <FaGithub size={16} />
                            </a>
                        )}
                        {liveLink && (
                            <a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 border-2 border-foreground bg-card text-foreground shadow-[2px_2px_0px_0px_var(--foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer flex items-center justify-center"
                                title="View Live"
                            >
                                <FiExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col grow p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-black tracking-tight mb-3 leading-snug">
                        {title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed font-medium text-sm mb-6 grow">
                        {description}
                    </p>
                    <div className="w-full border-b-2 border-dashed border-foreground/15 mt-auto mb-4" />
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
        </div>
    );
}
