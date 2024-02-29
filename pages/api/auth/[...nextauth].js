import NextAuth, {AuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import {compare} from 'bcryptjs'

/**
 * @type {AuthOptions}
 */
export const authOptions = {
    providers: [
        CredentialsProvider({
            credentials: [
                {
                    label: "Username",
                    type: 'text'
                },
                {
                    label: "Password",
                    type: 'password'
                },
            ],
            async authorize(credentials, req) {
                const {username, password} = credentials

                const get_user = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                })

                if(!get_user) return null

                const compare_password = await compare(password, get_user.password)

                if(!compare_password) return null

                return {
                    id: get_user.id,
                    name: get_user.full_name,
                    email: get_user.email,
                }
            }
        })
    ]
}

export default NextAuth(authOptions)