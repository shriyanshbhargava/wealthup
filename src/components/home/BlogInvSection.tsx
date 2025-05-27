import { BsArrowRight } from "react-icons/bs";
import Image from "next/legacy/image";
import InfiniteLooper from "@/components/ui/InfiniteLooper";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const BlogInvSection = () => {
    return (
        <section id="blog-inv" className="pt-24 pb-12  sm:py-24 text-center">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="section-heading mb-2">Our Blog</h2>
                    <h3 className="text-gray-700 text-xl leading-tight">Simplifying financial jargon for you.</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <BlogComponent
                        big
                        title="Financial Planning For Long Term Wealth Creation"
                        link="https://www.wealthup.me/blog/financial-planning-for-long-term-wealth-creation"
                        bg="bg-[url('/assets/img/blog/tips-for-long-term-wealth-creation.png')]"
                        imageUrl="/assets/img/blog/tips-for-long-term-wealth-creation.png"
                    />
                    <BlogComponent
                        title="The Ultimate Guide To Buying Health Insurance"
                        link="https://www.wealthup.me/blog/the-ultimate-guide-to-buying-health-insurance"
                        bg="bg-[url('/assets/img/blog/health-insurance.png')]"
                        imageUrl="/assets/img/blog/health-insurance.png"
                    />
                    <BlogComponent
                        title="The Ultimate Guide To Buying Life Insurance"
                        link="https://www.wealthup.me/blog/the-ultimate-guide-to-buying-life-insurance"
                        bg="bg-[url('/assets/img/blog/life-insurance.png')]"
                        imageUrl="/assets/img/blog/life-insurance.png"
                    />
                </div>
                <CompanySection title="Our Partners" />
            </div>
        </section>
    );
};

export default BlogInvSection;

const BlogComponent: React.FC<{
    big?: boolean;
    title: string;
    link: string;
    bg: string;
    imageUrl: string;
}> = ({ big = false, title, link, bg, imageUrl }) => {
    return (
        (<Link
            href={link}
            className={`cursor-pointer ${big ? "col-span-2 lg:col-span-2" : "col-span-2 sm:col-span-1"
                }`}>

            <div className={`relative flex flex-col justify-end gap-4 h-72 text-left`}>
                <Image src={imageUrl} layout="fill" alt="Blog Image" />
                <div className="absolute bottom-0 left-0 w-full bg-gray-200 bg-opacity-70 p-2">
                    <p className="text-base md:text-xl text-gray-900 hover:underline leading-tight inline">{title}</p>
                    <BsArrowRight className="inline text-2xl ml-3" />
                </div>
            </div>

        </Link>)
    );
};

const CompanySection: React.FC<{ title: string }> = ({ title }) => {
    const sm = useMediaQuery({ maxWidth: 425 });
    return (
        <div className="my-8 mt-16 sm:mt-32">
            <div className="text-center">
                <h2 className="section-heading mb-0">{title}</h2>
            </div>
            <div className="max-w-screen-xl overflow-hidden">
                <InfiniteLooper direction='left' speed={30}>
                    <div className="flex flex-wrap justify-center">
                        {Array(12).fill(0).map((_, i) => (
                            <div className="w-24 md:w-40 lg:w-60" key={i}>
                                <div className="m-2 wow" data-wow-delay="0.6s">
                                    <Image
                                        width={sm ? 260 : 196}
                                        height={sm ? 90 : 78}
                                        className=""
                                        src={`/assets/img/partners/inv/${i + 1}.png`}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </InfiniteLooper>
                <InfiniteLooper direction='left' speed={30}>
                    <div className="flex flex-wrap justify-center">
                        {Array(11).fill(0).map((_, i) => (
                            <div className="w-24 md:w-40 lg:w-60" key={i}>
                                <div className="m-2 wow" data-wow-delay="0.6s">
                                    <Image
                                        width={196}
                                        height={78}
                                        className=""
                                        src={`/assets/img/partners/mf/${i + 1}.png`}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </InfiniteLooper>
            </div>
        </div>
    );
};
