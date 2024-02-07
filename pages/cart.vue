<template>
	<div class="container mx-auto bg-white">
		<div class="px-4 pb-24 pt-16 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Корзина</h1>
			<div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				<section aria-labelledby="cart-heading" class="lg:col-span-7">
					<h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

					<ul
						role="list"
						class="divide-y divide-gray-200 border-b border-t border-gray-200"
						v-if="cartStore.cartItems.length"
					>
						<li
							v-for="(product, productIdx) in cartStore.cartItems"
							:key="product.id"
							class="flex py-6 sm:py-10"
						>
							<div class="flex-shrink-0" v-if="product.main_photo">
								<img
									:src="runtimeConfig.public.apiStorageUrl + product.main_photo.url"
									:alt="product.name_uz"
									class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
								/>
							</div>
							<div
								class="flex h-24 w-24 items-center justify-center text-[--primary] opacity-30 sm:h-48 sm:w-48"
								v-else-if="product.parent0_name_uz == 'Telefon'"
							>
								<Icon name="fluent:phone-28-filled" class="h-40 w-40" />
							</div>
							<div
								class="flex h-24 w-24 items-center justify-center text-[--primary] opacity-30 sm:h-48 sm:w-48"
								v-else-if="product.parent0_name_uz == 'Maishiy Texnika'"
							>
								<Icon name="ion:tv-sharp" class="h-40 w-40" />
							</div>
							<div
								class="flex h-24 w-24 items-center justify-center text-[--primary] opacity-30 sm:h-48 sm:w-48"
								v-else-if="product.parent0_name_uz == 'Avto ehtiyot qism'"
							>
								<Icon name="mdi:car-cog" class="h-40 w-40" />
							</div>
							<div
								class="flex h-24 w-24 items-center justify-center text-[--primary] opacity-30 sm:h-48 sm:w-48"
								v-else
							>
								<Icon name="solar:monitor-smartphone-bold" class="h-40 w-40" />
							</div>

							<div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
								<div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
									<div>
										<div class="flex justify-between">
											<NuxtLink
												:to="`/product/${slugify(product.name_uz)}-${product.id}`"
												class="text-lg font-medium text-gray-700 hover:text-[--primary]"
											>
												{{ product.name_uz }}
											</NuxtLink>
										</div>

										<p class="text-md mt-1 font-medium text-gray-900">
											{{ formatPrice(product.price * product.quantity) }} сум
										</p>
									</div>

									<div class="mt-4 sm:mt-0 sm:pr-9">
										<label :for="`quantity-${productIdx}`" class="sr-only"
											>Quantity, {{ product.name_uz }}</label
										>
										<select
											:id="`quantity-${productIdx}`"
											:name="`quantity-${productIdx}`"
											@change="cartStore.updateQuantity(product.id, $event.target.value)"
											:value="product.quantity"
											class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-[--primary] focus:outline-none focus:ring-1 focus:ring-[--primary] sm:text-sm"
										>
											<option v-for="i in 8" :key="i" :value="i">{{ i }}</option>
										</select>

										<div class="absolute right-0 top-0">
											<button
												type="button"
												class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
												@click="cartStore.removeFromCart(product.id)"
											>
												<span class="sr-only">Remove</span>
												<Icon name="mi:delete" class="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>

								<p class="mt-4 flex space-x-2 text-sm text-gray-700">
									<Icon
										name="fluent:checkmark-24-regular"
										class="h-5 w-5 flex-shrink-0 text-green-500"
										aria-hidden="true"
									/>
									<!-- <ClockIcon v-else class="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" /> -->
									<span>В наличии</span>
								</p>
							</div>
						</li>
					</ul>
					<div v-else>
						<p>Корзина пустая</p>
					</div>
				</section>

				<!-- Order summary -->
				<section
					aria-labelledby="summary-heading"
					class="sticky top-40 mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
				>
					<h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

					<div class="mt-6 space-y-4">
						<div class="flex items-center justify-between">
							<div class="text-sm text-gray-600">Subtotal</div>
							<div class="text-sm font-medium text-gray-900">{{ formatPrice(cartTotalPrice) }} сум</div>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<div class="flex items-center text-sm text-gray-600">
								<span>Shipping estimate</span>
								<a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
									<span class="sr-only">Learn more about how shipping is calculated</span>
								</a>
							</div>
							<div class="text-sm font-medium text-gray-900">15 000 сум</div>
						</div>

						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<div class="text-base font-bold text-gray-900">Order total</div>
							<div class="text-base font-bold text-gray-900">{{ formatPrice(cartFinalTotal) }} сум</div>
						</div>
					</div>

					<div class="mt-6">
						<v-button
							to="checkout"
							class="w-full rounded-md border border-transparent bg-[--primary] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[--primary] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:ring-offset-2 focus:ring-offset-gray-50"
						>
							Checkout
						</v-button>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const { slugify, formatPrice } = useFilters();
	import { useCartStore } from '@/stores/cart';

	

	const cartStore = useCartStore();
	const runtimeConfig: any = useRuntimeConfig();

	

	// const cartProductPrice = computed(() => {
	// 	return cartStore.cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
	// });

	const cartTotalPrice = computed(() => {
		return cartStore.cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
	});

	const cartDeliveryPrice = 15000;

	const cartFinalTotal = computed(() => {
		return cartTotalPrice.value + cartDeliveryPrice;
	});

	onMounted(() => {
		cartStore.loadCart();
	});
</script>
<style scoped lang="scss">
	.test {
		display: none;
	}
</style>
