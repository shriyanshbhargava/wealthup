'use client'

import * as Yup from "yup";

import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'

import {AiOutlineClose} from 'react-icons/ai'
import { AuthApi } from "@/api/services/auth/AuthApi";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import Button from '@/components/ui/ButtonNew';
import { EmailApi } from '@/api/services/notification/EmailApi';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal/Modal'
import PhoneInputNumber from 'react-phone-number-input';
import Storage from "@/utils/storage";
import {SubmissionInput} from '@/components/ui/Input'
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

const style = theme => ({
    position: 'absolute',
    top:'50%',
    left:"50%",
    transform:'translate(-50%, -50%)',
    width:400,
    bgcolor:'#E8F8F5',
    borderRadius:'8px',
    textAlign:"center",
    color:"#045783",
  })

  
  
  const loginValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone should contain 10 digits"),
    otp: Yup.string()
      .matches(/^[0-9]+$/, "Enter OTP")
      .max(6, "OTP should only contain 6 numbers"),
    acceptTerms: Yup.bool().oneOf([true], "* required"),
  });


const AddTerm = ({openModal, onClose, setIsLoggedIn, isLoggedIn, name, setName}) => {

  const [darkMode, setDarkMode] = useState(true);
  
  const [termToAdd, setTermToAdd] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidationSchema) });


  const handleKeyDownPhone = (e) => {
    if (e.key === "Enter") {
      handleSubmit(sendOTP)();
    }
  };

  const AuthApiClient = new AuthApi();
  const sendOTP = async (data) => {

    setOtpLoading(true);

    // if (!__prod__) {
    //   setOtpSent(true);
    //   setOtpLoading(false);
    //   return;
    // }
    

    const body = {
      phone: data.phone.replace('+', ''),
      method: 'login'
    };


    try {
      const res = await AuthApiClient.sendOTP(JSON.stringify(body));
      setOtpLoading(false);
      const json = await res.json();
      if (res.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent successfully. Check your phone.");
      } else {
        toast.error(json?.message ?? "Something went wrong while sending OTP");
      }
    } catch (err) {
      console.log(err);
      setOtpLoading(false);
      toast.error("Something went wrong while sending OTP");
    }
  };

  const verifyOTPAndSubmit = async (data) => {
    setSubmitting(true);

    // if (!__prod__) {
    //   setSubmitting(false);
    //   if (window != undefined) {
    //     localStorage.setItem(
    //       "token",
    //       JSON.stringify({
    //         auth_token: "sometokengoeshere",
    //         expires_at: "Date;;;",
    //       })
    //     );
    //   }
    //   push("/myaccount/dashboard");
    //   return;
    // }

    const body = {
      phone: data.phone.replace('+', ''),
      otp: data.otp,
    };

    try {
      const response = await AuthApiClient.login(
        JSON.stringify(body)
      );

      const json = await response.json();

      if (response.ok && response.status === 200) {
        setSubmitting(false);
        Storage.storeToken(json.tokens);
        setIsLoggedIn(true)
      }
      else {
        if (json.status === "invalid") {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        } else if (json.status === "expired") {
          setSubmitting(false);
          toast.error("This OTP has expired");
        } else {
          setSubmitting(false);
          toast.error("Invalid OTP. Try again.");
        }
      }
    } catch (err) {
      setSubmitting(false);
      toast.error("Something went wrong while verifying OTP");
    }
  };

  const requestTerm = async (e) => {
    e.preventDefault();
    
    const body = `${name} wants to add a new term to Financial Glossary : \n The term is ${termToAdd}`;
    const subject = `Request to add a new term to Financial Glossary by user ${name}`
    try {
      const emailApi = new EmailApi();
      await emailApi.sendMail({
        email: ["murxli.krishna@gmail.com"],
        body: body,
        subject: subject,
      });
      setTermToAdd("");
      onClose();
    } catch (err) {
      console.log(err);
    }

  }



  

  const handleChange = (e) =>{
    if(e.target.name === 'termtoadd'){
      setTermToAdd(e.target.value);
    }
  } 

  useEffect(()=>{
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  },[])



  return (
    <Modal 
      open={openModal} 
      onClose={onClose} 
      closeAfterTransition
      slots={{backdrop: Backdrop}}
    >
        <Fade in={openModal}>
          <Box sx={style} maxWidth={'90%'} >

            <AiOutlineClose size={20} color='#045783' className='absolute top-4 right-4 cursor-pointer' onClick={onClose}/>

            <div className='py-4'>

              {isLoggedIn && 
                <div>
                  <h3 className='font-semibold sm:font-medium text-xl sm:text-2xl '>Request to add a term</h3>
                  <form onSubmit={requestTerm}>
                    <label htmlFor="termtoadd"></label>
                    <input 
                      type="text" 
                      id='termtoadd'
                      name='termtoadd'
                      value={termToAdd} 
                      onChange={handleChange} 
                      placeholder='Term' 
                      className={`rounded-md border-2 border-[#045783] focus:border-[#045783] focus:outline-none px-4 py-2 w-4/5 ${darkMode? 'bg-[#045783] text-white placeholder-white' : ''}`}
                      required
                    />
                    <div className='pt-4 max-w-fit m-auto'>
                        <Button size='small' onClick={requestTerm}>Submit</Button>
                    </div>
                  </form>
                </div> }

                {!isLoggedIn && 
                  <div>
                    <h3 className='font-semibold sm:font-medium text-xl sm:text-2xl '>Login here</h3>
                    <form
                        className="w-4/5 m-auto"
                        onSubmit={handleSubmit(verifyOTPAndSubmit)}
                      >
                        <div className="flex flex-col gap-1 w-full ">
                          <Controller
                            name="phone"
                            control={control}
                            rules={{
                              validate: (value) => isValidPhoneNumber(value),
                            }}
                            render={({ field: { onChange, value } }) => (
                              <div>
                                <PhoneInputNumber
                                  value={value}
                                  placeholder="Phone"
                                  onChange={onChange}
                                  autoComplete="tel"
                                  defaultCountry="IN"
                                  className={`rounded-md my-2 border-2 border-[#045783] focus:border-[#045783] focus:outline-none px-4 py-2 ${darkMode? 'darkmode bg-[#045783] text-white placeholder-white' : ''}`}
                                />
                                {<p className='text-sm text-left text-red-500 m-0'>{errors.phone?.message}</p>}
                              </div>
                            )}
                          />
                          
                          {otpSent && (
                            <>
                              <SubmissionInput
                                type="number"
                                label=""
                                {...register("otp")}
                                autoFocus
                                placeholder="OTP"
                                autoComplete="one-time-code"
                                className={`px-4 py-2 focus:outline-none rounded-md my-2 border-2 border-[#045783] otp ${darkMode? 'darkmode  bg-[#045783] text-white placeholder-white' : 'text-[#045783]'} `}
                              />
                              {<p className='text-sm text-left text-red-500 m-0'>{errors.otp?.message}</p>}
                              <p className="font-robo font-normal text-sm">
                                Didn&apos;t receive code?{" "}
                                <span
                                  className="font-bold text-blue-700 underline cursor-pointer"
                                  onClick={handleSubmit(sendOTP)}
                                >
                                  Request again
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                        <div>
                        {otpSent ? (
                          <Button type="submit" size="bigger" className="btn" loading={submitting}>
                            Submit
                          </Button>
                        ) : (
                          <Button
                            size="bigger"
                            className="btn"
                            loading={otpLoading}
                            onClick={handleSubmit(sendOTP)}
                          >
                            Send OTP
                          </Button>
                        )}
                      </div>
                    </form>

                  </div>
                }
            </div>
          </Box>
        </Fade>
    </Modal>
  )
}

export default AddTerm
