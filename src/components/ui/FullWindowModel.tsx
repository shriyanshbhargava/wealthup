import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { useRouter } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

type Props = {
  handleExit: React.MouseEventHandler<HTMLButtonElement>;
  background?: string;
  children: ReactNode;
  shareUrl?: string;
  title?: string;
  questions?: boolean;
};

const FullWindowModel: React.FC<Props> = ({
  handleExit,
  background = "bg-[#C3466A]",
  shareUrl,
  children,
  title = '', // Provide default empty string to avoid undefined
  questions = false,
}) => {
  const text = background === "bg-white" ? "text-black" : "text-white";
  const { query } = useRouter();
  const handleShare = (platfrom: string) => {};

  return (
    <motion.div
      initial={{ top: "50%" }}
      animate={{ top: 0 }}
      exit={{ top: "100%", opacity: 0 }}
      className={`z-30 ${background} overflow-y-scroll h-screen min-h-auto md:min-h-[980px] w-screen fixed`}
    >
      <Header />
      <button
        className={`p-4 md:p-8 absolute top-16 left-0 flex ${text} gap-2 items-center z-40`}
        onClick={handleExit}
      >
        <HiOutlineArrowNarrowLeft size={20} />
        <span className="font-robo font-medium text-sm md:text-lg uppercase">
          Return to WealthoMeter
        </span>
      </button>
      {shareUrl && (
        <div className="absolute p-4 md:p-8 top-24 md:top-16 right-0 flex gap-4 items-center">
          <span className="font-robo hidden md:block text-xs uppercase text-white font-bold">
            share with a friend
          </span>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)} ${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <FaWhatsapp color="white" size={28} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <FaLinkedin color="white" size={28} />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <FaFacebook color="white" size={28} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl || '')}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <FaTwitter color="white" size={28} />
          </a>
        </div>
      )}
      {children}
      <Footer />
    </motion.div>
  );
};

export default FullWindowModel;