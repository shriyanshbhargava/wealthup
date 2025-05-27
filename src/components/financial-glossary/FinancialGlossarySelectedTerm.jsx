import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import RichText from "@/components/ui/RichText";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FinancialGlossarySelectedTerm = ({ term, layouts }) => {
    const smallScreen = useMediaQuery({ maxWidth: 600 });
    const { back } = useRouter();
    const [index, setIndex] = useState(0);

    const handleIndex = (num) => {
        if (layouts.length === 1) return;

        if (num < 0 && index === 1) {
            setIndex(index + num);
        }

        if (num > 0 && index === 0) {
            setIndex(index + num);
        }
    }

    const MotionDiv = motion.div;

    return (
        <div className="relative">
            {layouts.length > 1 && (
                <div className="absolute left-[-200px] top-1/2">
                    <BsChevronLeft 
                        className={`text-black text-4xl font-bold ${index === 0 ? "cursor-not-allowed" : "cursor-pointer"}`} 
                        onClick={() => handleIndex(-1)} 
                    />
                </div>
            )}
            <MotionDiv
                initial={{ width: 480 }}
                animate={{
                    width: 480,
                    scale: smallScreen ? 1 : 1.5,
                    rotateY: 180,
                    zIndex: 3,
                    transition: { duration: 0.75 },
                }}
            >
                <div className="min-h-[280px] h-auto md:h-full rounded-xl p-4 glossary shadow-xl flex flex-col">
                    <div className="text-white flex flex-end">
                        <MdClose onClick={back} className="cursor-pointer" />
                    </div>
                    <MotionDiv
                        style={{ rotateY: 180 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.75 } }}
                        className="text-white font-sans"
                    >
                        <h1 className="text-xl lg:text-3xl text-white mb-2 leading-tight">{term}</h1>
                        <RichText financialGlossary content={layouts[index].richText} />
                    </MotionDiv>
                </div>
            </MotionDiv>
            {layouts.length > 1 && (
                <>
                    <div className="absolute right-[-200px] top-1/2">
                        <BsChevronRight 
                            className={`text-black text-4xl font-bold ${index === 1 ? "cursor-not-allowed" : "cursor-pointer"}`} 
                            onClick={() => handleIndex(1)} 
                        />
                    </div>
                    <div className="absolute bottom-[-130px] right-1/2">
                        <div className="flex gap-2">
                            {Array.from([0, 1]).map(i => (
                                <span 
                                    key={i} 
                                    className={`block w-4 h-4 rounded-full ${i === index ? "bg-gray-900 scale-125" : "bg-gray-600"}`}
                                ></span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};