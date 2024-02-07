<template>
	<div class="mb-20 mt-10">
		<div class="container mx-auto">
			<v-heading class="my-10 text-center lg:text-start" :level="1"> {{ $t('Избранное') }}</v-heading>
		</div>
		<div class="container relative mx-auto flex gap-10">
			<div class="flex w-[100%] flex-col">
				<div
					class="mb-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
					v-if="favoritesStore.favorites && favoritesStore.favorites.length"
				>
					<div class="" v-for="(item, index) in favoritesStore.favorites" :key="index">
						<ProductCard :product="item" />
					</div>
				</div>
				<div class="mb-20 mt-40 grid place-items-center gap-5" v-else>
					<div class="mb-4 h-[100px] w-[100px] rounded-2xl bg-green-50 p-2">
						<Icon class="h-[100%] w-[100%]" name="solar:box-linear" color="#009748" />
					</div>
					<span class="text-xl font-bold">{{
						$t('Товаров пока нет')
					}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const runtimeConfig: any = useRuntimeConfig();
	const route = useRoute();
	const router = useRouter();
	import { useFavoritesStore } from '@/stores/favorites';
	const favoritesStore = useFavoritesStore();

	onMounted(() => {});
</script>

<style lang="scss" scoped>
	.test {
		display: block;
	}
</style>
