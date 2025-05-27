import React, { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TooltipV2 } from '@/components/ui/ToolTip';
import { BsInfoCircle } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import PopOver from '@/components/ui/PopOver';
import Popup from '@/components/ui/popup';
import Slider, { formatValue } from './Slider';
import CurveSlider from './CircularSlider/CircularSlider';
import MobileSlider from './MobileSlider';
// import CustomSlider from './customSlider/customSlider';
// import CircularSlider from './customSlider/customSlider';

type Question = {
    question: string;
    options: Array<{
        content: string;
        num: string;
        estimatevalue?: number | string;
        points?: number;
    }>,
    content?: boolean;
    answer: string;
    answered: boolean;
    estimatevalue?: number | string;
    id?: string;
    answers?: Array<string>;
    info?: string;
    single?: boolean;
    variables?: {
        min: number, max: number, step: number, startValue: number, finalValue: number, isRupee: boolean, defaultValue?: number
    }
}

export const QuestionCard: FC<{
    question: Question;
    handleSelectOption: (estimatevalue: number | string | Array<string>, content?: string) => void,
    handleNext: () => void;
    handlePrevious: () => void;
    currentQuestion: number;
    riskometer?: boolean;
    finknowmeter?: boolean;
    questionsWithoutCondition?: Array<any>;
    handleSelectQuestion?: (estimatevalue: number) => void;
    sliderValue?: any,
    setSliderValue?: any
}> = ({ question, handleSelectOption, handleNext, handlePrevious, currentQuestion, riskometer = false, finknowmeter = false, questionsWithoutCondition, handleSelectQuestion, sliderValue, setSliderValue }) => {
    const [selected, setSelected] = useState(finknowmeter || riskometer ? question.answer : question.estimatevalue);
    const [multiSelected, setMultiSelected] = useState<Array<string>>([]);
    const [windowWidth, setWindowWidth] = useState(400)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener("resize", () => {
                setWindowWidth(window.innerWidth);
            });
        };
    }, []);

    useEffect(() => {
        if (question.content) {
            setSelected(question.answer)
        } else if (riskometer) {
            setSelected(question.answer);
        } else {
            setSelected(question.estimatevalue)
        }
    }, [question])

    useEffect(() => {
        // some logic
    }, [riskometer]);

    const handleSliderChange = (value: any) => {
        console.log('Slider Value:', value);
        setSliderValue(value)
    };

    const formatSliderValue = (val: number, min: number, max: number, isRupee: boolean) => {
        if (val > max) {
            if (!isRupee) {
                return `${max}+`
            } else {
                return `Rs. ${formatValue(max)}+`
            }
        } else if (val < min) {
            return `Under Rs. ${formatValue(min)}`
        } else if (!isRupee) {
            return val
        } else if (val === 0) {
            return `No EF`
        } else {
            return `Rs. ${val.toLocaleString("en-In", {
                maximumFractionDigits: 0
            })}`
        }

    }

    const handleClick = (estimatevalue: number | string, content: string) => {
        // if (question.multiple) {
        //     const selectedValues = [...multiSelected];
        //     if (selectedValues.includes(content)) {
        //         selectedValues.splice(selectedValues.indexOf(content), 1);
        //     } else {
        //         selectedValues.push(content);
        //     }
        //     console.log(selectedValues)
        //     setMultiSelected(selectedValues);
        //     handleSelectOption(selectedValues)
        // }
        setSelected(estimatevalue);
        handleSelectOption(estimatevalue, content);
    }

    const md = useMediaQuery({ minWidth: 768 })

    return (
        <div
            key={question.question}
            className={`rounded-[30px] ${finknowmeter || riskometer ? 'w-[90%]' : 'w-full'} sm:w-[510px] md:w-[620px] mb-20  p-8 bg-white shadow-md overflow-hidden`}
        >
            <div className={`flex justify-center ${riskometer ? 'mb-4 lg:mb-8' : 'mb-8 lg:mb-14'}`}>
                {questionsWithoutCondition && questionsWithoutCondition.map((_, i) => (
                    <div className="flex items-center" key={i}>
                        <button
                            id={`WOM-q-${i}`}
                            onClick={() => handleSelectQuestion!(i)}
                            className={`cursor-pointer w-5 h-5 xsm:w-6 xsm:h-6 sm:w-8 sm:h-8 flex justify-center items-center font-robo rounded-full  ${questionsWithoutCondition[i].answered
                                ? "bg-[#00B3B0] text-white"
                                : "bg-primary-blue text-white"
                                }`}
                        >
                            {i + 1}
                        </button>
                        <button
                            className={`${i === questionsWithoutCondition.length - 1
                                ? "hidden"
                                : "block"
                                } ${riskometer ? 'w-3 xsm:w-6 md:w-10' : finknowmeter ? 'w-2 xsm:w-5 md:w-10' : 'w-10 sm:w-16 lg:w-20'}  border border-dashed  ${questionsWithoutCondition[i].answered
                                    ? "bg-[#00B3B0]"
                                    : "border-primary-blue"
                                }`}
                        ></button>
                    </div>
                ))}
            </div>
            <div>
                <h2 className='flex gap-2 justify-center items-center text-xl md:text-2xl font-normal text-primary-blue mb-8 lg:mb-8'>{question.question}
                    {/* {question.info && (
                        <Popup text={question.info}>
                            <BsInfoCircle className="inline cursor-pointer" id="WOM-i" />
                        </Popup>
                    )} */}
                </h2>
                {/* {question.options.length === 0 &&
                    <div className='flex justify-center items-center sm:justify-end'>
                        <div className='bg-[#00B3B026] border border-[#035782] rounded-md text-[#035782] font-medium px-4 min-w-[80px] mb-2 h-10 flex justify-center items-center'>{question.variables && formatSliderValue(sliderValue, question.variables.min, question.variables.max, question.variables.isRupee)}</div>
                    </div>
                } */}
                <div className='flex flex-wrap items-center lg:justify-center gap-x-5 lg:gap-x-3 gap-y-6'>
                    {question.options.length !== 0 && question.options.map((op, index) => (
                        <label key={op.content} className={`  ${question.id === "age" ? 'min-w-[9rem]' : 'min-w-[12rem]'} ${riskometer && question.single ? '' : finknowmeter ? 'w-max h-max p-2 sm:h-[50px]' : 'md:w-[175px] lg:w-[200px] xl:w-[275px]'} h-[50px] rounded-full hover:bg-primary-lighter ${question.content ? (selected === op.content ? 'bg-primary-lighter' : '') : (selected === op.estimatevalue ? 'bg-primary-lighter' : '')} border border-primary-blue flex items-center justify-center relative`}>
                            <input id="WOM_Q_BTN" name={question.id ?? 'riskometer'} value={op.estimatevalue ?? question.answer} type='radio' className=' opacity-0 absolute inset-0 cursor-pointer z-[2]' onClick={() => handleClick(op.estimatevalue ?? op.points!, op.content)} />
                            <span className='mb-0 text-lg font-medium px-4 text-center text-primary-blue'>{op.content}</span>
                        </label>

                    ))}
                    {question.options.length === 0 && question.variables && windowWidth > 640 && <Slider startValue={question.variables.startValue} finalValue=

                        {question.variables.finalValue} min={question.variables.min} max={question.variables.max} isRupee={question.variables.isRupee} step={question.variables.step} onChange={handleSliderChange} answer={question.answer === "" ? 0 : parseFloat(question.answer)} defaultValue={question.variables.defaultValue} />}

                    {question.options.length === 0 && question.variables && windowWidth < 640 && <MobileSlider isRupee={question.variables.isRupee} min={question.variables.min} max={question.variables.max} step={question.variables.step} setSliderValue={setSliderValue} startValue={question.variables.startValue} finalValue={question.variables.finalValue} answer={question.answer === "" ? 0 : parseFloat(question.answer)} defaultValue={question.variables.defaultValue} />}
                </div>
                <div className='flex md:hidden'>
                    <div className={`w-full flex ${currentQuestion > 0 ? "justify-between" : "justify-end"} items-center mt-8`}>
                        {currentQuestion > 0 && (
                            <button onClick={handlePrevious} className="flex gap-2 cursor-pointer text-primary items-center text-lg font-semibold">
                                <IoIosArrowBack className="text-primary" /> Back
                            </button>
                        )}
                        <button onClick={() => {
                            handleNext()
                            handleClick(sliderValue, sliderValue.toString())
                        }} className="flex gap-2 cursor-pointer text-primary items-center text-lg font-semibold">
                            Next <IoIosArrowForward className="text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
