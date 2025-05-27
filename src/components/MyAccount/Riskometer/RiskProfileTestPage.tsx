import "@/styles/newstyles.css";

import { RiskProfileCrumbs, riskometerQuestionCrumbs } from "@/utils/Breadcrumbs";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { EmailApi } from "@/api/services/notification/EmailApi";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Question } from "@/components/Question";
import { QuestionCard } from '@/components/MyAccount/Dashboard/QuestionCard';
import React from "react";
import { Spinner } from "@/components/ui/Spinner";
import Storage from "@/utils/storage";
import { SubmissionForm } from '@/components/MyAccount/Dashboard/SubmitForm'
import { TestApi } from "@/api/services/analytics/TestApi";
import { TestResult } from "@/components/TestResult";
import { UserApi } from "@/api/services/user/UserApi";
import { apiUrl } from "@/utils/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const QUESTIONS = [
  {
    question:
      "1. If you're investing Rs. 1 lakh, which lock-in period will you choose? Return is higher in longer lock-in period.",
    options: [
      { content: "Up to two years", num: "1", points: 1 },
      { content: "Two to three years", num: "2", points: 2 },
      { content: "Three to five years", num: "3", points: 3 },
      { content: "Five to ten years", num: "4", points: 4 },
      { content: "More than ten years", num: "5", points: 5 },
    ],
    answered: false,
    answer: "",
    content: true,
    single: false,
  },
  {
    question: "2. The age group you belong to:",
    options: [
      { content: "Less than 25 years", num: "1", points: 4 },
      { content: "25-35 years", num: "2", points: 3 },
      { content: "36-50 years", num: "3", points: 2 },
      { content: "51 years & above", num: "4", points: 1 },
    ],
    answered: false,
    answer: "",
    content: true,
    single: false,
  },
  {
    question: "3. How well do you understand investing?",
    options: [
      { content: "I don't understand it much", num: "1", points: 1 },
      {
        content:
          "I have basic understanding of investing, but haven't invested much",
        num: "2",
        points: 2,
      },
      // Remove the rest of options (I think)
      {
        content:
          "I have invested earlier. I understand different investment classes and the risks",
        num: "3",
        points: 3,
      },
      {
        content:
          "I am an experienced investor. I understand different investment strategies",
        num: "4",
        points: 4,
      },
    ],
    answered: false,
    answer: "",
    single: true,
    content: true
  },
  {
    question:
      "4. How stable is your income?",
    options: [
      { content: "Very unstable", num: "1", points: 1 },
      { content: "Unstable", num: "2", points: 2 },
      { content: "Somewhat stable", num: "3", points: 3 },
      { content: "Stable", num: "4", points: 4 },
      { content: "Very stable", num: "5", points: 5 },
    ],
    answered: false,
    answer: "",
    content: true,
    single: false
  },
  {
    question: "5. How many people are financially dependent on you?",
    options: [
      { content: "0", num: "1", points: 0 },
      {
        content: "1",
        num: "2",
        points: 1,
      },
      {
        content: "2",
        num: "3",
        points: 2,
      },
      {
        content: "3",
        num: "4",
        points: 3,
      },
      {
        content: "More than 3",
        num: "5",
        points: 4,
      },
    ],
    answered: false,
    answer: "",
    content: true,
    single: false
  },
  {
    question:
      "6. When investing for long‐term (more than 5 years), how long will you hold a bad investment before selling it?",
    options: [
      {
        content: "Sell immediately if there is a loss",
        num: "1",
        points: 1,
      },
      { content: "Hold for 3 months before selling it", num: "2", points: 2 },
      { content: "Hold for 6 months before selling it", num: "3", points: 3 },
      { content: "Hold for 1 year before selling it", num: "4", points: 4 },
      {
        content: "Hold for 2 years before selling it",
        num: "5",
        points: 5,
      },
      { content: "Hold for more than 2 years", num: "6", points: 6 },
    ],
    answered: false,
    answer: "",
    content: true,
    single: false,
  },
  {
    question:
      "7. Risky investments usually provide higher returns and tax efficiency. What is your desired balance?",
    options: [
      {
        content: "Guaranteed returns, no tax efficiency",
        num: "1",
        points: 1,
      },
      {
        content: "Stable returns, minimal tax efficiency",
        num: "2",
        points: 2,
      },
      {
        content: "Some variability in returns, some tax efficiency",
        num: "3",
        points: 3,
      },
      {
        content: "Moderate variability in returns, reasonable tax efficiency",
        num: "4",
        points: 4,
      },
      {
        content:
          "Unstable returns, maximum tax efficiency",
        num: "5",
        points: 5,
      },
    ],
    answered: false,
    answer: "",
    content: true,
    single: true,
  },
  {
    question:
      "8. If a few months after investing, the value of your investments declines by 20%, what would you do?",
    options: [
      {
        content:
          "Sell all investments",
        num: "1",
        points: 1,
      },
      {
        content:
          "Sell loss making investments and transfer them to safer investments",
        num: "2",
        points: 2,
      },
      {
        content:
          "You would be worried, but wait a little before making any decision",
        num: "3",
        points: 3,
      },
      {
        content:
          "Nothing. You except volatility in investments as a part of investing",
        num: "4",
        points: 4,
      },
    ],
    answered: false,
    answer: "",
    content: true,
    single: true
  },
  {
    question:
      "9. What range of returns would you be comfortable with?",
    options: [
      {
        content: "From -1% to 15%",
        num: "1",
        points: 1,
      },
      {
        content: "From -5% to 20%",
        num: "2",
        points: 2,
      },
      {
        content: " From -10% to 25%",
        num: "3",
        points: 3,
      },
      {
        content: " From -14% to 30%",
        num: "4",
        points: 4,
      },
      {
        content: " From -18% to 35%",
        num: "5",
        points: 5,
      },
      {
        content: " From -21% to 40%",
        num: "6",
        points: 6,
      },
    ],
    answered: false,
    answer: "",
    content: true,
    single: false
  },
];

const RiskProfileTestPage = () => {
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
      if (!!foundQuestion) {
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
    setCurrentQuestion(i);
  };

  const handleSubmit = async (props: any) => {
    
    setSubmitting(true);
    setSubmitted(true);
    // Todo: Send the user to the report for this in the dashboard
    let level = "Conservative";
    let template = 4;

    if (totalScore <= 29 && totalScore > 19) {
      level = "Moderate";
      template = 5;
    }
    if (totalScore > 29) {
      level = "Agressive";
      template = 6;
    }

    try {
      const testApi = new TestApi();
      const res: Response = await testApi.postData("riskprofile", {
        name: props.name,
        phone: props.phone,
        templateId: template,
        subject: `${props.name} -- Your RiskoMeter result by wealthup.me is now available`,
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
        router.push(`/myaccount/riskometer`);
      } else {
        setSubmitting(false);
        toast.error("Something went wrong...");
      }

      // Send to the dashboard (RiskoMeter page)
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
      <div className="wealtho-gradient flex flex-col gap-8 justify-center align-center items-center  pt-8 lg:pt-4 min-h-[700px]" >
        <div className="flex justify-start w-full container">
          <Breadcrumbs crumbs={RiskProfileCrumbs} />
        </div>
        <h1 className="text-white mb-0 text-4xl sm:text-5xl text-center xsm:text-4xl xxsm:text-3xl font-bolder leading-tight font-poppins capitalize">
          Check your Risk profile
        </h1>
        <div className="sm:mx-6 lg:mx-0 w-full lg:w-3/5 h-auto my-0">
          <div className="flex w-full h-full items-center justify-center">
            {showResult ? (
              <>
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
              </>
            ) : (
              <>
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
                  riskometer
                  handleSelectQuestion={handleSelectQuestion}
                  questionsWithoutCondition={questions}
                />
                <button onClick={handleNext} className="hidden md:block cursor-pointer text-white w-4 h-4 md:w-10 md:h-10 ml-4">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 27.5C21.9038 27.5 27.5 21.9038 27.5 15C27.5 8.09625 21.9038 2.5 15 2.5C8.09625 2.5 2.5 8.09625 2.5 15C2.5 21.9038 8.09625 27.5 15 27.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.425 19.4124L17.825 14.9999L13.425 10.5874" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RiskProfileTestPage;
