import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Head from 'next/head'

export async function getServerSideProps({ params }) {
	const fetch_categories = await fetch('https://fakestoreapi.com/products/categories')
	const fetch_products = await fetch(`https://fakestoreapi.com/products/category/${params.category.toLowerCase()}`)

    let categories
    let products

	if (fetch_categories.ok){
        categories = await fetch_categories.json()
    }
	if (fetch_products.ok){
        products = await fetch_products.json()
    }

    return {
        props: {
            categories,
            products
        }
    }
}

export default function CategoryPage({categories, products}) {
	return (
		<>
			<Head>
				<title>L O G O</title>
			</Head>

			<Navbar links={categories} />
			<div className="grid w-5/6 grid-cols-4 gap-8 mx-auto mt-8 mb-4">
                {
                    products.map((product, i) => (
                        <ProductCard key={i} name={product.title} price={product.price} image={product.image} id={product.id} category={product.category} />
                    ))
                }
			</div>
		</>
	)
}
