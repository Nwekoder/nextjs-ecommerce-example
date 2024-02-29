import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { FaCartPlus } from 'react-icons/fa'

export async function getServerSideProps({params}) {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')
	const fetch_product = await fetch(`https://fakestoreapi.com/products/${params.id.toLowerCase()}`)

    let categories
    let product

	if (fetch_categories.ok){
        categories = await fetch_categories.json()
    }
	if (fetch_product.ok){
        product = await fetch_product.json()
    }

    return {
        props: {
            categories,
            product
        }
    }
}

export default function Beranda({ categories, product }) {
	const idr = 15722
    
	return (
		<>
			<Head>
				<title>L O G O</title>
			</Head>
			<Navbar links={categories} />

			<section class="text-gray-600 body-font overflow-hidden">
				<div class="container px-5 py-24 mx-auto">
					<div class="lg:w-4/5 mx-auto flex flex-wrap">
						<div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
							<h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{product.title}</h1>
							<div class="flex mb-4">
								<span class="flex-grow text-blue-500 border-b-2 border-blue-500 py-2 text-lg px-1">Description</span>
							</div>
							<p class="leading-relaxed mb-4">
								{product.description}
							</p>
							<div class="flex">
								<span class="title-font font-medium text-2xl text-gray-900">Rp. {Intl.NumberFormat('id-ID', {currency: 'idr'}).format(product.price * idr)}</span>
								<button class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded gap-2 items-center">
                                    <FaCartPlus />
                                    Beli
                                </button>
							</div>
						</div>
						<img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded" src={product.image} />
					</div>
				</div>
			</section>

			<footer class="bg-gray-900">
				<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
					<div class="sm:flex sm:items-center sm:justify-between">
						<div class="flex justify-center text-white sm:justify-start">
							<span className="text-3xl font-bold tracking-wider">LOGO</span>
						</div>

						<p class="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">Copyright &copy; 2024. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</>
	)
}
