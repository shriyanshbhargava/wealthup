"use client"

import { BiCopy, BiLockAlt } from 'react-icons/bi'
import { FaCheck, FaCopy } from 'react-icons/fa'
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";


import React, { useEffect, useState } from 'react'

import Button from '@/components/ui/ButtonNew'
import { Input } from '@mui/material'
import Storage from '@/utils/storage'
import { UserApi } from '@/api/services/user/UserApi'
import { baseUrl } from '@/utils/constants'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type FundAnalysisAccessType = {
    setFetchAgain?: React.Dispatch<React.SetStateAction<boolean>>
}
export const FundAnalysisAccess: React.FC<FundAnalysisAccessType> = ({ setFetchAgain }) => {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        const { access_token } = Storage.getToken()!;
        const api = new UserApi(access_token);

        (async () => {
            const res = await api.getMe();
            const me = await res.json();

            if (res.ok) {
                setCode(me.token);
            } else {
                toast.error(me)
            }
        })();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const { access_token } = Storage.getToken()!;
        const api = new UserApi(access_token);

        const code = formData.get('code')?.toString()
        if (code) {
            const res = await api.useCode(code);
            const json = await res.json()
            if (res.ok) {
                if (setFetchAgain) {
                    setFetchAgain(true)
                } else {
                    router.refresh();
                }
            } else {
                toast.error(json.message)
            }
        }
    }

    const shareUrl = `${baseUrl}/myaccount/portfolio-analyser/summary?ref=${code}`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const openShare = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="bg-[#01C8A9] rounded-full h-28 w-28 flex items-center justify-center">
                <BiLockAlt className='text-white text-5xl' />
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 mt-6">
                <div className='flex flex-col items-center'>
                    <p>Refer two people and get access</p>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleCopy} boxShadow={false} padding='px-8'>
                            <div className="flex gap-2 items-center">
                                Copy link
                                {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
                            </div>
                        </Button>
                    </div>
                    <p className='mb-0 text-base'>Or Share via</p>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => openShare(`https://api.whatsapp.com/send?text=${shareUrl}`)}
                            className="rounded-full bg-green-500 p-2 text-white"
                            aria-label="Share on WhatsApp"
                        >
                            <FaWhatsapp size={24} />
                        </button>
                        <button
                            onClick={() => openShare(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`)}
                            className="rounded-full bg-blue-700 p-2 text-white"
                            aria-label="Share on LinkedIn"
                        >
                            <FaLinkedin size={24} />
                        </button>
                        <button
                            onClick={() => openShare(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)}
                            className="rounded-full bg-blue-600 p-2 text-white"
                            aria-label="Share on Facebook"
                        >
                            <FaFacebook size={24} />
                        </button>
                        <button
                            onClick={() => openShare(`https://twitter.com/intent/tweet?url=${shareUrl}`)}
                            className="rounded-full bg-[#1DA1F2] p-2 text-white"
                            aria-label="Share on Twitter"
                        >
                            <FaTwitter size={24} />
                        </button>
                    </div>
                </div>

                <div className='w-28 text-center'>
                    <span className='text-3xl font-bold'>OR</span>
                </div>

                <form className='mb-2 flex flex-col items-center' onSubmit={handleSubmit}>
                    <p>Enter the code below to get access</p>
                    <div className='flex gap-2'>
                        <Input placeholder='Enter the code' name="code" />
                        <Button
                            type="submit"
                            size='small'
                            padding='px-1 sm:px-4 sm:py-2 max-w-fit'
                            boxShadow={false}
                            onClick={() => {}}
                        >
                            <span className='text-sm sm:text-base font-medium'>Submit</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
