'use client';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Image, { StaticImageData } from "next/legacy/image";
import { baseUrl, whatsappLink } from "@/utils/constants";

import { Button } from "@/components/ui/Button";
import { FeedbackProvider } from "@/components/FeedBack";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import React from "react";
import image1 from "@/assets/images/wealthometer/1. Why use wealthometer.jpg";
import image2 from "@/assets/images/wealthometer/2. How does the wealthometer work.jpg";
import image3 from "@/assets/images/wealthometer/3. What is wealthup.jpg";
import image4 from "@/assets/images/wealthometer/4. More about the WealthoMeter.jpeg";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

type Slide = {
  title: string;
  description: React.ReactNode;
  image: StaticImageData;
  buttonText: string;
};

const slides: Slide[] = [
  {
    title: "Why use WealthoMeter?",
    description: (
      <>
        <p className="text-xl md:text-2xl font-bold">
          Here&apos;s why you should use WealthoMeter:
        </p>
        <ul className="list-disk text-xl md:text-2xl">
          <li className="mb-2">
            Discover the health of your finances and get tailored suggestions
            within minutes to improve your financial health.
          </li>
          <li className="mb-2">
            Our proprietary SA.L.E.CO.IN. framework gives you a personalised
            financial scorecard.
          </li>
          <li className="mb-2">Your information is kept safe and secure.</li>
          {/* <li>[Benchmark yourself against others]</li> */}
          <li className="mb-2">
            It&apos;s free and only takes 3 minutes to get your comprehensive,
            personalised scorecard.
          </li>
        </ul>
        <p className="text-xl md:text-2xl mb-0 mt-4">
          So, use WealthoMeter now and start improving your finances ASAP!
        </p>
      </>
    ),
    image: image1,
    buttonText: "why?",
  },
  {
    title: "How does WealthoMeter work?",
    description: (
      <>
        <p className="text-xl md:text-2xl">
          You just need to answer a set of questions about your wealth journey -
          this should take under 3 minutes to complete.
        </p>
        <p className="text-xl md:text-2xl">
          Your personalised scorecard will give you an overall score between 0
          and 100 along with individual scores for each category of
          SA.L.E.CO.IN.
        </p>{" "}
        <p className="text-xl md:text-2xl">
          You also get very specific recommendations to improve your individual
          as well as overall score.
        </p>
      </>
    ),
    image: image3,
    buttonText: "how?",
  },
  {
    title: "What is WealthUp?",
    description: (
      <>
        <p className="text-xl md:text-2xl">
          Wealthup is focused on wealth management for you. It is powered by
          technology but driven by finance experts to provide tailored advice on
          all aspects of personal finance from investments, to tax savings, to
          insurance and more.
        </p>
        <p className="text-xl md:text-2xl">
          <a
            href={whatsappLink}
            className="text-blue-300 underline"
            target="__blank"
          >
            Get in touch{" "}
          </a>{" "}
          with us to learn how we can help you in your financial journey.
        </p>
      </>
    ),
    image: image2,
    buttonText: "what?",
  },
  {
    title: "More about WealthoMeter",
    description: (
      <>
        <ul className="list-disk">
          <li className="mb-2">
            You don&apos;t need to be a WealthUp customer to use the tool
          </li>
          <li className="mb-2">
            Your information is completely secure and not shared with anyone
          </li>
          <li className="mb-2">
            The more accurate your responses are, the better your results will
            be
          </li>
          <li className="mb-2">
            People you share the tool with won&apos;t know your score and
            vice-versa
          </li>
        </ul>
        <p className="text-xl md:text-2xl">
          So, get started now and check how much fuel you have in your wealth
          tank!
        </p>
      </>
    ),
    image: image4,
    buttonText: "sample report",
  },
];

export const AboutWealthoMeter: React.FC<{
  handleExit: React.MouseEventHandler<HTMLButtonElement>;
  showQuestions: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ handleExit, showQuestions }) => {
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const { setShow } = React.useContext(FeedbackProvider)!;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    setShow(false);
  }, [setShow]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const queryValue = searchParams.get('yourParameterName');

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const handlePrevious = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const shareUrl = `${baseUrl}${pathname.replace("/learn-more", "")}`;
  const title =
    "WealthoMeter is a free tool that helps you understand the current situation of your overall wealth.";

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div
        className={`w-screen h-auto md:h-screen bg-[#C3466A] min-h-[980px] ${currentSlide === slides.length - 1 ? "min-h-[1110px]" : ""
          }`}
      >
        <Link href="/wealthometer" legacyBehavior>
        <button
          className={`p-4 md:p-8 absolute top-16 left-0 flex text-white gap-2 items-center z-40`}
        >
          <HiOutlineArrowNarrowLeft size={20} />
          <span className="font-robo font-medium text-sm md:text-lg uppercase">
            Main page
          </span>
        </button>
        </Link>
        <div className="hidden md:flex absolute p-4 md:p-8 top-24 md:top-16 right-0 justify-center md:justify-end w-full md:w-auto gap-4 items-center">
  <span className="font-robo hidden md:block text-xs uppercase text-white font-bold">
    share with a friend
  </span>
  <a
    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)} ${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <FaWhatsapp color="white" size={28} />
  </a>
  <a
    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <FaLinkedin color="white" size={28} />
  </a>
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <FaFacebook color="white" size={28} />
  </a>
  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:scale-110 transition-transform"
  >
    <FaTwitter color="white" size={28} />
  </a>
</div>
        <div
          className={`w-full h-full pb-10 pt-24 lg:pt-0 md:mb-0 flex items-center justify-center px-6 md:px-0 ${currentSlide === slides.length - 1 ? "pt-40" : ""
            }`}
        >
          <div className="w-full md:w-[85%] h-[85%] relative flex flex-col items-center justify-center select-none">
            <h2
              className={`text-white text-2xl md:text-5xl ${currentSlide === slides.length - 1 ? " md:mt-40" : ""
                }`}
            >
              {slides[currentSlide].title}
            </h2>
            {currentSlide < slides.length - 1 ? (
              <>
                <div className="lg:hidden relative mb-6">
                  <Image
                    src={slides[currentSlide].image}
                    alt="question-image"
                  // layout="fill"
                  />
                </div>
                <div
                  className={`hidden lg:block relative w-4/5 md:w-1/4 h-1/2 md:h-full ${currentSlide === 0 ? "md:min-h[400px] md:max-w-[300px]" : ""
                    } mb-6`}
                >
                  <Image
                    src={slides[currentSlide].image}
                    alt="question-image"
                    layout="fill"
                  />
                </div>
                <div className="mx-4 lg:mx-0 lg:max-w-[45%] text-xl text-white">
                  {slides[currentSlide].description}
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex flex-col lg:flex-row justify-around items-center">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <p className="text-xl md:text-2xl font-bold text-white">
                      Sample Report:
                    </p>
                    <div className="w-3/4 md:w-2/5 h-auto flex justify-center items-center mb-10 md:mb-6">
                      <Image
                        src={slides[currentSlide].image}
                        alt="question-image"
                      />
                    </div>
                  </div>
                  <div className=" mx-4 md:mx-0 text-xl md:text-2xl text-white">
                    {slides[currentSlide].description}
                  </div>
                </div>
              </>
            )}
            {/* {currentSlide === slides.length - 1 ? (
              <div className="w-3/4 md:w-2/5 h-auto flex justify-center  mb-10 md:mb-6">
                <Image src={slides[currentSlide].image} alt="question-image" />
              </div>
            ) : (
              <div className="mx-4 md:mx-0 md:max-w-[45%] text-xl text-white">
                {slides[currentSlide].description}
              </div>
            )} */}
            <div
              className={`flex justify-between w-full pt-24 ${currentSlide === slides.length - 1 ? "sm:pb-48 lg:pb-54" : ""
                }`}
            >
              <div className="w-full">
                {currentSlide > 0 && (
                  <Button
                    onClick={handlePrevious}
                    color="white"
                    className="capitalize"
                  >
                    <AiOutlineArrowLeft className="mr-2" />
                    {slides[currentSlide - 1].buttonText}{" "}
                  </Button>
                )}
              </div>
              <div className="flex justify-center items-center w-full gap-4">
                {slides.map((i, index) => (
                  <span
                    key={index}
                    className={`block rounded-full ${currentSlide === index
                        ? "w-5 h-5 bg-white"
                        : "w-4 h-4 bg-gray-400"
                      }`}
                  ></span>
                ))}
              </div>
              {currentSlide < slides.length - 1 && (
                <div className="flex justify-end  w-full">
                  <Button
                    onClick={handleNext}
                    color="white"
                    className="capitalize"
                  >
                    {slides[currentSlide + 1].buttonText}{" "}
                    <AiOutlineArrowRight className="ml-2" />
                  </Button>
                </div>
              )}
              {currentSlide === slides.length - 1 && (
                <div className="flex justify-end  w-full">
                  <Link
                    href={`${pathname.replaceAll("learn-more", "questions")}`}
                  >

                    <Button
                      color="white"
                      className="capitalize"
                      onClick={showQuestions}
                    >
                      start now
                    </Button>

                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
