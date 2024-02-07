<template>
	<div class="layout">
		<div class="sticky top-0 z-10 w-[100%]">
			<layout-header></layout-header>
			<layout-nav class="md:block hidden"></layout-nav>
		</div>
		<!-- Mobile menu bottom -->
		<main class="layout__main">
			<slot />
		</main>
		<layout-footer></layout-footer>
		<layout-mobile-menu class="md:hidden" />
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
	// .swiper {
	// 	--swiper-theme-color: #000;
	// }
	// .swiper-pagination-bullet{
	// 	// --swiper-pagination-bottom: 20px
	// }
</style>
