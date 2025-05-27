"use client"

import "@/styles/newstyles.css";

import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NEW_ORDERED_QUESTIONS, QUESTIONS, SLIDER_QUESTIONS } from "./questions";
import { QuestionWithChoice, QuestionWithInput } from "./Question";
import React, { useEffect, useState } from "react";
import { apiUrl, baseUrl } from "@/utils/constants";

import { AnalysisApi } from "@/api/services/analytics/AnalysisApi";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EmailApi } from "@/api/services/notification/EmailApi";
import Footer from "@/components/ui/footer";
import FullWindowModel from "@/components/ui/FullWindowModel";
import Header from "@/components/ui/header";
import { HeroSection } from '../../Wealthometer/landing-page/HeroSection'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Link from "next/link";
import NavBar from "@/components/Navbar";
import { QuestionCard } from "./QuestionCard";
import Script from 'next/script';
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { SubmissionForm } from './SubmitForm'
import { TestApi } from "@/api/services/analytics/TestApi";
import { TestResult } from "@/components/TestResult";
import { UserApi } from "@/api/services/user/UserApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { wealthometerQuestionsCrumbs } from "@/utils/Breadcrumbs";

export const WealthoMeterQuestions = () => {
  const [previousDisable, setpreviousDisbale] = useState(true);
  const [questions, setQuestions] = React.useState(SLIDER_QUESTIONS);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<string>("");
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [buttonClick, setButtonClick] = React.useState<string>("");
  const [questionsWithoutCondition, _] = React.useState(
    questions.filter((question) => !question.condition)
  );
  const [selectedQuestion, setSelectedQuestion] = React.useState<typeof SLIDER_QUESTIONS[0]>(questions[0]);
  const [additionalData, setAdditonalData] = React.useState<{ phone?: string; email?: string; }>({});
  const [sliderValue, setSliderValue] = useState<any>()

  // const removedIds = ['monthly-savings', 'age', 'investments'];
  // const [removedQuestionAnswers, setRemovedQuestionAnswers] = React.useState<any>({});

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = Storage.getToken();
  //       if (token !== null) {
  //         const api = new UserApi(token.access_token)
  //         const res: Response = await api.getRetirementAge()
  //         const json = await res.json()
  //         if (res.ok) {
  //           const dob = json.dob;
  //           const age = new Date().getFullYear() - new Date(dob).getFullYear();
  //           const answers = {
  //             'monthly-savings': json.monthly_savings,
  //             'age': age,
  //             'investments': json.value_of_investments
  //           }
  //           setRemovedQuestionAnswers(answers)

  //           const newQuestions = QUESTIONS.filter(
  //             (question) => !removedIds.includes(question.id)
  //           );
  //           setQuestions(newQuestions);
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // React.useEffect(() => {
  //   const allQuestionsAnswered = questionsWithoutCondition.every((question) => question.answered === true);
  //   if (allQuestionsAnswered) {
  //     const orderedQuestions = QUESTIONS.map((question) => {
  //       const foundQuestion = questions.find((q) => q.id === question.id);
  //       if (foundQuestion) {
  //         question.answer = foundQuestion.answer;
  //       }
  //       return question;
  //     });
  //     setSelectedQuestion(orderedQuestions[0]);
  //   }
  // }, [questions]);

  const handleShare = (platfrom: string) => { };

  const showSubmissionPage = () => {
    const tokens = Storage.getToken();
    if (
      questionsWithoutCondition.every((question) => question.answered === true)
    ) {
      if (tokens === null) setShowResult(true);
    } else {
      toast.error("Answer all questions.");
    }
  };

  const { push, back, replace } = useRouter();

  const router = useRouter();
  React.useEffect(() => {
    router.push(`?question=1`)
  }, [])

  React.useEffect(() => {
    const isConditionEqual =
      questions[currentQuestion]?.condition &&
      questions[currentQuestion - 1].answer ===
      questions[currentQuestion]?.condition;

    if (buttonClick === "next" && isConditionEqual) {
      handleNext();
    } else if (buttonClick === "previous" && isConditionEqual) {
      handlePrevious();
    }
    if (currentQuestion !== 0) {
      setpreviousDisbale(false);
    }
    const question = questions[currentQuestion]?.question;
    const questionNumber = question?.split(' ')[0];
    push(`?question=${questionNumber}`)
  }, [currentQuestion, buttonClick, push, questions]);

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      return;
    }
    if (currentQuestion === questions.length - 2) {
      const ans = questions[currentQuestion].answer;
      if (!ans || ans === "40000") {
        return;
      }
    }
    console.log(sliderValue)

    const nextQuestion = questions[currentQuestion + 1];
    const prevQuestion = questions[currentQuestion];

    if (currentQuestion === 4 && sliderValue >= 25000) {
      setCurrentQuestion(5)
      return
    } else if (currentQuestion === 5 && typeof (questions[2].estimatevalue) === "number" && questions[2].estimatevalue > 50000) {
      setCurrentQuestion(6)
      return
    } else if (currentQuestion === 7 && sliderValue > 500000) {
      setCurrentQuestion(8)
      return
    } else if (currentQuestion === 7 && sliderValue < 500000) {
      return
    }

    let conditionCheck = true;
    if (nextQuestion.condition) {
      const conditionOption = prevQuestion.options.find(
        (o) => o.content === prevQuestion.answer
      )
      if (conditionOption) {
        const conditionAnswerValue = conditionOption.num;
        conditionCheck = conditionAnswerValue >= nextQuestion.condition;
      } else {
        conditionCheck = false;
      }
    }

    if (conditionCheck === false) {
      if (currentQuestion === 4) {
        setCurrentQuestion(currentQuestion + 3);
      } else {
        setCurrentQuestion(currentQuestion + 2);
      }
      return;
    }

    // console.log("q", currentQuestion)

    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      setpreviousDisbale(true);
    }
    if (currentQuestion === 0) return;
    setButtonClick("previous");
    setSelected("");

    const foundQuestion = questions.find((_, i) => i === currentQuestion - 1);
    if (!!foundQuestion) {
      setSelected(foundQuestion.answer);
    }

    const prevQuestion = questions[currentQuestion - 1];
    const quesBeforePrevQuestion = questions[currentQuestion - 2];

    let conditionCheck = true;
    if (prevQuestion.condition) {
      const conditionOption = quesBeforePrevQuestion.options.find(
        (o) => o.content === quesBeforePrevQuestion.answer
      )
      if (conditionOption) {
        const conditionAnswerValue = conditionOption.num;
        conditionCheck = conditionAnswerValue >= prevQuestion.condition!;
      } else {
        conditionCheck = false;
      }
    }

    if (conditionCheck === false) {
      if (currentQuestion === 4) {
        const prevQuestion = questions[currentQuestion - 2];
        const quesBeforePrevQuestion = questions[currentQuestion - 3];

        let conditionCheck = true;
        if (prevQuestion.condition) {
          const conditionOption = quesBeforePrevQuestion.options.find(
            (o) => o.content === quesBeforePrevQuestion.answer
          )
          if (conditionOption) {
            const conditionAnswerValue = conditionOption.num;
            conditionCheck = conditionAnswerValue >= prevQuestion.condition!;
          } else {
            conditionCheck = false;
          }
        }

        if (conditionCheck === false) {
          setCurrentQuestion(currentQuestion - 3);
        } else {
          setCurrentQuestion(currentQuestion - 2);
        }
      } else {
        setCurrentQuestion(currentQuestion - 2);
      }
      return;
    }

    setCurrentQuestion(currentQuestion - 1);
  };

  /**
   * Checks if all the questions are answered and submits the data
   * @returns Promise<void>
   */
  const handleSubmitData = async () => {
    const tokens = Storage.getToken()!;

    if (((currentQuestion === questions.length - 2
      && questions[currentQuestion].answer === "400000" && questions.filter(q => !q.condition).every(
        (question) => question.answered === true
      )) ||
      (currentQuestion === questions.length - 1 &&
        questions.filter(q => !q.condition).every(
          (question) => question.answered === true
        ))
      ||
      questions[questions.length - 2].answer === "400000" && questions.filter(q => !q.condition).every(
        (question) => question.answered === true
      )
      ||
      (questions[questions.length - 2].answer !== "400000" && questions.filter(q => !q.condition).every(
        (question) => question.answered === true
      ) && questions[questions.length - 1].answer.length)
    ) &&
      tokens === null
    ) {
      setShowResult(true);
    } else if (
      ((currentQuestion === questions.length - 2
        && questions[currentQuestion].answer === "400000" && questions.filter(q => !q.condition).every(
          (question) => question.answered === true
        )) ||
        (currentQuestion === questions.length - 1 &&
          questionsWithoutCondition.every(
            (question) => question.answered === true
          ))
        ||
        questions[questions.length - 2].answer === "400000" && questions.filter(q => !q.condition).every(
          (question) => question.answered === true
        )
        ||
        (questions[questions.length - 2].answer !== "400000" && questions.filter(q => !q.condition).every(
          (question) => question.answered === true
        ) && questions[questions.length - 1].answer.length)
      ) &&
      tokens !== null
    ) {
      setSubmitting(true);
      const userApiClient = new UserApi(tokens.access_token);
      const res: Response = await userApiClient.getMe();

      if (res.status === 200) {
        const me = await res.json();

        if (!me?.first_name || me?.first_name === null) {
          setAdditonalData({ email: me?.email, phone: me?.phone });
          setSubmitting(false);
          setShowResult(true);
          return;
        }

        handleSubmit({
          name: me?.first_name,
          phone: me.phone,
          email: me?.email ?? "",
          id: me?._id,
        });
      } else {
        setSubmitting(false);
        setShowResult(true);
        return;
      }
    } else if ((currentQuestion === questions.length - 2 && questions[currentQuestion].answer === "Under Rs.5 Lakh") || currentQuestion === questions.length - 1) {
      toast.error("Please select all answers");
    }
  }

  const handleSelectOption = (estimatevalue: string | number | Array<string>, content?: string) => {
    console.log(estimatevalue)
    const ques = [...questions];
    if (typeof estimatevalue === "string" || typeof estimatevalue === "number") {
      console.log("estimate", estimatevalue);
      ques[currentQuestion].estimatevalue = estimatevalue;
      ques[currentQuestion].answer = content || "";
      ques[currentQuestion].answered = true;
      setQuestions(ques);
      if (currentQuestion === 3) {
        ques[currentQuestion + 1].variables.max = parseFloat(content || "")
        ques[currentQuestion + 1].variables.finalValue = parseFloat(content || "")
      }
      if (currentQuestion === 7 && content === "400000") {
        return handleSubmitData()
      }

      if (currentQuestion === questions.length - 1) {
        return handleSubmitData();
      }

      handleNext();
      return;
    }
    const opts = ques[currentQuestion]?.options?.filter(op => estimatevalue.includes(op.content));
    let tempValue = 0;
    for (let i of opts) {
      if (i.estimatevalue > tempValue) tempValue = i.estimatevalue;
    }
    // ques[currentQuestion].answers = estimatevalue;
    ques[currentQuestion].estimatevalue = tempValue;
    ques[currentQuestion].answered = true;
    setQuestions(ques);
  }

  const handleSelectQuestion = (i: number) => {
    setSelected("");
    if (currentQuestion >= 0 && currentQuestion < questions.length) {
      const foundQuestion = questionsWithoutCondition.find(
        (_, index) => i === index
      );
      if (!!foundQuestion) {
        setSelected(foundQuestion.answer);
      }
      if (i == 2) {
        setCurrentQuestion(3);
      } else if (i == 3) {
        setCurrentQuestion(4);
      } else if (i === 4) {
        setCurrentQuestion(7);
      } else {
        setCurrentQuestion(i);
      }
    }
  };

  const handleSubmit = async (props: any) => {
    setSubmitted(true)
    const response = QUESTIONS.map((que) => {
      const foundQuestionFromNewOrder = SLIDER_QUESTIONS.find((q) => q.id === que.id)!;
      const answerValue = foundQuestionFromNewOrder?.estimatevalue === - 1 ? 0 : foundQuestionFromNewOrder?.estimatevalue;
      return {
        question: que?.question,
        answer: foundQuestionFromNewOrder?.answer,
        value: answerValue,
      };
    });

    console.log(response)

    try {
      const testApi = new TestApi();
      const res = (await testApi.postData("wealthometer", {
        name: props.name,
        phone: props.phone,
        response,
        score: 0,
        level: "leve",
        testing: true,
        email: props.email,
        token: Storage.getReferral()
      })) as Response;

      if (localStorage.getItem("analysisId") !== null) {
        const analysisId = JSON.parse(localStorage.getItem("analysisId") ?? "");
        await AnalysisApi.addUserToAnalysis(analysisId.id, props.id);
        localStorage.removeItem("analysisId");
      }


      if (res.status === 201) {
        push(`/myaccount/dashboard`);
      } else {
        toast.error("Something went wrong...");
        setSubmitted(false);
      }
    } catch (err) {
      setSubmitted(false);
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  const optionsQ2 = [
    {
      content: "Up to Rs.10,000", num: "1", estimatevalue: 5000, range: {
        from: 0,
        to: 10000,
      }
    },
    {
      content: "Rs.10,001 - Rs.30,000", num: "2", estimatevalue: 20000, range: {
        from: 10000,
        to: 30000,
      }
    },
    {
      content: "Rs.30,001 - Rs.50,000", num: "3", estimatevalue: 40000, range: {
        from: 30000,
        to: 50000,
      }
    },
    {
      content: "Rs.50,001 - Rs.1,00,000", num: "4", estimatevalue: 75000, range: {
        from: 50000,
        to: 100000,
      }
    },
    {
      content: "Over Rs.1,00,000", num: "5", estimatevalue: 150000, range: {
        from: 100000,
        to: 200000,
      }
    },
  ]

  useEffect(() => {
    if (currentQuestion === 0) {
      setpreviousDisbale(true);
    }
    if (currentQuestion === 4) {
      const allQuestions = [...questions];
      const previousQuestion = allQuestions[currentQuestion - 1];
      const currentQuestionWithOptions = allQuestions[currentQuestion];
      let options = [...currentQuestionWithOptions.options];

      if ((previousQuestion.estimatevalue as number) < 750000) {
        options = options.slice(0, 2);
      } else if ((previousQuestion.estimatevalue as number) < 1500000) {
        if (options.length === 2) {
          options.push(optionsQ2[2]);
        } else {
          options = options.slice(0, 3);
        }
      } else if ((previousQuestion.estimatevalue as number) < 3000000) {
        if (options.length === 2) {
          options.push(optionsQ2[2]);
          options.push(optionsQ2[3]);
        } else if (options.length === 3) {
          options.push(optionsQ2[3]);
        } else {
          options = options.slice(0, 4);
        }
      } else {
        options = optionsQ2
      }

      currentQuestionWithOptions.options = options;
      setSelectedQuestion(currentQuestionWithOptions);
      setSliderValue(currentQuestionWithOptions.answer !== "" ? currentQuestionWithOptions.answer : currentQuestionWithOptions.variables.defaultValue ? currentQuestionWithOptions.variables.defaultValue : currentQuestionWithOptions?.variables?.min)

      console.log({ previousQuestion, currentQuestionWithOptions });
    } else {
      setSelectedQuestion(questions[currentQuestion]);
      setSliderValue(questions[currentQuestion]?.answer !== "" ? questions[currentQuestion].answer : questions[currentQuestion].variables.defaultValue ? questions[currentQuestion].variables.defaultValue : questions[currentQuestion]?.variables?.min)
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    // some logic
  }, [UserApi]);

  return (
    <>
      <script id="fbevent" dangerouslySetInnerHTML={{
        __html: `
          fbq('track', 'Lead');
       `}} />


      {/* <WealthoMeterHeader/> */}
      {/* <NavBar headerSolid={false} backgroundColor="transparent" /> */}
      <Header />
      {submitting ? (
        <div className="z-50 fixed top-0 right-0 w-screen h-screen bg-white text-secondary opacity-25 " id="use-wealthometer">
          <div className="flex items-center justify-center">
            <Spinner size="4" />
          </div>
        </div>
      ) : null}

{/* <div className="hidden md:flex absolute p-4 md:p-8 top-24 md:top-16 right-0 justify-center md:justify-end w-full md:w-auto gap-4 items-center">
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
</div> */}
      {error && (
        <div className="fixed bottom-10 border rounded-xl right-5">
          <div className="bg-white px-6 py-3 rounded-xl shadow-md">
            <span className="text-xl font-robo font-normal">
              Please select all the answers
            </span>
          </div>
          <div className="block bg-red-700 h-2 w-full rounded-b-xl"></div>
        </div>
      )}
      <div className="wealtho-gradient mt-10 md:mt-0">
        <Breadcrumbs crumbs={wealthometerQuestionsCrumbs} />
        <div className="lg:w-full lg:m-auto mt-16 md:mt-0">
          <HeroSection questions />
        </div>
        <div className="mt-[-5rem] md:mt-[-4rem] lg:mt-0 flex pt-6 px-6 lg:px-0 flex-col h-4/5 md:min-h-[430px] justify-center items-center md:h-auto">
          {/* {!showResult && (
            <h1 className="text-xl md:text-2xl font-sans text-gray-200 font-bold mb-4">
              WealthoMeter Assessment
            </h1>
          )} */}
          <div className="sm:mx-6 lg:mx-0 w-full lg:w-3/5 h-auto  md:h-[360px]">
            <div className="flex w-full h-full items-center justify-center">
              {showResult ? (
                <div className="mt-2 flex items-center ">
                  <button onClick={() => setShowResult(false)} className="hidden md:block cursor-pointer text-white w-4 h-4 md:w-10 md:h-10 mr-4">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.575 19.4124L12.175 14.9999L16.575 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <SubmissionForm
                    onBack={() => setShowResult(false)}
                    onSubmit={handleSubmit}
                    submitted={submitted}
                    title="Please enter your details to access your personalised financial scorecard."
                    additionData={additionalData}
                    script="fbq('track', 'CompleteRegistration');"
                    setShowResult={setShowResult}
                    login
                    wealthometer
                  />
                </div>
              ) : (
                <div className="my-8 md:my-0 flex items-center">
                  {!previousDisable && <button id="WOM-back" disabled={currentQuestion === 0} onClick={handlePrevious} className="hidden md:block cursor-pointer text-white w-4 h-4 md:w-10 md:h-10 mr-4">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.575 19.4124L12.175 14.9999L16.575 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>}
                  <QuestionCard
                    question={selectedQuestion}
                    handleSelectOption={handleSelectOption}
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    currentQuestion={currentQuestion}
                    handleSelectQuestion={handleSelectQuestion}
                    questionsWithoutCondition={questionsWithoutCondition}
                    sliderValue={sliderValue}
                    setSliderValue={setSliderValue}
                  />
                  <button id="WOM-front" onClick={() => {
                    handleNext()
                    handleSelectOption(sliderValue, sliderValue.toString())
                  }} className="hidden md:block cursor-pointer text-white w-4 h-4 md:w-10 md:h-10 ml-4">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.425 19.4124L17.825 14.9999L13.425 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* {!showResult && (
            <div className="flex flex-col w-full mb-8">
              <div className="flex justify-center">
                {questionsWithoutCondition.map((_, i) => (
                  <div className="flex items-center" key={i}>
                    <button
                      id={`WOM-q-${i}`}
                      onClick={() => handleSelectQuestion(i)}
                      className={`cursor-pointer w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center font-robo rounded-full ${questionsWithoutCondition[i].answered
                        ? "bg-primary text-white"
                        : "bg-primary-lighter text-black"
                        }`}
                    >
                      {i + 1}
                    </button>
                    <span
                      className={`${i === questionsWithoutCondition.length - 1
                        ? "hidden"
                        : "block"
                        } w-16 lg:w-20 border border-dashed ${questionsWithoutCondition[i].answered
                          ? "border-primary"
                          : "border-primary-lighter"
                        }`}
                    ></span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 w-full justify-center my-4">
                {currentQuestion > 0 ? (
                  <button onClick={handlePrevious} className="w-[130px] bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl">Previous</button>
                ) : (
                  <button className="bg-transparent w-[130px] rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl"></button>
                )
                }
                {(currentQuestion === questions.length - 2 && questions[currentQuestion].answer === "Under Rs.5 Lakh") || (
                  questions.filter(q => !q.condition).every((question) => question.answered === true)
                ) ? (
                  <button onClick={handleSubmitData} className="w-[130px] bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl">Submit</button>
                ) : currentQuestion !== questions.length - 1 ? (
                  <button onClick={handleNext} className="w-[130px] bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl">Next</button>
                ) : (
                  <button onClick={handleSubmitData} className="w-[130px] bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl">Submit</button>
                )}
              </div>
            </div>
          )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};
