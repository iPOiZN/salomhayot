<template>
	<div v-if="product" class="flex items-center gap-10">
		<div class="h-28 w-20">
			<img class="h-[100%] w-[100%] object-contain" src="@/assets/images/buy-card.jpg" alt="" />
		</div>

		<div class="flex w-max flex-col">
			<span class="text-slate-300">{{ product.category }}</span>
			<span class="text-xl font-semibold">{{ product.name }}</span>
		</div>

		<div class="w-max shrink-0">
			<span class="text-lg font-bold">{{ product.price }}so'm </span>
		</div>
		<div class="flex w-max items-center gap-2">
			<button @click="add('dec')" type="button" class="inline-flex items-center rounded-lg bg-gray-200 px-2 py-1 text-center text-base font-bold text-black hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-200 dark:focus:ring-gray-500">-</button>
			<div class="w-14">
				<v-input v-model="product.count"></v-input>
			</div>
			<button @click="add('inc')" type="button" class="inline-flex items-center rounded-lg bg-gray-200 px-2 py-1 text-center text-base font-bold text-black hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-200 dark:focus:ring-gray-500">+</button>
		</div>

		<div class="w-10 flex-1">
			<Icon name="tabler:trash" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'add', value: unknown): void;
		(e: 'delete', value: unknown): void;
	}>();
	const props = defineProps({
		product: {
			type: Object,
			default: null,
		},
	});
	const count = ref(1);

	function add(type: 'inc' | 'dec') {
		if (type == 'inc') {
			emit('add', Number(props.product.count) + 1);
		} else if (props.product.count > 1) {
			emit('add', Number(props.product.count) - 1);
		}
	}
</script>

<style lang="scss" scoped>
	.countBtn {
		width: 30px;
		height: 30px;
		border: 1px solid #eee;
		border-radius: 5px;
		background: #efefef;
	}
</style>
