<template>
	<div class="mb-20 mt-5">
		<div class="container mx-auto">
			<LayoutBreadcrumb />
			<div v-if="title">
				<v-heading class="my-4 text-center first-letter:uppercase lg:text-start" :level="2">
					{{ title }}
				</v-heading>
			</div>
		</div>
		<div class="container relative mx-auto flex gap-10">
			<v-card
				class="sticky top-40 h-[100%] max-h-[calc(100vh-170px)] max-w-[320px] shrink-0 overflow-x-clip overflow-y-scroll"
				:full-width="true"
			>
				<page-category-filter :filter="filter" @update:filter="changeFilter" />
			</v-card>
			<div class="flex w-[100%] flex-col">
				<div class="mb-5 flex justify-end">
					<v-dropdown :title="`Сортировать по ${sortByTitle}`" :dropdown-id="'sortBy'">
						<template #dropdownMenu>
							<ul class="flex flex-col p-1">
								<li
									class="cursor-pointer rounded-md p-3 hover:bg-[#00c65e]/[.4]"
									@click="sortBy(item.key, item.type, item.title)"
									v-for="(item, index) in sortByItems"
									:key="index"
								>
									{{ item.title }}
								</li>
							</ul>
						</template>
					</v-dropdown>
				</div>
				<div
					class="mb-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
					v-if="productList && productList.data.length"
				>
					<div class="" v-for="(item, index) in productList.data" :key="item.id">
						<ProductCard :product="item" />
					</div>
				</div>
				<div class="mb-20 mt-40 grid place-items-center gap-5" v-else>
					<div class="mb-4 h-[100px] w-[100px] rounded-2xl bg-green-50 p-2">
						<Icon class="h-[100%] w-[100%]" name="solar:box-linear" color="#009748" />
					</div>
					<span class="text-xl font-bold">{{
						$t('Простите, по вашему запросу товаров пока нет.')
					}}</span>
				</div>
				<div
					v-if="pagination && pagination.total && pagination.total > pagination.per_page"
					class="flex justify-center"
				>
					<v-pagination :pagination="pagination" @change="setPage" @showMore="showMore"></v-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const runtimeConfig: any = useRuntimeConfig();
	const route = useRoute();
	const router = useRouter();
	const routeSlug: any = route.params.slug;
	const categoryId = routeSlug ? Number(routeSlug.split('-').slice(-1)[0]) : null;
	const sortByTitle = ref('умолчанию');
	const localeRoute = useLocaleRoute();
	const sortByItems = ref([
		{ key: 'price_dollar', type: 'asc', title: 'Самые дешевые' },
		{ key: 'price_dollar', type: 'desc', title: 'Самые дорогие' },
		{ key: 'created_at', type: 'desc', title: 'Самые новые' },
	]);

	const filter = ref({
		per_page: 12,
		page: 1,
		parent0_category_id: 0,
		parent1_category_ids: '',
		parent2_category_ids: '',
		sort_key: '',
		sort_type: '',
		from_price: null,
		to_price: null,
		name_uz: '',
	});
	const productList = ref();
	const pagination = ref();
	import { useCategoriesStore } from '@/stores/categories';
	const categoriesStore = useCategoriesStore();

	const fetchAction = async () => {
		if (categoryId) {
			filter.value.parent0_category_id = categoryId;
		}
		if (routeSlug.includes('search')) {
			let searchby = routeSlug.split('-')[1];
			filter.value.name_uz = searchby;
		}
		checkRouteQuery();
		const { data }: any = await useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/models-with-parents`, {
			params: { ...filter.value, appends: 'main_photo|price|price_twelve_month' },
			transform: (response: any) => {
				const pagination = {
					current_page: response.data.current_page,
					total: response.data.total,
					per_page: response.data.per_page,
					last_page: response.data.last_page,
				};

				return { data: response.data.data, pagination };
			},
		});
		productList.value = data.value;
		pagination.value = data.value?.pagination;
	};

	fetchAction();

	const title = computed(() => {
		if (routeSlug.includes('search')) {
			return routeSlug.split('-')[1];
		}
		let categoryObject = categoriesStore.main_categories?.find((item) => item.id == categoryId);
		return categoryObject ? categoryObject.name : '';
	});

	function changeFilter(filters: any) {
		filter.value = Object.assign(filter.value, filters);
		fetchAction();
	}
	async function setPage(page: number) {
		filter.value.page = page;
		navigateTo(
			localeRoute({
				query: {
					...route.query,
					page,
				},
			})
		);
		setTimeout(() => {
			fetchAction();
		}, 0);
	}
	async function showMoreAction() {
		filter.value.parent0_category_id = categoryId ? categoryId : 0;
		checkRouteQuery();
		const { data }: any = await useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/models-with-parents`, {
			params: { ...filter.value, appends: 'main_photo|price|price_twelve_month' },
			transform: (response: any) => {
				const pagination = {
					current_page: response.data.current_page,
					total: response.data.total,
					per_page: response.data.per_page,
					last_page: response.data.last_page,
				};

				return { data: response.data.data, pagination };
			},
		});
		let products = [...productList.value.data, ...data.value.data];
		productList.value.data = products;
		pagination.value = data.value?.pagination;
	}
	async function showMore(page: number) {
		filter.value.page = page;
		navigateTo(
			localeRoute({
				query: {
					...route.query,
					page,
				},
			})
		);
		setTimeout(() => {
			showMoreAction();
		}, 0);
	}
	function sortBy(key: string, type: string, title: string) {
		let filters: any = {};
		filters.sort_key = key;
		filters.sort_type = type;
		sortByTitle.value = title.toLowerCase();
		let routeQuery = { ...route.query };
		routeQuery.sort_key = key;
		routeQuery.sort_type = type;
		changeFilter(filters);
		router.push({
			path: route.path,
			query: routeQuery,
		});
	}
	function isNotEmpty(obj: any) {
		return Object.keys(obj).length;
	}
	function checkRouteQuery() {
		if (isNotEmpty(route.query)) {
			filter.value['page'] = Number(route.query.page);
			filter.value['parent1_category_ids'] = route.query.parent1_category_ids;
			filter.value['parent2_category_ids'] = route.query.parent2_category_ids;
			if (route.query.sort_key) {
				filter.value['sort_key'] = route.query.sort_key;
				const title = sortByItems.value.find(
					(el) => el.key == route.query.sort_key && el.type == route.query.sort_type
				);
				sortByTitle.value = title ? title.title.toLowerCase() : '';
			}
			if (route.query.sort_type) {
				filter.value['sort_type'] = route.query.sort_type;
			}
		}
	}
	watch(
		() => route.query,
		(val) => {
			if (val.parent1_category_ids || val.parent2_category_ids) {
				filter.value['parent1_category_ids'] = val.parent1_category_ids;
				filter.value['parent2_category_ids'] = val.parent2_category_ids;
				changeFilter(filter.value)
			}
		},
		{ deep: true }
	);
	
	onMounted(() => {
		if (isNotEmpty(route.query)) {
			changeFilter(filter.value);
		}
	});
</script>

<style lang="scss" scoped>
	.test {
		display: block;
	}
</style>
