'use client'

import React, { useState } from 'react'
import { LoginReq } from '../models/LoginReq';
import { ValidationError } from '../models/ValidationError';

export default function Register() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const [loginReq, setLoginReq] = useState<LoginReq>(new LoginReq());
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([
    new ValidationError("email", ""),
    new ValidationError("password", "")
  ])

  function changeHandler(value: string, key: "email" | "password") {
    if (key == 'email') {
      setLoginReq((prev) => ({
        ...prev, email: value
      }));
    }
    else if (key == 'password') {
      setLoginReq((prev) => ({
        ...prev, password: value
      }));
    }
  }

  function validate() {
    let isValid = true;
    const updatedErrors: ValidationError[] = JSON.parse(JSON.stringify(errors));

    if (!loginReq.email) {
      isValid = false;
      updatedErrors[0].error = "Email is required.";
      setErrors(updatedErrors);
    }
    else if (!emailRegex.test(loginReq.email)) {
      isValid = false;
      updatedErrors[0].error = "Invalid Email.";
      setErrors(updatedErrors);
    }
    else {
      updatedErrors[0].error = "";
      setErrors(updatedErrors);
    }

    if (!loginReq.password) {
      isValid = false;
      updatedErrors[1].error = "Password is Required.";
      setErrors(updatedErrors);
    }
    else if (!passwordRegex.test(loginReq.password)) {
      isValid = false;
      updatedErrors[1].error = "Password must be at least 8 characters with an uppercase, number, and special character.";
      setErrors(updatedErrors);
    }
    else {
      updatedErrors[1].error = "";
      setErrors(updatedErrors);
    }

    console.log(updatedErrors);

    return isValid;
  }


  async function login() {
    if (!validate()) {
      return;
    }
    const res = await fetch("/api/login", {
      body: JSON.stringify(loginReq),
      method: 'POST'
    });

    const body = await res.json()
    console.log(body);
    setToken(body?.token || body?.error || body?.errors || body?.message);
    localStorage.setItem("token", body?.token);
    return body?.token || body?.error || body?.errors || body?.message;
  }

  return (
    <div className='flex flex-col justify-center w-full h-svh items-center'>
      <div className='w-full max-w-[400px] shadow-[0_0px_10px] bg-slate-950 shadow-rose-500 rounded-xl p-6 flex flex-col items-center'
        onKeyDown={(e) => {
          if (e.key == "Enter")
            login()
        }}>
        <img src="/jwt-logo.svg" className='w-[100px] m-4 rotate' alt="" />
        <div className="w-full flex">
          <div className="flex flex-col w-1/2 mx-1">
            <label htmlFor="email" className='text-lg mt-2'>First Name</label>
            <input type="text" id="firstName" placeholder='First Name'
              onChange={(e) => changeHandler(e.target.value, 'email')} className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
            <p className='text-red-500 mb-2'>{errors[0].error}</p>
          </div>

          <div className="flex flex-col w-1/2 mx-1">
            <label htmlFor="email" className='text-lg mt-2'>Family Name</label>
            <input type="text" id="lastName" placeholder='Family Name'
              onChange={(e) => changeHandler(e.target.value, 'email')} className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
            <p className='text-red-500 mb-2'>{errors[0].error}</p>
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="email" className='text-lg mt-2'>Email</label>
          <input type="email" id="email" placeholder='Email'
            onChange={(e) => changeHandler(e.target.value, 'email')} className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
          <p className='text-red-500 mb-2'>{errors[0].error}</p>
        </div>

        <div className='w-full'>
          <label htmlFor="password" className='text-left text-lg w-full mt-2'>Password</label>
          <input type="password" id="password" placeholder='Password'
            onChange={(e) => changeHandler(e.target.value, 'password')}
            className='w-full my-2 p-2 bg-white text-black rounded-lg focus:border-none focus:outline-none' />
          {errors[1].error && <p className='text-red-500 mb-2'>{errors[1].error}</p>}
        </div>

        <button onClick={login} className='bg-rose-500 font-medium w-full my-2 p-2 rounded-lg hover:bg-rose-400'>REGISTER</button>
      </div>


      {
        token &&
        <div className='mt-6 w-full max-w-[400px] shadow-[0_0px_10px] bg-slate-950 shadow-rose-500 rounded-xl p-6 flex flex-col items-center text-rose-500 font-medium text-xl'>
          <p className='break-words max-w-full'>
            {token}
          </p>
        </div>
      }
    </div>
  )
}
