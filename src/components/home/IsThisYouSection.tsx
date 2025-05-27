import Image from "next/legacy/image";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

const content = [
    {
        name: 'shivi',
        content: <p>She&#39;s a helpful person who loves to help those around her. Her bank relationship manager pushed her to invest in mutual funds via him through his bank.
            <br /><br />
            When she moved to a new city, she urgently needed funds for a security deposit and tried to contact her RM, but couldn&#39;t! He had left the bank, and she was not able to sell any of her investments. Plus the new RM was unreachable and the bank branch didn’t help either.
            <br /><br />
            Despite earning a good salary, she was forced to pawn her family&#39;s cherished jewellery just to have a roof over her head. She was left feeling utterly lost, confused and frustrated.
            <br /><br />
            Have you ever felt like Shivi when dealing with customer support?
        </p>
    },
    {
        name: 'neha',
        content: <p>She&#39;s a hardworking professional who tries to save every penny from her salary. She didn&#39;t know how to invest money so she listened to her colleagues and decided to invest in mutual funds. She did her research about which platforms to use and selected two robo advisory platforms to invest through.
            <br /><br />
            Without any personalised guidance, she invested randomly. As a result, her funds were over-diversified but still did not align with her financial goals. Since investments were spread across two platforms, it was difficult to track them and the returns weren&#39;t even good. And to top it off, she had invested in ELSS mutual funds which she didn’t need as she chose the new tax regime.
            <br /><br />
            Four years down the line, Neha found herself completely lost. She had been diligently doing SIPs but due to the lack of a proper financial plan her progress was very slow.
            <br /><br />
            Are you in the same boat as Neha? Struggling to make sense of your investments?
        </p>
    },
    {
        name: 'raj',
        content: <p>He&#39;s a techie who&#39;s been freelancing since college earning him a good bank balance even before landing his first job. Now he’s a tech lead at a startup, working tirelessly for more than 70 hours a week and taking on additional freelance projects.
            <br /><br />
            So in his free time, all he wants to do is unwind by gaming, hanging out with friends, and catching up on his favourite Netflix shows. Raj wants to create a passive income stream before starting his own startup. <br /><br />
            But when it comes to investing money he finds it overwhelming and boring. He&#39;d rather spend his time chilling and hence his savings just lie idle in his bank account.
            <br /><br />Do you feel like Raj, struggling to juggle your busy life and planning your financial future?
        </p>
    },
    {
        name: 'veer',
        content: <p>He&#39;s a talent manager for some of Tollywood&#39;s biggest stars. Looking sharp and schmoozing with clients is all part of the gig. But he&#39;s not all work and no play – he loves to travel too. He takes at least three trips a year, including one overseas adventure.<br /><br />
            Veer knows how to live life to the fullest, but he also understands the importance of planning for the future. <br /><br />
            The only trouble is, he&#39;s not sure how to balance his adventures with building a comfortable future for himself.<br /><br />
            Do you feel like Veer – not wanting to compromise today but still planning for tomorrow?
        </p>,
    }
]

const IsThisYouSection = () => {
    return (
        <section id="is-this-you" className="py-10 sm:py-24">
            <div className="container">
                <h3
                    className="mb-1 section-heading text-center wow fadeInDown capitalize"
                    data-wow-delay="0.3s"
                >
                    Is this you?
                </h3>
                <div className="flex flex-wrap justify-center md:justify-start">
                    <SingleTestimonial
                        userName="Neha (name changed), 26, Blr"
                        title="Can’t find reliable experts I can trust with my money."
                        description="With wealthup all my finances are taken care of in one place. I don’t have to find multiple experts who I can trust and share my details with many people. It’s a huge burden off my shoulders."
                        img="/assets/img/Preeti.png"
                        name="neha"
                    />
                    <SingleTestimonial
                        userName="Veer (name changed), 28, Hyd"
                        title="I want to become financially free - but how?"
                        description="I saw that Wealthup’s founders were financially free and it really resonated with me. I wanted that too and finally I have someone to guide me how!"
                        name="veer"
                        img="/assets/img/Saksham.png"
                    />
                    <SingleTestimonial
                        userName="Shivi (name changed), 32, Hyd"
                        title="Tired of generic advice found in videos & blogs."
                        description="I contacted Wealthup because I was just done with self-paced courses and watching videos online. Honestly, they were giving me FOMO and increasing my anxiety instead of helping."
                        img="/assets/img/Shivani.png"
                        name="shivi"
                    />
                    <SingleTestimonial
                        userName="Raj (name changed), 23, NCR"
                        title="I should invest but always procrastinate!"
                        description="For me investing or taking any action was always “I’ll do it tomorrow” but that tomorrow never came. Finally, I just needed someone to push me so I can get started."
                        img="/assets/img/Raj.png"
                        name="raj"
                    />
                </div>
                <p
                    className="mt-3 mb-0 text-2xl md:text-4xl text-primary-new font-bold tracking-wide text-center wow fadeInDown capitalize"
                    data-wow-delay="0.3s"
                >
                    We feel you.
                </p>
            </div>
        </section>
    );
};

const SingleTestimonial: React.FC<{
    title: string;
    description: string;
    img: string;
    userName: string;
    name: string;
}> = ({ title, description, img: imgUrl, userName, name }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <>
            <div className="w-full sm:w-1/2 lg:w-1/4">
                <div className="pricing-box h-[470px] flex justify-between flex-col">
                    <div className="flex-1">
                        <div className="flex justify-center mb-4">
                            <Image className="w-1/3 md:w-1/2 rounded-full" width={120} height={120} src={imgUrl} alt="" />
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-700 font-bold text-xl leading-tight">{title}</h4>
                        </div>
                        <p className="text-gray-500">{userName}</p>
                        <p className="text-gray-500">{description}</p>
                    </div>
                    {/* <div className="flex-grow-1 items-end -mt-2">
                        <button onClick={() => setShowMore(true)} className="text-primary-new border border-primary-new px-10 py-3 rounded-full duration-300 hover:bg-primary-new hover:text-white font-bold">Read More</button>
                    </div> */}
                </div>
            </div>
            <Modal onClose={() => setShowMore(false)} show={showMore}>

                <div className="flex justify-center mb-1">
                    <img className="w-1/5 rounded-full" src={imgUrl} alt="" />
                </div>
                <p className="text-gray-100 text-center">{userName}</p>
                <p>{content.find(it => it.name === name)?.content}</p>
            </Modal>
        </>
    );
};

export default IsThisYouSection;
