import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const FAQAccordion: React.FC<{ investmentFaq?: boolean }> = ({ investmentFaq }) => {
    // State to track which accordion item is active
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Toggle the active accordion item
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // FAQ data
    const faqs = [
        {
            id: 'faq-retirement',
            question: 'What is retirement?',
            answer: `Retirement is about freedom—living life on your own terms, chasing your passions, and enjoying every moment without financial stress. It's the start of a new adventure, where you design the life you’ve always dreamed of. We estimate your retirement age based on three things:
    1. Your Bills: What you spend each month, adjusted for inflation.
    2. Your Nest Egg: How much you have saved already.
    3. Your Monthly Savings (SIPs): How much you add to your investments each month.
    
    We also factor in that when you retire, your investments should:
    1. Cover your bills (adjusted for inflation).
    2. Continue to grow with inflation so you don’t run out of money.
    
    Notes:
    ● The calculation assumes your lifestyle will remain the same as today.
    ● If your life changes (e.g., marriage, kids, promotions, lifestyle change), the score will need to be updated.
    ● Using this tool regularly improves the score’s accuracy.`
        },
        {
            id: 'faq-retirement-age',
            question: 'How is my retirement age calculated?',
            answer: `Your retirement age is calculated using the Rule of 300, which is a common method to estimate how much money you need to retire comfortably. Here’s how it works:
    1. Calculate Your Monthly Expenses: Add up all your monthly living costs.
    2. Multiply by 300: This gives you the amount you need in investments to maintain your current lifestyle without running out of money.
    
    For example, if your monthly expenses are ₹50,000, you would need ₹1.5 crore (₹50,000 x 300) today to retire comfortably. You can withdraw 4% from your investments each year without depleting your inflation-adjusted retirement corpus.
    
    Notes:
    ● This number is valid for your current situation.
    ● If your life changes (e.g., you get a promotion, raise, or your expenses increase), this number will change.
    ● Regularly using the tool and our platform ensures the most accurate data.`
        },
        {
            id: 'faq-salecoin',
            question: 'What is SALECOIN? How does WealthUp use it to plan my finances?',
            answer: `SALECOIN is our proprietary framework for overall financial planning. It stands for:
    ● S: Savings – % of your monthly net income saved on average.
    ● L: Liquidity – Money kept in bank account for regular expenses (calculated as a multiple of your monthly expenses).
    ● E: Emergency Fund – Money set aside for unexpected expenses (calculated as a multiple of your monthly expenses).
    ● Co: Coverage – Life and health insurance.
    ● In: Investments – Current value of your assets and investments.
    
    We use SALECOIN to evaluate any gaps that exist and create a personalized financial plan to improve your financial health and live a stress-free life. You can speak to your Wealthup Financial Partner to understand the plan created for you.`
        },
        {
            id: 'faq-financially-struggling',
            question: 'What do you mean by financially struggling, coping, and thriving?',
            answer: `These are 3 levels of financial well-being defined by Wealthup:
    
    <span style="color: red;">● Financially Struggling:</span> You have significant financial gaps. Savings maybe minimal, you may have a very small investment corpus for your age and income. You may also have insufficient insurance coverage and an inadequate emergency fund, making it hard to handle unexpected financial situations. You can speak to your Wealthup Financial Partner to understand more about how you can improve your financial health.
    
    <span class="text-yellow-500">● Financially Coping:</span> You manage your finances well but might face some challenges. You have savings and investments but need better planning to achieve your financial goals. This could be in the form of needing better insurance coverage to protect you and your investments, generating better returns, or having an adequate amount in your emergency fund. You can speak to your Wealthup Financial Partner to understand more about why you were categorized as coping.
    
    <span style="color: green;">● Financially Thriving:</span> Your finances are in excellent shape. You have strong savings, well-planned finances, and stable investments. You are well-protected with adequate insurance coverage and have a solid emergency fund to handle unexpected expenses.`
        }
    ];

    const investmentFaqs = [
        {
            id: 'faq-add-investments',
            question: 'How do I add investments?',
            answer: `Enter your PAN and phone number to fetch mutual fund data from MF Central. Manually add other investments like bank accounts, PPF, cash etc. by clicking “Add Another Row” selecting the asset type and entering the details.`
        },
        {
            id: 'faq-tool-benefits',
            question: 'What is the benefit of using this tool?',
            answer: `It simplifies your financial management by giving you a complete view of all your investments in one place. This helps you monitor performance, track progress and make informed decisions without switching between multiple platforms or accounts.`
        },
        {
            id: 'faq-update-mutual-funds',
            question: 'How do you update Mutual Fund data?',
            answer: `We fetch your mutual fund details from MF Central created by the directive of SEBI. And we update the current value of your mutual funds investments, using the latest NAV (price) published on AMFI’s website.`
        },
        {
            id: 'faq-investment-types',
            question: 'What type of investments can I track?',
            answer: `You can track all your investments including mutual funds, bank accounts, PPF, cash, on this tool. If you think any category is missing, reach out to us at hello@wealthup.me.`
        }
    ];


    const faqsToMap = investmentFaq ? investmentFaqs : faqs;
    return (
        <div className="bg-white rounded-2xl p-8 pt-4 mx-auto w-full max-w-none sm:max-w-[510px] md:max-w-none" style={{ boxShadow: "0px 4px 4px 0px rgba(3, 87, 130, 0.50)" }}>
            {/* Heading */}
            <h2 className="text-center text-[#035782] font-bold text-[18px] m-0">Have Questions?</h2>

            {/* FAQ List */}
            <div className="space-y-1">
                {faqsToMap.map((faq, index) => (
                    <div id={faq.id} key={index} className="border-b-2 border-[#01C8A9] leading-6">
                        {/* Question Section */}
                        <div className='flex w-full justify-between gap-4 items-center p-4 focus:outline-none cursor-pointer'  onClick={() => handleToggle(index)}>
                            <p className=" text-left  text-[#035782] font-semibold m-0 text-[14px] sm:text-[16px]">
                                {index + 1}. {faq.question}
                            </p>
                            <button>
                                {activeIndex === index
                                    ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </button>
                        </div>

                        {/* Answer Section */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-screen' : 'max-h-0'
                                }`}
                        >
                            <p className="px-4 py-2 text-[#035782] text-[12px] sm:text-[14px] leading-6" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: faq.answer }}
                            >
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQAccordion;
