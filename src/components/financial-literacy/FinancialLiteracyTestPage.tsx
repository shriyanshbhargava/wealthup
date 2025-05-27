import "@/styles/newstyles.css";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EmailApi } from "@/api/services/notification/EmailApi";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Question } from "@/components/Question";
import { QuestionCard } from '../MyAccount/Dashboard/QuestionCard';
import React from "react";
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { SubmissionForm } from '../MyAccount/Dashboard/SubmitForm'
import { TestApi } from "@/api/services/analytics/TestApi";
import { TestResult } from "@/components/TestResult";
import { UserApi } from "@/api/services/user/UserApi";
import { finknowmeterQuestionsCrumbs } from "@/utils/Breadcrumbs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const QUESTIONS = [
  {
    question: "1. When you purchase a brand-new car...",
    options: [
      {
        content: "You own an asset that is likely to appreciate in value",
        num: "1",
        points: 0,
      },
      {
        content:
          "Your net worth will probably decrease immediately by at least 5% of the car’s purchase price",
        num: "2",
        points: 1,
      },
      {
        content:
          "Your new car insurance premium is lower than that for older-model used cars",
        num: "3",
        points: 0,
      },
      {
        content:
          "Your new car registration price is lower than that for older-model used cars",
        num: "4",
        points: 0,
      },
      { content: "Not sure", num: "5", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "2. When you have taken a loan, in order to repay the minimum total amount how long should the loan be taken for? ",
    options: [
      { content: "3-year", num: "1", points: 1 },
      { content: "5-year", num: "2", points: 0 },
      { content: "7-year", num: "3", points: 0 },
      { content: "10-year", num: "4", points: 0 },
      { content: "Not sure", num: "5", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question: "3. What are loan payments based on?",
    options: [
      { content: "Amount of borrowing", num: "1", points: 0 },
      { content: "Interest rate", num: "2", points: 0 },
      { content: "Length of the loan", num: "3", points: 0 },
      { content: "First and second options only", num: "4", points: 0 },
      { content: "All of the above", num: "5", points: 1 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question: "4. If the current inflation rate is at 5%...",
    options: [
      {
        content:
          "Investments in securities (stock market, mutual funds) adjust to market conditions by 5%",
        num: "1",
        points: 0,
      },
      {
        content:
          "Retirement or pension plans adjust to market conditions by 5%",
        num: "2",
        points: 0,
      },
      {
        content:
          "My net income needs to increase by 5% to maintain my current lifestyle",
        num: "3",
        points: 0,
      },
      {
        content:
          "My savings need to increase by 5% to maintain my current lifestyle",
        num: "4",
        points: 1,
      },
      { content: "Not sure", num: "5", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "5. If you can’t pay all your credit card bills completely, the best way is to... ",
    options: [
      {
        content:
          "Pay more than the minimum monthly payments on all your credit cards",
        num: "1",
        points: 0,
      },
      {
        content: "Pay completely the card with the lowest balance first",
        num: "2",
        points: 0,
      },
      {
        content:
          "Pay the minimum monthly payments on all credit cards and the remaining on the card with the highest interest rate",
        num: "3",
        points: 1,
      },
      {
        content: "Pay the maximum payment on the card with the highest balance",
        num: "4",
        points: 0,
      },
      { content: "Not sure", num: "5", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "6. What should you be prepared to pay prior to moving into a rental property?",
    options: [
      { content: "Current rent", num: "1", points: 0 },
      { content: "New rent", num: "2", points: 0 },
      { content: "Security deposit", num: "3", points: 0 },
      { content: "Expenses associated with utilities", num: "4", points: 0 },
      { content: "All of the above", num: "5", points: 1 },
      { content: "Not sure", num: "6", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "7. If inflation is at 5%, which one is most likely to lose 5% purchasing power?",
    options: [
      { content: "Stock market", num: "1", points: 0 },
      { content: "Real estate", num: "2", points: 0 },
      { content: "Cash", num: "3", points: 1 },
      { content: "Commodities", num: "4", points: 0 },
      { content: "Bonds", num: "5", points: 0 },
      { content: "Not sure", num: "6", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "8. What is most important to decide the interest rate on your loan?",
    options: [
      { content: "Amount and duration of the loan", num: "1", points: 0 },
      { content: "Type of the loan", num: "2", points: 0 },
      { content: "Your credit points", num: "3", points: 0 },
      { content: "Second and Third options only", num: "4", points: 1 },
      { content: "All the above", num: "5", points: 0 },
      { content: "Not sure", num: "6", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "9. Which of the following categories influence your credit points?",
    options: [
      { content: "Outstanding debt", num: "1", points: 0 },
      { content: "Payment history", num: "2", points: 0 },
      { content: "Types of credit used", num: "3", points: 0 },
      { content: "First and second options only", num: "4", points: 0 },
      { content: "All of the above", num: "5", points: 1 },
      { content: "Not sure", num: "6", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
  {
    question:
      "10. The biggest risk of owning long-term bonds for capital preservation is:",
    options: [
      { content: "Falling interest rates", num: "1", points: 0 },
      { content: "Rising interest rates", num: "2", points: 1 },
      { content: "Falling rupee", num: "3", points: 0 },
      { content: "Rising rupee", num: "4", points: 0 },
      { content: "Real estate prices", num: "5", points: 0 },
      { content: "Not sure", num: "6", points: 0 },
    ],
    answered: false,
    answer: "",
    content: true,
  },
];

const FinancialLiteracyTestPage = () => {
  const [questions, setQuestions] = React.useState(QUESTIONS);
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [totalScore, setTotalScore] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<string>("");
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [additionalData, setAdditonalData] = React.useState<{ phone?: string; email?: string; }>({});

  const router = useRouter();

  const handleNext = () => {
    setSelected("");
    if (currentQuestion >= 0 && currentQuestion < questions.length - 1) {
      const foundQuestion = questions.find((_, i) => i === currentQuestion + 1);
      if (foundQuestion) {
        setSelected(foundQuestion.answer);
      }
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    setSelected("");
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      const foundQuestion = questions.find((_, i) => i === currentQuestion - 1);
      if (!!foundQuestion) {
        setSelected(foundQuestion.answer);
      }
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = async (_: string | number | string[], content: string | undefined) => {
    if (currentQuestion !== questions.length) {
      const options = questions[currentQuestion].options;
      const selectedOptions = options.find(op => op.content === content);
      if (selectedOptions) {
        const points = selectedOptions.points;
        // const points =
        //   questions[currentQuestion].options[parseInt(selected) - 1].points;
        setTotalScore(totalScore + points);
      }
      const questionsWithAnswers = [...questions];
      questionsWithAnswers[currentQuestion].answered = true;
      questionsWithAnswers[currentQuestion].answer = content!;
      setQuestions(questionsWithAnswers);
      handleNext();
    }


    const tokens = Storage.getToken();

    if (
      questions.every(
        (question) =>
          question.answered === true && currentQuestion === questions.length - 1
      ) &&
      tokens === null
    ) {
      setShowResult(true);
    } else if (
      questions.every(
        (question) =>
          question.answered === true && currentQuestion === questions.length - 1
      ) &&
      tokens !== null
    ) {
      const userApiClient = new UserApi(tokens.access_token);
      const res: Response = await userApiClient.getMe();

      if (res.status === 200) {
        const me = await res.json();

        if (!me?.first_name || me?.first_name === null) {
          setAdditonalData({ email: me?.email, phone: me?.phone });
          setShowResult(true);
          return;
        }

        handleSubmit({
          name: me?.first_name,
          phone: me.phone,
          email: me?.email ?? "",
        });
      } else {
        setShowResult(true);
        return;
      }
    } else if (currentQuestion === questions.length - 1) {
      toast.error("Please select all answers");
    }
  };

  React.useEffect(() => {
    const removeErrorMessage = () => {
      setTimeout(() => {
        setError(false);
      }, 5000);
    };

    return removeErrorMessage();
  }, [error === true]);

  const handleSelectQuestion = (i: number) => {
    setSelected("");
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      const foundQuestion = questions.find((_, index) => i === index);
      if (!!foundQuestion) {
        setSelected(foundQuestion.answer);
      }
      setCurrentQuestion(i);
    }
  };

  const handleSubmit = async (props: any) => {
    setSubmitting(true);
    setSubmitted(true);
    let level = "Beginner";
    let template = 9;
    if (totalScore <= 7 && totalScore > 4) {
      level = "Intermediate";
      template = 8;
    }
    if (totalScore > 7) {
      level = "Advanced";
      template = 7;
    }

    try {
      const testApi = new TestApi();
      const res: Response = await testApi.postData("financialliteracy", {
        name: props.name,
        phone: props.phone,
        templateId: template,
        subject: `${props.name} -- Your FinknowMeter result by wealthup.me is now available`,
        response: {
          0: questions.map((que) => {
            return {
              question: que.question,
              answer: que.answer,
            };
          }),
        },
        score: totalScore,
        level,
        email: props.email,
        token: Storage.getReferral()
      });

      if (res.status === 201) {
        router.push(`/myaccount/finlit`);
      } else {
        setSubmitting(false);
        toast.error("Something went wrong...");
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  const showSubmissionPage = () => {
    const tokens = Storage.getToken();
    if (questions.every((question) => question.answered === true)) {
      if (tokens === null) setShowResult(true);
    } else {
      toast.error("Answer all questions.");
    }
  };

  return (
    <>
      <Header />
      <div className="wealtho-gradient">
      {submitting ? (
        <div className="z-50 fixed top-0 right-0 w-screen h-screen bg-white text-secondary opacity-25">
          <div className="flex items-center justify-center">
            <Spinner color="black" size="8" />
          </div>
        </div>
      ) : null}
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
      {!showResult ? (
        <div className='flex flex-col gap-2'>
          <div className="mt-10 lg:mt-4 ml-8">
            <Breadcrumbs crumbs={finknowmeterQuestionsCrumbs} />
          </div>
          <div className="flex flex-col justify-center
           gap-2 items-center py-4 md:py-0 px-6 md:px-0 ">
            <h1 className="text-white text-4xl sm:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-bolder leading-tight font-poppins capitalize md:mb-2">
              FinknowMeter Quiz
            </h1>
            <div className="w-full sm:mx-6 lg:mx-0 lg:w-3/5 flex justify-center items-center">
            <button disabled={currentQuestion === 0} onClick={handlePrevious} className="hidden md:block cursor-pointer text-white w-4 h-4 md:w-10 md:h-10 mr-4">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.575 19.4124L12.175 14.9999L16.575 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
            <QuestionCard
                  question={questions[currentQuestion]}
                  handleSelectOption={handleOptionSelect}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  currentQuestion={currentQuestion}
                  finknowmeter
                  questionsWithoutCondition={questions}
                  handleSelectQuestion={handleSelectQuestion}
                />
                 <button onClick={handleNext} className="hidden md:block cursor-pointer text-white w-4 h-4 md:w-10 md:h-10 ml-4">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.425 19.4124L17.825 14.9999L13.425 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
            </div>
            {/* <div className="flex flex-col">
              <div className="flex">
                {questions.map((_, i) => (
                  <div className="flex items-center" key={i}>
                    <span
                      onClick={() => handleSelectQuestion(i)}
                      className={`cursor-pointer w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center font-robo rounded-full ${questions[i].answered ? "bg-primary-new text-white" : "bg-primary-lighter text-black"
                        }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`${i === questions.length - 1 ? "hidden" : "bock"
                        } w-5 sm:w-8 md:w-10 lg:w-20 h-2 ${questions[i].answered ? "bg-primary-new" : "bg-primary-lighter"
                        }`}
                    ></span>
                  </div>
                ))}
              </div>
              
            </div> */}
          </div>
        </div>
      ) : (
        // </div>
        <div className="flex items-center justify-center mt-[6.5rem]">
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
          additionData={additionalData}
          setShowResult={setShowResult}
          login
        />
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default FinancialLiteracyTestPage;
