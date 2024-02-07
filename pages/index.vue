<template>
	<!-- <v-category-nav /> -->
	<div>
		<v-carousel
			:slides-per-view="1"
			:loop="true"
			class="h-[500px]"
			:space-between="0"
			style="
				--swiper-theme-color: var(--primary);
				--swiper-pagination-bottom: 30px;
				--swiper-pagination-bullet-horizontal-gap: 10px;
			"
			:pagination="{ clickable: true }"
		>
			<swiper-slide v-for="(banner, i) in bannerList" :key="i">
				<img
					class="h-[100%] w-[100%] object-cover"
					:src="runtimeConfig.public.apiStorageUrl + banner.desktop_url"
					alt=""
				/>
			</swiper-slide>
			<template #pagination>
				<div
					class="custom-pagination absolute bottom-10 z-10 flex w-[100%] items-center justify-center gap-10"
				></div>
			</template>
		</v-carousel>
		<!-- New products -->
		<div class="container mx-auto overflow-hidden">
			<v-heading class="my-10" :level="1">Категории</v-heading>
			<page-category-carousel class="mb-20"></page-category-carousel>

			<div class="flex justify-between">
				<v-heading class="my-10" :level="1">Новинки</v-heading>
				<nuxt-link
					:to="localePath('/categories/telefon-37')"
					class="my-10 max-w-[220px] break-words font-semibold opacity-60"
					>Смотреть все
					<Icon name="bi:chevron-right" class="h-4 w-4" />
				</nuxt-link>
			</div>
			<div>
				<page-card-carousel class="mb-20" :products="newProductsList"></page-card-carousel>
			</div>

			<!-- Xit -->
			<div class="flex justify-between">
				<v-heading class="my-10" :level="1">Хит продаж</v-heading>
				<nuxt-link
					:to="localePath('/categories/maishiy-texnika-36')"
					class="my-10 max-w-[220px] break-words font-semibold opacity-60"
					>Смотреть все
					<Icon name="bi:chevron-right" class="h-4 w-4" />
				</nuxt-link>
			</div>
			<div>
				<page-card-carousel class="mb-20" :products="newProductsList"></page-card-carousel>
			</div>

			<!-- IPhone -->
			<div class="flex justify-between">
				<v-heading class="my-10" :level="1">IPhone</v-heading>
				<nuxt-link
					:to="localePath('/categories/telefon-37?page=1&parent1_category_ids=39')"
					class="my-10 max-w-[220px] break-words font-semibold opacity-60"
					>Смотреть все
					<Icon name="bi:chevron-right" class="h-4 w-4" />
				</nuxt-link>
			</div>
			<div>
				<page-card-carousel class="mb-20" :products="iphoneProductsList"></page-card-carousel>
			</div>

			<!-- News -->
			<!-- <div class="mb-20 grid grid-cols-2 gap-10">
				<div>
					<v-ad-card></v-ad-card>
				</div>
				<div>
					<v-ad-card></v-ad-card>
				</div>
			</div> -->
			<div>
				<service-info />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const localePath = useLocalePath();
	const runtimeConfig: any = useRuntimeConfig();
	const newProductsList = ref([]);
	const iphoneProductsList = ref([]);
	const bannerList = ref([]);
	async function getBanners() {
		const { data }: any = await useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/shop-gallery-images`, {
			params: {},
			transform: (response: any) => {
				return response.data.data;
			},
		});
		bannerList.value = data.value;
	}

	function fetchAction(filter: any) {
		return useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/models-with-parents`, {
			params: { ...filter, appends: 'main_photo|price|price_twelve_month' },
			transform: (response: any) => {
				return response.data.data;
			},
		});
	}
	const fetchActionNewProducts = async () => {
		const filter = {
			per_page: 12,
			page: 1,
			name_uz: '',
			sort_key: 'created_at',
			sort_type: 'desc',
		};
		const { data }: any = await fetchAction(filter);
		newProductsList.value = data.value;
	};
	const fetchActionIphones = async () => {
		const filter = {
			per_page: 12,
			page: 1,
			name_uz: 'iphone',
			sort_key: 'created_at',
			sort_type: 'desc',
		};
		const { data }: any = await fetchAction(filter);
		iphoneProductsList.value = data.value;
	};
	getBanners();
	fetchActionNewProducts();
	fetchActionIphones()
</script>

<style lang="scss" scoped></style>
