'use client'

import React, { useEffect, useState } from 'react'
import { UserDto } from '../models/RegisterReq'

export default function UserManagenent() {
  const [users, setUsers] = useState<UserDto[]>([]);

  async function getUsers() {
    const res = await fetch("/api/get-users", {
      method: "GET"
    });

    if (res.ok) {
      const userRes = await res.json();
      if (userRes?.length > 0) {
        setUsers(userRes);
      }
    }
  }

  async function getLoggedinUser() {
    const res = await fetch("/api/loggedin-user", {
      method: "GET"
    });

    if(res.ok){
      const user = await res.json();
      console.log(user);
    }
  }

  useEffect(() => {
    getLoggedinUser();
    getUsers();
  }, [])

  return (
    <div className='rounded-xl overflow-hidden m-8 text-lg'>
      <table className='border-separate border-spacing-0 w-full bg-slate-900'>
        <thead className='border-none rounded-lg'>
          <tr className=''>
            <th className='py-1 border-slate-400 border-b-2 border-l-2 border-t-2 border-r-2' style={{ borderTopLeftRadius: '1rem' }}>First Name</th>
            <th className='py-1 border-slate-400 border-b-2 border-r-2 border-t-2'>Last Name</th>
            <th className='py-1 border-slate-400 border-b-2 border-r-2 border-t-2'>Email</th>
            <th className='py-1 border-slate-400 border-b-2 border-r-2 border-t-2' style={{ borderTopRightRadius: '1rem' }}>Role</th>
          </tr>
        </thead>

        <tbody className=''>
          {
            users?.length > 0 &&
            users.map((user, index) => {
              return (
                <tr key={"USER_"+user.email} className='even:bg-slate-900 odd:bg-slate-800'>
                  <td className='py-1 border-slate-400 border-b-2 border-l-2 border-r-2 text-center' style={{ borderBottomLeftRadius: `${index == (users.length-1) ? '1rem' : '0px'}` }}>{user.firstName}</td>
                  <td className='py-1 border-slate-400 border-b-2 border-r-2 text-center'>{user.lastName}</td>
                  <td className='py-1 border-slate-400 border-b-2 border-r-2 text-center'>{user.email}</td>
                  <td className='py-1 border-slate-400 border-b-2 border-r-2 text-center' style={{ borderBottomRightRadius: `${index == (users.length-1) ? '1rem' : '0px'}` }}>{user.role}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
