import Link from 'next/link'
import React from 'react'

export const WealthoMeterButton = () => {
    return (
        (<Link href="/wealthometer/questions" className="w-full flex justify-center">

            <button className="sm:w-fit w-full bg-gradient-to-tr from-primary-blue-dark to-primary-sky-blue hover:bg-gradient-to-br transition-all ease-in-out duration-200 rounded-full px-8 py-4 text-lg font-extrabold text-white shadow-2xl">
                Get Started
            </button>

        </Link>)
    );
}
