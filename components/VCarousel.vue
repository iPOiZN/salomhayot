<template>
	<swiper
		class="swiper"
		:slides-per-view="3"
		:space-between="20"
		:modules="[SwiperNavigation, SwiperPagination, SwiperMousewheel, SwiperThumbs]"
		:pagination="pagination"
		:navigation="navigation"
		:mousewheel="{
			releaseOnEdges: true,
			sensitivity: 1,
			forceToAxis: true,
			thresholdDelta: 20,
			thresholdTime: 500,
		}"
		:rewind="false"
	>
		<slot />

		<template v-if="navigation">
			<slot name="navigation" />
		</template>

		<template v-if="pagination">
			<slot name="pagination" />
		</template>

		<!-- Navigation -->
		<!-- <div class="swiper-navigation" v-if="navigation">
			<button class="button-prev">
				<Icon name="cil:arrow-left" />
			</button>
      
			<div class="custom-pagination"></div>
			<button class="button-next">
				<Icon name="cil:arrow-right" />
			</button>
		</div> -->
	</swiper>
</template>

<script setup lang="ts">
import { Carousel } from 'flowbite';

	defineProps({
		navigation: {
			type: Boolean,
			default: false,
		},
		pagination: {
			type: Boolean,
			default: false,
		},
	});
</script>

<style lang="scss" scoped></style>
