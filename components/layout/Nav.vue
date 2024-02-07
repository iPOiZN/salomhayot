<template>
	<nav class="border-b bg-white">
		<div class="container mx-auto flex items-center gap-10">
			<div class="nav__links">
				<div class="flex gap-10">
					<div v-for="(item, index) in mainCategories" :key="index">
						<NuxtLink
							:to="localePath(`/categories/${makeSlug(item.name, item.id)}`)"
							class="flex items-center gap-2 py-3 text-gray-700 hover:text-[--primary]"
						>
							<span class="text-xs font-semibold first-letter:uppercase">{{ item.name }}</span>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	const runtimeConfig: any = useRuntimeConfig();
	import { useCategoriesStore } from '@/stores/categories';
	const categoriesStore = useCategoriesStore();
	const localePath = useLocalePath();
	const { slugify, cyrillicToLatin } = useFilters();

	interface Category {
		name_uz: string;
		id: number;
	}

	const mainCategories = ref();
	const fetchCategories = async () => {
		const { data }: any = await useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/product-categories`, {
			params: { level: 0, per_page: 9999 },
			transform: (response: any) => {
				const data = response.data.data.map((el: Category) => {
					return {
						name: el.name_uz,
						id: el.id,
					};
				});
				return data;
			},
		});
		mainCategories.value = data.value;
		categoriesStore.setMainCategories(data.value);
	};
	fetchCategories();

	function makeSlug(name: string, id: number) {
		return slugify(cyrillicToLatin(name)) + '-' + id;
	}
	function getIconByCategory(id: number) {
		switch (id) {
			case 2138:
				return 'solar:sofa-outline';
			case 1683:
				return 'fa6-solid:computer';
			case 38:
				return 'fontisto:automobile';
			case 38:
				return 'bi:phone';
			default:
				return 'icon-park-outline:washing-machine';
		}
	}
</script>

<style lang="scss" scoped></style>
