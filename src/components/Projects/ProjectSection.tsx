import ProjectCard from "./ProjectCard";
import FadeIn from "../ui/FadeIn";
import {
    MdHub, MdBadge, MdQrCode2, MdBusiness, MdReceipt,
    MdPeopleAlt, MdSpaceDashboard, MdSecurity, MdMail,
    MdVpnKey, MdMonitor, MdFingerprint,
    MdFactCheck, MdSync, MdDns, MdPictureAsPdf, MdBarChart,
} from "react-icons/md";
import { FaWordpress, FaBuilding, FaDatabase } from "react-icons/fa";
import type { ComponentType } from "react";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubLink?: string;
    liveLink?: string;
    Icon: ComponentType<{ className?: string; size?: number }>;
}

interface ProjectGroup {
    category: string;
    CategoryIcon: ComponentType<{ className?: string; size?: number }>;
    projects: Project[];
}

const projectGroups: ProjectGroup[] = [
    {
        category: "Enterprise Solutions",
        CategoryIcon: FaBuilding,
        projects: [
            {
                title: "Company Hub — Employee Portal",
                description: "Internal employee portal and mobile-app concept covering company announcements, events, employee highlights, HR policies, emergency contacts, and Microsoft Entra ID profiles with Teams push notifications.",
                technologies: ["ASP.NET Core", "Blazor", "C#", "Microsoft Graph", "Entra ID", "SQL Server", "Azure"],
                Icon: MdHub,
            },
            {
                title: "Visitor Management Portal",
                description: "End-to-end visitor workflow: registration, host approval, unique visitor ID generation, QR-code creation, security verification, reception check-in, exit tracking, and automated email/SMS notifications.",
                technologies: ["WordPress", "Fluent Forms", "Power Automate", "SharePoint", "QR APIs", "Excel"],
                Icon: MdBadge,
            },
            {
                title: "Visitor QR Verification System",
                description: "Security verification page allowing staff to scan a QR code or enter a visitor ID (e.g. VST-000001) to instantly retrieve visitor name, host info, visit date, approval status, and check-in details.",
                technologies: ["JavaScript", "WordPress", "SharePoint", "Power Automate"],
                Icon: MdQrCode2,
            },
            {
                title: "Supplier Portal",
                description: "Supplier-facing system covering supplier profiles, purchase orders, quotations, bill submissions, invoice and payment information, and supplier dashboards and reports.",
                technologies: ["WordPress", "NetSuite", "REST APIs", "JavaScript", "Power Automate"],
                Icon: MdBusiness,
            },
            {
                title: "Employee Payslip Portal",
                description: "Secure portal for employees to retrieve payslips from NetSuite including employee verification, dynamic PDF generation, professionally designed NetSuite PDF templates, and email delivery.",
                technologies: ["WordPress", "NetSuite", "SuiteScript", "Node.js", "PDF APIs"],
                Icon: MdReceipt,
            },
            {
                title: "Recruitment Management System",
                description: "End-to-end recruitment workflow covering recruitment plans, bulk recruitment requests, candidate interviews, technical and HR evaluations, interviewer assignments, approval workflows, automated notifications, UAT, and user documentation.",
                technologies: ["NetSuite", "SuiteScript", "Workflows", "JavaScript"],
                Icon: MdPeopleAlt,
            },
            {
                title: "Organisation Confirmation Dashboard",
                description: "Manager-facing dashboard displaying employees within the manager's organisation, including employee ID, name, job title, project, employment status, confirmation status, and remarks for incorrectly assigned employees.",
                technologies: ["NetSuite", "Suitelet", "Saved Searches", "JavaScript"],
                Icon: MdSpaceDashboard,
            },
            {
                title: "Cybersecurity Quiz & Certificate System",
                description: "Internal cybersecurity awareness platform that randomly selects five questions from a question bank, calculates employee scores, records results, and automatically generates personalised completion certificates.",
                technologies: ["Power Automate", "Microsoft Forms", "SharePoint", "PDF Generation"],
                Icon: MdSecurity,
            },
            {
                title: "Employee Signature Generator",
                description: "Internal web tool for generating standardised corporate email signatures using employee name, job title, department, contact information, and company branding.",
                technologies: ["HTML", "CSS", "JavaScript", "SharePoint"],
                Icon: MdMail,
            },
            {
                title: "Corporate VPN Mandatory Access",
                description: "Security project preventing access to company resources unless employees are connected through the corporate VPN, enforced through Conditional Access policies.",
                technologies: ["Microsoft Intune", "Entra ID", "Conditional Access", "Azure AD"],
                Icon: MdVpnKey,
            },
            {
                title: "Watermark Security Automation",
                description: "PowerShell-based always-on watermark solution displaying employee or device information across multiple monitors with a watchdog auto-restart mechanism, deployable via Microsoft Intune.",
                technologies: ["PowerShell", "Microsoft Intune", "Windows", "Task Scheduler"],
                Icon: MdMonitor,
            },
            {
                title: "BioStar 2 & Airfob Integration",
                description: "Access-control integration enabling mobile access cards, card authentication modes, elevator access groups, and seamless communication between BioStar 2 APIs and the Airfob Portal.",
                technologies: ["BioStar 2 API", "Airfob Portal", "REST APIs", "Postman", "JSON"],
                Icon: MdFingerprint,
            },
            {
                title: "WordPress Website Enhancements",
                description: "Extensive improvements across corporate WordPress sites including Fluent Forms customisations, OTP workflows, form-to-NetSuite integrations, custom JavaScript, dynamic verification pages, QR-code tools, PDF generation, and resolving critical PHP errors.",
                technologies: ["WordPress", "PHP", "JavaScript", "Fluent Forms", "NetSuite", "QR APIs"],
                Icon: FaWordpress,
            },
        ],
    },
    {
        category: "NetSuite Projects",
        CategoryIcon: FaDatabase,
        projects: [
            {
                title: "NetSuite & Teams Approval System",
                description: "Two-way approval workflow where NetSuite records trigger approval requests in Microsoft Teams. Approvers approve or reject via Adaptive Cards and the decision updates the NetSuite record in real time.",
                technologies: ["NetSuite", "SuiteScript", "Microsoft Teams", "Adaptive Cards", "Power Automate"],
                Icon: MdFactCheck,
            },
            {
                title: "NetSuite & Power Automate Integration",
                description: "Deep integrations between NetSuite custom records, Suitelets, and RESTlets with OAuth 1.0a / HMAC-SHA256 authentication, Power Automate HTTP actions, and external API proxy services.",
                technologies: ["NetSuite", "SuiteScript", "OAuth 1.0a", "HMAC-SHA256", "Power Automate"],
                Icon: MdSync,
            },
            {
                title: "NetSuite Proxy Backend",
                description: "Node.js/Express proxy hosted on Render that receives requests from Power Automate or WordPress, modifies headers, handles CORS, authenticates with NetSuite, and forwards JSON and PDF responses.",
                technologies: ["Node.js", "Express.js", "Render", "REST APIs", "CORS", "JSON"],
                Icon: MdDns,
            },
            {
                title: "NetSuite PDF & Email Automation",
                description: "Automated pipelines for creating and formatting NetSuite PDFs, retrieving documents via Suitelets, and sending them through email — connecting WordPress forms directly with NetSuite workflows.",
                technologies: ["NetSuite", "SuiteScript", "PDF Templates", "WordPress", "Power Automate"],
                Icon: MdPictureAsPdf,
            },
            {
                title: "NetSuite Dashboards & Analytics",
                description: "Custom saved searches, KPIs, and NetSuite dashboards for procurement analytics, RFQ analysis, purchase order reporting, GRN tracking, invoice, and payment reports.",
                technologies: ["NetSuite", "Saved Searches", "KPIs", "SuiteAnalytics", "Dashboards"],
                Icon: MdBarChart,
            },
        ],
    },
];

export default function Projects() {
    return (
        <section id="projects" className="md:py-24 py-12 w-full border-b-4 border-foreground">
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="font-mono inline-block px-3 py-1.5 text-xs font-black tracking-wider uppercase bg-foreground text-background border-2 border-foreground mb-4 select-none">
                            My Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground select-none uppercase font-mono mb-4">
                            Projects
                        </h2>
                        <div className="w-24 h-1.5 bg-foreground mx-auto mb-4" />
                        <p className="text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            Real-world systems built across enterprise environments — from internal portals and workflow automations to ERP integrations and security tooling.
                        </p>
                    </div>
                </FadeIn>

                {projectGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-20 last:mb-0">
                        {/* Category Header */}
                        <FadeIn delay={groupIndex * 0.1}>
                            <div className="flex items-center gap-4 mb-10 pb-4 border-b-4 border-foreground">
                                <div className="flex items-center gap-3 bg-foreground text-background px-4 py-2 border-3 border-foreground shadow-[3px_3px_0px_var(--foreground)] font-mono font-black uppercase tracking-wider text-sm select-none">
                                    <group.CategoryIcon size={18} />
                                    {group.category}
                                </div>
                                <div className="text-muted-foreground font-mono text-xs font-bold uppercase tracking-wider select-none">
                                    {group.projects.length} project{group.projects.length !== 1 ? "s" : ""}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {group.projects.map((project, projectIndex) => (
                                <FadeIn key={projectIndex} delay={projectIndex * 0.08}>
                                    <ProjectCard {...project} />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
