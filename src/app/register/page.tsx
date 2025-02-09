'use client'

import React, { useState } from 'react'
import { RegisterReq } from '../models/RegisterReq';
import { validateRegistration } from './validations/schema';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ZodFormattedError } from 'zod';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [registerReq, setRegisterReq] = useState<RegisterReq>(new RegisterReq());
  const [apiRes, setApiRes] = useState<{success?: string, error?: string}>();
  const [errors, setErrors] = useState<ZodFormattedError<{
    email: string;
    password: string;
    firstName: string;
  }, string>>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  function changeHandler(value: string, key: "email" | "password" | "firstName" | "lastName") {
    const updatedReq: RegisterReq = JSON.parse(JSON.stringify(registerReq));
    updatedReq[key] = value;
    setRegisterReq(updatedReq);
    validate(updatedReq);
    console.log(registerReq.password);
  }

  function validate(updatedReq?: RegisterReq) {
    const res = validateRegistration(updatedReq ?? registerReq);
    setErrors(res.error?.format());
    return res.success;
  }


  async function register() {
    if (!validate()) {
      return;
    }
    const res = await fetch("/api/register", {
      body: JSON.stringify(registerReq),
      method: 'POST'
    });

    const body = await res.json() ?? undefined;
    if(body?.email){
      setApiRes({
        success: "User Registered Successfuly, you will be redirect to login page..."
      });
      
      setTimeout(()=>{router.push("/login");}, 3000)
    }
    else{
      setApiRes({
        error: body?.error ?? "Something went wrong );"
      });
    }
  }

  function makeVisible(): void {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className='flex flex-col justify-center w-full h-svh items-center'>
      <div className='w-full max-w-[450px] shadow-[0_0px_10px] bg-slate-950 shadow-rose-500 rounded-xl p-6 flex flex-col items-center'
        onKeyDown={(e) => {
          if (e.key == "Enter")
            register()
        }}>
        <img src="/jwt-logo.svg" className='w-[100px] m-4 rotate' alt="" />
        <div className="w-full flex">
          <div className="flex flex-col w-1/2 mx-1 mr-4">
            <label htmlFor="email" className='text-lg mt-2'>First Name <span className='text-red-500'>*</span></label>
            <input type="text" id="firstName" placeholder='First Name'
              onChange={(e) => changeHandler(e.target.value, 'firstName')} className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
            <p className='text-red-500 mb-2'>{errors?.firstName?._errors?.[0]}</p>
          </div>

          <div className="flex flex-col w-1/2 mx-1">
            <label htmlFor="email" className='text-lg mt-2'>Family Name</label>
            <input type="text" id="lastName" placeholder='Family Name'
              onChange={(e) => changeHandler(e.target.value, 'lastName')} className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="email" className='text-lg mt-2'>Email <span className='text-red-500'>*</span></label>
          <input type="email" id="email" placeholder='Email'
            onChange={(e) => changeHandler(e.target.value, 'email')} className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
          <p className='text-red-500 mb-2'>{errors?.email?._errors?.[0]}</p>
        </div>

        <div className='w-full'>
          <label htmlFor="password" className='text-left text-lg w-full mt-2'>Password</label>
          <input type={passwordVisible ? "text" : "password"} id="password" placeholder='Password'
            onChange={(e) => changeHandler(e.target.value, 'password')}
            className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
          <div className='w-full flex justify-end text-lg text-black -mt-11 p-2'>
            <div onClick={makeVisible} className='hover:cursor-pointer'>
              {
                passwordVisible ? <FaEye /> : <FaEyeSlash />
              }
            </div>
          </div>
          <p className='text-red-500 my-2'>{errors?.password?._errors?.[0]}</p>
        </div>

        <button onClick={register} className='bg-rose-500 font-medium w-full my-2 p-2 rounded-lg hover:bg-rose-400'>REGISTER</button>
        <a href="/login" className='p-1 link'>Already have an acoount?</a>
      </div>

      {
        apiRes &&
        <div className='mt-6 w-full max-w-[400px] shadow-[0_0px_10px] bg-slate-950 shadow-rose-500 rounded-xl p-6 flex flex-col items-center text-rose-500 font-medium text-xl'>
          <p className='break-words max-w-full'>
            {apiRes?.success ?? apiRes?.error}
          </p>
        </div>
      }
    </div>
  )
}
