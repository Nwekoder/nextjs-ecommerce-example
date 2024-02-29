import Navbar from '@/components/Navbar'
import Head from 'next/head'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import Footer from '@/components/Footer'

export async function getServerSideProps({ req, res }) {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')
	const session = await getServerSession(req, res, authOptions)
	let carts = []

	if (session) {
		const cart = await prisma.cart.findFirst({
			where: {
				id_user: session.user.id,
				checked_out: false,
			},
			orderBy: {
				id: 'desc',
			},
			select: {
				items: true,
			},
		})

		for (let i = 0; i < cart.items.length; i++) {
			const fetch_product_detail = await fetch('https://fakestoreapi.com/products/' + cart.items[i].id_product)
			const product_detail = await fetch_product_detail.json()

			carts.push({
				id_product: product_detail.id,
				product_name: product_detail.title,
				product_price: cart.items[i].price,
				product_image: product_detail.image,
			})
		}
	}

	if (fetch_categories.ok)
		return {
			props: {
				categories: await fetch_categories.json(),
				carts,
			},
		}
}

export default function Beranda({ categories, carts }) {
	return (
		<>
			<Head>
				<title>L O G O</title>
			</Head>

			<Navbar links={categories} carts={carts} />
            
            

			<Footer />
		</>
	)
}
