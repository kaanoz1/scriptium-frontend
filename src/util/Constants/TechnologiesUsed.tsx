import {
    RiNextjsFill,
    RiReactjsFill,
    RiTailwindCssFill,
} from "react-icons/ri";
import {
    SiTypescript,
    SiShadcnui,
    SiFramer,
    SiDotnet,
    SiSharp,
    SiPostgresql,
    SiDocker,
    SiEslint,
    SiAxios,
    SiSqlite,
    SiMobx,
    SiPrisma,
    SiRedis,
} from "react-icons/si";
import React from "react";
import {TbWorld} from "react-icons/tb";

export type Technology = {
    name: string;
    icon: React.ElementType | string;
    url: string;
    description: string;
    color: string;
};

export const TechnologiesUsed: Technology[] = [
    {
        name: "Next.js",
        icon: RiNextjsFill,
        url: "https://nextjs.org",
        description: "React Framework for Web.",
        color: "#000000 dark:invert",
    },
    {
        name: "React",
        icon: RiReactjsFill,
        url: "https://react.dev",
        description: "Library for User Interfaces.",
        color: "#61DAFB",
    },
    {
        name: "TypeScript",
        icon: SiTypescript,
        url: "https://www.typescriptlang.org",
        description: "Typed JavaScript Superset.",
        color: "#3178C6",
    },
    {
        name: "Tailwind CSS",
        icon: RiTailwindCssFill,
        url: "https://tailwindcss.com",
        description: "Utility-first CSS Framework.",
        color: "#06B6D4",
    },
    {
        name: "Shadcn UI",
        icon: SiShadcnui,
        url: "https://ui.shadcn.com",
        description: "Copy-paste UI Components.",
        color: "#000000 dark:invert",
    },
    {
        name: "Framer Motion",
        icon: SiFramer,
        url: "https://www.framer.com/motion",
        description: "Animation Library for React.",
        color: "#0055FF",
    },
    {
        name: "MobX",
        icon: SiMobx,
        url: "https://mobx.js.org",
        description: "Simple, Scalable State Management.",
        color: "#FF9933",
    },
    {
        name: "next-intl",
        icon: TbWorld,
        url: "https://next-intl-docs.vercel.app",
        description: "Internationalization for Next.js.",
        color: "#000000 dark:invert",
    },
    {
        name: ".NET 10",
        icon: SiDotnet,
        url: "https://dotnet.microsoft.com",
        description: "Free, Cross-platform, Open.",
        color: "#512BD4",
    },
    {
        name: "C#",
        icon: SiSharp,
        url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        description: "Modern & Type-safe Language.",
        color: "#239120",
    },
    {
        name: "PostgreSQL",
        icon: SiPostgresql,
        url: "https://www.postgresql.org",
        description: "Advanced Relational Database.",
        color: "#4169E1",
    },
    {
        name: "SQLite",
        icon: SiSqlite,
        url: "https://www.sqlite.org",
        description: "Small, Fast, Self-contained.",
        color: "#003B57",
    },
    {
        name: "Prisma",
        icon: SiPrisma,
        url: "https://www.prisma.io",
        description: "Next-generation Node.js and TypeScript ORM.",
        color: "#2D3748",
    },
    {
        name: "Docker",
        icon: SiDocker,
        url: "https://www.docker.com",
        description: "OS-level Virtualization.",
        color: "#2496ED",
    },
    {
        name: "Ollama",
        icon: "https://ollama.com/public/ollama.png",
        url: "https://ollama.com",
        description: "Local LLM Runner.",
        color: "#000000 dark:invert",
    },
    {
        name: "ESLint",
        icon: SiEslint,
        url: "https://eslint.org",
        description: "Pluggable Linting Utility.",
        color: "#4B32C3",
    },
    {
        name: "Redis",
        icon: SiRedis,
        url: "https://redis.io",
        description: "In-memory Data Structure Store.",
        color: "#DC382D",
    },
    {
        name: "Axios",
        icon: SiAxios,
        url: "https://axios-http.com",
        description: "Promise based HTTP Client.",
        color: "#5A29E4",
    },
    {
        name: "FluentValidation",
        icon: "https://api.nuget.org/v3-flatcontainer/fluentvalidation/12.0.0/icon",
        url: "https://fluentvalidation.net",
        description: "Validation Library for .NET.",
        color: "#239120",
    },
    {
        name: "Lucene.NET",
        icon: "https://e7.pngegg.com/pngimages/284/944/png-clipart-apache-lucene-net-net-framework-umbraco-open-source-model-branding-miscellaneous-text.png",
        url: "https://lucenenet.apache.org",
        description: "Search Engine Library.",
        color: "#D22128",
    },
    {
        name: "Scalar",
        icon: "https://avatars.githubusercontent.com/u/301879?s=280&v=4",
        url: "https://scalar.com",
        description: "API Reference with Ease.",
        color: "#000000 dark:invert",
    },
];