const ScoreAnalysis=(data)=>{
    if(data){
    let savingRate=data.savingRate;
    let liquidityFactor=data.liquidityFactor;
    let emergencyCoverage=data.emergencyCoverage;
    let healthInsuranceAnswer=data.healthInsuranceAnswer;
    let lifeCoverMultiple=data.lifeCoverMultiple;
    let investmentScore=data.In;
    let savingAction;
    let savingDetails;
    let savingType;
    let liquidityAction;
    let liquidityDetails;
    let liquidityType;
    let emergencyCoverageAction;
    let emergencyCoverageDetails;
    let emergencyCoverageType;
    let healthInsuranceAction;
    let healthInsuranceDetails;
    let healthInsuranceType;
    let lifeInsuranceAction;
    let lifeInsuranceDetails;
    let lifeInsuranceType;
    let investmentAction;
    let investmentDetails;
    let investmentType;

    if(savingRate<2){
      savingAction="Aim to save at least 20% of your income. Consider cutting back on discretionary spending like eating out,shopping or subscriptions you don’t need.";
      savingDetails="Your savings are on the lower side.";
      savingType="Bad";
    }
    else if(2 <= savingRate <= 5){
      savingAction="Consider saving more than 50% by controlling expenses as your income grows. Setting up automated investments can help make saving easier.";
      savingDetails="You're saving a good portion of your income.";
      savingType="Average";
    }
    else{
      savingAction="Continue saving well and invest the savings properly to generate good returns.";
      savingDetails="You are doing a great job at savings!";
      savingType="Good";
    }

    if(liquidityFactor<0.5){
      liquidityAction="You may face challenges in taking care of your regular expenses. Aim to keep at least half month's expenses in your bank account.";
      liquidityDetails="You are keeping too little money in the bank.";
      liquidityType="Bad";
    }
    else if(liquidityFactor>5){
      liquidityAction="You are losing out on earning higher returns. Keep a maximum of 2 months of expenses in your account and invest the excess cash. To start investing, talk to your finance partner <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>.";
      liquidityDetails="You're keeping too much money in the bank and losing out on earning better returns.";
      liquidityType="Bad";
    }
    else if(0.5<=liquidityFactor<1){
      liquidityAction="You may face challenges in taking care of your regular expenses. Aim to keep at least 1 month's expenses in your bank account.";
      liquidityDetails="You are keeping too little money in the bank.";
      liquidityType="Average";
    }
    else if(2<=liquidityFactor<=5){
      liquidityAction="You are losing out on earning higher returns. Keep a maximum of 2 months of expenses in your account and invest the excess cash. To start investing, talk to your finance partner <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>.";
      liquidityDetails="You are keeping too much money in the bank and losing out of opportunity to make better return.";
      liquidityType="Average";
    }
    else if(1<=liquidityFactor<2){
      liquidityAction="Continue maintaining one to two months of expenses in your bank account.";
      liquidityDetails="You are maintaining the right amount of money in the bank.";
      liquidityType="Good";
    }
    
    if(emergencyCoverage<3){
      emergencyCoverageAction="You’re underprepared to take care of unexpected expenses. Aim to save at least 6 months' worth of living expenses in your emergency fund. Invest this money in a low-risk debt fund to earn some interest while keeping it safe and accessible.";
      emergencyCoverageDetails="You are keeping too little money in case of emergency.";
      emergencyCoverageType="Bad";
    }
    else if(emergencyCoverage>18){
      emergencyCoverageAction="By keeping extra cash in your emergency fund you are losing out on potentially earning higher returns. Consider investing the excess amount beyond 12 months of expenses in a low-risk debt fund. This will help your money grow better than inflation while keeping it easily accessible for emergencies.To start investing, talk to your finance partner <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      emergencyCoverageDetails="You are keeping too much money for an emergency situation.";
      emergencyCoverageType="Bad";
    }
    else if(3<=emergencyCoverage<6){
      emergencyCoverageAction="You may face challenges in taking care of a sudden expected. Keep at least six months of your expenses in your emergency fund and invest this money in a very low risk debt fund.To start investing, talk to your finance partner <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      emergencyCoverageDetails="You are keeping too little money in case of emergency.";
      emergencyCoverageType="Average";
    }
    else if(6<=emergencyCoverage<=12){
      emergencyCoverageAction="Invest this money in a very low risk debt fund. This will help your money grow better than inflation while keeping it easily accessible for emergencies.To start investing, talk to your finance partner <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      emergencyCoverageDetails="You have a well-funded emergency buffer.";
      emergencyCoverageType="Good";
    }
    else if(12<emergencyCoverage<=18){
      emergencyCoverageAction="By keeping extra cash in your emergency fund you are losing out on potentially earning higher returns. Keep a maximum of 12 months of expenses in your account and invest this money in a very low risk debt fund. This will help your money grow better than inflation while keeping it easily accessible for emergencies.To start investing, talk to your finance partner <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      emergencyCoverageDetails="You are keeping too much money for your emergency situation.";
      emergencyCoverageType="Average";
    }
    if(healthInsuranceAnswer=="0" || healthInsuranceAnswer=="2"){
      healthInsuranceAction="You should get a health insurance policy of your own with at least 10 lakhs of base cover from a good health insurance company.Contact your finance partner to find out the best health insurance policy for your needs <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      healthInsuranceDetails="You don’t have an individual health insurance.";
      healthInsuranceType="Bad";
    }
    else{
      healthInsuranceAction="Ensure you have at least 10 lakhs of base cover from a good health insurance.";
      healthInsuranceDetails="Great! You have an individual health.";
      healthInsuranceType="Good";
    }  
  
    if(lifeCoverMultiple<5){
      lifeInsuranceAction="If people are financially dependent on you, you must have a term life insurance policy with sufficient coverage i.e. 20 times your annual income.Contact your finance partner to find out the best life insurance policy for your needs <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      lifeInsuranceDetails="You dont have a life insurance policy.";
      lifeInsuranceType="Bad";
    }
    else if(5<=lifeCoverMultiple<=15){
      lifeInsuranceAction="If people are financially dependent on you, you must have a term life insurance policy with sufficient coverage i.e. 20 times your annual income.Contact your finance partner to find out the best life insurance policy for your needs <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>";
      lifeInsuranceDetails="You dont have sufficient life insurance coverage.";
      lifeInsuranceType="Average";
    }
    else{
      lifeInsuranceAction="You already have a good life cover, now ensure your nominee details are updated and accurate.Ideally you should inform your nominee about your life policy.";
      lifeInsuranceDetails="Great! You have sufficient life insurance coverage.";
      lifeInsuranceType="Good";
    }
    
    if(investmentScore<12){
      investmentAction="The value of your investments may be low because they are not generating good returns.Check if your investments (mutual funds) are performing well or not <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>.";
      investmentDetails="Based on your income, age and current value of investments, the value of your investments seems low.";
      investmentType="Bad";
    }
    else if(13<investmentScore<21){
      investmentAction="The value of your investments may be low because they are not generating good returns. Check if your investments (mutual funds) are performing well or not <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>.";
      investmentDetails="Based on your income, age and current value of investments, the value of your investments seems low.";
      investmentType="Average";
    }
    else{
      investmentAction="You have worked hard for money - both earning and saving it. Now it’s time for your money to work hard for you. Check if your investments (mutual funds) are performing well or not <<a href='https://api.whatsapp.com/send?phone=+917704047770&text=Hi%20Medha,%20I%20need%20help%20with%20my%20financial%20planning' target='_blank'>here</a>>.";
      investmentDetails="Based on your income, age and current value of investments, the value of your investments looks good.";
      investmentType="Good";
    }

    return {savingAction,savingDetails,liquidityAction,liquidityDetails,emergencyCoverageAction,emergencyCoverageDetails,healthInsuranceAction,healthInsuranceDetails,lifeInsuranceAction,lifeInsuranceDetails,investmentAction,investmentDetails,savingType,liquidityType,emergencyCoverageType,healthInsuranceType,lifeInsuranceType,investmentType};
  }

}

export default ScoreAnalysis;