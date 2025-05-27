
"use client"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  TypographyContext,
  handleChange,
} from "@/components/landing-page/TypographyContext";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Typography from "./typography";

interface AccordionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  content: React.ReactNode;
  index?: number;
  bordercolor?: string;
  titlestyle?:string;
  padding?:boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  index,
  bordercolor,
  titlestyle,
  subtitle,
  padding=true
}) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef<HTMLDivElement | null>(null);

  const accordionContext = useContext(AccordionContext);

  function toggleAccordion() {
    if (accordionContext !== null) {
      accordionContext.setActive(
        accordionContext.active === index ? -1 : index!
      );

      if (contentSpace.current) {
        setHeight(
          accordionContext.active === index
            ? "0px"
            :
            `${contentSpace.current.scrollHeight}px`
        );
        setRotate(
          accordionContext.active === index
            ? "transform duration-700 ease"
            : "transform duration-700 ease rotate-180"
        );
      }
    } else {
      setActive((prevState) => !prevState);

      if (contentSpace.current) {
        setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
        setRotate(
          active
            ? "transform duration-700 ease"
            : "transform duration-700 ease rotate-180"
        );
      }
    }
  }

  useEffect(() => {
    if (accordionContext?.active !== index) {
      setHeight(`0px`);
      setRotate("transform duration-700 ease");
    }
  }, [accordionContext?.active, index]);

  const typographyContext = useContext(TypographyContext);

  return (
    <div className={`w-full flex flex-col ${padding ? 'border-b md:border-b-2' : ''}  ${bordercolor ? bordercolor : 'border-gray-400'}`}>
      <div>
        <button
          className={`box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between w-full ${padding ? 'pt-3' : 'pb-2'}`}
          onClick={toggleAccordion}
        >
          <h4 className={`leading-snug font-semibold inline-block text-base sm:text-xl lg:font-semibold lg: text-left ${padding ? 'px-4'  : "mb-0"} ${titlestyle ? titlestyle : 'font-light font-robo'} font-medium`}>
            {title}
          </h4>
          <div className={`${rotate} inline-block`}>
            <MdOutlineKeyboardArrowDown className="md:h-8 md:w-8 w-6 h-6" />
          </div>
        </button>
        {subtitle && 
          subtitle
        }
      </div>
      
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        {typographyContext !== null ? (
          <Typography
            size={typographyContext.state.body}
            handleChange={(value) =>
              handleChange(value, "body", typographyContext.dispatch)
            }
          >
            {content}
          </Typography>
        ) : (
          <div className={`font-sans font-light text-base md:text-xl ${padding ? "px-4" : ""}`}>
            {content}
          </div>
        )}
      </div>
    </div>
  );
};





interface AccordionHomeProps extends AccordionProps {
  customClasses?: boolean
}

export const AccordionHome: React.FC<AccordionHomeProps> = ({
  title,
  content,
  index,
  bordercolor,
  titlestyle,
  subtitle,
  padding=true,
  customClasses
}) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef<HTMLDivElement | null>(null);

  const accordionContext = useContext(AccordionContext);

  function toggleAccordion() {
    if (accordionContext !== null) {
      accordionContext.setActive(
        accordionContext.active === index ? -1 : index!
      );

      if (contentSpace.current) {
        setHeight(
          accordionContext.active === index
            ? "0px"
            :
            `${contentSpace.current.scrollHeight}px`
        );
        setRotate(
          accordionContext.active === index
            ? "transform duration-700 ease"
            : "transform duration-700 ease rotate-180"
        );
      }
    } else {
      setActive((prevState) => !prevState);

      if (contentSpace.current) {
        setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
        setRotate(
          active
            ? "transform duration-700 ease"
            : "transform duration-700 ease rotate-180"
        );
      }
    }
  }

  useEffect(() => {
    if (accordionContext?.active !== index) {
      setHeight(`0px`);
      setRotate("transform duration-700 ease");
    }
  }, [accordionContext?.active, index]);

  const typographyContext = useContext(TypographyContext);

  return (
    <div className={`bg-white rounded-2xl px-8 py-4 flex items-center mb-4 w-full`}>
      <div>
        <div className="w-12 h-12 rounded-full bg-primary-blue"></div>
      </div>
      <div>
        <div className="w-full">
          <button
            className={`box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between w-full ${padding ? 'py-3' : 'pb-2'}`}
            onClick={toggleAccordion}
          >
            <h4 className={`leading-snug inline-block text-base sm:text-2xl text-left ${padding ? 'px-4'  : "mb-0"} text-primary-blue font-semibold mb-0 ${titlestyle ? titlestyle : 'font-light font-robo'} font-medium`}>
              {title}
            </h4>
            <div className={`${rotate} text-primary-blue inline-block`}>
              <MdOutlineKeyboardArrowDown className="md:h-10 md:w-10 w-6 h-6" />
            </div>
          </button>
          {subtitle &&
            subtitle
          }
        </div>
        <div
          ref={contentSpace}
          style={{ maxHeight: `${height}` }}
          className="w-full overflow-auto transition-max-height duration-700 ease-in-out"
        >
          <div className={`font-sans font-light text-base md:text-xl ${padding ? "pb-5 px-4 md:pb-10" : ""} text-primary-blue text-xl`}>
            {content}
          </div>
         </div>
      </div>
    </div>
  );
};

export const AccordionContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState<number>(-1);

  return (
    <AccordionContext.Provider value={{ active, setActive }}>
      {children}
    </AccordionContext.Provider>
  );
};

const AccordionContext = createContext<{
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

AccordionContainer.Item = Accordion;
AccordionContainer.HomeItem = AccordionHome
