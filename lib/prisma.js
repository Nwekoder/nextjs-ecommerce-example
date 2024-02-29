import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
	authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE3MTE2NzA2MDUsImlhdCI6MTcwOTE4NDc5NiwiaWQiOiJhNGU3MTU3ZC1kNmMzLTExZWUtYTBmMS01NjJhZGE1NTUwMDIifQ.LTlleFz0XOby-OAcWmbG3vDYT9Dn2Xril4hSujwX5_r5jA1jUkugWMBibow2_UgNpmWKYARx1lJdJqO75tekDA",
	url: "libsql://nweko-ecommerce-nextjs-example-nwekoder.turso.io",
})

const adapter = new PrismaLibSQL(libsql)
export const prisma = new PrismaClient({ adapter })
