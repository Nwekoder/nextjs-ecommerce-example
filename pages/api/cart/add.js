import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	if (req.method !== 'GET') return res.status(404).json({ error: 'Method tidak didukung!' })

	const id_product = req.query.id_product

	const session = await getServerSession(req,res,authOptions)

	try {
		if (!session.user) throw new Error('Unauthenticated!')

        const fetch_product = await fetch(`https://fakestoreapi.com/products/${id_product}`)
        const product = await fetch_product.json()

		await prisma.$transaction(async (tx) => {
			let cart_id

			const get_last_cart = await tx.cart.findFirst({
				where: {
					id_user: session.user.id,
					checked_out: false,
				},
				orderBy: {
					id: 'desc',
				},
			})

			if (!get_last_cart) {
				const new_cart = await tx.cart.create({
					data: {
						id_user: session.user.id,
					},
				})
				cart_id = new_cart.id
			} else {
				cart_id = get_last_cart.id
			}

			await tx.cartItem.create({
				data: {
					id_cart: cart_id,
					id_product: Number(id_product),
					qty: 1,
					price: product.price * 15722,
					total: product.price * 15722,
				},
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
