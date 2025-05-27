import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import Image from "next/image"
import React from 'react'

const PaymentPage = () => {
    return (
        <>
            <Header />
            <main className='mt-[5rem] pb-12 bg-[rgb(3,87,130)]'>
                {/* <div className='w-full flex justify-center'>
                    <div className='relative w-full h-[460px]'>
                        <Image src="/img/payment.png" alt="Payment" fill />
                    </div>
                </div> */}
                <div className='container'>
                    <div className='max-w-5xl mx-auto'>
                        <div className='w-full h-[87rem] block'>
                            <iframe
                                src="https://topmate.io/wealthup_me/435062"
                                id="topmate-service"
                                title="Let's Connect 👋🏼"
                                width="100%"
                                style={{ height: "100%", border: "none", boxShadow: "none", outline: "none" }}
                            // style="height: 100%; border: none; box-shadow: none; outline: none"
                            />
                        </div>

                        {/* <h2>Multiple Service</h2>
                        <div className='w-full h-[520px] block'>
                            <iframe
                                src="https://topmate.io/embed/profile/wealthup_me"
                                id="topmate-service"
                                title="Let's Connect 👋🏼"
                                width="100%"
                                style={{ height: "100%", border: "none", boxShadow: "none", outline: "none" }}
                            // style="height: 100%; border: none; box-shadow: none; outline: none"
                            />
                        </div> */}
                    </div>
                </div>
                {/* <Script
                    src="https://topmate-embed.s3.ap-south-1.amazonaws.com/v1/topmate-embed.js"
                    embed-version="v1"
                    user-profile="https://topmate.io/embed/profile/wealthup_me"
                    button-text="Let's Connect"
                    btn-style={JSON.stringify({ "backgroundColor": "#000", "color": "#fff", "border": "1px solid #f0f" })}
                    async
                    defer
                ></Script > */}
            </main>
            <Footer />
        </>
    )
}

export default PaymentPage
