<template>
	<v-carousel
		:navigation="{
			nextEl: '.button-next',
			prevEl: '.button-prev',
			disabledClass: 'button-disabled opacity-50',
		}"
		:slides-per-view="1"
		:breakpoints="breakpoints"
	>
		<swiper-slide v-for="(item, index) in categoriesStore.main_categories" :key="index">
			<category-card :categoryInfo="item"></category-card>
		</swiper-slide>
		<template #navigation>
			<button
				class="button-prev absolute left-5 top-[30%] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[--primary] text-white transition-transform active:scale-90"
			>
				<Icon class="h-[100%] w-[100%]" name="ic:round-chevron-left" />
			</button>
			<button
				class="button-next absolute right-5 top-[30%] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[--primary] text-white transition-transform active:scale-90"
			>
				<Icon class="h-[100%] w-[100%]" name="ic:round-chevron-right" />
			</button>
		</template>
	</v-carousel>
</template>

<script lang="ts" setup>
	import { useCategoriesStore } from '@/stores/categories';
	const categoriesStore = useCategoriesStore();
	const mainCategories = computed(() => {
		return categoriesStore.main_categories;
	});

	const breakpoints = {
		1400: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 3,
		},
	};
</script>

<style lang="scss" scoped></style>
