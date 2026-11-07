export const projectsData = [

  {
    title: "Vetaal",
    shortDescription: "Personal Browser Agent",
    description: "From-scratch agent harness that operates an isolated cloud browser through tool calling, with human approval before risky actions.",
    longDescription:
      "Vetaal is a personal browser agent built on a from-scratch harness over the OpenAI Responses API. It operates an isolated cloud browser (Browserbase, driven through Playwright and Stagehand) via tool calling, with permission gates and human approval before risky actions. Logins and payment details live in a credential vault: secrets are injected at the tool layer and never enter the model's context. Token usage and cost are tracked per run, and the harness is backed by 160+ offline tests.",
    logo: "/projects/vetaal.svg",
    image: "/projects/vetaalImage.svg",
    featured: true,
    techStack: ["Python", "FastAPI", "OpenAI Responses API", "Playwright", "Stagehand", "Browserbase", "Next.js"],
    demoLink: "#",
    sourceLink: "#",
    features: [
      "From-scratch agent harness on the OpenAI Responses API",
      "Isolated cloud browser (Browserbase) operated via Playwright and Stagehand",
      "Permission gates with human approval before risky actions",
      "Credential vault: secrets injected at the tool layer, never in model context",
      "Token and cost tracking, backed by 160+ offline tests"
    ],
    challenges:
      "Letting an agent act on real accounts without ever exposing credentials to the model, while keeping a human in the loop for irreversible actions."
  },
  {
    title: "Gullak",
    shortDescription: "AI Finance Assistant & MCP Server",
    description: "Receipt-based bill splitting with Gemini vision, plus an MCP server that lets external agents manage a user's finances.",
    longDescription:
      "Gullak is an AI finance assistant. Gemini 3.5 Flash vision turns bill photos into itemised expenses and splits them between participants, cutting entry time from 5 minutes to 30 seconds. An MCP server exposes accounts, budgets and settlements as a narrow, validated tool set, so external agents can manage a user's finances.",
    logo: "/projects/MoneyMate.svg",
    image: "/projects/gullakImage.svg",
    featured: true,
    techStack: ["Python", "MCP", "Gemini 3.5 Flash (Vision)", "Next.js", "SQLite"],
    demoLink: "https://matemoney.vercel.app",
    sourceLink: "https://github.com/sahabji0P/money-mate",
    features: [
      "Gemini 3.5 Flash vision parses bill photos into itemised expenses",
      "Entry time cut from 5 minutes to 30 seconds",
      "Flexible splitting between participants (equal, percentage, custom)",
      "MCP server exposing accounts, budgets and settlements as validated tools",
      "Lets external agents manage a user's finances safely"
    ],
    challenges:
      "Designing an MCP tool surface narrow enough to be safe for external agents while still covering real finance workflows."
  },
  {
    title: "NeuroVision",
    shortDescription: "AI-Powered Brain Tumor Classification",
    description: "End-to-end full-stack application using Vision Transformer for real-time MRI tumor detection.",
    longDescription:
      "NeuroVision is a Flask-based web application that leverages the DeiT-small-patch16-224 Vision Transformer for automated brain tumor classification. It delivers 99.3% accuracy on 34,000+ augmented MRI scans, provides RESTful API endpoints for image upload and inference, and features a responsive HTML/CSS/JavaScript frontend. Research was peer-reviewed and presented at IEEE ICCCNT 2025.",
    logo: "/projects/NeuroVision.svg",
    image: "/projects/NeuroVisionLogo.svg",
    featured: true,
    techStack: ["Flask", "PyTorch", "DeiT-small-patch16-224", "HTML/CSS", "JavaScript", "REST API"],
    demoLink: "#",
    sourceLink: "https://github.com/sahabji0P/NeuroVision",
    features: [
      "99.3% classification accuracy on 34,000+ MRI scans",
      "Flask backend with RESTful endpoints for inference",
      "Responsive HTML/CSS/JS frontend for real-time predictions",
      "Custom data-augmentation pipeline and k-fold cross-validation",
      "IEEE ICCCNT 2025 peer-reviewed publication"
    ],
    challenges:
      "Integrating Vision Transformer fine-tuning with a production-ready web interface and ensuring low-latency inference across large medical datasets."
  },
  {
    title: "Suraksha-AI",
    shortDescription: "Real-Time Surveillance Threat Detection",
    description: "Flask-based system using YOLOv11 + CBAM for high-accuracy object detection on live video.",
    longDescription:
      "Suraksha-AI integrates a custom YOLOv11 model enhanced with CBAM for spatial-channel attention to perform real-time threat detection. The Flask backend processes video streams, and a responsive Chart.js dashboard displays live alerts. The system achieves 90% mAP and reduces false positives by 10% on a 40,000+ image dataset.",
    logo: "/projects/suraksha.svg",
    image: "/projects/surakshaLogo.svg",
    featured: true,
    techStack: ["Flask", "YOLOv11", "CBAM", "Python", "Chart.js", "Firebase"],
    demoLink: "#",
    sourceLink: "https://github.com/sahabji0P/spot-ai",
    features: [
      "90% mAP with CBAM-enhanced YOLOv11",
      "10% reduction in false positives",
      "Real-time video stream processing",
      "Interactive Chart.js dashboard",
      "Top 50 at BU Industrial Project Showcase 2024"
    ],
    challenges:
      "Incorporating attention modules into YOLO architecture while maintaining real-time inference speeds and dashboard responsiveness."
  },
  {
    title: "Khel Onn",
    shortDescription: "Campus Sports Management Android App",
    description: "Java/XML Android application with Firebase for event registration, live scoring, and notifications.",
    longDescription:
      "Khel Onn is a native Android app built with Java and XML in Android Studio. It uses Firebase Authentication, Realtime Database, and Firestore to support 500+ users for event sign-up, live score updates, and sports news. Firebase Cloud Messaging delivers real-time notifications, reducing information delay by 60%.",
    logo: "/projects/khelon.png",
    image: "/projects/khelon.png",
    featured: false,
    techStack: ["Java", "XML", "Android Studio", "Firebase Auth", "Realtime Database", "Cloud Messaging"],
    demoLink: "#",
    sourceLink: "https://github.com/sahabji0P/KhelOn",
    features: [
      "User authentication and registration via Firebase Auth",
      "Real-time score updates with Firebase Realtime Database",
      "Event scheduling and equipment availability modules",
      "Cloud Messaging notifications with 60% delay reduction",
      "Firestore storage for photos and videos"
    ],
    challenges:
      "Ensuring low-latency real-time updates and secure role-based access in a scalable Android environment."
  },
  {
    title: "Recycle Bin",
    shortDescription: "Marketplace for Recyclable Materials",
    description: "Next.js/MongoDB platform with real-time analytics and interactive dashboards for recycling commerce.",
    longDescription:
      "Recycle Bin is a web marketplace built with Next.js and MongoDB, connecting buyers and sellers of recyclable materials. It features real-time transaction analytics with Chart.js, an optimized UX that reduces transaction times by 25%, and RESTful APIs tested via Postman for reliability.",
    logo: "/projects/recyclebin.jpeg",
    image: "/projects/recyclebin.jpeg",
    featured: false,
    techStack: ["Next.js", "MongoDB", "Chart.js", "Postman"],
    demoLink: "#",
    sourceLink: "https://github.com/sahabji0P/recycle-bin",
    features: [
      "Real-time transaction analytics with Chart.js",
      "25% faster transaction flow through UX enhancements",
      "Scalable MongoDB backend",
      "Interactive seller dashboards",
      "RESTful API reliability tested with Postman"
    ],
    challenges:
      "Designing scalable data pipelines and interactive dashboards while ensuring data accuracy and performance."
  }
];
