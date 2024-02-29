import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import Footer from '@/components/Footer'
import { useRouter } from 'next/router'

export async function getServerSideProps({ req, res }) {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')
	const session = await getServerSession(req, res, authOptions)
	let carts = []
	let cart_id

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
				id: true,
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
			cart_id = cart.id
		}

		return {
			props: {
				categories: await fetch_categories.json(),
				carts,
				id_cart: cart_id,
			},
		}
	}

    return {
        props: {
            categories: await fetch_categories.json(),
            carts,
        },
    }
}

export default function Beranda({ categories, carts, id_cart }) {
	const router = useRouter()
	if(!id_cart) {
		alert("Keranjang anda masih kosong!")
		router.push('/')
	}
	const subtotal = carts.reduce((prev, cur) => prev + cur.product_price, 0)

	async function checkout() {
        const res = await fetch('/api/cart/checkout?id_cart=' + id_cart)

        if(res.ok) {
            alert("Checkout berhasil!")
            router.push('/')
        }
    }

	return (
		<>
			<Head>
				<title>L O G O</title>
			</Head>

			<Navbar links={categories} carts={carts} />

			<div className="w-5/6 mx-auto my-8 min-h-[80vh]">
				<ul class="space-y-4 max-h-[70vh]">
					{carts.map((cart) => (
						<li class="flex items-center gap-4">
							<img src={cart.product_image} alt="" class="size-16 rounded object-cover" />

							<div>
								<h3 class="text-sm text-gray-900">{cart.product_name}</h3>

								<dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
									<div>
										<dt class="inline">Harga:</dt>
										<dd class="inline">Rp. {Intl.NumberFormat('id-ID', { currency: 'idr' }).format(cart.product_price)}</dd>
									</div>
								</dl>
							</div>
						</li>
					))}
				</ul>

				<div className="flex flex-col items-end w-1/3 ml-auto">
					<table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mb-4">
						<tbody class="divide-y divide-gray-200">
							<tr>
								<td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Subtotal</td>
								<td class="whitespace-nowrap px-4 py-2 text-gray-700">Rp. {Intl.NumberFormat('id-ID', { currency: 'idr' }).format(subtotal)}</td>
							</tr>
						</tbody>
					</table>
					<button type="button" onClick={checkout} className="w-full px-4 text-white py-1.5 rounded-md bg-cyan-600 transition-[background] hover:bg-cyan-700">
						Checkout
					</button>
				</div>
			</div>

			<Footer />
		</>
	)
}
