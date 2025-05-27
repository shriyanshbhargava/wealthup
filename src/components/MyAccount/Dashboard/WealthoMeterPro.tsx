import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import React, { useContext, useEffect, useState } from 'react'

import Input from '@/components/ui/Input';
import { ProfileContext } from '@/components/DashboardLayout';
import { QUESTIONS } from './questions'
import { Spinner } from '@/components/ui/Spinner';
import Storage from '@/utils/storage';
import { TestApi } from '@/api/services/analytics/TestApi';
import { UserApi } from '@/api/services/user/UserApi';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const questionsWithAnswers = QUESTIONS.map(q => {
    return {
        question: q.question,
        estimatevalue: '',
        answer: '',
        pro: q.pro,
        options: q.options
    }
})

const WealthoMeterPro = () => {
    const [allQuestions, setAllQuestions] = useState(questionsWithAnswers);
    const [questions, setQuestions] = useState(questionsWithAnswers.filter(q => q.pro));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const { user } = useContext(ProfileContext)!;
    const { push } = useRouter();
    

    // Show the range input (which would have values from and to from the answer that was previously selected)

    useEffect(() => {
        // fetch wealthometer data and put it here
        const { access_token } = Storage.getToken()!;
        const userApiClient = new UserApi(access_token);

        (async () => {
            const res: Response = await userApiClient.getWealthometer();
            if (res.ok) {
                const json = await res.json();
                let responses = json.response as typeof questions;

                console.log({ responses })

                let updatedAllQuestions = [...allQuestions] as any;
                let updatedQuestions = [...questions] as any;

                updatedAllQuestions = updatedAllQuestions.map((question: typeof questions[0]) => {
                    const foundQuestion = responses.find((q: typeof questions[0]) => q.question === question.question);
                    if (foundQuestion) {
                        return {
                            ...question,
                            estimatevalue: foundQuestion.estimatevalue,
                            answer: foundQuestion.answer
                        }
                    }
                    return question;
                })

                updatedQuestions = updatedQuestions.map((question: typeof questions[0]) => {
                    const foundQuestion = responses.find((q: typeof questions[0]) => q.question === question.question);
                    if (foundQuestion) {
                        return {
                            ...question,
                            estimatevalue: foundQuestion.estimatevalue,
                            answer: foundQuestion.answer
                        }
                    }
                    return question;
                })
                setQuestions(updatedQuestions)
                setAllQuestions(updatedAllQuestions)
                setLoaded(true);
            }
        })()
    }, [allQuestions, questions]);

    const handleNext = () => {
        if (currentQuestion === questions.length - 1) {
            return handleSubmit();
        }
        setCurrentQuestion(currentQuestion + 1);
    }

    const handlePrevious = () => {
        if (currentQuestion === 0) {
            return;
        }
        setCurrentQuestion((curr) => curr - 1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const estimatevalue = e.target.value;
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestion] = {
            ...updatedQuestions[currentQuestion],
            estimatevalue,
        };
        setQuestions(updatedQuestions);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleNext();
        }
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        let response = [...allQuestions];
        const newResponses = [...questions];

        const foundLastOption = response.find(el => el.question === "9.a Where do you invest? (Select all that apply and click submit)");
        if (foundLastOption) {
            response.pop();
            response.splice(5, 0, foundLastOption);
        }

        response = response.map(res => {
            const option = newResponses.find(el => el.question === res.question);
            if (option) {
                return {
                    ...res,
                    estimatevalue: option.estimatevalue,
                }
            }
            return res;
        })



        try {
            const testApi = new TestApi();
            const res = (await testApi.postData("wealthometer", {
                name: user!.first_name!,
                phone: user!.phone!,
                response,
                email: user?.email ?? '',
            })) as Response;

            if (res.status === 201) {
                push(`/myaccount/wealthometer`);
                setSubmitting(false);
            } else {
                const json = (await res.json());
                toast.error(json.message ?? 'Something went wrong');
                setSubmitting(false);
                // setSubmitted(false);
            }
        } catch (err) {
            //   setSubmitted(false);
            toast.error("Something went wrong.");
            setSubmitting(false);
            console.log(err);
        }
    };

    const getMinRange = () => {
        const options = questions[currentQuestion].options as any;
        const answer = questions[currentQuestion].estimatevalue;

        console.log(questions[currentQuestion])

        let selectedOption = options.find((op: any) => {
            if (typeof op.estimatevalue === 'number') {
                return op.estimatevalue === parseInt(answer)
            }
            return op.estimatevalue === answer
        });
        if (!selectedOption) selectedOption = options[0];
        return selectedOption.range.from
    }

    const getMaxRange = () => {
        const options = questions[currentQuestion].options as any;
        const answer = questions[currentQuestion].estimatevalue;

        let selectedOption = options.find((op: any) => {
            if (typeof op.estimatevalue === 'number') {
                return op.estimatevalue === parseInt(answer)
            }
            return op.estimatevalue === answer
        });
        if (!selectedOption) selectedOption = options[0];
        return selectedOption.range.to
    }

    return (
        <div className='bg-white h-[calc(50vh)] md:h-screen'>
            <h1 className='px-4 text-3xl md:text-5xl mt-4 '>WealthoMeter Pro</h1>
            <div className='flex w-full h-full items-center justify-center mt-8 mb-8'>
                <div className='w-full max-w-3xl min-h-[185px]'>
                    {loaded ? (
                        <div className="w-full">
                            <div className='w-full flex items-center gap-4'>
                                <IoIosArrowBack
                                    // size={40}
                                    onClick={handlePrevious}
                                    className="cursor-pointer hover:text-primary w-4 h-4 md:w-10 md:h-10"
                                />
                                <div className='w-full flex flex-col'>
                                    <h4>{questions[currentQuestion].question.replace(/^[0-9]\.\s/, '')}</h4>
                                    <Input value={questions[currentQuestion].estimatevalue} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    {/* <input type="range" min={getMinRange()} max={getMaxRange()} value={questions[currentQuestion].value} onChange={handleChange} /> */}
                                </div>
                                <IoIosArrowForward
                                    // size={40}
                                    onClick={
                                        handleNext}
                                    className="cursor-pointer hover:text-primary w-4 h-4 md:w-10 md:h-10"
                                />
                            </div>
                            <div className='flex mt-8 justify-between mx-4'>
                                {currentQuestion === 0 ? (
                                    <span></span>
                                ) : (
                                    <button className="btn" onClick={handlePrevious}>Previous</button>
                                )}
                                <button className="btn" disabled={submitting} onClick={handleNext}>
                                    {submitting ? <Spinner color='white' /> : (
                                        <>
                                            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                            <Spinner color='black' size='8' />
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}

export default WealthoMeterPro
