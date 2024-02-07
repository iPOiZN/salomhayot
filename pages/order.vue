<template>
	<div class="container mx-auto">
		<h1 class="mb-5 text-3xl font-bold">{{ $t('Корзина') }}</h1>
		<div class="mb-80 flex justify-between">
			<div class="flex-auto">
				<cart-item :product="item" v-for="(item, index) in cartItems" :key="index" @add="add($event, index)" />
			</div>

			<div class="flex-auto">
				<div class="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
					<div class="mb-7 flex flex-col gap-2 border-b-2 pb-5">
						<div class="flex justify-between">
							<span>{{ $t('Товары ') }}({{ '5' }}): </span>
							<span class="font-medium"> 5 400 so'm</span>
						</div>
						<div class="flex justify-between">
							<span>{{ $t('Доставка') }}:</span>
							<span class="font-medium">{{ $t('бесплатно') }}</span>
						</div>
					</div>

					<div class="mb-5 flex justify-between">
						<span class="text-lg font-medium">{{ $t('Итого') }}: </span>
						<span class="text-2xl font-bold"> 5 400 so'm</span>
					</div>
					<v-button class="w-[100%]">Оформить</v-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useStorage } from '@vueuse/core';
	const cartItems = ref([
		{ name: 'Iphone 15 pro Max 256Gb Purple (Apple)', category: 'Смартфон', price: 2400000, count: 1 },
		{ name: 'Iphone 13 pro Max 256Gb Purple (Apple)', category: 'Смартфон', price: 2000000, count: 1 },
		{ name: 'Iphone 12 pro Max 256Gb Purple (Apple)', category: 'Смартфон', price: 1400000, count: 1 },
	]);
  const state = null
	function add(count: number, index: number) {
		cartItems.value[index].count = count;
	}

	// bind object

	useStorage('my-store', { hello: 'hidasdasda', greeting: 'Helloasdasdas' });
	// delete data from storage
	console.log(state);
</script>

<style lang="scss"></style>
