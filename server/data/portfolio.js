export const portfolio = {
  name: "Javier Yeow",
  headline:
    "Penultimate Information Systems Student @ National University of Singapore",
  summary:
    "I'm Javier, a Y3 Information Systems undergraduate at NUS. My interests lie in software engineering, particularly backend engineering, as I love delving into complex systems and making things work! I think what I really like about backend engineering is how you don't often get to 'see' the results, but you can definitely feel it.",
  email: "javieryeow@gmail.com",
  location: "Singapore",
  profileImage: "/assets/img/my_profile.jpeg",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/javieryeow/" },
    { label: "GitHub", href: "https://github.com/javieryeow" },
    { label: "Email", href: "mailto:javieryeow@gmail.com" },
  ],
  projects: [
    {
      title: "JobSphere",
      period: "August 2025 - November 2025",
      stack: ["Next.js", "JavaScript", "Node.js", "MongoDB"],
      description:
        "JobSphere is an AI-powered recruitment platform designed to streamline the hiring lifecycle across multiple user portals. It supports secure role-based workflows, real-time interactions via websockets, and intelligent job recommendations using transformer-based embeddings. Job matching quality was also improved via a two-stage search and reranking engine.",
    },
    {
      title: "Premier League Match Score Predictor",
      period: "June 2025",
      stack: ["Pandas", "NumPy", "scikit-learn"],
      description:
        "A fun little ML side project that I built to forecast EPL match outcomes and scorelines based on historical data. Built with XGBoost classification and regression models, this project uses rolling backtesting to simulate real-world forecasting and evaluates performance through accuracy, RMSE, and Brier score.",
    },
    {
      title: "TaskHive: Digital Personal Assistant",
      period: "December 2024 - January 2025",
      stack: ["Vue", "JavaScript", "Firebase", "Google Cloud"],
      description:
        "Developed a full-stack productivity platform with shared calendars, email views, automated reminders, and LLM-powered email summarization for faster communication workflows.",
    },
    {
      title: "Blockchain Portfolio Risk Assessment Web Application",
      period: "December 2024",
      stack: ["Django", "Python", "Time-series forecasting"],
      description:
        "Built a web application that analyzes blockchain wallets and portfolios to generate risk assessments, token price forecasts, and portfolio health metrics to support investment strategy decisions.",
    },
  ],
  experience: [
    {
      company: "PayPal",
      role: "Software Engineer Intern",
      period: "May 2026 - November 2026",
      details: ["Incoming SWE Intern at PayPal!"],
    },
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
  skills: [
    {
      title: "Languages and frameworks",
      items: [
        "Java",
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Vue",
        "C#",
        "Swift",
        "Flutter",
      ],
    },
    {
      title: "Data and infrastructure",
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Docker",
        "Git",
        "Jupyter",
        "AWS",
        "ElasticSearch",
        "Google Cloud",
      ],
    },
  ],
  interests: [
    "Outside of engineering work, I love football, playing games and meeting new people!",
    "I've also started getting into coffee-making and murder mystery films :)",
  ],
};
