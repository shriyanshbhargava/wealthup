import React from 'react'
import ScoreChart from '../components/ScoreChart';

const ScoreSection = ({investmentScore, performanceScore, diversificationScore, riskScore}) => {
  const performanceRed = performanceScore <= 4;
  const diversificationRed = diversificationScore <= 4;
  const riskRed = riskScore <= 4;

  let investmentMsg = '';
  let performanceMsg = '';
  let diversificationMsg = '';
  let riskMsg = '';

  if (investmentScore >= 8 && investmentScore <= 10) {
    investmentMsg = 'Wow! Good work! Your investments are in great shape.';
  } else if (investmentScore >= 4 && investmentScore <= 7) {
    investmentMsg = 'Ouch! It looks like your investments need some attention.';
  } else if (investmentScore >= 0 && investmentScore <= 3) {
    investmentMsg = 'Woah! Your investments are in a pretty bad shape and need immediate attention!';
  }

  if (performanceScore >= 8 && performanceScore <= 10) {
    performanceMsg = 'Nice work! Your investments are performing well.';
  } else if (performanceScore >= 4 && performanceScore <= 7) {
    performanceMsg = 'Ouch! It looks like your investments are not performing too well.';
  } else if (performanceScore >= 0 && performanceScore <= 3) {
    performanceMsg = 'Oh no! Your investments are in pretty bad shape and not performing well at all.';
  }

  if (diversificationScore >= 8 && diversificationScore <= 10) {
    diversificationMsg = 'Nice work! Your investments are well diversified.';
  } else if (diversificationScore >= 4 && diversificationScore <= 7) {
    diversificationMsg = 'Ouch! It looks like your investments are not diversified properly.';
  } else if (diversificationScore >= 0 && diversificationScore <= 3) {
    diversificationMsg = 'Oh no! Your investments are not diversified properly and need urgent attention.';
  }

  if (riskScore >= 8 && riskScore <= 10) {
    riskMsg = 'Nice work! Your investments are aligned to your risk appetite.';
  } else if (riskScore >= 4 && riskScore <= 7) {
    riskMsg = 'Your investments are somewhat aligned to your risk appetite. There is scope for improvement.';
  } else if (riskScore >= 0 && riskScore <= 3) {
    riskMsg = 'You need to fix this! Your investments are completely misaligned to your risk appetite.';
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-10 my-10 '>
        <ScoreChart
            itemKey={"invScore"}
            score={investmentScore}
            red={false}
            comment={investmentMsg}
        />
        <ScoreChart
            itemKey={"performanceScore"}
            score={performanceScore}
            red={performanceRed}
            comment={performanceMsg}
        />
        <ScoreChart
            itemKey={"diversificationScore"}
            score={diversificationScore}
            red={performanceRed ? false : diversificationRed}
            comment={diversificationMsg}
        />
        <ScoreChart
            itemKey={"riskScore"}
            score={riskScore}
            red={diversificationRed || performanceRed ? false : riskRed}
            comment={riskMsg}
        />
    </section>
  )
}

export default ScoreSection