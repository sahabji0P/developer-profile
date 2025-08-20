export const projectsData = [

  {
    title: "Money Mate",
    shortDescription: "AI-Powered Bill Splitting App",
    description: "Next.js PWA using Gemini 2.5 Flash API to parse receipts and split expenses among participants.",
    longDescription:
      "Money Mate is a Progressive Web App built with Next.js and Tailwind CSS that automates bill splitting. It uses Gemini 2.5 Flash API to extract item names, prices, and taxes with 98% accuracy, provides editable item and participant modules, and generates shareable summaries in PNG or text. Designed for mobile responsiveness and offline support via IndexedDB.",
    logo: "/projects/MoneyMateIcon.png",
    image: "/projects/moneyMateImage.png",
    featured: true,
    techStack: ["Next.js", "Tailwind CSS", "Gemini 2.b5 Flash API", "html2canvas", "PWA"],
    demoLink: "https://matemoney.vercel.app/",
    sourceLink: "https://github.com/sahabji0P/recycle-bin",
    features: [
      "98% receipt parsing accuracy with Gemini Flash API",
      "Editable items and participant modules with React Context",
      "Flexible splitting algorithms (equal, percentage, custom)",
      "Shareable PNG and text summaries via html2canvas",
      "Responsive PWA design with offline support"
    ],
    challenges:
      "Balancing real-time AI parsing performance with a seamless mobile UX and offline data persistence."
  },
  {
    title: "NeuroVision",
    shortDescription: "AI-Powered Brain Tumor Classification",
    description: "End-to-end full-stack application using Vision Transformer for real-time MRI tumor detection.",
    longDescription:
      "NeuroVision is a Flask-based web application that leverages the DeiT-small-patch16-224 Vision Transformer for automated brain tumor classification. It delivers 99.3% accuracy on 34,000+ augmented MRI scans, provides RESTful API endpoints for image upload and inference, and features a responsive HTML/CSS/JavaScript frontend. Research was peer-reviewed and presented at IEEE ICCCNT 2025.",
    logo: "/projects/neurovision.png",
    image: "/projects/neurovision.png",
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
    logo: "/projects/suraksha.png",
    image: "/projects/suraksha.png",
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
