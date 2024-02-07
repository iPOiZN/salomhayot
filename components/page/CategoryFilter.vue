<template>
	<div class="p-10">
		<p class="mb-2 text-2xl font-bold">Цена</p>
		<div class="mb-10">
			<div class="mb-5 flex gap-5">
				<div class="input-group">
					<div class="input-wrapper">
						<input
							ref="input"
							class="input"
							v-model="fromPrice"
							:placeholder="'от'"
							@input="changeInput($event, 'from')"
						/>
					</div>
				</div>
				<div class="input-group">
					<div class="input-wrapper">
						<input
							ref="input"
							class="input"
							v-model="toPrice"
							:placeholder="'до'"
							@input="changeInput($event, 'to')"
						/>
					</div>
				</div>
			</div>
			<v-time-range v-model="priceRange"></v-time-range>
		</div>
		<div>
			<div class="bg-white">
				<div class="mt-8 grid divide-neutral-200">
					<div class="py-5">
						<details class="group" open>
							<summary class="flex cursor-pointer list-none items-center justify-between font-medium">
								<span class="text-2xl font-bold"> {{ $t('Бренд') }}</span>
								<span class="transition group-open:rotate-180">
									<Icon class="h-5 w-5" name="ci:chevron-down" />
								</span>
							</summary>
							<div
								v-if="route.query.parent1_category_ids && route.query.parent1_category_ids.length"
								class="cursor-pointer pt-3 text-right text-sm font-medium text-red-400 underline decoration-dotted"
								@click="clearFilter(1)"
							>
								Сбросить
							</div>
							<div class="group-open:animate-fadeIn mt-3 flex flex-col gap-5">
								<div v-for="(item, index) in childCategories" :key="index" class="flex items-center">
									<input
										:id="'filter-checkbox' + index"
										type="checkbox"
										@change="selectedParent1(item)"
										v-model="item.isSelected"
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-[--primary] focus:ring-2 focus:ring-[--primary] dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-[--primary]"
									/>
									<label
										:for="'filter-checkbox' + index"
										class="text-md ml-2 cursor-pointer font-medium text-gray-900 dark:text-gray-300"
										>{{ item.name }}</label
									>
								</div>
							</div>
						</details>
					</div>
					<div class="py-5" v-if="child2Categories && child2Categories.length">
						<details class="group" open>
							<summary class="flex cursor-pointer list-none items-center justify-between font-medium">
								<span class="text-2xl font-bold"> {{ $t('Другие параметры') }}</span>
								<span class="transition group-open:rotate-180">
									<Icon class="h-5 w-5" name="ci:chevron-down" />
								</span>
							</summary>
							<div
								v-if="route.query.parent2_category_ids && route.query.parent2_category_ids.length"
								class="cursor-pointer pt-3 text-right text-sm font-medium text-red-400 underline decoration-dotted"
								@click="clearFilter(2)"
							>
								Сбросить
							</div>
							<div class="group-open:animate-fadeIn mt-6 flex flex-col gap-5">
								<div v-for="(item, index) in child2Categories" :key="index" class="flex items-center">
									<input
										:id="'filter-child-checkbox' + index"
										type="checkbox"
										@change="selectedParent2(item)"
										v-model="item.isSelected"
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-[--primary] focus:ring-2 focus:ring-[--primary] dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-[--primary]"
									/>
									<label
										:for="'filter-child-checkbox' + index"
										class="text-md ml-2 cursor-pointer font-medium text-gray-900 dark:text-gray-300"
										>{{ item.name }}</label
									>
								</div>
							</div>
						</details>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { useCategoriesStore } from '@/stores/categories';
	import debounce from 'lodash.debounce';

	const categoriesStore = useCategoriesStore();
	const runtimeConfig: any = useRuntimeConfig();
	const props = defineProps<{
		filter: TCategoryFilter;
	}>();
	type TCategoryFilter = any;
	const route: any = useRoute();
	const router: any = useRouter();
	const localeRoute = useLocaleRoute();
	const routeSlug: any = route.params.slug;
	const parentId = routeSlug ? Number(routeSlug.split('-').slice(-1)[0]) : 0;
	const priceRange = ref<number[]>([0, 25000000]);
	const childCategories = ref();
	const child2Categories = ref();
	const parentIds = ref([]);
	const parent2Ids = ref([]);
	const toPrice = ref();
	const fromPrice = ref();
	const emit = defineEmits<{
		(e: 'update:filter', value: unknown): void;
	}>();

	const fetchChildCategories = async (level: number, parentIds: number | string) => {
		let params = {};
		if (level == 1) {
			params = {
				level: level,
				parent_id: parentIds,
				per_page: 9999,
			};
		} else {
			params = {
				level: level,
				parent_ids: parentIds,
				per_page: 9999,
			};
		}
		const { data }: any = await useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/product-categories`, {
			params: params,
			transform: (response: any) => {
				const data = response.data.data.map((el: any) => {
					return {
						name: el.name_uz,
						id: el.id,
						parent_id: el.parent_id,
						path: el.path,
						isSelected: level == 2 ? isSelectedParent2(el) : isSelectedParent1(el),
					};
				});
				return data;
			},
		});
		if (level == 1) {
			childCategories.value = data.value;
			categoriesStore.setChildCategories(data.value);
		} else if (level == 2) {
			child2Categories.value = data.value;
		}
	};

	fetchChildCategories(1, parentId);
	// functions
	function isSelectedParent1(el: any) {
		if (props.filter.parent1_category_ids) {
			return props.filter.parent1_category_ids.includes(el.id);
		}
		return false;
	}
	function isSelectedParent2(el: any) {
		if (props.filter.parent2_category_ids) {
			return props.filter.parent2_category_ids.includes(el.id);
		}
		return false;
	}
	function updateEmit(value: any) {
		emit('update:filter', value);
	}

	function clearFilter(type: number | string) {
		let routeQuery = { ...route.query };
		if (type == 1) {
			routeQuery.parent1_category_ids = null;
			setTimeout(() => {
				childCategories.value.forEach((el: any) => (el.isSelected = false));
				child2Categories.value.forEach((el: any) => (el.isSelected = false));
				selectedParent1(parentIds.value);
				selectedParent2();
			}, 0);
		}
		if (type == 2) {
			routeQuery.parent2_category_ids = null;
			setTimeout(() => {
				child2Categories.value.forEach((el: any) => (el.isSelected = false));
				selectedParent2();
			}, 0);
		}
		router.push({
			path: route.path,
			query: routeQuery,
		});
	}

	function mask(value: any) {
		return value.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$& ');
	}
	function changeInput(e: any, type: string) {
		let value = e.target.value;
		if (e.target.value.includes(' ')) {
			value = value.replaceAll(' ', '');
		}
		if (type == 'to') {
			toPrice.value = mask(value);
			priceRange.value[1] = Number(value);
		} else {
			fromPrice.value = mask(value);
			priceRange.value[0] = Number(value);
		}
	}
	function selectedParent1(val: any) {
		let routeQuery = { ...route.query };
		routeQuery.page = 1;
		const selected = childCategories.value.filter((el: any) => el.isSelected);
		parentIds.value = selected.map((el: any) => el.id);
		if (parentIds.value.length) {
			fetchChildCategories(2, parentIds.value.join(', '));
			router.push({
				path: route.path,
				query: {
					...routeQuery,
					parent1_category_ids: parentIds.value.join(', '),
				},
			});
		} else {
			fetchChildCategories(2, 9999);
			router.push({
				path: route.path,
				query: {
					...routeQuery,
					parent1_category_ids: parentIds.value,
				},
			});
		}
		setTimeout(() => {
			updateEmit({ parent1_category_ids: parentIds.value.join(', ') });
		}, 0);
	}
	function selectedParent2() {
		const selected = child2Categories.value.filter((el) => el.isSelected);
		parent2Ids.value = selected.map((el) => el.id);
		let routeQuery = { ...route.query };
		if (parent2Ids.value.length) {
			fetchChildCategories(1, parentId);
			router.push({
				path: route.path,
				query: {
					...routeQuery,
					parent2_category_ids: parent2Ids.value.join(', '),
				},
			});
		} else {
			fetchChildCategories(2, 9999);
			router.push({
				path: route.path,
				query: {
					...routeQuery,
					parent2_category_ids: parent2Ids.value,
				},
			});
		}
		setTimeout(() => {
			updateEmit({ parent2_category_ids: parent2Ids.value.join(', ') });
		}, 0);
	}

	watch(
		() => priceRange.value,
		debounce((val: number[]) => {
			const filterParams: any = {};
			if (val[0]) {
				filterParams.from_price = val[0];
				fromPrice.value = mask(val[0]);
			}
			if (val[1]) {
				filterParams.to_price = val[1];
				toPrice.value = mask(val[1]);
			}
			updateEmit(filterParams);
		}, 500),
		{ deep: true }
	);
	onMounted(() => {
		if (route.query.parent1_category_ids) {
			setTimeout(() => {
				fetchChildCategories(2, route.query.parent1_category_ids);
			}, 100);
		}
	});
</script>
<style lang="scss" scoped>
	.input {
		width: 100%;
		border-radius: 5px;
		border: 1px solid var(--border-color);
		padding: 14px 16px;
		font-weight: 400;
		resize: none;

		&.error {
			border-color: var(--danger);
		}

		&_footer {
			padding-bottom: 38px;
			scroll-padding: 38px;
		}

		&_icon {
			padding-right: 42px;
		}

		&:focus {
			outline-color: var(--primary);
		}

		&::placeholder {
			color: #bcbec0;
		}
	}
</style>
