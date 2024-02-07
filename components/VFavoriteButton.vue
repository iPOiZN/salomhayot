<template>
	<!-- rounded-full -->
	<div
		:class="`flex cursor-pointer items-center justify-center 
          text-[#00c65e] backdrop-blur-sm  transition-transform hover:text-[#D11B1B]  active:scale-90 
		  ${isFavorite(product) ? 'scale-90 ' : ''}`"
		:title="isFavorite(product) ? 'Убрать из избранного' : 'Добавить в избранное'"
		@click="toggleFavorites(product)"
	>
		<Icon
			class="h-[100%] w-[100%]"
			:name="isFavorite(product) ? 'icon-park-solid:like' : 'icon-park-outline:like'"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useFavoritesStore } from '@/stores/favorites';
	const props = defineProps<{
		product: any;
	}>();
	const { $toast }: any = useNuxtApp();
	const favoritesStore = useFavoritesStore();

	function toggleFavorites(product: any) {
		if (isFavorite(product)) {
			favoritesStore.rmFromFavorites(product.id);
			$toast.add({
				severity: 'error',
				summary: 'Товар удален из избранного',
				detail: '',
				life: 3000,
			});
		} else {
			favoritesStore.addToFavorites(product);
			$toast.add({
				severity: 'success',
				summary: 'Товар добавлен в избранное',
				detail: '',
				life: 3000,
			});
		}
	}
	function isFavorite(product: any) {
		return favoritesStore.isFavorite(product.id);
	}
	defineExpose({
		toggleFavorites,
	});
	onMounted(() => {
		favoritesStore.loadFavorites();
	});
</script>

<style lang="scss" scoped></style>
