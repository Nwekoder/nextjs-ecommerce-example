import {signIn} from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'
import React from 'react'

export default function LoginPage() {
    const [formValue, setFormValue] = React.useState({
        username: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await signIn('credentials', {
                username: formValue.username,
                password: formValue.password,
                callbackUrl: '/'
            })
        } catch (error) {
            console.log(error)
            alert("Username atau Password salah!")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col justify-center w-1/5">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="username">Username</label>
                        <input className='w-full px-4 py-2 border rounded-md' type="text" name="username" id="username" value={formValue.username} onChange={t => setFormValue({...formValue, username: t.currentTarget.value})} required />
                    </div>
                    <div className="flex flex-col gap-2 mb-8">
                        <label htmlFor="password">Password</label>
                        <input className='w-full px-4 py-2 border rounded-md' type="password" name="password" id="password" value={formValue.password} onChange={t => setFormValue({...formValue, password: t.currentTarget.value})} required />
                    </div>

                    <button type="submit" className='block w-full py-2 text-white rounded-md bg-cyan-700'>Login</button>
                </form>
            </div>
        </div>
    )
}