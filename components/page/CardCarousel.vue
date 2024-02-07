<template>
	<v-carousel
		class="swiper"
		v-if="products && products.length"
		:slides-per-view="1"
		:breakpoints="breakpoints"
		:navigation="{
			nextEl: '.button-next',
			prevEl: '.button-prev',
			disabledClass: 'button-disabled opacity-50',
		}"
	>
		<swiper-slide v-for="(i, index) in products" :key="i">
			<ProductCard :product="i" />
		</swiper-slide>
		<template #navigation>
			<button
				class="button-prev absolute left-5 top-[40%] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[--primary] text-white transition-all hover:shadow-[1px_2px_16px] hover:shadow-gray-300 active:scale-90"
			>
				<Icon class="h-[100%] w-[100%]" name="ic:round-chevron-left" />
			</button>
			<button
				class="button-next absolute right-5 top-[40%] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[--primary] text-white transition-all hover:shadow-[1px_2px_16px] hover:shadow-gray-300 active:scale-90"
			>
				<Icon class="h-[100%] w-[100%]" name="ic:round-chevron-right" />
			</button>
		</template>
	</v-carousel>
</template>

<script setup lang="ts">
	const props = defineProps<{
		products: any;
	}>();
	const breakpoints = {
		1200: {
			slidesPerView: 5,
		},
		768: {
			slidesPerView: 3,
		},
	};
</script>

<style lang="scss" scoped>
	.swiper {
		overflow: visible;
	}
</style>
