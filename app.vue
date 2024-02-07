<template>
	<div>
		<NuxtLayout>
			<!-- <client-only> -->
			<NuxtPage :page-key="(route) => route.path" />
			<!-- </client-only> -->
		</NuxtLayout>
		<Toast />
	</div>
</template>

<script lang="ts" setup>
	// @ts-ignore
	// import SmoothScroll from 'smoothscroll-for-websites'

	// // SmoothScroll
	// SmoothScroll({
	// 	// Scrolling Core
	// 	animationTime: 800, // [ms]
	// 	stepSize: 80, // [px]

	// 	// Acceleration
	// 	accelerationDelta: 50, // 50
	// 	accelerationMax: 3, // 3

	// 	// Keyboard Settings
	// 	keyboardSupport: true, // option
	// 	arrowScroll: 100, // [px]

	// 	// Pulse (less tweakable)
	// 	// ratio of "tail" to "acceleration"
	// 	pulseAlgorithm: true,
	// 	pulseScale: 4,
	// 	pulseNormalize: 1,

	// 	// Other
	// 	touchpadSupport: false, // ignore touchpad by default
	// 	fixedBackground: true,
	// 	excluded: "",
	// });

	const route = useRoute();
	const localePath = useLocalePath();

	if (route.fullPath !== localePath(route.fullPath)) {
		// nuxt i18n bug - when detecting browser language it changes locale, but doesn't redirect
		// navigateTo(
		//   localePath({
		//     path: route.fullPath,
		//     hash: route.hash,
		//   })
		// )
	}
</script>

<style lang="scss">
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
	// .layout-enter-active,
	// .layout-leave-active {
	//   transition: all 0.4s;
	// }
	// .layout-enter-from,
	// .layout-leave-to {
	//   opacity: 0;
	//   filter: blur(1rem);
	//   will-change: filter;
	// }
</style>
