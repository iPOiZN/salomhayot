<template>
	<div class="mb-5 flex">
		<nuxt-link
			:to="localePath('/categories')"
			class="mr-2 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-600"
		>
			{{ $t('Katalog') }}
			<Icon name="mingcute:right-line" />
		</nuxt-link>
		<template v-if="productParents">
			<nuxt-link
				v-if="productParents.parent0_category_id"
				:to="localePath(`/categories/${makeSlug(productParents.parent0_name_uz, productParents.parent0_category_id)}`)"
				class="mr-2 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-600"
			>
				{{ productParents.parent0_name_uz }}
				<Icon name="mingcute:right-line" />
			</nuxt-link>
			<nuxt-link
				v-if="productParents.parent1_category_id"
				:to="localePath(`/categories/${makeSlug(productParents.parent0_name_uz, productParents.parent0_category_id)}`)"
				class="mr-2 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-600"
			>
				{{ productParents.parent1_name_uz }}
				<Icon name="mingcute:right-line" />
			</nuxt-link>
			<nuxt-link
				v-if="productParents.parent2_category_id"
				:to="localePath(`/categories/${makeSlug(productParents.parent0_name_uz, productParents.parent0_category_id)}`)"
				class="mr-2 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-600"
			>
				{{ productParents.parent2_name_uz }}
			</nuxt-link>
		</template>
		<div
			v-if="MainCategory"
			class="mr-5 cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-600"
		>
			{{ MainCategory.name }}
			<Icon name="mingcute:right-line" />
		</div>
		<!-- <div
			v-if="ChildCategory"
			class="mr-5 cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-600"
		>
			{{ ChildCategory }}
			<Icon name="mingcute:right-line" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
	import { useCategoriesStore } from '@/stores/categories';
	const props = defineProps<{
		productParents?: any;
	}>();
	const categoriesStore = useCategoriesStore();
	const localePath = useLocalePath();
	const route = useRoute();
	const { slugify, cyrillicToLatin } = useFilters();

	function makeSlug(name: string, id: number) {
		return slugify(cyrillicToLatin(name)) + '-' + id;
	}
	const routeSlug: any = route.params.slug;
	const mainCategoryId = routeSlug ? Number(routeSlug.split('-').slice(-1)[0]) : 0;
	const MainCategory = computed(() => {
		return categoriesStore.main_categories.find((el) => el.id == mainCategoryId);
	});
	// const ChildCategory = computed(() => {
	// 	let childCategoryNames = '';
	// 	if (
	// 		route.query.parent1_category_ids &&
	// 		categoriesStore.child_categories.length &&
	// 		route.query.parent1_category_ids.length
	// 	) {
	// 		route.query.parent1_category_ids.split(',').forEach((c_id, index, array) => {
	// 			let child_category = categoriesStore.child_categories.find((el) => el.id == c_id).name;
	// 			childCategoryNames =
	// 				childCategoryNames + child_category + (index == array.length - 1 ? ' ' : ', ');
	// 		});
	// 		return childCategoryNames;
	// 	}
	// 	return '';
	// });
</script>

<style lang="scss" scoped></style>
