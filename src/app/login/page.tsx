'use client'

import React, { useState } from 'react'
import { LoginReq } from '../models/LoginReq'
import { validateLogin } from './validations/schema';
import { FaCopy, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ZodFormattedError } from 'zod';

export default function Login() {
  const [loginReq, setLoginReq] = useState<LoginReq>(new LoginReq());
  const [apiRes, setApiRes] = useState<{ success?: string, token?: string, error?: string }>();
  const [clipboardMessage, setClipboardMessage] = useState<string>("");
  const [showToaster, setShowToaster] = useState<boolean>(false);
  const [errors, setErrors] = useState<ZodFormattedError<{
    email: string;
    password: string;
  }, string>>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  function changeHandler(value: string, key: "email" | "password") {
    const updatedReq: LoginReq = JSON.parse(JSON.stringify(loginReq));
    updatedReq[key] = value;
    setLoginReq(updatedReq);
    validate(updatedReq);
  }

  function validate(updatedReq?: LoginReq) {
    const res = validateLogin(updatedReq ?? loginReq);
    setErrors(res.error?.format());
    console.log(res.error?.format());
    return res.success;
  }


  async function login() {
    if (!validate()) {
      return;
    }
    const res = await fetch("/api/login", {
      body: JSON.stringify(loginReq),
      method: 'POST'
    });

    const body = await res.json() ?? undefined;
    if (body?.token) {
      setApiRes({
        success: "Succesfully logged in",
        token: body.token
      });
    }
    else {
      setApiRes({
        error: body?.error ?? "Something went wrong );"
      });
    }
  }

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    setClipboardMessage("Copied!");
    setShowToaster(true);
    setTimeout(() => { setShowToaster(false) }, 2000);
  }

  function makeVisible(): void {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className='flex flex-col justify-center w-full h-svh items-center'>

      <div className={`absolute top-8 right-8 opacity-0 transition-opacity duration-400 ${showToaster && "opacity-100"}`}>
        <div className='bg-slate-950 shadow-[0_0px_10px] shadow-rose-500 rounded-xl p-6 flex flex-col items-center text-rose-500 font-medium text-xl'>
          {clipboardMessage}
        </div>
      </div>

      <div className='w-full max-w-[400px] shadow-[0_0px_10px] bg-slate-950 shadow-rose-500 rounded-xl p-6 flex flex-col items-center'
        onKeyDown={(e) => {
          if (e.key == "Enter")
            login()
        }}>
        <img src="/jwt-logo.svg" className='w-[100px] m-4 rotate' alt="" />
        <div className="w-full">
          <label htmlFor="email" className='text-lg mt-2'>Email</label>
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

        <button onClick={login} className='bg-rose-500 font-medium w-full my-2 p-2 rounded-lg hover:bg-rose-400'>LOGIN</button>
        <a href="/register" className='p-1 link'>Not yet resgistered?</a>
      </div>


      {
        apiRes &&
        <div className='mt-6 w-full max-w-[400px] shadow-[0_0px_10px] bg-slate-950 shadow-rose-500 rounded-xl p-6 flex flex-col items-center text-rose-500 font-medium text-xl'>
          <p className='break-words max-w-full'>
            {apiRes.success ?? apiRes.error}
          </p>

          {
            apiRes.token &&
            <div className="w-full flex flex-col" onClick={() => copyToClipboard(apiRes.token || "")}>
              <div className='w-24 flex items-center'>
                Token: <div className='px-2 hover:cursor-pointer'><FaCopy /></div>
              </div>
              <p className='break-words max-w-full'>
                {apiRes.token}
              </p>
            </div>
          }
        </div>
      }
    </div>
  )
}
