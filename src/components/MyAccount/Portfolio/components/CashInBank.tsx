import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react'

import { BsPencil } from 'react-icons/bs';
import Input from '@/components/ui/Input';
import { MdCancel } from 'react-icons/md';
import Storage from '@/utils/storage';
import { UserApi } from '@/api/services/user/UserApi';
import { toast } from 'react-toastify';

export const CashOrFD: FC<{
    num: number,
    type: 'cash_in_bank' | 'fixed_deposit',
    setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    num,
    type,
    setFetchAgain
}) => {
        const [showForm, setShowForm] = useState(false);
        const [error, setError] = useState('');

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const amount = formData.get('amount')
            if (!amount) {
                setError('Amount is required')
                return;
            }

            const tokens = Storage.getToken()!;
            const userApiClient = new UserApi(tokens.access_token);

            const res: Response = await userApiClient.updateSensitiveData(JSON.stringify({
                [type]: parseInt(amount.toString())
            }))

            if (res.ok) {
                setShowForm(false);
                setFetchAgain(true);
                const message = type === "cash_in_bank" ? "Cash in Bank updated" : "Fixed Deposit udpated"
                toast.success(message);
            } else {
                const json = await res.json();
                toast.error(json.message ?? 'Something went wrong.');
            }
        }
        return (
            <>
                <div className="bg-primary-lighter rounded-xl px-4 py-6 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-bold font-robo">{type === "cash_in_bank" ? 'Cash In Bank' : 'Fixed Deposit'}</span>
                        <div className="flex items-center text-2xl gap-4 md:gap-8">
                            <div className="flex flex-col">
                                <p className="mb-0 text-base md:text-xl">
                                    Current:{" "}
                                    {Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        maximumFractionDigits: 0,
                                    }).format(num ?? 0)}
                                </p>
                            </div>
                            {showForm ? <MdCancel className="text-xl md:text-2xl cursor-pointer" onClick={() => setShowForm(false)} /> : <BsPencil className="text-xl md:text-2xl cursor-pointer" onClick={() => setShowForm(true)} />}
                        </div>
                    </div>
                    <AnimatePresence>
                        {showForm && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: '120px', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className='mt-4'>
                                <form onSubmit={handleSubmit}>
                                    <Input error={error} name="amount" required type='number' placeholder='Enter amount' label='Amount' bgLabel='bg-primary-lighter' defaultValue={num} />
                                    <button className='btn' type='submit'>Submit</button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </>
        )
    }
