import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Head from 'next/head'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'
import { prisma } from '@/lib/prisma'
import Footer from '@/components/Footer'

export async function getServerSideProps({ params, req, res }) {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')
	const fetch_products = await fetch(`https://fakestoreapi.com/products/category/${params.category.toLowerCase()}`)
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

		if(cart) {
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
	}

	let categories
	let products

	if (fetch_categories.ok) {
		categories = await fetch_categories.json()
	}
	if (fetch_products.ok) {
		products = await fetch_products.json()
	}

	return {
		props: {
			categories,
			products,
			carts,
		},
	}
}

export default function CategoryPage({ categories, products, carts }) {
	return (
		<>
			<Head>
				<title>L O G O</title>
			</Head>

			<Navbar links={categories} carts={carts} />
			<div className="grid w-5/6 grid-cols-4 gap-8 mx-auto mt-8 mb-4 min-h-[80vh]">
				{products.map((product, i) => (
					<ProductCard key={i} name={product.title} price={product.price} image={product.image} id={product.id} category={product.category} />
				))}
			</div>

			<Footer />
		</>
	)
}
