import Navbar from '@/components/Navbar'
import Head from 'next/head'
import Link from 'next/link'

export async function getServerSideProps() {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')

	if (fetch_categories.ok)
		return {
			props: {
				categories: await fetch_categories.json(),
			},
		}
}

export default function Beranda({ categories }) {
	return (
		<>
      <Head>
        <title>L O G O</title>
      </Head>

			<Navbar links={categories} />

			<section class="bg-gray-50">
				<div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
					<div class="mx-auto max-w-xl text-center">
						<h1 class="text-3xl font-extrabold sm:text-5xl">
							Lorem Ipsum
							<strong class="font-extrabold text-cyan-700 sm:block"> dolor sit amet. </strong>
						</h1>

						<p class="mt-4 sm:text-xl/relaxed">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!</p>

						<div class="mt-8 flex flex-wrap justify-center gap-4 opacity-60 animate-bounce">Scroll to explore</div>
					</div>
				</div>
			</section>

			<section className="w-5/6 mx-auto">
				<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
					<header class="text-center">
						<h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Our Collections</h2>

						<p class="mx-auto mt-4 max-w-md text-gray-500">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit natus?
						</p>
					</header>

					<ul class="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
						<li>
							<Link href="/category/Men's Clothing" class="group relative block">
								<img
									src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt=""
									class="aspect-square w-full object-cover transition duration-500 group-hover:brightness-100 brightness-75"
								/>

								<div class="absolute inset-0 flex flex-col items-start justify-end p-6">
									<h3 class="text-xl font-medium text-white">Men's Clothing</h3>
								</div>
							</Link>
						</li>

						<li>
							<Link href="/category/Women's Clothing" class="group relative block">
								<img
									src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt=""
									class="aspect-square w-full object-cover transition duration-500 group-hover:brightness-100 brightness-75"
								/>

								<div class="absolute inset-0 flex flex-col items-start justify-end p-6">
									<h3 class="text-xl font-medium text-white">Women's Clothing</h3>
								</div>
							</Link>
						</li>

						<li class="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
							<Link href="/category/Jewelry" class="group relative block">
								<img
									src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt=""
									class="aspect-square w-full object-cover transition duration-500 group-hover:brightness-100 brightness-75"
								/>

								<div class="absolute inset-0 flex flex-col items-start justify-end p-6">
									<h3 class="text-xl font-medium text-white">Jewelry</h3>
								</div>
							</Link>
						</li>
					</ul>
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
