<template>
	<!-- top Header -->
	<div class="relative z-10 flex h-[100%] items-center justify-between gap-3 bg-white">
		<div class="container mx-auto">
			<div class="flex h-10 w-[100%] justify-between gap-10 text-sm text-gray-700">
				<div class="hidden md:block">
					<!-- <v-dropdown-country></v-dropdown-country> -->
				</div>
				<!-- <div class="md:hidden">
					<v-category-nav />
				</div> -->

				<div class="header__logo md:hidden">
					<NuxtLink to="/">
						<div
							class="text-md rounded-md px-3 py-3 font-bold uppercase text-[--primary] hover:opacity-90"
						>
							salomhayot
						</div>
					</NuxtLink>
				</div>

				<div class="flex justify-between gap-10">
					<a href="tel:+998553033000" class="mt-2 hidden md:block">
						<Icon name="mingcute:phone-fill" />
						+998 55 303 30 00
					</a>
					<a class="mt-2">
						<!-- <VPopper :append-to-body="true" class="menu-wrapper" placement="bottom-start"> -->
						<div class="flex place-items-center" @click.prevent="switchLocale()">
							<Icon :name="`circle-flags:${locale}`" />
							<span class="nav_label ml-2 hidden md:block">{{ $t(locale) }}</span>
						</div>
						<!-- <template #content="{ close }">
								<ul class="menu">
									<li class="menu__item">
										<p class="menu__text menu__link" @click.prevent="switchLocale('ru', close)">
											<Icon :name="`circle-flags:ru`" class="nav__icon nav__icon_bordered" />
											<span class="nav__title">{{ $t('ru') }}</span>
										</p>
									</li>
									<li class="menu__item">
										<p class="menu__text menu__link" @click.prevent="switchLocale('uz', close)">
											<Icon :name="`circle-flags:uz`" class="nav__icon nav__icon_bordered" />
											<span class="nav__title">{{ $t('uz') }}</span>
										</p>
									</li>
								</ul>
							</template> -->
						<!-- </VPopper> -->
					</a>
				</div>
			</div>
		</div>
	</div>
	<!-- Main Header -->
	<header class="relative z-10 h-20 border-b bg-[--bg-secondary]">
		<div class="container mx-auto flex h-[100%] items-center justify-between gap-3">
			<div class="flex justify-between gap-3">
				<div class="header__logo hidden md:block">
					<NuxtLink to="/">
						<div
							class="text-md rounded-md bg-[--primary] px-10 py-3 font-bold uppercase text-white hover:opacity-90"
						>
							salomhayot
						</div>
					</NuxtLink>
				</div>
				<div class="nav__category block">
					<v-category-nav />
				</div>
			</div>

			<div class="my-2 w-[100%]">
				<v-search></v-search>
			</div>

			<div class="hidden items-center gap-10 md:flex">
				<div class="flex items-center gap-8">
					<NuxtLink
						class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
					>
						<Icon class="h-[60%] w-[60%]" name="mdi:user" />
						<span class="text-xs">{{ $t('Войти') }}</span>
					</NuxtLink>
					<NuxtLink
						:to="`/wishlist`"
						class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
					>
						<span
							class="absolute right-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-orange-400 text-xs text-white"
							v-if="favoritesStore.favorites.length"
						>
							{{ favoritesStore.favorites.length }}
						</span>
						<Icon class="h-[60%] w-[60%]" name="icon-park-outline:like" />
						<span class="text-xs">{{ $t('Избранное') }}</span>
					</NuxtLink>
					<v-dropdown
						:dropdown-id="'favorite-dropdown'"
						:custom-btn="true"
						:hover="true"
						xDistance="-150"
					>
						<template #custom-button>
							<span
								class="relative flex h-[40px] w-[40px] flex-wrap items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
								@click="$router.push('/cart')"
							>
								<span
									class="absolute right-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-orange-400 text-xs text-white"
									v-if="cartStore.cartItems.length"
								>
									{{ cartStore.cartItems.length }}
								</span>
								<Icon class="h-[60%] w-[60%]" name="tdesign:cart" />
								<span class="text-xs">{{ $t('Корзина') }}</span>
							</span>
						</template>
						<template #dropdownMenu>
							<div class="min-w-[400px] overflow-hidden py-5">
								<div class="flex justify-between px-5">
									<span>Основные товары {{ cartStore.cartItems.length }}</span>
									<button
										class="hover:text-[--primary]"
										@click="cartStore.clearCart()"
										v-if="cartStore.cartItems.length"
									>
										Очистить список
									</button>
								</div>
								<hr :class="`mt-5 ${cartStore.cartItems.length ? '' : 'opacity-0'}`" />
								<Transition>
									<div
										class="flex max-h-[400px] min-h-[140px] flex-col gap-2 overflow-y-scroll px-2 pt-7"
										v-if="cartStore.cartItems.length"
									>
										<NuxtLink
											:to="`/product/${slugify(product.name_uz)}-${product.id}`"
											class="group flex w-[100%] items-center gap-4 rounded-lg px-3 py-3 hover:bg-[#00c65e30]"
											v-for="(product, i) in cartStore.cartItems"
											:key="i"
										>
											<div class="h-[100%] w-[50px]" v-if="product.main_photo">
												<img
													class="h-[100%] w-[100%] object-contain"
													:src="runtimeConfig.public.apiStorageUrl + product.main_photo.url"
													alt=""
												/>
											</div>
											<div
												class="flex h-[50px] w-[50px] items-center justify-center text-[--primary] opacity-30"
												v-else-if="product.parent0_name_uz == 'Telefon'"
											>
												<Icon name="fluent:phone-28-filled" class="h-40 w-40" />
											</div>
											<div
												class="flex h-[50px] w-[50px] items-center justify-center text-[--primary] opacity-30"
												v-else-if="product.parent0_name_uz == 'Maishiy Texnika'"
											>
												<Icon name="ion:tv-sharp" class="h-40 w-40" />
											</div>
											<div
												class="flex h-[50px] w-[50px] items-center justify-center text-[--primary] opacity-30"
												v-else-if="product.parent0_name_uz == 'Avto ehtiyot qism'"
											>
												<Icon name="mdi:car-cog" class="h-40 w-40" />
											</div>
											<div
												class="flex h-[50px] w-[50px] items-center justify-center text-[--primary] opacity-30"
												v-else
											>
												<Icon name="solar:monitor-smartphone-bold" class="h-40 w-40" />
											</div>
											<div class="flex w-[100%] flex-col gap-1 overflow-hidden">
												<!-- <NuxtLink
													:to="`/product/`"
													class="relative inline-block h-[50px] w-[100%] text-ellipsis break-words font-semibold text-gray-700"
												>
													<span
														class="absolute left-0 top-0 line-clamp-5 h-[100%] w-[90%] cursor-pointer overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[50px] after:w-[100%] after:bg-gradient-to-t after:from-white after:to-transparent hover:h-max hover:bg-white hover:text-[--primary] hover:after:hidden"
													>
														{{ product.name_uz }}
													</span>
												</NuxtLink> -->
												<p class="overflow-hidden text-ellipsis whitespace-nowrap text-lg text-gray-700">
													{{ product.name_uz }}
												</p>
												<p class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-700">
													{{ product.quantity }} шт.
												</p>
												<p class="text-lg font-bold text-gray-700">
													{{ product.price.toLocaleString('ru-RU') }} сум
												</p>
											</div>
											<button
												class="cursor-pointer text-gray-400 opacity-0 hover:text-[--primary] group-hover:opacity-100"
												title="Удалить"
												@click.prevent="cartStore.removeFromCart(product.id)"
											>
												<Icon name="mi:delete" class="h-7 w-7" />
											</button>
											<!-- <div class="flex flex-col gap-2">
												<v-button
													class="flex items-center justify-center rounded-lg px-2 py-3 text-xs transition-colors hover:bg-[--primary] hover:text-white active:shadow-inner"
													color="red"
													:to="`/product/`"
												>
													<span>Удалить</span>
												</v-button>
												<v-button
													class="flex items-center justify-center rounded-lg px-2 py-3 text-xs transition-colors hover:bg-[--primary] hover:text-white active:shadow-inner"
													:to="`/product/`"
												>
													<span>Купить</span>
												</v-button>
											</div> -->
										</NuxtLink>
									</div>
								</Transition>
								<hr class="mb-5" />
								<div class="flex items-center justify-between gap-2 px-5">
									<div class="flex flex-col">
										<span class="text-lg">Итого:</span>
										<span
											class="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold"
											>{{ cartTotalPrice }} сум</span
										>
									</div>
									<v-button class="h-max w-max rounded-lg" :to="'/cart'">В корзину</v-button>
								</div>
							</div>
						</template>
					</v-dropdown>
					<!-- <NuxtLink
						class="relative flex h-[40px] w-[40px] items-center justify-center rounded-xl text-[--primary] transition-colors hover:bg-transparent hover:text-[--primary]"
					>
						<span
							class="absolute right-0 top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-orange-400 text-xs text-white"
						>
							{{ cartStore.cartItems.length }}
						</span>
						<Icon class="h-[60%] w-[60%]" name="tdesign:cart" />
					</NuxtLink> -->
				</div>
			</div>
		</div>
	</header>
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
	async function switchLocale() {
		const currentIdx = availableLocales.indexOf(locale.value);
		const nextIdx = currentIdx >= availableLocales.length - 1 ? 0 : currentIdx + 1;
		setLocale(availableLocales[nextIdx]);
	}
	onMounted(() => {
		cartStore.loadCart();
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
	.menu {
		padding: 0;
		margin: 0;
		list-style: none;
		text-align: left;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		gap: 10px;
		border-radius: 10px;
		box-shadow: 0px 0px 37px rgba(8, 21, 66, 0.05);
		&__item {
			width: 100%;
		}
		.nav__title {
			margin-left: 6px;
		}
		&__link,
		&__text {
			padding: 14px 12px;

			line-height: 1;
			text-decoration: none;
			font-size: 18px;
			display: flex;
			// justify-content: center;
			align-items: center;
			text-transform: capitalize;
			color: var(--primary);
		}
		&__text {
			// opacity: 0.5;
			cursor: pointer;
			color: var(--text-color);
		}
		&__link {
			&:hover {
				// text-decoration: underline;
				background-color: #e5ecf4;
			}
		}

		&__icon {
			font-size: 20px;
			margin-right: 8px;
		}
	}
</style>
