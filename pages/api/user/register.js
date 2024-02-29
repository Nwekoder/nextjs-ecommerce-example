import { prisma } from "@/lib/prisma"
import bcryptjs from 'bcryptjs'

export default async function handler(req, res) {
    if(req.method !== "POST") return res.status(404).json({error: "Method tidak didukung!"})

    const data = JSON.parse(req.body)

    try {
        await prisma.user.create({
            data: {
                username: data.username,
                password: await bcryptjs.hash(data.password, 10),
                email: data.email,
                full_name: data.full_name,
                phone: data.phone
            }
        })

        return res.status(200).json({
            message: 'Berhasil!'
        })
    } catch (error) {
        console.error(error)
        
        return res.status(500).json({
            message: 'Terjadi kesalahan!'
        })
    }
}