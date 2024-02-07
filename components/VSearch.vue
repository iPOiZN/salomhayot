<template>
	<div
		:class="`relative z-50 flex h-14 flex-col gap-2 ${loaded ? '' : 'pointer-events-none opacity-50'}`"
	>
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<Icon name="tabler:search" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
		</div>
		<input
			v-model="filter.name_uz"
			@input="searchItems"
			type="search"
			id="default-search"
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
			:placeholder="$t('Искать товары')"
			autocomplete="off"
			@focus="activeSuggestion = true"
			required
		/>
		<!-- @click="search" -->
		<button
			type="submit"
			@click="search"
			class="absolute bottom-2.5 right-2.5 rounded-lg bg-[--primary] px-4 py-2 text-sm font-medium text-white hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
		>
			{{ $t('Искать') }}
		</button>
		<div class="rounded-md bg-white" v-if="activeSuggestion && productList.length">
			<div class="flex gap-2 px-3 py-5">
				<button
					class="rounded-xl bg-gray-100 px-3 py-1 text-sm text-black"
					v-for="(tag, i) in productItemTags.slice(0, 5)"
					:key="i"
					@click="pushTags(tag)"
				>
					{{ tag }}
				</button>
			</div>
			<div class="max-h-[400px] overflow-x-hidden overflow-y-scroll p-5">
				<div class="flex flex-col gap-4">
					<div
						class="flex w-[100%] items-center gap-4"
						v-for="(item, index) in productList"
						:key="index"
					>
						<NuxtLink
							class="h-[100%] w-[60px]"
							:to="`/product/${slugify(item.name_uz)}-${item.id}`"
							@click="activeSuggestion = false"
						>
							<img class="h-[100%] w-[100%] object-contain" src="@/assets/images/buy-card.jpg" alt="" />
						</NuxtLink>
						<div class="flex w-[100%] flex-col gap-3">
							<NuxtLink
								class="w-max rounded-lg border px-3 py-1 text-sm font-bold text-gray-400 first-letter:uppercase hover:border-[--primary] hover:text-[--primary]"
								@click="activeSuggestion = false"
							>
								{{ item.parent0_name_uz }}
							</NuxtLink>
							<NuxtLink
								:to="`/product/${slugify(item.name_uz)}-${item.id}`"
								@click="activeSuggestion = false"
								class="relative inline-block h-[35px] w-[100%] text-ellipsis break-words font-semibold text-gray-700"
							>
								<span
									class="absolute left-0 top-0 line-clamp-3 h-[100%] w-[100%] cursor-pointer overflow-hidden pb-1 after:absolute after:bottom-0 after:left-0 after:h-[10px] after:w-[100%] after:bg-gradient-to-t after:from-white after:to-transparent hover:h-max hover:bg-white hover:text-[--primary] hover:after:hidden"
								>
									{{ item.name_uz }}
								</span>
							</NuxtLink>
							<div class="-mt-1.5 text-2xl font-bold text-[--primary]">
								{{ formatPrice(item.price) }} сум
							</div>
							<hr />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="rounded-md bg-white p-5" v-else-if="filter.name_uz.length >= 3 && activeSuggestion">
			<div>Ничего не найдено</div>
		</div>
	</div>
	<Transition>
		<div
			class="fixed left-0 top-0 z-10 h-[100vh] w-[100vw] bg-black bg-opacity-50"
			v-if="activeSuggestion"
			@click="activeSuggestion = false"
		></div>
	</Transition>
</template>

<script setup lang="ts">
	const router = useRouter();
	// const route = useRoute();
	import debounce from 'lodash.debounce';
	const localePath = useLocalePath();
	const text = ref();
	const activeSuggestion = ref(false);
	const runtimeConfig: any = useRuntimeConfig();
	const productList = ref([]);
	const productItemTags = ref();

	const loaded = ref(false);

	const { formatPrice, slugify } = useFilters();
	function search() {
		activeSuggestion.value = false;
		router.push(localePath(`/categories/search-${filter.value.name_uz}`));
	}

	const filter = ref({
		per_page: 30,
		name_uz: '',
	});
	const pushedTags = ref('');

	const searchItems = debounce(
		() => {
			if (filter.value.name_uz.length >= 3) {
				fetchAction();
			} else {
				productList.value = [];
				pushedTags.value = '';
			}
		},
		filter.value.name_uz.length >= 3 ? 500 : 0
	);

	const fetchAction = async () => {
		const { data }: any = await useFetch(`${runtimeConfig.public.apiBaseUrl}/shop/models-with-parents`, {
			params: { ...filter.value, appends: 'main_photo|price|price_twelve_month' },
			transform: (response: any) => {
				return response.data.data;
			},
		});
		productList.value = data.value;
		productItemTags.value = slugify(data.value[0].parent2_name_uz + ' ' + data.value[0].name_uz).split(
			'-'
		);
	};

	function pushTags(tag: string) {
		pushedTags.value += ` ${tag}`;
		filter.value.name_uz = pushedTags.value.trim();
		searchItems();
	}

	onMounted(() => {
		loaded.value = true;
	});
</script>

<style lang="scss" scoped>
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.3s;
	}
	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
