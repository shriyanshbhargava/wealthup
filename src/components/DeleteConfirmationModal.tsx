import React from 'react'

const DeleteConfirmationModal = ({ onClose, handleDelete, id, sub }: { onClose: () => void, handleDelete: (id: number, sub: boolean) => Promise<void>, id: number, sub: boolean }) => {
    return (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-[999] bg-black bg-opacity-30">
            <div className="flex flex-col items-center gap-4 bg-white p-4 sm:p-8 rounded-xl w-11/12 max-w-[420px] shadow-md">
                <p className='text-[#035782] font-medium text-xl'>Do you want to delete this investment?</p>
                <div className='flex justify-between w-full'>
                    <button onClick={onClose} className='text-white font-medium rounded-md px-3 py-1.5 bg-gray-500'>Cancel</button>
                    <button onClick={() => {
                        handleDelete(id, sub)
                        onClose()}} className='text-white font-medium px-3 py-1.5 bg-red-500 rounded-md'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal
