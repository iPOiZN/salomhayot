<template>
	<div class="my-20">
		<div class="container  mx-auto ">
			<v-heading class="my-10" :level="1">Категории</v-heading>
			<page-category-carousel class="mb-20"></page-category-carousel>
		</div>
	</div>
</template>

<script setup lang="ts">
	const runtimeConfig: any = useRuntimeConfig();
</script>

<style lang="scss" scoped>
	.test {
		display: block;
	}
</style>
