import Link from 'next/link'

export default function ProductCard({id, name, price, image}) {
	const idr = 15722

	return (
		<Link href={"/product/" + id} class="group block border rounded-lg p-4">
			<img
				src={image}
				alt=""
				class="aspect-square w-full rounded object-cover"
			/>

			<div class="mt-3">
				<h3 class="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">{name}</h3>

				<p class="mt-1 text-sm text-gray-700">Rp. {Intl.NumberFormat('id-ID', {currency: 'idr'}).format(price * idr)}</p>
			</div>
		</Link>
	)
}
