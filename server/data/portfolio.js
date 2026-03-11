export const portfolio = {
  name: "Javier Yeow",
  headline:
    "Penultimate Information Systems Student at the National University of Singapore",
  summary:
    "Information Systems undergraduate at NUS with internship experience across software engineering and building reliable systems. My recent work spans backend platform engineering at Binance, applied ML research at NUS, and risk infrastructure development at PhillipCapital.",
  email: "javieryeow@gmail.com",
  phone: "+65 87821669",
  location: "Singapore",
  profileImage: "/assets/img/my_profile.jpeg",
  highlights: [
    { label: "Internships and research roles", value: "3" },
    { label: "LLM evals reviewed weekly", value: "10k+" },
    { label: "Client positions monitored", value: "150k+" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/javieryeow/" },
    { label: "GitHub", href: "https://github.com/javieryeow" },
  ],
  projects: [
    {
      title: "Blockchain Portfolio Risk Assessment Web Application",
      period: "December 2024",
      stack: ["Django", "Python", "Machine Learning"],
      description:
        "Built a web application that analyzes blockchain wallets and portfolios to generate risk assessments, token price predictions, and metrics that support investment strategy decisions.",
    },
    {
      title: "TaskHive: Digital Personal Assistant",
      period: "December 2024 - January 2025",
      stack: ["Vue", "JavaScript", "Firebase", "Google Cloud"],
      description:
        "Developed a full-stack productivity platform with shared calendars, Gmail views, automated reminders, and LLM-powered email summarization for faster communication workflows.",
    },
    {
      title: "Market Analysis for Beijing Real Estate Investments",
      period: "November 2024",
      stack: ["Python", "R", "Tableau", "Excel"],
      description:
        "Analyzed Beijing real estate data to identify profit-maximizing investment strategies and produced clear visual narratives to communicate findings.",
    },
    {
      title: "mediSport",
      period: "May 2024 - July 2024",
      stack: ["Swift", "Xcode", "Supabase"],
      description:
        "Created an iOS application that maps pain areas to plausible sports injury diagnoses and surfaces relevant treatment guidance and medical context.",
    },
  ],
  experience: [
    {
      company: "Binance",
      role: "Software Engineer Intern",
      period: "August 2025 - December 2025",
      details: [
        "Implemented backend API monitoring services in Java for the AI Token Report mobile feature and integrated hourly checks into Jenkins CI/CD pipelines.",
        "Engineered big data migration pipelines with Java Spring Boot and Elasticsearch to process and aggregate data from more than 350 cryptocurrencies across production and QA environments.",
        "Designed AWS SageMaker LLM evaluation applications using LLM-as-a-Judge workflows, benchmarking over 10,000 responses per week and reducing manual review time by 70%.",
      ],
    },
    {
      company: "National University of Singapore",
      role: "Machine Learning Research Assistant",
      period: "August 2025 - December 2025",
      details: [
        "Built NLP pipelines with spaCy to preprocess, tokenize, and extract linguistic features from over 10,000 text data points for a doctorate applied economics research project.",
        "Trained supervised models including RandomForest and XGBoost to classify behavioural indicators with over 92% accuracy.",
        "Applied Sentence-BERT embeddings and cosine similarity heuristics to automate soft-skill classification from conversation data.",
      ],
    },
    {
      company: "PhillipCapital",
      role: "Software Development Intern",
      period: "May 2025 - August 2025",
      details: [
        "Enhanced the Delta stress-testing model to incorporate CFDs, FX, and LME positions, expanding derivatives coverage by 50% while reducing ETL runtime by over 20%.",
        "Researched and implemented Black-Scholes and Black-76 pricing models for European options and futures options, increasing stress-test accuracy by 25%.",
        "Developed a real-time UPL monitoring system in Python using Reuters APIs to compute portfolio equity across 5,000 client accounts and 150,000 open positions.",
      ],
    },
  ],
  education: [
    {
      school: "National University of Singapore",
      period: "August 2023 - May 2027",
      program: "Bachelor of Computing (Hons), Information Systems",
      details:
        "Minor in Quantitative Finance. NUS Merit Scholar. Activities include Sheares Hall Football Captain and NUS Independent Software Developer.",
      result: "Expected graduation: May 2027",
    },
  ],
  skills: [
    {
      title: "Languages and frameworks",
      items: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "Vue",
        "Python",
        "Java",
        "Go",
        "C#",
        "Swift",
        "Flutter",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Data and infrastructure",
      items: [
        "SQL",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Docker",
        "Git",
        "Jupyter",
        "Tableau",
        "Google Cloud",
        "Firebase",
      ],
    },
    {
      title: "Applied strengths",
      items: [
        "Backend Engineering",
        "Machine Learning",
        "NLP",
        "Financial Risk Systems",
        "REST APIs",
        "CI/CD",
        "Data Analysis",
      ],
    },
  ],
  interests: [
    "Outside engineering work, I stay heavily involved in football and student leadership. Serving as Sheares Hall Football Captain has kept me grounded in teamwork, discipline, and leading under pressure.",
    "I am also drawn to hackathons, fintech, AI, and data-intensive product building, especially where strong technical execution needs to meet real user and business outcomes.",
  ],
  awards: [
    "NUS Merit Scholar",
    "Sheares Hall Football Captain",
    "NUS Independent Software Developer",
  ],
};
