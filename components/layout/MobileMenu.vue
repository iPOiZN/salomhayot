<template>
	<div class="sticky bottom-0 z-30 grid grid-cols-5 bg-white justify-items-center py-2 shadow-2xl">
		<NuxtLink
			:to="`/`"
			class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
		>
			<Icon class="h-[60%] w-[60%]" name="tabler:smart-home" />
			<span class="text-xs">{{ $t('Главный') }}</span>
		</NuxtLink>
		<NuxtLink
			:to="`/categories`"
			class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
		>
			<Icon class="h-[60%] w-[60%]" name="tabler:list-search" />
			<span class="text-xs">{{ $t('Каталог') }}</span>
		</NuxtLink>
		<NuxtLink
			:to="`/cart`"
			class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
		>
			<span
				class="absolute right-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-orange-400 text-xs text-white"
				v-if="cartStore.cartItems.length"
			>
				{{ cartStore.cartItems.length }}
			</span>
			<Icon class="h-[60%] w-[60%]" name="tdesign:cart" />
			<span class="text-xs">{{ $t('Корзина') }}</span>
		</NuxtLink>
		<NuxtLink
			:to="`/wishlist`"
			class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
		>
			<span
				class="absolute right-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-orange-400 text-xs text-white"
			>
				44
			</span>
			<Icon class="h-[60%] w-[60%]" name="icon-park-outline:like" />
			<span class="text-xs">{{ $t('Избранное') }}</span>
		</NuxtLink>
		<NuxtLink
			class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
		>
			<Icon class="h-[60%] w-[60%]" name="mdi:user" />
			<span class="text-xs">{{ $t('Войти') }}</span>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
	import { useFavoritesStore } from '@/stores/favorites';
	import { useCartStore } from '@/stores/cart';
	const favoritesStore = useFavoritesStore();
	const cartStore = useCartStore();
	const { slugify } = useFilters();
	const { t, locale, availableLocales, setLocale } = useI18n();
	const localePath = useLocalePath();
	const router = useRouter();
	const route = useRoute();

	const cartTotalPrice = computed(() => {
		return cartStore.cartItems
			.map((item) => item.price)
			.reduce((a, b) => a + b, 0)
			.toLocaleString('ru-RU');
	});

	const runtimeConfig: any = useRuntimeConfig();
	async function switchLocale(lang: any, fn: any) {
		fn();
		setLocale(lang).then(() => {
			router.push(localePath(route.path));
		});
	}
	onMounted(() => {
		cartStore.loadCart();
	});
</script>
