import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <>
        <Header />
        <section className='min-h-screen h-full bg-gradient-to-tr from-brand-blue to-brand-sky-blue'>
            <div className='py-16 pt-32 flex flex-col h-screen justify-center items-center container'>
                <h1 className='text-white font-semibold text-5xl mb-0'>404 Error</h1>
                <p className='text-white text-3xl mb-8 text-center'>We could not find the page you were looking for</p>
                <Link href="/" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Go To Homepage
          </button>
        </Link> 
            </div>
        </section>
        <Footer />
    </>
  )
}

export default NotFound
