// data.js — single source of truth for all portfolio content

const PROJECTS = [
  {
    title: "Glitz Events",
    tag: "Team Project",
    repo: "GlitzEvents",
    description: "Full-stack event booking platform in C# (ASP.NET) with a SQL Server backend, letting customers book décor, catering, seating and sound in one place instead of contacting separate vendors. Includes auth, sessions, and an admin dashboard.",
    stack: ["C#", "ASP.NET", "SQL Server", "EF Core"]
  },
  {
    title: "CV Analyzer",
    tag: "Individual Project",
    repo: "cv_analyzer",
    description: "Deployed Python web app (Streamlit) that extracts text from uploaded PDFs and reviews CVs for structural weaknesses — missing sections, vague language, unquantified achievements — paired with AI feedback from an LLM API.",
    stack: ["Python", "Streamlit", "LLM API"]
  },
  {
    title: "Network Design Project",
    tag: "Coursework",
    repo: "Network-Design-Project",
    description: "Academic network design exercise applying enterprise networking fundamentals — topology planning, subnetting, VLAN segmentation and routing configuration.",
    stack: ["Networking", "Subnetting", "Routing"]
  }
];

const EXPERIENCE = [
  {
    role: "Marketing Officer",
    org: "Geekulcha Student Society, NWU Vaal Campus — Vanderbijlpark",
    date: "FEB 2025 — PRESENT",
    points: [
      "Promote technology events and initiatives across North-West University, growing student awareness and participation.",
      "Plan and organise events, workshops and campaigns with a student committee.",
      "Create marketing content across social platforms to build engagement with the student tech community."
    ]
  },
  {
    role: "Internet Café Assistant",
    org: "CoolCats Café — Palm Springs",
    date: "APR 2021 — DEC 2022",
    points: [
      "Supported customers with computer use, printing and internet access, maintaining consistent satisfaction.",
      "Managed daily payments and cash handling accurately in a clean, organised environment."
    ]
  },
  {
    role: "Yard Maintenance Worker (Casual)",
    org: "Private Client — Palm Springs",
    date: "2021 — JAN 2023",
    points: [
      "Provided reliable, consistent maintenance services, building long-term client relationships through repeat work.",
      "Managed time effectively across multiple client tasks and schedules."
    ]
  }
];

const EDUCATION = [
  { period: "2023 — 2026 (FINAL YEAR)", title: "Extended BSc in Information Technology", org: "North-West University — Vanderbijlpark" },
  { period: "2020", title: "National Senior Certificate", org: "Lakeside Secondary School" }
];

const SKILLS = {
  "Programming Languages": ["C#", "Python", "Java", "C++", "HTML"],
  "Data & Databases": ["SQL", "SQL Server", "Database Design"],
  "Tools & Practices": ["Git & GitHub", "Visual Studio", "VS Code", "ASP.NET", "Entity Framework", "REST APIs", "MS Office"],
  "Soft Skills": ["Communication", "Problem-solving", "Time Management", "Teamwork", "Customer Service"]
};

const PROFILE = {
  github: "Zaneradebe6",
  degree: "BSc IT — Final Year",
  focus: "Software, Data & Networks",
  stack: "C#, Python, SQL",
  institution: "North-West University"
};