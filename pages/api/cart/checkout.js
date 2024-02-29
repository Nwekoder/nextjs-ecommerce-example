import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	if (req.method !== 'GET') return res.status(404).json({ error: 'Method tidak didukung!' })

	const id_cart = req.query.id_cart
    console.log(id_cart)

	const session = await getServerSession(req,res,authOptions)

	try {
		if (!session.user) throw new Error('Unauthenticated!')

		await prisma.$transaction(async (tx) => {
            const get_cart_items = await tx.cartItem.findMany({
                where: {
                    id_cart: Number(id_cart)
                }
            })

            const create_order = await tx.order.create({
                data: {
                    id_user: session.user.id
                }
            })

            for(let i = 0; i < get_cart_items.length; i++) {
                await tx.orderItem.create({
                    data: {
                        id_product: get_cart_items[i].id_product,
                        price: get_cart_items[i].price,
                        qty: get_cart_items[i].qty,
                        total: get_cart_items[i].total,
                        id_order: create_order.id
                    }
                })
            }

            await tx.cart.update({
                where: {
                    id: Number(id_cart)
                },
                data: {
                    checked_out: true
                }
            })
		})

		return res.status(200).json({
			message: 'Berhasil!',
		})
	} catch (error) {
		console.error(error)

		return res.status(500).json({
			message: 'Terjadi kesalahan!',
		})
	}
}
