import ADITYAKAMBOJ from "@/assets/images/landing-page/slider-assets/Aditya Kamboj_cropped (1).jpg";
import ANKITABANSAL from "@/assets/images/landing-page/slider-assets/Ankita Bansal_cropped.jpg";
import ANUJKHANNA from "@/assets/images/landing-page/slider-assets/Anuj Khanna_cropped (1).webp";
import NANDITAKALITA from "@/assets/images/landing-page/slider-assets/Nandita Kalita_cropped (1).jpg";
import RajeevRanjan from "@/assets/images/landing-page/slider-assets/Rajeev Ranjan compressed.jpg";
import SIMRANSURUR from "@/assets/images/landing-page/slider-assets/Simrin Sirur_cropped.jpg";
import { StaticImageData } from "next/legacy/image";

export interface Testimonial {
  img: StaticImageData;
  name: string;
  designation: string;
  company: string;
  location: string;
  review: string;
  linkedin: string;
}

export const testimonials: Testimonial[] = [
  {
    img: RajeevRanjan,
    name: "Rajeev Ranjan",
    designation: "Software Engineer",
    company: "Microsoft",
    location: "Hyderabad",
    review:
      "My wife and I were planning for some joint financial goals and it was helpful to run them by Ankit. He was able to offer much-needed clarity on how to think about our decisions. We feel much more confident now about our financial plans.",
    linkedin: "https://www.linkedin.com/in/rajeev14ranjan/",
  },
  {
    img: ANKITABANSAL,
    name: "Ankita Bansal",
    designation: "Regional Marketing Manager",
    company: "Chai Point",
    location: "New Delhi",
    review:
      "Ankit and Medha have been so supportive to motivate me to start even if it's with the smallest amount. It's because of them, I strongly feel that managing finances efficiently is a much needed life skill.",
    linkedin: "https://www.linkedin.com/in/ankitabansalprofile/",
  },
  {
    img: ADITYAKAMBOJ,
    name: "Aditya Kamboj",
    designation: "Vice President",
    company: "HSBC",
    location: "Mumbai",
    review:
      "Discussions with the wealthup.me team especially Ankit were an eye-opener and gave me an entirely new perspective of managing my own finances.",
    linkedin: "https://www.linkedin.com/in/aditya-k-1738613b/",
  },
  {
    img: NANDITAKALITA,
    name: "Nandita Kalita",
    designation: "Software Engineer - Frontend",
    company: "Rubrik",
    location: "Bengaluru",
    review:
      "Without their help, I wouldn’t have been able to figure out the right places to invest so as to get higher returns and also do some tax savings. They have real knowledge about finance and are always ready to help.",
    linkedin: "https://www.linkedin.com/in/nandita-kalita-891604145/",
  },
  {
    img: ANUJKHANNA,
    name: "Anuj Khanna",
    designation: "Operations & Experience Design",
    company: "Practo",
    location: "Bengaluru",
    review:
      "They very well understand the financial habits of millennials and Gen-Z and have a perfect approach for those who are starting to care about balancing living their life while becoming rich!",
    linkedin: "https://www.linkedin.com/in/anujkhanna93/",
  },
  {
    img: SIMRANSURUR,
    name: "Simrin Sirur",
    designation: "Journalist",
    company: "The Print",
    location: "Gurugram",
    review:
      "I was afraid to learn about investments and savings because it seemed to fly over my head, but Ankit was extremely patient and walked me through everything... I now feel more confident to handle my own money,",
    linkedin: "https://www.linkedin.com/in/simrin-sirur-0690a1144/",
  },
];
