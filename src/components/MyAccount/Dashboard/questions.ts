export const QUESTIONS = [
  {
    question: "1. What is your gross annual income (or CTC)?",
    options: [
      {
        content: "Under Rs.7.5 Lakh", num: "1", value: 400000, range: {
          from: 0,
          to: 750000
        }
      },
      {
        content: "Rs.7.6 Lakh - 15 Lakh",
        num: "2",
        value: 1200000,
        range: {
          from: 750000,
          to: 1500000,
        }
      },
      {
        content: "Rs.15.1 Lakh - Rs.30 Lakh",
        num: "3",
        value: 2400000,
        range: {
          from: 1500000,
          to: 3000000
        }
      },
      {
        content: "Rs.30.1 Lakh - Rs.50 Lakh",
        num: "3",
        value: 4000000,
        range: {
          from: 3000000,
          to: 5000000,
        }
      },
      {
        content: "Above Rs.50 Lakh",
        num: "4",
        value: 6500000,
        range: {
          from: 5000000,
          to: 9000000,
        }
      },
    ],
    answered: false,
    answer: "",
    value: 0,
    pro: true,
    id: 'ctc'
  },
  {
    question:
      "2. How much money do you save every month (on avg.)?",
    options: [
      {
        content: "Up to Rs.10,000", num: "1", value: 5000, range: {
          from: 0,
          to: 10000,
        }
      },
      {
        content: "Rs.10,001 - Rs.30,000", num: "2", value: 20000, range: {
          from: 10000,
          to: 30000,
        }
      },
      {
        content: "Rs.30,001 - Rs.50,000", num: "3", value: 40000, range: {
          from: 30000,
          to: 50000,
        }
      },
      {
        content: "Rs.50,001 - Rs.1,00,000", num: "4", value: 75000, range: {
          from: 50000,
          to: 100000,
        }
      },
      {
        content: "Over Rs.1,00,000", num: "5", value: 150000, range: {
          from: 100000,
          to: 200000,
        }
      },
    ],
    info: "This means money that is left with you after all expenses like rent, grocery, EMI, shopping, eating out, etc. Expenses DO NOT include SIPs",
    answered: false,
    answer: "",
    value: 0,
    pro: true,
    id: 'monthly-savings'
  },
  {
    question:
      "2.a How much money do you have in your bank account?",
    options: [
      {
        content: "Under Rs.20,000", num: "1", value: 10000, range: {
          from: 0,
          to: 20000,
        }
      },
      {
        content: "Rs.20,000 - Rs.50,000", num: "2", value: 35000, range: {
          from: 20000,
          to: 50000,
        }
      },
      {
        content: "Rs.50,001 - Rs. 1 lakh", num: "3", value: 75000, range: {
          from: 50000,
          to: 100000,
        }
      },
      {
        content: "Rs. 1.1 lakh - Rs. 3 lakh", num: "4", value: 200000, range: {
          from: 100000,
          to: 300000,
        }
      },
      {
        content: "Over Rs. 3 lakhs", num: "5", value: 500000, range: {
          from: 300000,
          to: 1000000,
        }
      },
    ],
    info: "This does not include money in fixed deposit (FD)",
    answered: false,
    answer: "",
    value: 0,
    pro: true,
    id: 'total-savings',
    condition: "2" // will be shown only if others are selected except first one
  },
  {
    question: "2.b How much money do you have in your emergency fund?",
    options: [
      {
        content: "No, I don't have any",
        num: "1",
        value: 0,
        range: {
          from: 0,
          to: 100000,
        }
      },
      {
        content: "Under Rs.2 Lakh",
        num: "2",
        value: 100000,
        range: {
          from: 100000,
          to: 200000,
        }
      },
      {
        content: "Rs.2 Lakh to Rs.5 Lakh",
        num: "3",
        value: 350000,
        range: {
          from: 200000,
          to: 500000,
        }
      },
      {
        content: "Above Rs.5 Lakh",
        num: "4",
        value: 700000,
        range: {
          from: 500000,
          to: 1000000,
        }
      },
    ],
    answered: false,
    answer: "",
    value: -1,
    pro: true,
    id: 'emergency-fund',
    condition: "3" // checks 2.a if amount is more than 50,000
  },

  {
    question: "3. Which age group do you belong to?",
    options: [
      {
        content: "Under 25", num: "1", value: 23
      },
      {
        content: "26 - 30", num: "2", value: 27
      },
      {
        content: "31 - 35", num: "3", value: 32
      },
      {
        content: "36 - 40", num: "4", value: 37
      },
      {
        content: "Above 40", num: "5", value: 45
      },
    ],
    answered: false,
    answer: "",
    value: "",
    id: 'age',
    pro: false
  },
  {
    question: "4. Do you have a life insurance or a personal (outside your job) health insurance policy?",
    options: [
      { content: "None", num: "1", value: 0 },
      {
        content: "Only Health Insurance",
        num: "2",
        value: 1,
      },
      {
        content: "Only Life Insurance",
        num: "3",
        value: 2,
      },
      {
        content: "Both",
        num: "4",
        value: 3,
      },
    ],
    answered: false,
    answer: "",
    value: "",
    id: 'insurance',
    pro: false
  },
  {
    question: "4.a What is the total coverage of your life insurance policies?",
    condition: "3", // only life or both from previous question 
    options: [
      {
        content: "Under Rs.50 Lakh",
        num: "1",
        value: 2500000,
        range: {
          from: 0,
          to: 5000000,
        }
      },
      {
        content: "Rs.50 Lakh - Rs.1 Crore",
        num: "2",
        value: 7500000,
        range: {
          from: 5000000,
          to: 10000000,
        }
      },
      {
        content: "Rs.1.1 Crore - Rs.3 Crore",
        num: "3",
        value: 20000000,
        range: {
          from: 10000000,
          t0: 30000000,
        }
      },
      {
        content: "Above Rs.3 Crore",
        num: "4",
        value: 40000000,
        range: {
          to: 30000000,
          from: 50000000,
        }
      },
    ],
    answer: "",
    answered: false,
    value: 0,
    id: 'life-coverage',
    pro: true
  },
  {
    question:
      "5. What is the total value of your investments?",
    options: [
      {
        content: "Under Rs.5 Lakh",
        num: "1",
        value: 0,
        range: {
          from: 0,
          to: 500000,
        }
      },
      {
        content: "Rs.5 Lakh - Rs.10 Lakh",
        num: "2",
        value: 750000,
        range: {
          from: 500000,
          to: 1000000,
        }
      },
      {
        content: "Rs.10.1 Lakh - Rs.25 Lakh",
        num: "3",
        value: 1500000,
        range: {
          from: 1000000,
          to: 2500000,
        }
      },
      {
        content: "Rs.25.1 Lakh - Rs.1 Crore",
        num: "4",
        value: 5000000,
        range: {
          from: 2500000,
          to: 10000000,
        }
      },
      {
        content: "Above Rs.1 Crore",
        num: "5",
        value: 20000000,
        range: {
          from: 10000000,
          to: 50000000,
        }
      },
    ],
    info: " This includes stocks, mutual funds, bonds, gold (excluding jewellery), real estate excluding your residence, emergency fund, bank balance and cash.",
    answer: "",
    answered: false,
    value: -1,
    id: 'investments',
    pro: true
  },
  {
    question: "5.a Where do you invest mostly?",
    condition: "2", // if investments are above 5 lakh
    options: [
      {
        content: "Leave it in my savings account",
        num: "1",
        value: 0,
      },
      { content: "Put it in an FD", num: "2", value: 1 },
      { content: "Invest in Mutual Funds via SIPs", num: "3", value: 2 },
      {
        content: "Make lump sum investments",
        num: "4",
        value: 2,
      },
      {
        content: "Invest in stocks",
        num: "5",
        value: 2,
      },
    ],
    answered: false,
    answer: "",
    value: -1,
    content: true,
    // multiple: true,
    answers: [] as Array<string>,
    id: 'invest-options',
    pro: false
  },
];

export const NEW_ORDERED_QUESTIONS = [
  {
    question: "1. Which age group do you belong to?",
    options: [
      {
        content: "Under 25", num: "1", estimatevalue: 23
      },
      {
        content: "26 - 30", num: "2", estimatevalue: 27
      },
      {
        content: "31 - 35", num: "3", estimatevalue: 32
      },
      {
        content: "36 - 40", num: "4", estimatevalue: 37
      },
      {
        content: "Above 40", num: "5", estimatevalue: 45
      },
    ],
    answered: false,
    answer: "",
    estimatevalue: "",
    id: 'age',
    pro: false
  },
  {
    question: "2. Do you have a life insurance or a personal (outside your job) health insurance policy?",
    options: [
      { content: "None", num: "1", estimatevalue: 0 },
      {
        content: "Only Health Insurance",
        num: "2",
        estimatevalue: 1,
      },
      {
        content: "Only Life Insurance",
        num: "3",
        estimatevalue: 2,
      },
      {
        content: "Both",
        num: "4",
        estimatevalue: 3,
      },
    ],
    answered: false,
    answer: "",
    estimatevalue: "",
    id: 'insurance',
    pro: false
  },
  {
    question: "2.a What is the total coverage of your life insurance policies?",
    condition: "3", // only life or both from previous question 
    options: [
      {
        content: "Under Rs.50 Lakh",
        num: "1",
        estimatevalue: 2500000,
        range: {
          from: 0,
          to: 5000000,
        }
      },
      {
        content: "Rs.50 Lakh - Rs.1 Crore",
        num: "2",
        estimatevalue: 7500000,
        range: {
          from: 5000000,
          to: 10000000,
        }
      },
      {
        content: "Rs.1.1 Crore - Rs.3 Crore",
        num: "3",
        estimatevalue: 20000000,
        range: {
          from: 10000000,
          t0: 30000000,
        }
      },
      {
        content: "Rs.3 Crore - Rs.5 crore",
        num: "4",
        estimatevalue: 40000000,
        range: {
          to: 30000000,
          from: 50000000,
        }
      },
      {
        content: "Rs.5cr or more",
        num: "5",
        estimatevalue: 70000000,
        range: {
          to: 50000000,
          from: 100000000,
        }
      },
    ],
    answer: "",
    answered: false,
    estimatevalue: 0,
    id: 'life-coverage',
    pro: true
  },
  {
    question: "3. What is your gross annual income (or CTC)?",
    options: [
      {
        content: "Under Rs.7.5 Lakh", num: "1", estimatevalue: 400000, range: {
          from: 0,
          to: 750000
        }
      },
      {
        content: "Rs.7.6 Lakh - 15 Lakh",
        num: "2",
        estimatevalue: 1200000,
        range: {
          from: 750000,
          to: 1500000,
        }
      },
      {
        content: "Rs.15.1 Lakh - Rs.30 Lakh",
        num: "3",
        estimatevalue: 2400000,
        range: {
          from: 1500000,
          to: 3000000
        }
      },
      {
        content: "Rs.30.1 Lakh - Rs.50 Lakh",
        num: "3",
        estimatevalue: 4000000,
        range: {
          from: 3000000,
          to: 5000000,
        }
      },
      {
        content: "Above Rs.50 Lakh",
        num: "4",
        estimatevalue: 6500000,
        range: {
          from: 5000000,
          to: 9000000,
        }
      },
    ],
    answered: false,
    answer: "",
    estimatevalue: 0,
    pro: true,
    id: 'ctc'
  },
  {
    question:
      "4. How much money do you save every month (on avg.)?",
    options: [
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
    ],
    info: "This means money that is left with you after all expenses like rent, grocery, EMI, shopping, eating out, etc. Expenses DO NOT include SIPs",
    answered: false,
    answer: "",
    estimatevalue: 0,
    pro: true,
    id: 'monthly-savings'
  },
  {
    question:
      "4.a How much money do you have in your bank account?",
    options: [
      {
        content: "Under Rs.20,000", num: "1", estimatevalue: 10000, range: {
          from: 0,
          to: 20000,
        }
      },
      {
        content: "Rs.20,000 - Rs.50,000", num: "2", estimatevalue: 35000, range: {
          from: 20000,
          to: 50000,
        }
      },
      {
        content: "Rs.50,001 - Rs. 1 lakh", num: "3", estimatevalue: 75000, range: {
          from: 50000,
          to: 100000,
        }
      },
      {
        content: "Rs. 1.1 lakh - Rs. 3 lakh", num: "4", estimatevalue: 200000, range: {
          from: 100000,
          to: 300000,
        }
      },
      {
        content: "Over Rs. 3 lakhs", num: "5", estimatevalue: 500000, range: {
          from: 300000,
          to: 1000000,
        }
      },
    ],
    info: "This does not include money in fixed deposit (FD)",
    answered: false,
    answer: "",
    estimatevalue: 0,
    pro: true,
    id: 'total-savings',
    condition: "2" // will be shown only if others are selected except first one
  },
  {
    question: "4.b How much money do you have in your emergency fund?",
    options: [
      {
        content: "No, I don't have any",
        num: "1",
        estimatevalue: 0,
        range: {
          from: 0,
          to: 100000,
        }
      },
      {
        content: "Under Rs.2 Lakh",
        num: "2",
        estimatevalue: 100000,
        range: {
          from: 100000,
          to: 200000,
        }
      },
      {
        content: "Rs.2 Lakh to Rs.5 Lakh",
        num: "3",
        estimatevalue: 350000,
        range: {
          from: 200000,
          to: 500000,
        }
      },
      {
        content: "Above Rs.5 Lakh",
        num: "4",
        estimatevalue: 700000,
        range: {
          from: 500000,
          to: 1000000,
        }
      },
    ],
    answered: false,
    answer: "",
    estimatevalue: -1,
    pro: true,
    id: 'emergency-fund',
    condition: "3" // checks 2.a if amount is more than 50,000
  },
  {
    question:
      "5. What is the total value of your investments?",
    options: [
      {
        content: "Under Rs.5 Lakh",
        num: "1",
        estimatevalue: 0,
        range: {
          from: 0,
          to: 500000,
        }
      },
      {
        content: "Rs.5 Lakh - Rs.10 Lakh",
        num: "2",
        estimatevalue: 750000,
        range: {
          from: 500000,
          to: 1000000,
        }
      },
      {
        content: "Rs.10.1 Lakh - Rs.25 Lakh",
        num: "3",
        estimatevalue: 1500000,
        range: {
          from: 1000000,
          to: 2500000,
        }
      },
      {
        content: "Rs.25.1 Lakh - Rs.1 Crore",
        num: "4",
        estimatevalue: 5000000,
        range: {
          from: 2500000,
          to: 10000000,
        }
      },
      {
        content: "Above Rs.1 Crore",
        num: "5",
        estimatevalue: 20000000,
        range: {
          from: 10000000,
          to: 50000000,
        }
      },
    ],
    info: " This includes stocks, mutual funds, bonds, gold (excluding jewellery), real estate excluding your residence, emergency fund, bank balance and cash.",
    answer: "",
    answered: false,
    estimatevalue: -1,
    id: 'investments',
    pro: true
  },
  {
    question: "5.a Where do you invest mostly?",
    condition: "2", // if investments are above 5 lakh
    options: [
      {
        content: "Leave it in my savings account",
        num: "1",
        estimatevalue: 0,
      },
      { content: "Put it in an FD", num: "2", estimatevalue: 1 },
      { content: "Invest in Mutual Funds via SIPs", num: "3", estimatevalue: 2 },
      {
        content: "Make lump sum investments",
        num: "4",
        estimatevalue: 2,
      },
      {
        content: "Invest in stocks",
        num: "5",
        estimatevalue: 2,
      },
    ],
    answered: false,
    answer: "",
    estimatevalue: -1,
    content: true,
    // multiple: true,
    answers: [] as Array<string>,
    id: 'invest-options',
    pro: false
  },
];

export const SLIDER_QUESTIONS = [
  {
    question: "1. How old are you?",
    options: [],
    variables: {
      min: 18, max: 60, step: 1,finalValue:65,startValue:18,isRupee:false,defaultValue:30
    },
    answered: false,
    answer: "",
    estimatevalue: "",
    id: 'age',
    pro: false
  },
  {
    question: "2. Do you have life insurance or a personal health insurance policy (i.e. outside your job)?",
    variables: {
      min: 18, max: 60, step: 1,finalValue:65,startValue:18,isRupee:false
    },
    options: [
      { content: "None", num: "1", estimatevalue: 0 },
      {
        content: "Only Health Insurance",
        num: "2",
        estimatevalue: 1,
      },
      {
        content: "Only Life Insurance",
        num: "3",
        estimatevalue: 2,
      },
      {
        content: "Both",
        num: "4",
        estimatevalue: 3,
      },
    ],
    answered: false,
    answer: "",
    estimatevalue: "",
    id: 'insurance',
    pro: false
  },
  {
    question: "2.a What is the total coverage of your life insurance policies?",
    condition: "3", // only life or both from previous question 
    variables: {
      min: 5000000, max: 50000000, step: 1000000,startValue:4000000,finalValue:51000000,isRupee:true,defaultValue:20000000
    },
    options: [],
    answer: "",
    answered: false,
    estimatevalue: 0,
    id: 'life-coverage',
    pro: true
  },
  {
    question: "3. What is your net monthly income (amount that you get in bank after all deductions)?",
    variables: {
      min: 30000, max: 1000000, step: 10000,startValue:20000,finalValue:1010000,isRupee:true,defaultValue:100000
    },
    options: [],
    answered: false,
    answer: "",
    estimatevalue: 0,
    pro: true,
    id: 'ctc'
  },
  {
    question:
      "4. What's your average monthly expense (include rent, grocery, utilities, shopping, subscriptions, insurance but exclude monthly investments like SIP, RD, etc.)?",
    variables: {
      min: 10000, max: 1000000, step: 5000,startValue:5000,finalValue:1000000,isRupee:true
    },
    options: [],
    info: "This means money that is left with you after all expenses like rent, grocery, EMI, shopping, eating out, etc. Expenses DO NOT include SIPs",
    answered: false,
    answer: "",
    estimatevalue: 0,
    pro: true,
    id: 'monthly-savings'
  },
  {
    question:
      "4.a How much money do you have across all your bank accounts?",
      variables:{
        min:20000,max:5000000,step:10000,startValue:10000,finalValue:5010000,isRupee:true
      },
      options: [],
    info: "This does not include money in fixed deposit (FD)",
    answered: false,
    answer: "",
    estimatevalue: 0,
    pro: true,
    id: 'total-savings',
    condition: "2" // will be shown only if others are selected except first one
  },
  {
    question: "4.b How much money do you have in your emergency fund?",
    variables:{
      min:0,max:1000000,step:10000,startValue:0,finalValue:1010000,isRupee:true
    },
    options: [],
    answered: false,
    answer: "",
    estimatevalue: -1,
    pro: true,
    id: 'emergency-fund',
    condition: "3" // checks 2.a if amount is more than 50,000
  },
  {
    question:
      "5. What is the total value of your investments (including stocks, mutual funds, bonds, gold (excluding jewellery), emergency fund, real estate excluding your residence)",
      variables:{
        min:500000,max:50000000,step:100000,startValue:400000,finalValue:51000000,isRupee:true
      },
    options: [],
    info: " This includes stocks, mutual funds, bonds, gold (excluding jewellery), real estate excluding your residence, emergency fund, bank balance and cash.",
    answer: "",
    answered: false,
    estimatevalue: -1,
    id: 'investments',
    pro: true
  },
  // {
  //   question: "5.a Where do you invest mostly?",
  //   condition: "2", // if investments are above 5 lakh
  //   variables: {
  //     min: 18, max: 60, step: 1,startValue:18,finalValue:60,isRupee:false
  //   },
  //   options: [
  //     {
  //       content: "Leave it in my savings account",
  //       num: "1",
  //       estimatevalue: 0,
  //     },
  //     { content: "Put it in an FD", num: "2", estimatevalue: 1 },
  //     { content: "Invest in Mutual Funds via SIPs", num: "3", estimatevalue: 2 },
  //     {
  //       content: "Make lump sum investments",
  //       num: "4",
  //       estimatevalue: 2,
  //     },
  //     {
  //       content: "Invest in stocks",
  //       num: "5",
  //       estimatevalue: 2,
  //     },
  //   ],
  //   answered: false,
  //   answer: "",
  //   estimatevalue: -1,
  //   content: true,
  //   // multiple: true,
  //   answers: [] as Array<string>,
  //   id: 'invest-options',
  //   pro: false
  // },
];

// export const QUESTIONS = [
//   {
//     question: "1. How old are you?",
//     type: "input",
//     options: [],
//     answered: false,
//     answer: "",
//     value: "",
//     pro: false
//   },
//   {
//     question: "2. How many people are financially dependents on you?",
//     options: [
//       { content: "0", num: "1", value: 0 },
//       {
//         content: "1",
//         num: "2",
//         value: 1,
//       },
//       {
//         content: "2",
//         num: "3",
//         value: 2,
//       },
//       {
//         content: "3",
//         num: "4",
//         value: 3,
//       },
//       {
//         content: "More than 3",
//         num: "5",
//         value: 4,
//       },
//     ],
//     answered: false,
//     answer: "",
//     value: "",
//     pro: false
//   },
//   {
//     question: "3. What is your gross annual income (or CTC)?",
//     options: [
//       {
//         content: "Under Rs.7.5 Lakh", num: "1", value: 4, range: {
//           from: 0,
//           to: 750000
//         }
//       },
//       {
//         content: "Rs.7.6 Lakh - 15 Lakh",
//         num: "2",
//         value: 1200000,
//         range: {
//           from: 750000,
//           to: 1500000,
//         }
//       },
//       {
//         content: "Rs.15.1 Lakh - Rs.30 Lakh",
//         num: "3",
//         value: 2400000,
//         range: {
//           from: 1500000,
//           to: 3000000
//         }
//       },
//       {
//         content: "Rs.30.1 Lakh - Rs.50 Lakh",
//         num: "3",
//         value: 4000000,
//         range: {
//           from: 3000000,
//           to: 5000000,
//         }
//       },
//       {
//         content: "Above Rs.50 Lakh",
//         num: "4",
//         value: 6500000,
//         range: {
//           from: 5000000,
//           to: 9000000,
//         }
//       },
//     ],
//     answered: false,
//     answer: "",
//     value: 0,
//     pro: true
//   },
//   {
//     question:
//       "4. How much money do you save every month (on average)?",
//     options: [
//       {
//         content: "Up to Rs.10,000", num: "1", value: 5000, range: {
//           from: 0,
//           to: 10000,
//         }
//       },
//       {
//         content: "Rs.10,001 - Rs.30,000", num: "2", value: 20000, range: {
//           from: 10000,
//           to: 30000,
//         }
//       },
//       {
//         content: "Rs.30,001 - Rs.50,000", num: "3", value: 40000, range: {
//           from: 30000,
//           to: 50000,
//         }
//       },
//       {
//         content: "Rs.50,001 - Rs.1,00,000", num: "4", value: 75000, range: {
//           from: 50000,
//           to: 100000,
//         }
//       },
//       {
//         content: "Over Rs.1,00,000", num: "5", value: 150000, range: {
//           from: 100000,
//           to: 200000,
//         }
//       },
//     ],
//     info: "This means money that is left with you after all expenses like rent, grocery, EMI, shopping, eating out, etc. Expenses DO NOT include SIPs",
//     answered: false,
//     answer: "",
//     value: 0,
//     pro: true
//   },
//   {
//     question:
//       "5. How much money do you have in your savings bank account?",
//     options: [
//       {
//         content: "Under Rs.20,000", num: "1", value: 10000, range: {
//           from: 0,
//           to: 20000,
//         }
//       },
//       {
//         content: "Rs.20,000 - Rs.50,000", num: "2", value: 35000, range: {
//           from: 20000,
//           to: 50000,
//         }
//       },
//       {
//         content: "Rs.50,001 - Rs. 1 lakh", num: "3", value: 75000, range: {
//           from: 50000,
//           to: 100000,
//         }
//       },
//       {
//         content: "Rs. 1.1 lakh - Rs. 3 lakh", num: "4", value: 200000, range: {
//           from: 100000,
//           to: 300000,
//         }
//       },
//       {
//         content: "Over Rs. 3 lakhs", num: "5", value: 500000, range: {
//           from: 300000,
//           to: 1000000,
//         }
//       },
//     ],
//     info: "This does not include money in fixed deposit (FD)",
//     answered: false,
//     answer: "",
//     value: 0,
//     pro: true
//   },
//   {
//     question: "6. How much money do you have in your emergency fund?",
//     options: [
//       {
//         content: "No I don't have any emergency fund yet",
//         num: "1",
//         value: 0,
//         range: {
//           from: 0,
//           to: 100000,
//         }
//       },
//       {
//         content: "Under Rs.2 Lakh",
//         num: "2",
//         value: 100000,
//         range: {
//           from: 100000,
//           to: 200000,
//         }
//       },
//       {
//         content: "Rs.2 Lakh to Rs.5 Lakh",
//         num: "3",
//         value: 350000,
//         range: {
//           from: 200000,
//           to: 500000,
//         }
//       },
//       {
//         content: "Above Rs.5 Lakh",
//         num: "4",
//         value: 700000,
//         range: {
//           from: 500000,
//           to: 1000000,
//         }
//       },
//     ],
//     answered: false,
//     answer: "",
//     value: 0,
//     pro: true
//   },
//   {
//     question:
//       "7. Do you and your family have a personal health insurance policy (in addition to the one from your company)?",
//     options: [
//       {
//         content: "Yes",
//         num: "1",
//         value: "yes",
//       },
//       {
//         content: "No",
//         num: "2",
//         value: "no",
//       },
//     ],
//     answered: false,
//     answer: "",
//     value: "",
//     pro: false
//   },
//   {
//     question: "8. Do you have life insurance? ",
//     options: [
//       {
//         content: "Yes",
//         num: "1",
//         value: "yes",
//       },
//       {
//         content: "No",
//         num: "2",
//         value: "no",
//       },
//     ],
//     answered: false,
//     answer: "",
//     value: "",
//     pro: false
//   },
//   {
//     question: "8.a Approximately what is the total coverage of your life insurance policies?",
//     condition: "No",
//     options: [
//       {
//         content: "Under Rs.50 Lakh",
//         num: "1",
//         value: 2500000,
//         range: {
//           from: 0,
//           to: 5000000,
//         }
//       },
//       {
//         content: "Rs.50 Lakh - Rs.1 Crore",
//         num: "2",
//         value: 7500000,
//         range: {
//           from: 5000000,
//           to: 10000000,
//         }
//       },
//       {
//         content: "Rs.1.1 Crore - Rs.3 Crore",
//         num: "3",
//         value: 20000000,
//         range: {
//           from: 10000000,
//           t0: 30000000,
//         }
//       },
//       {
//         content: "Above Rs.3 Crore",
//         num: "4",
//         value: 40000000,
//         range: {
//           to: 30000000,
//           from: 50000000,
//         }
//       },
//     ],
//     answer: "",
//     answered: false,
//     value: 0,
//     pro: true
//   },
//   {
//     question:
//       "9. What is the total value of your investments?",
//     options: [
//       {
//         content: "Under Rs.5 Lakh",
//         num: "1",
//         value: 0,
//         range: {
//           from: 0,
//           to: 500000,
//         }
//       },
//       {
//         content: "Rs.5 Lakh to Rs.10 Lakh",
//         num: "2",
//         value: 750000,
//         range: {
//           from: 500000,
//           to: 1000000,
//         }
//       },
//       {
//         content: "Rs.10.1 Lakh - Rs.25 Lakh",
//         num: "3",
//         value: 1500000,
//         range: {
//           from: 1000000,
//           to: 2500000,
//         }
//       },
//       {
//         content: "Rs.25.1 Lakh - Rs.1 Crore",
//         num: "4",
//         value: 5000000,
//         range: {
//           from: 2500000,
//           to: 10000000,
//         }
//       },
//       {
//         content: "Above Rs.1 Crore",
//         num: "5",
//         value: 20000000,
//         range: {
//           from: 10000000,
//           to: 50000000,
//         }
//       },
//     ],
//     info: " This includes stocks, mutual funds, bonds, gold (excluding jewellery), real estate excluding your residence, emergency fund, bank balance and cash.",
//     answer: "",
//     answered: false,
//     value: 0,
//     pro: true
//   },
//   {
//     question: "9.a Where do you invest? (Select all that apply and click submit)",
//     condition: "Under Rs.5 Lakh", // if investments are above 5 lakh
//     options: [
//       {
//         content: "Leave it in my savings account",
//         num: "1",
//         value: 0,
//       },
//       { content: "Put it in an FD", num: "2", value: 1 },
//       { content: "Invest in Mutual Funds via SIPs", num: "3", value: 2 },
//       {
//         content: "Make one-time investments whenever I wish to",
//         num: "4",
//         value: 2,
//       },
//       {
//         content: "Invest in stocks",
//         num: "5",
//         value: 2,
//       },
//     ],
//     answered: false,
//     answer: "",
//     value: 0,
//     multiple: true,
//     pro: false
//   },
// ];