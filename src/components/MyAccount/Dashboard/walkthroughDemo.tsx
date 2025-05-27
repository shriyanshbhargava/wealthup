import React, { useEffect, useRef } from 'react';

interface WalkthroughDemoProps {
    onClose: () => void;
}

const WalkthroughDemo: React.FC<WalkthroughDemoProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        // Disable scroll by setting overflow to hidden
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        // Add event listener for clicks outside the modal
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup on unmount: restore scrolling and remove event listener
        return () => {
            document.body.style.overflow = originalStyle; // Restore original overflow
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 mt-[72px] flex justify-center items-center bg-[#1C1C1CB8] z-40 lg:pl-[250px]">
            <div
                ref={modalRef}
                className="custom-shadow-1 p-10 w-3/4 md:w-1/2 h-fit text-2xl font-semibold text-[#232323] bg-white rounded-2xl z-50"
            >
                You don&apos;t have any mutual fund data right now. Please update or refresh your PAN to get the latest data.
            </div>
        </div>
    );
};

export default WalkthroughDemo;
