export interface ResearchProject {
  id: string
  title: string
  description: string
  link: string
  certificate: string
  publicationDetails: {
    journal: string
    date: string
    doi?: string
  }
  status: string
  authors: {
    main: string[]
    coAuthors: string[]
  }
  abstract: string
  results: {
    text: string
    images?: string[]
  }
  futureWork: string
  associatedProjects?: {
    title: string
    description: string
    link: string
  }[]
}

export const researchWorkData: ResearchProject[] = [
  {
    id: "brain-tumor-classification-deit",
    title: "Brain Tumor Classification Using DeiT Vision Transformer",
    description: "Accepted and Presented at IEEE 16th ICCCNT, 2025",
    link: "/deit-vision-transformer",
    certificate: "https://drive.google.com/file/d/1EEf1uqGTiSfrTWGXzpG1vZpY7yGLo2vb/view?usp=sharing",
    publicationDetails: {
      journal: "16th ICCCNT IEEE Conference, IIT Indore",
      date: "July 2025",
      doi: "N/A"
    },
    status: "Accepted",
    authors: {
      main: ["Shashwat Jain", "Nikhil", "Rudraksh Bhardwaj"],
      coAuthors: ["Dr. Gitika Sharma", "Dr. Himanshu"]
    },
    abstract: "Brain Tumors are among the most complicated and serious neurological disorders due to their unpredictable structure, uncontrollable growth patterns of brain cells and several subtypes - over 120 classified by World Health Organization. Prior and accurate detection is critical for immediate treatment and significantly influences patient prognosis and survival rates. However, manual examination using medical imaging is time consuming, subject to human error, and inconsistent, potentially resulting in delayed or incorrect assessments. This paper explores advanced automated approaches for brain tumor classification that leverage recent developments in transformer based DeiT models to enhance diagnostic accuracy and reliability. We demonstrate a novel approach using Vision Transformers, specifically a DeiT (Data-efficient Image Transformers) architecture for classifying the types of brain tumors. Our model depends on the deit-small-patch16-224 variant, which has been pre-trained on ImageNet and fine-tuned for tumor classification tasks.",
    results: {
      text: "The DeiT transformer model achieved exceptional performance across five-fold cross-validation with an impressive average accuracy of 99.93%. The best performing fold (Fold 4) achieved 99.96% accuracy with precision of 0.99925, recall of 0.99925, and F1-score of 0.9995. The model successfully classified brain MRI images into four categories: glioma, meningioma, pituitary tumor, and no tumor. The final dataset consisted of 34,272 images derived from 7,022 original images through extensive data augmentation. The model demonstrated consistent results across all folds, with Fold 2 achieving 99.94% accuracy, showing robust generalization and minimal overfitting. The high F1-score is particularly significant in medical imaging applications where both false positives and false negatives can have serious clinical impacts.",
      images: ["/research/confusion-matrices.jpg", "/research/training-curves.jpg", "/research/deit-architecture.png"]
    },
    futureWork: "To further advance the clinical applicability and robustness of the model, future research will explore the incorporation of multimodal data, such as the integration of MRI images with genomic or clinical records, to capture complementary information and improve diagnostic precision. Furthermore, Generative Adversarial Networks (GANs) will be incorporated to generate realistic, high-quality synthetic MRI scans, thus expanding training data and improving generalization in rare tumor subtypes. Finally, the incorporation of Explainable AI (XAI) methods, such as SHAP, LIME, or attention heatmaps, will be emphasized to improve trustworthiness and transparency by providing explainable analysis into model decisions, particularly important in high-stakes medical diagnostics.",
    associatedProjects: [
      {
        title: "NeuroVision",
        description: "A vision transformer-based model for brain tumor detection and classification into multiple categories.",
        link: "https://github.com/sahabji0P/NeuroVision"
      },
    ]
  },
];
