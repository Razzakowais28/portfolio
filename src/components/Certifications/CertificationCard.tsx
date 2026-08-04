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
    return (
        <div className="relative flex flex-col lg:flex-row w-full bg-card text-foreground rounded-none border-4 border-foreground shadow-[8px_8px_0px_0px_var(--foreground)] overflow-hidden">
            <div className="relative w-full lg:w-[55%] bg-background border-b-4 lg:border-b-0 lg:border-r-4 border-foreground shrink-0">
                <div className="aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[340px]">
                    <img
                        src={image}
                        alt={`${title} certificate`}
                        className="w-full h-full object-contain object-center bg-background p-2 sm:p-3"
                    />
                </div>
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
    );
}
