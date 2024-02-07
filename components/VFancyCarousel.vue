<template>
	<div
		class="f-carousel flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-xl border"
		ref="itemCarousel"
	>
		<v-favorite-button :product="product" class="absolute right-5 top-5 z-5 h-16 w-16 p-4"></v-favorite-button>

		<template v-if="slides && slides.length">
			<div
				class="f-carousel__slide"
				v-for="(slide, index) in slides"
				:key="index"
				:data-thumb-src="slide.lazySrc"
			>
				<div
					class="slide-content f-panzoom h-[100%]"
					data-fancybox="item-gallery"
					:href="slide.lazySrc"
					v-if="slide"
				>
					<img class="f-panzoom__content" alt="" :data-lazy-src="slide.lazySrc" />
				</div>
			</div>
		</template>
		<div class="flex h-[100%] w-[100%] items-center justify-center text-[--primary] opacity-30" v-else>
			<Icon class="h-60 w-60" name="ion:tv-sharp"></Icon>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		Fancybox as FancyboxType,
		Carousel as CarouselType,
		Panzoom as PanzoomType,
	} from '@fancyapps/ui/types';
	import * as Fancyapps from '@fancyapps/ui';
	const NativeFancybox: typeof FancyboxType = Fancyapps.Fancybox;
	const Carousel: typeof CarouselType = Fancyapps.Carousel;
	const Panzoom: typeof PanzoomType = Fancyapps.Panzoom;
	import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.umd.js';

	import '@fancyapps/ui/dist/fancybox/fancybox.css';
	import '@fancyapps/ui/dist/carousel/carousel.css';
	import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
	import '@fancyapps/ui/dist/panzoom/panzoom.css';

	const props = defineProps<{
		slides: any;
		product: any;
	}>();

	const itemCarousel = ref();

	// const opts = {
	// 	Carousel: {
	// 		infinite: false,
	// 	},
	// };
	const options = {
		Dots: false,
		transition: 'slide',
		preload: 3,
		fill: true,

		// Images: {
		// 	// zoom: false,
		// 	Panzoom: {
		// 		// maxScale: 5,
		// 		// panMode: 'mousemove',
		// 		// mouseMoveFactor: 1.1,
		// 	},
		// },
		Thumbs: {
			type: 'classic',
		},
	};

	onMounted(() => {
		NativeFancybox.bind('[data-fancybox="item-gallery"]', {
			Carousel: {
				infinite: false,
				fill: true,
				transition: 'slide',
				preload: 3,
			},
			Images: {
				zoom: false,
				Panzoom: {
					maxScale: 3,
					// panMode: 'mousemove',
					// mouseMoveFactor: 1.1,
				},
			},
			Thumbs: {
				type: 'classic',
			},
		});

		new Carousel(itemCarousel.value, options, { Thumbs });

		// new Panzoom(fancyImage.value);
		itemCarousel.value.querySelectorAll('.slide-content').forEach((slide: any) => {
			new Panzoom(slide, { panOnlyZoomed: true });
		});
	});
	onUnmounted(() => {
		NativeFancybox.destroy();
	});
</script>

<style lang="scss" scoped>
	.f-panzoom__content {
		height: 500px !important;
		width: 100% !important;
	}
</style>
