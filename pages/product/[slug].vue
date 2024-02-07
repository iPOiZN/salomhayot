<template>
	<div class="mt-10">
		<div class="container mx-auto">
			<LayoutBreadcrumb :productParents="product" />
			<v-card v-if="product" :fullWidth="true" class="mb-10 px-16 py-5">
				<v-heading class="my-10 text-center lg:text-start" :level="1"> {{ product.name_uz }}</v-heading>
				<div
					class="flex w-[100%] flex-col items-center justify-between gap-10 lg:flex-row lg:items-start"
				>
					<div class="w-[100%] max-w-[500px]" v-if="product.photos">
						<v-fancy-carousel :slides="product.photos" :product="product"></v-fancy-carousel>
					</div>
					<div class="flex w-[100%] flex-col-reverse items-start justify-between gap-10 2xl:flex-row">
						<v-card v-if="info" class="p-10" :full-width="true">
							<h5 class="mb-5 font-bold">Характеристики</h5>
							<ul v-if="info.specs && info.specs.length" class="mb-5 flex flex-col gap-4">
								<li
									class="flex items-start justify-between gap-2"
									v-for="spec in info.specs.slice(0, 4)"
									:key="spec.id"
								>
									<span class="max-w-[220px] break-words opacity-50"
										>{{ spec.product_category_characteristic.name_uz }}:</span
									>
									<span class="h-5 w-[100%] border-b border-dashed"></span>
									<span class="w-max max-w-[150px] shrink-0 break-words first-letter:uppercase">{{
										spec.value
									}}</span>
								</li>
							</ul>
							<p v-else class="mb-10 text-sm text-gray-500 dark:text-gray-400">Нет описания</p>
							<button class="text-[--primary] underline hover:no-underline" @click="showMore">
								Подробнее
							</button>
						</v-card>
						<v-card class="p-10" :full-width="true">
							<div class="flex flex-col gap-5">
								<div class="flex gap-5">
									<p class="text-2xl">Цена</p>
									<p class="text-4xl font-bold">{{ product.price.toLocaleString('ru-RU') }} сум</p>
								</div>
								<button
									class="flex items-center justify-between gap-5 rounded-md border bg-gray-100 p-2 hover:bg-gray-200"
								>
									<p class="text-sm">
										От
										<strong
											>{{ (product.price_twelve_month / 12).toLocaleString('ru-RU') }} сум/месяц</strong
										>
										в рассрочку
									</p>
									<Icon name="bi:chevron-right" class="h-4 w-4" />
								</button>
								<div>
									<button class="text-md flex items-center gap-2">
										<span @click="favoriteBtn.toggleFavorites(product.id)">{{ 'В избранное' }}</span>
										<v-favorite-button class="shrink-0 p-2" :product="product" ref="favoriteBtn" />
									</button>
								</div>
								<div class="flex gap-3">
									<v-button
										class="button_outline rounded-xl"
										:fullWidth="true"
										@click="cartStore.addToCart(product.id, 1, product)"
										v-if="!cartStore.isProductInCart(product.id)"
									>
										<span>В корзину</span>
										<Icon name="fa-solid:cart-arrow-down" class="ml-3 h-6 w-6" />
									</v-button>
									<v-button class="hover_off rounded-xl" :fullWidth="true" to="/cart" v-else>
										<span>Перейти в корзину</span>
										<Icon name="bi:cart-check-fill" class="ml-3 h-6 w-6" />
									</v-button>
								</div>
								<div class="flex items-center gap-3">
									<v-button class="rounded-xl" :fullWidth="true">
										<span>Купить в 1 клик</span>
									</v-button>
								</div>
							</div>
						</v-card>
					</div>
				</div>
			</v-card>
			<v-card v-if="info" class="mb-10 px-16 pb-20 pt-5" :fullWidth="true">
				<div class="mb-4 border-b border-gray-200 dark:border-gray-700" ref="tabs">
					<ul
						class="-mb-px flex flex-wrap text-center text-sm font-medium"
						id="itemTab"
						data-tabs-toggle="#itemTabContent"
						role="tablist"
					>
						<li class="mr-2" role="presentation" @click="clickToScroll">
							<button
								class="inline-block rounded-t-lg border-b-2 p-4"
								id="description-tab"
								data-tabs-target="#description"
								type="button"
								role="tab"
								aria-controls="description"
								aria-selected="false"
							>
								Описание
							</button>
						</li>
						<li class="mr-2" role="presentation" @click="clickToScroll">
							<button
								class="inline-block rounded-t-lg border-b-2 p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
								id="specs-tab"
								data-tabs-target="#specs"
								type="button"
								role="tab"
								aria-controls="specs"
								aria-selected="false"
								ref="specsTab"
							>
								Характеристики
							</button>
						</li>
					</ul>
				</div>
				<div id="myTabContent">
					<div
						class="hidden rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
						id="description"
						role="tabpanel"
						aria-labelledby="description-tab"
					>
						<div v-if="info.description" v-html="info.description"></div>
						<p v-else class="text-sm text-gray-500 dark:text-gray-400">Нет описания</p>
					</div>
					<div
						class="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
						id="specs"
						role="tabpanel"
						aria-labelledby="specs-tab"
					>
						<ul class="mb-5 flex flex-col gap-4" v-if="info.specs && info.specs.length">
							<li
								class="flex items-end gap-2 text-sm text-gray-500 dark:text-gray-400"
								v-for="spec in info.specs"
								:key="spec.id"
							>
								<span class="w-max break-words"
									><strong class="font-medium text-gray-800 dark:text-white"
										>{{ spec.product_category_characteristic.name_uz }}:</strong
									></span
								>
								<span class="w-max break-words">{{ spec.value }}</span>
							</li>
						</ul>
						<p v-else class="text-sm text-gray-500 dark:text-gray-400">Нет характеристик</p>
					</div>
					
				</div>
			</v-card>
		</div>
	</div>
</template>

<script setup lang="ts">
	// const isLiked = ref(false);
	import { initFlowbite } from 'flowbite';

	const runtimeConfig: any = useRuntimeConfig();
	const tabs = ref();
	const favoriteBtn = ref();
	import { useCartStore } from '@/stores/cart';
	const cartStore = useCartStore();

	const route = useRoute();
	const productSlug: any = route.params.slug;
	const productId = Number(productSlug.split('-').slice(-1)[0]);
	const specsTab = ref();
	const clickToScroll = () => {
		tabs.value.scrollIntoView({
			block: 'center',
			behavior: 'smooth',
		});
	};
	function showMore() {
		clickToScroll();
		specsTab.value.click()
	}
	const { data: product } = await useFetch(
		`${runtimeConfig.public.apiBaseUrl}/shop/models-with-parents/${productId}`,
		{
			params: { appends: 'price|price_twelve_month', relations: 'photos' },
			transform: (response: any) => {
				const { photos } = response.data;

				const transformedPhotos = photos.map((photo: any) => {
					photo.url = runtimeConfig.public.apiStorageUrl + photo.url;
					return { lazySrc: photo.url };
				});

				return { ...response.data, photos: transformedPhotos };
			},
		}
	);
	const { data: info } = await useFetch(
		`${runtimeConfig.public.apiBaseUrl}/shop/characteristic-values`,
		{
			params: {
				product_category_id: productId,
				per_page: 999,
				relations: 'productCategoryCharacteristic',
			},
			transform: (response: any) => {
				const description = response.data.data.find((el: any) => el.is_description == true)?.value;
				const specs = response.data.data.filter((el: any) => !el.is_description);

				return { description, specs };
			},
		}
	);

	// function addToCart(id: number, count: number, product: any) {
	// 	cartStore.addToCart(id, 1, product);
	// }

	onMounted(() => {
		cartStore.loadCart();
		setTimeout(() => {
			initFlowbite();
		}, 500);
	});
</script>

<style lang="scss" scoped>
	.test {
		display: none;
	}
	[aria-selected='true'] {
		color: var(--primary);
		border-color: var(--primary);
	}
</style>
