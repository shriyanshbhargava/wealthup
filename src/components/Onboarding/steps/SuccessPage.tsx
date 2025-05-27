// components/myaccount/onboarding/SuccessPage.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuccessPage: React.FC = () => {
    return (
        <div
            className="flex flex-col items-center justify-center h-[80vh]"
            style={{
                backgroundImage: "url('/assets/img/celebration.gif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="rounded-lg p-8 w-full h-full flex flex-col justify-between text-center">
                {/* Spacer for top alignment */}
                <div></div>

                {/* Main content */}
                <div className="lg:space-y-14 space-y-10 text-center">
                    {/* Success tick and message */}
                    <div className="flex flex-col items-center text-center text-base lg:text-[20px] text-[#4A5151] font-semibold">
                        <Image src="/assets/img/Tick.svg" width={36} height={36} alt="Success" />
                        Application Complete!
                    </div>

                    {/* Congratulations heading */}
                    <h1 className="text-[30px] lg:text-[40px] font-semibold text-[#035782]">
                        Congrats!<br /> You’re all set.
                    </h1>

                    {/* Support message */}
                    <p className="text-[10px] lg:text-[15px] font-semibold text-[#4A5151]">
                        Thank you for choosing us as your trusted <br />
                        financial guide. We have your back now!
                    </p>
                </div>

                {/* Footer content */}
                <div>
                    {/* Notification message */}
                    <p className="text-[10px] lg:text-[15px] font-semibold text-[#4A5151]">
                        You will be notified when your account gets<br />
                        activated. Meanwhile, you can check out:
                    </p>

                    {/* Call-to-action button */}
                    <div className="flex my-10 lg:my-20 justify-center w-full">
                        <Link
                            href="/myaccount/riskometer"
                            className="bg-[#FB7306] text-white text-lg lg:text-[20px] font-semibold p-4 w-full rounded"
                        >
                            Check your risk profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
