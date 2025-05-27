import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import { HeaderController } from '@/components/display/HeaderController'
import React from 'react'

const PaymentPage = () => {
    return (
        <>
            <Header />
            <HeaderController title="Workshop Financial Freedom" embed={{ image: "https://www.wealthup.me/assets/booking.jpeg" }} />
            <main className='mt-[5rem] pb-12 bg-[rgb(3,87,130)]'>
                <div className='container'>
                    <div className='max-w-5xl mx-auto'>
                        <div className='w-full h-[109rem] block'>
                            <iframe
                                src="https://topmate.io/wealthup_me/510499"
                                id="topmate-service"
                                title="Let's Connect 👋🏼"
                                width="100%"
                                style={{ height: "100%", border: "none", boxShadow: "none", outline: "none" }}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default PaymentPage
