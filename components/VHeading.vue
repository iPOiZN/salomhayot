<template>
	<component :is="'h' + level">
		<slot />
	</component>
</template>

<script setup lang="ts">
	const props = defineProps<{
		level: 1 | 2 | 3;
	}>();
</script>

<style lang="scss" scoped>
	h1 {
		font-size: 32px;
		font-weight: 700;
		line-height: 120%;
	}

	h2 {
		font-size: 22px;
		font-weight: 700;
		line-height: 22px;
	}
</style>
