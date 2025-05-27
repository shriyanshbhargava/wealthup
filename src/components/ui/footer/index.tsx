import { IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io";

import Image from "next/legacy/image";
import Link from "next/link";
import amfiImage from '@/assets/images/partners/amfi.png';
import irdaiImage from '@/assets/images/partners/irdai.png';

const Footer = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <footer id="footer" className="bg-sky-800 py-8 " style={style}>
      <div className="px-4 md:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-12">
          <div
            className="col-span-4"
            data-wow-delay="0.2s"
          >
            <div className="mb-8 lg:mr-4">
              <div className="footer-logo ">
                <Image src="/assets/img/wealthup-new-whitelogo.png" alt="wealthup logo" width="150" height="48" />
              </div>
              <p className="text-white text-base">
                Wealthup helps professionals track and manage every aspect of their personal finances. This covers comprehensive financial planning, tax planning, investments across mutual funds, invoice discounting & asset leasing, life insurance, health insurance, loans, monthly budget etc.
              </p>

              <div className="flex gap-4">
                <Image src={amfiImage} alt="AMFI" className="w-40" />
                <Image src={irdaiImage} alt="IRDAI" className="w-40" />
              </div>
              <div>
                <Link href="/ARNregistration.pdf" target="_blank" rel="noopener noreferrer" className="text-white text-base">
                  ARN certificate
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex flex-wrap">

              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="mb-8">
                  <h3 className="font-bold text-xl text-white mb-3">Company</h3>
                  <ul className="list-none">
                    <li>
                      <Link href="/" className="footer-links">

                        Home

                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="footer-links">

                        About Us

                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="footer-links">

                        Privacy Policy

                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="footer-links">

                        Terms and Conditions

                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <div className="mb-8">
                  <h3 className="font-bold text-xl text-white mb-3">Tools</h3>
                  <ul className="list-none">
                    <li>
                      <Link href="/financial-health-checker" className="footer-links">

                        WealthoMeter

                      </Link>
                    </li>
                    <li>
                      <Link href="/risk-profile" className="footer-links">

                        RiskoMeter

                      </Link>
                    </li>
                    <li>
                      <Link href="/financial-literacy" className="footer-links">

                        FinknowMeter

                      </Link>
                    </li>
                    <li>
                      <Link href="/rent-receipt-generator" className="footer-links">

                        Rent Receipt Generator

                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/tax-saving" className="footer-links">

                        Tax-Saving Tool

                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <div className="mb-8">
                  <h3 className="font-bold text-xl text-white mb-3">Resources</h3>
                  <ul className="list-none">
                    <li>
                      <Link href="/resources/blog" className="footer-links">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources/school-of-finance" className="footer-links">
                        School of Finance
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources/faq" className="footer-links">
                        FAQs
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <div className="mb-8">
                  <h3 className="font-bold text-xl text-white mb-5">Find us on</h3>

                  <ul className="social-icons flex justify-start list-none">
                    <li className="mx-2">
                      <a
                        className="text-white hover:text-pink-500 transition-all"
                        href="https://www.instagram.com/wealthup.me/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Wealthup Instagram Handle"
                      >
                        <IoLogoInstagram size={30} />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        className="text-white hover:text-red-500 transition-all"
                        href="https://www.youtube.com/channel/UCZbkPE02-FQ5m_AiD-ZTObQ"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Wealthup YouTube Channel"
                      >

                        <IoLogoYoutube size={30} />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        className="text-white hover:text-blue-500 transition-all"
                        href="https://www.linkedin.com/company/wealthup-me/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Wealthup LinkedIn Page"
                      >
                        <IoLogoLinkedin size={30} />

                      </a>
                    </li>
                  </ul>

                  <div className="text-white flex flex-col gap-2 mt-4">
                    <a
                      target="_blank"
                      href="tel:+918035864017"
                      rel="noreferrer"
                      className="text-base hover:text-primary-new "
                    >
                      +91 770 404 7770
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="mailto:hello@wealthup.me?body=Hi wealthup.me,  I am interested to learn more about you. Please send me information regarding... Thank you!&subject=New Message for wealthup.me!"
                      className="text-base hover:text-primary-new"
                    >
                      hello@wealthup.me
                    </a>
                  </div>
                  <div className="text-white mt-2 ">
                    <p className="text-sm ">Address: A-209 2ND A CROSS,VYALIKAVAL HBCS LAYOUT, Venkateshapura, NAGAVARA, Bangalore North, Bangalore-
                      560045, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <p className="text-white text-base mt-4">
            copyright &copy; 2021-24 Escalar Technologies LLP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
