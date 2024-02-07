<template>
	<!-- <button
		class="w-[100%] items-center justify-center rounded-lg  transition-colors hover:bg-[--primary] hover:text-white active:shadow-inner"
		@click="showCategory = !showCategory"
	>
		<Icon :name="showCategory ? 'ic:baseline-close' : 'ion:menu-outline'" class="h-6 w-6" />
	</button> -->
	<button
		type="button"
		@click="showCategory = !showCategory"
		class="rounded-lg border border-green-500 px-5 py-2.5 text-center text-sm font-medium text-green-500 transition-colors hover:bg-[--primary] hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 active:shadow-inner dark:border-green-500 dark:text-green-500 dark:hover:text-white"
	>
		<Icon :name="showCategory ? 'ic:baseline-close' : 'ion:menu-outline'" class="h-6 w-6" />
	</button>
	<div
		v-if="showCategory"
		class="laptopcatalogmenu absolute left-0 top-[72px] z-30 h-[100vh] w-full bg-white"
	>
		<div class="container mx-auto">
			<!-- mobile -->
			<div class="h-[80vh] w-full flex-auto overflow-scroll md:hidden">
				<div class="divide-y divide-gray-100">
					<details v-for="(main, indexx) in mainCategories" :key="indexx" class="group">
						<summary
							class="text-secondary-900 flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium"
						>
							{{ main.name }}
							<div class="text-secondary-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
								</svg>
							</div>
						</summary>
						<div class="w-full">
							<div v-for="(item, index1) in categoriesTree" :key="index1">
								<template v-if="main.id == item.id">
									<div
										v-for="(childCategories, index) in item.children"
										:key="index"
										class="mb-4 flex break-inside-avoid-column flex-wrap"
									>
										<a class="">
											<div
												@click="goTo1(item, childCategories)"
												class="px-3 py-2 font-bold text-gray-500 first-letter:uppercase"
											>
												{{ childCategories.name_uz }}
											</div>
											<div
												class="rounded-lg px-3 py-2 text-sm text-gray-800 first-letter:uppercase hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
												v-for="(categories2, index) in childCategories.children"
												:key="index"
												@click="goTo2(item, childCategories, categories2)"
											>
												{{ categories2.name_uz }}
											</div>
										</a>
									</div>
								</template>
							</div>
						</div>
					</details>
				</div>
			</div>
			<!-- Mobile end -->

			<!-- Desctop -->
			<div class="hidden md:flex gap-10 py-4 text-gray-900 dark:text-white md:pb-4">
				<ul class="w-56 flex-none space-y-2">
					<li v-for="(item, index0) in mainCategories" :key="index0">
						<NuxtLink
							:to="localePath(`/categories/${makeSlug(item.name, item.id)}`)"
							@click="showCategory = false"
							class="flex justify-between rounded-lg px-3 py-2 text-gray-800 hover:bg-gray-100 hover:text-[--primary] focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							@mouseover="hoverMainMenu(item)"
						>
							<span class="text-lgl font-semibold first-letter:uppercase">{{ item.name }}</span>
							<Icon name="mingcute:right-line" class="h-4 w-4 self-center" color="#b7b7b7" />
						</NuxtLink>
					</li>
				</ul>
				<div class="h-[80vh] w-64 flex-auto overflow-scroll">
					<div class="px-3 py-2 font-bold text-[--primary] first-letter:uppercase">
						{{ hoveredMenuName }}
					</div>
					<div class="columns-4" v-for="(item, index1) in categoriesTree" :key="index1">
						<template v-if="hoveredMenuId == item.id">
							<div
								v-for="(childCategories, index) in item.children"
								:key="index"
								class="mb-4 flex break-inside-avoid-column flex-wrap"
							>
								<a class="">
									<div
										@click="goTo1(item, childCategories)"
										class="px-3 py-2 font-bold text-gray-500 first-letter:uppercase"
									>
										{{ childCategories.name_uz }}
									</div>
									<div
										class="rounded-lg px-3 py-2 text-sm text-gray-800 first-letter:uppercase hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
										v-for="(categories2, index) in childCategories.children"
										:key="index"
										@click="goTo2(item, childCategories, categories2)"
									>
										{{ categories2.name_uz }}
									</div>
								</a>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Tree from 'primevue/tree';
	import { useCategoriesStore } from '@/stores/categories';
	const runtimeConfig: any = useRuntimeConfig();
	const categoriesStore = useCategoriesStore();
	const categoriesTree = ref();
	const hoveredMenuId = ref();
	const hoveredMenuName = ref();
	const localePath = useLocalePath();
	const { slugify, cyrillicToLatin } = useFilters();
	const router = useRouter();
	function makeSlug(name: string, id: number) {
		return slugify(cyrillicToLatin(name)) + '-' + id;
	}
	const mainCategories = computed(() => {
		return categoriesStore.main_categories;
	});
	const showCategory = ref(false);
	const fetchCategoriesTree = async () => {
		const { data }: any = await useFetch(
			`${runtimeConfig.public.apiBaseUrl}/shop/product-category-tree`,
			{
				params: { for_hired_worker: 'not', to_level: 2 },
				transform: (response: any) => {
					return response.data;
				},
			}
		);
		categoriesTree.value = data.value;
	};
	fetchCategoriesTree();
	function hoverMainMenu(item: { name: string; id: number }) {
		hoveredMenuId.value = item.id;
		hoveredMenuName.value = item.name;
	}
	function goTo1(item: any, childCategories: any) {
		router.push({
			path: localePath(`/categories/${makeSlug(item.name_uz, item.id)}`),
			query: { page: 1, parent1_category_ids: childCategories.id },
		});
		showCategory.value = false;
	}
	function goTo2(item: any, childCategories: any, categories2: any) {
		router.push({
			path: localePath(`/categories/${makeSlug(item.name_uz, item.id)}`),
			query: {
				page: 1,
				parent1_category_ids: childCategories.id,
				parent2_category_ids: categories2.id,
			},
		});
		showCategory.value = false;
	}
	const accordionItems: { title: string; content: string }[] = [
		{
			title: 'Accordion item 01',
			content: 'This is the first item accordion body 1',
		},
		{
			title: 'Accordion item 02',
			content: 'This is the second item accordion body 2',
		},
		{
			title: 'Accordion item 03',
			content: 'This is the third item accordion body 3',
		},
	];
</script>

<style lang="scss" scoped></style>
