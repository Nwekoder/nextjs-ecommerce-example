import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FaCartPlus } from 'react-icons/fa'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '../../../api/auth/[...nextauth]'
import Footer from '@/components/Footer'

export async function getServerSideProps({ params, req, res }) {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')
	const fetch_product = await fetch(`https://fakestoreapi.com/products/${params.id.toLowerCase()}`)
	const session = await getServerSession(req, res, authOptions)
	let carts = []

	let categories
	let product

	if (fetch_categories.ok) {
		categories = await fetch_categories.json()
	}
	if (fetch_product.ok) {
		product = await fetch_product.json()
	}

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

	return {
		props: {
			categories,
			product,
			carts,
		},
	}
}

export default function Beranda({ categories, product, carts }) {
	const session = useSession()
	const router = useRouter()
	const idr = 15722

	async function addToCart() {
		if (session.status === 'unauthenticated') return router.push('/login')

		try {
			const res = await fetch('/api/cart/add?id_product=' + product.id)

			if (res.ok) {
				alert('Berhasil menambahkan ke keranjang belanja!')
				router.reload()
			} else {
				throw Error(res.status)
			}
		} catch (error) {
			console.error(error)
			alert('Terjadi kesalahan!')
		}
	}

	return (
		<>
			<Head>
				<title>L O G O</title>
			</Head>
			<Navbar links={categories} carts={carts} />

			<section class="text-gray-600 body-font overflow-hidden">
				<div class="container px-5 py-24 mx-auto">
					<div class="lg:w-4/5 mx-auto flex flex-wrap">
						<div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
							<h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{product.title}</h1>
							<div class="flex mb-4">
								<span class="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Description</span>
							</div>
							<p class="leading-relaxed mb-4">{product.description}</p>
							<div class="flex">
								<span class="title-font font-medium text-2xl text-gray-900">Rp. {Intl.NumberFormat('id-ID', { currency: 'idr' }).format(product.price * idr)}</span>
								<button
									onClick={addToCart}
									class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded gap-2 items-center"
								>
									<FaCartPlus />
									Beli
								</button>
							</div>
						</div>
						<img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded" src={product.image} />
					</div>
				</div>
			</section>

			<Footer />
		</>
	)
}
