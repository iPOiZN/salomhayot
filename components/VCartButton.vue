<template>
	<div
		class="flex h-[100%] w-[100%] cursor-pointer items-center justify-center p-3 text-white transition-transform active:scale-90"
		:title="getQuantity(product.id) ? 'Удалить из корзины' : 'Добавить в корзину'"
		@click="toggleAddToCart(product.id)"
	>
		<Icon class="h-[100%] w-[100%]" :name="getQuantity(product.id) ? 'line-md:confirm' : 'ion:cart-outline'" />
	</div>
</template>

<script setup lang="ts">
	import { useCartStore } from '@/stores/cart';
	const props = defineProps<{
		id: number;
		product: any;
	}>();
	const { $toast }: any = useNuxtApp();
	const cartStore = useCartStore();

	function toggleAddToCart(id: number) {
		if (getQuantity(id)) {
			cartStore.removeFromCart(id);
			$toast.add({
				severity: 'error',
				summary: 'Товар удален из корзины',
				detail: '',
				life: 3000,
			});
		} else {
			cartStore.addToCart(id, 1, props.product);
			$toast.add({
				severity: 'success',
				summary: 'Товар добавлен в корзину',
				detail: '',
				life: 3000,
			});
		}
	}
	function getQuantity(id: number) {
		return cartStore.getQuantity(id);
	}
	defineExpose({
		toggleAddToCart,
	});
	onMounted(() => {
		cartStore.loadCart();
	});
</script>

<style lang="scss" scoped></style>
