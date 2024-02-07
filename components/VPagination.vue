<template>
	<nav v-if="pagination">
		<button
			class="mx-auto mb-10 w-[100%] rounded-lg border border-gray-300 px-4 py-2 text-center text-2xl text-gray-500 first-letter:uppercase hover:border-[--primary] hover:text-[--primary] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			v-if="pagination.current_page != pagination.last_page"
			@click="showMore"
		>
			Yana ko'rsatish
		</button>
		<ul class="flex h-10 items-center gap-2 -space-x-px text-base">
			<li :class="`${pagination.current_page == 1 ? 'cursor-not-allowed' : ''}`">
				<button
					:class="`ml-0 flex h-10 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:border-[--primary] hover:bg-[--primary] hover:text-[--primary] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
						pagination.current_page == 1 ? 'pointer-events-none opacity-30' : ''
					}`"
					:disabled="pagination.current_page == 1"
					@click="prevPage"
				>
					<span class="sr-only">Previous</span>
					<Icon name="tabler:chevron-left" class="h-5 w-5" />
				</button>
			</li>
			<li>
				<button
					:class="`flex h-10 items-center justify-center border  px-4 leading-tight text-gray-500 hover:border-[--primary] hover:text-[--primary] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
						pagination.current_page == 1
							? 'pointer-events-none border-[--primary] bg-[--primary] text-white'
							: 'border-gray-300 bg-white'
					}`"
					@click="setPage(1)"
				>
					1
				</button>
			</li>
			<li v-if="pagination.current_page >= 5">
				<button
					class="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:border-[--primary] hover:text-[--primary] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					@click="setPage(pagination.current_page - 3)"
				>
					...
				</button>
			</li>
			<template v-for="page in pagination.last_page" :key="page">
				<li
					v-if="
						page > 1 &&
						page <= pagination.last_page - 1 &&
						(page == pagination.current_page ||
							page == pagination.current_page - 1 ||
							page == pagination.current_page - 2 ||
							page == pagination.current_page + 1 ||
							page == pagination.current_page + 2)
					"
				>
					<button
						@click="setPage(page)"
						:class="`flex h-10 items-center justify-center border  px-4 leading-tight text-gray-500 hover:border-[--primary] hover:text-[--primary] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
							page == pagination.current_page
								? 'pointer-events-none border-[--primary] bg-[--primary] text-white'
								: 'border-gray-300 bg-white'
						}`"
					>
						{{ page }}
					</button>
				</li>
			</template>
			<li v-if="pagination.last_page >= 4 && pagination.current_page <= pagination.last_page - 4">
				<button
					class="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:border-[--primary] hover:text-[--primary] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					@click="setPage(pagination.current_page + 3)"
				>
					...
				</button>
			</li>
			<template v-if="pagination.last_page >= 4">
				<li>
					<button
						:class="`flex h-10 items-center justify-center border  px-4 leading-tight text-gray-500 hover:border-[--primary] hover:text-[--primary] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
							pagination.current_page == pagination.last_page
								? 'pointer-events-none border-[--primary] bg-[--primary] text-white'
								: 'border-gray-300 bg-white'
						}`"
						@click="setPage(pagination.last_page)"
					>
						{{ pagination.last_page }}
					</button>
				</li>
			</template>
			<li :class="`${pagination.current_page == pagination.last_page ? 'cursor-not-allowed' : ''}`">
				<button
					:class="`flex h-10 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:border-[--primary] hover:bg-[--primary] hover:text-[--primary] hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
						pagination.current_page == pagination.last_page ? 'pointer-events-none opacity-30' : ''
					}`"
					:disabled="pagination.current_page == pagination.last_page"
					@click="nextPage"
				>
					<span class="sr-only">Next</span>
					<Icon name="tabler:chevron-right" class="h-5 w-5" />
				</button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'change', value: number): void;
		(e: 'showMore', value: number): void;
	}>();

	const props = defineProps<{
		pagination: any;
	}>();

	function setPage(page: number) {
		window.scrollTo(0, 0);
		emit('change', page);
	}

	function prevPage() {
		setPage(props.pagination.current_page != 1 ? props.pagination.current_page - 1 : 1);
	}
	function nextPage() {
		setPage(
			props.pagination.current_page != props.pagination.last_page
				? props.pagination.current_page + 1
				: props.pagination.last_page
		);
	}
	function showMore() {
		let page = 	props.pagination.current_page != props.pagination.last_page
				? props.pagination.current_page + 1
				: props.pagination.last_page
		emit('showMore', page);
	}
</script>

<style lang="scss" scoped></style>
