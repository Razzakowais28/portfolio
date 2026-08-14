import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CertificationCard from "./CertificationCard";
import FadeIn from "../ui/FadeIn";

const base = import.meta.env.BASE_URL;

const certifications = [
    {
        title: "NetSuite Certified AI Foundations Associate",
        issuer: "Oracle NetSuite",
        year: "Aug 2026",
        description: "Earned the NetSuite Certified AI Foundations Associate designation, validating foundational knowledge of artificial intelligence concepts and their application across the NetSuite ecosystem.",
        image: `${base}certifications/netsuite-ai-foundations-associate.png?v=20260815-name-fix`,
        credentialUrl: `${base}certifications/netsuite-ai-foundations-associate.pdf?v=20260815-name-fix`,
        credentialId: "330585144N16765GC10",
    },
    {
        title: "AI Training Hackathon",
        issuer: "KANZ AI · LAU ACE",
        year: "Jul 2026",
        description: "Certificate of Course Participation for successfully completing the AI Training Hackathon, demonstrating foundational proficiency in Artificial Intelligence. Issued in collaboration with LAU Academy of Continuing Education and the Ministry of Human Resources and Social Development (Saudi Arabia).",
        image: `${base}certifications/kanz-ai-hackathon.png`,
        credentialId: "KANZ-ATT-8D2E73B2C2",
    },
    {
        title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle University",
        year: "Aug 2025",
        description: "Oracle Certified Foundations Associate recognition for OCI AI Foundations — covering core AI concepts on Oracle Cloud Infrastructure. Credential ID: 102175838OCI25AICFA.",
        image: `${base}certifications/oracle-oci-ai-foundations.jpg`,
        credentialId: "102175838OCI25AICFA",
    },
    {
        title: "Artificial Intelligence Fundamentals",
        issuer: "IBM SkillsBuild",
        year: "Jul 2025",
        description: "Completed IBM SkillsBuild Artificial Intelligence Fundamentals, covering foundational AI concepts, applications, and professional readiness for AI-driven work.",
        image: `${base}certifications/ibm-ai-fundamentals.jpg`,
        credentialUrl: "https://www.credly.com/badges/0d679776-b245-4666-a521-57f36afcaff4",
    },
];

export default function Certifications() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const goTo = (nextIndex: number, dir: number) => {
        setDirection(dir);
        setActiveIndex((nextIndex + certifications.length) % certifications.length);
    };

    const goPrev = () => goTo(activeIndex - 1, -1);
    const goNext = () => goTo(activeIndex + 1, 1);

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 80 : -80,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -80 : 80,
            opacity: 0,
        }),
    };

    return (
        <section id="certifications" className="md:py-24 py-12 w-full border-b-4 border-foreground">
            <div className="max-w-5xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            Credentials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono">
                            Certifications
                        </h2>
                        <div className="w-20 h-2 bg-foreground mx-auto mt-3 mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            Professional credentials that back the tools and platforms I build with every day.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div className="relative">
                        <div className="relative overflow-hidden min-h-[420px] sm:min-h-[380px]">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                >
                                    <CertificationCard {...certifications[activeIndex]} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-8">
                            <button
                                type="button"
                                onClick={goPrev}
                                aria-label="Previous certification"
                                className="inline-flex items-center justify-center size-12 border-3 border-foreground bg-card text-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:bg-foreground hover:text-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-pointer"
                            >
                                <ChevronLeft size={26} strokeWidth={2.75} />
                            </button>

                            <div className="flex items-center gap-2" role="tablist" aria-label="Certification slides">
                                {certifications.map((cert, index) => (
                                    <button
                                        key={cert.title}
                                        type="button"
                                        role="tab"
                                        aria-selected={index === activeIndex}
                                        aria-label={`Show ${cert.title}`}
                                        onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                                        className={`h-3 border-2 border-foreground transition-all cursor-pointer ${
                                            index === activeIndex
                                                ? "w-8 bg-foreground shadow-[2px_2px_0px_0px_var(--foreground)]"
                                                : "w-3 bg-card hover:bg-foreground/20"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={goNext}
                                aria-label="Next certification"
                                className="inline-flex items-center justify-center size-12 border-3 border-foreground bg-card text-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:bg-foreground hover:text-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-pointer"
                            >
                                <ChevronRight size={26} strokeWidth={2.75} />
                            </button>
                        </div>

                        <p className="mt-4 text-center font-mono text-xs font-black uppercase tracking-widest text-muted-foreground select-none">
                            {activeIndex + 1} / {certifications.length}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
