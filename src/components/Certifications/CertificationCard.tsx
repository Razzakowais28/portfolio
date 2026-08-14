import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";

interface CertificationCardProps {
    title: string;
    issuer: string;
    year: string;
    description: string;
    image: string;
    credentialUrl?: string;
    credentialId?: string;
}

export default function CertificationCard({ title, issuer, year, description, image, credentialUrl, credentialId }: CertificationCardProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (!isFullscreen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFullscreen(false);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFullscreen]);

    return (
        <>
            <div className="relative flex flex-col lg:flex-row w-full bg-card text-foreground rounded-none border-4 border-foreground shadow-[8px_8px_0px_0px_var(--foreground)] overflow-hidden">
                <div className="relative w-full lg:w-[55%] bg-background border-b-4 lg:border-b-0 lg:border-r-4 border-foreground shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsFullscreen(true)}
                        aria-label={`View ${title} certificate in full screen`}
                        className="group relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/30"
                    >
                        <div className="aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[340px]">
                            <img
                                src={image}
                                alt={`${title} certificate`}
                                className="w-full h-full object-contain object-center bg-background p-2 sm:p-3 transition-transform duration-200 group-hover:scale-[1.02]"
                            />
                        </div>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-black uppercase tracking-wide bg-foreground text-background px-2.5 py-1.5 border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                            <Maximize2 size={14} strokeWidth={2.75} aria-hidden="true" />
                            Full screen
                        </span>
                    </button>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3 mb-5">
                        <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase bg-foreground text-background px-2.5 py-1 border-2 border-foreground select-none">
                            Certified
                        </span>
                        <span className="font-mono text-xs font-black tracking-widest uppercase bg-foreground/10 px-2 py-1 border-2 border-foreground select-none shrink-0">
                            {year}
                        </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug mb-2">
                        {title}
                    </h3>

                    <p className="font-mono text-sm sm:text-base font-black uppercase text-foreground/80 mb-5 select-none">
                        {issuer}
                    </p>

                    <div className="w-full h-1 bg-foreground/10 mb-5" />

                    <p className="text-foreground/80 leading-relaxed font-medium text-md flex-1">
                        {description}
                    </p>

                    {(credentialUrl || credentialId) && (
                        <>
                            <div className="w-full h-0.5 border-b-2 border-dashed border-foreground/15 my-5" />
                            <div className="flex flex-col gap-3">
                                {credentialId && (
                                    <p className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wide text-muted-foreground break-all">
                                        ID: {credentialId}
                                    </p>
                                )}
                                {credentialUrl && (
                                    <a
                                        href={credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 self-start font-mono text-xs font-black uppercase tracking-wide bg-background border-2 border-foreground px-3 py-2 shadow-[3px_3px_0px_0px_var(--foreground)] hover:bg-foreground hover:text-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all"
                                    >
                                        View Credential
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M15 3h6v6" />
                                            <path d="M10 14 21 3" />
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} certificate full screen view`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm"
                        onClick={() => setIsFullscreen(false)}
                    >
                        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b-4 border-foreground bg-card shrink-0">
                            <div className="min-w-0">
                                <p className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground truncate">
                                    {issuer} · {year}
                                </p>
                                <h4 className="text-sm sm:text-base font-black tracking-tight truncate">
                                    {title}
                                </h4>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsFullscreen(false)}
                                aria-label="Close full screen certificate view"
                                className="inline-flex items-center justify-center size-11 sm:size-12 border-3 border-foreground bg-card text-foreground shadow-[4px_4px_0px_0px_var(--foreground)] hover:bg-foreground hover:text-background hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_var(--foreground)] active:translate-x-0 active:translate-y-0 active:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all cursor-pointer shrink-0"
                            >
                                <X size={22} strokeWidth={2.75} />
                            </button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="flex flex-1 items-center justify-center p-4 sm:p-8 min-h-0"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <img
                                src={image}
                                alt={`${title} certificate`}
                                className="max-h-full max-w-full object-contain border-4 border-foreground shadow-[8px_8px_0px_0px_var(--foreground)] bg-background"
                            />
                        </motion.div>

                        <p className="px-4 sm:px-6 py-3 text-center font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground border-t-4 border-foreground bg-card shrink-0 select-none">
                            Press Esc or click outside to close
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
