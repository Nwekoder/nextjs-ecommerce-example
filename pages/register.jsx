import { useRouter } from 'next/router'
import React from 'react'

export default function LoginPage() {
    const [formValue, setFormValue] = React.useState({
        username: '',
        password: '',
        confirm: '',
        full_name: '',
        phone: '',
        email: ''
    })
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        if(formValue.confirm !== formValue.password) return alert("Password tidak sama!")

        try {
            const res = await fetch('/api/user/register', {
                method: 'POST',
                body: JSON.stringify(formValue)
            })

            if(res.ok) {
                alert("Berhasil register!")
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
            alert("Terjadi kesalahan saat register!")
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col justify-center w-2/5">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="username">Username</label>
                        <input className='w-full px-4 py-2 border rounded-md' type="text" name="username" id="username" value={formValue.username} onChange={t => setFormValue({...formValue, username: t.currentTarget.value})} required />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="password">Password</label>
                        <input minLength={8} className='w-full px-4 py-2 border rounded-md' type="password" name="password" id="password" value={formValue.password} onChange={t => setFormValue({...formValue, password: t.currentTarget.value})} required />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="confirm">Konfirmasi Password</label>
                        <input minLength={8} className='w-full px-4 py-2 border rounded-md' type="confirm" name="confirm" id="confirm" value={formValue.confirm} onChange={t => setFormValue({...formValue, confirm: t.currentTarget.value})} required />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="full_name">Nama Lengkap</label>
                        <input className='w-full px-4 py-2 border rounded-md' required type="text" name="full_name" id="full_name" value={formValue.full_name} onChange={t => setFormValue({...formValue, full_name: t.currentTarget.value})} />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col w-full gap-2 mb-4">
                            <label htmlFor="email">Email</label>
                            <input className='w-full px-4 py-2 border rounded-md' type="email" name="email" id="email" value={formValue.email} onChange={t => setFormValue({...formValue, email: t.currentTarget.value})} required />
                        </div>
                        <div className="flex flex-col w-full gap-2 mb-8">
                            <label htmlFor="phone">No. Handphone</label>
                            <input className='w-full px-4 py-2 border rounded-md' type="tel" name="phone" id="phone" value={formValue.phone} onChange={t => setFormValue({...formValue, phone: t.currentTarget.value})} required />
                        </div>
                    </div>

                    <button type="submit" className='block w-full py-2 text-white rounded-md bg-cyan-700'>Login</button>
                </form>
            </div>
        </div>
    )
}