<template>
	<div class="p-5">
		<NuxtLink
			:to="localePath(`/categories/${makeSlug(categoryInfo.name, categoryInfo.id)}`)"
			class="group flex flex-col items-center justify-center gap-4"
		>
			<div
				class="category-card-icon mb-4 h-[200px] w-[200px] overflow-hidden rounded-full p-2 shadow-[1px_2px_16px] shadow-gray-300"
			>
				<img
					class="h-[100%] w-[100%] object-contain transition-transform group-hover:scale-75 duration-500 ease-in-out will-change-transform"
					:src="`images/${getImgCategory()}.jpg`"
					alt=""
				/>
			</div>
			<p class="category-card-title text-xl font-bold text-gray-700 first-letter:uppercase">
				{{ categoryInfo.name }}
			</p>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		categoryInfo: { name: string; id: number };
	}>();
	const localePath = useLocalePath();
	const { slugify, cyrillicToLatin } = useFilters();

	function makeSlug(name: string, id: number) {
		return slugify(cyrillicToLatin(name)) + '-' + id;
	}
	function getImgCategory() {
		switch (props.categoryInfo.id) {
			case 2138:
				return 'sofa';
			case 1683:
				return 'computer';
			case 38:
				return 'wheel';
			case 37:
				return 'phone';
			default:
				return 'maishiy';
		}
	}
</script>

<style lang="scss" scoped></style>
