<template>
	<div
		class="relative z-0 w-[100%] overflow-hidden rounded-2xl border pb-10 transition-shadow hover:shadow-[1px_2px_16px] hover:shadow-gray-300"
	>
		<v-favorite-button class="absolute right-5 top-5 z-10 h-12 w-12 p-2" :product="product"></v-favorite-button>
		<NuxtLink
			class="flex h-[200px] w-[100%] items-center justify-center"
			:to="`/product/${slugify(product.name_uz)}-${product.id}`"
		>
			<div class="h-[100%] w-[100%] overflow-hidden" v-if="product.main_photo">
				<img
					class="h-[100%] w-[100%] object-contain"
					:src="runtimeConfig.public.apiStorageUrl + product.main_photo.url"
					alt=""
				/>
			</div>
			<div
				class="flex h-[100%] w-[100%] items-center justify-center text-[--primary] opacity-30"
				v-else-if="product.parent0_name_uz == 'Telefon'"
			>
				<Icon name="fluent:phone-28-filled" class="h-40 w-40" />
			</div>
			<div
				class="flex h-[100%] w-[100%] items-center justify-center text-[--primary] opacity-30"
				v-else-if="product.parent0_name_uz == 'Maishiy Texnika'"
			>
				<Icon name="ion:tv-sharp" class="h-40 w-40" />
			</div>
			<div
				class="flex h-[100%] w-[100%] items-center justify-center text-[--primary] opacity-30"
				v-else-if="product.parent0_name_uz == 'Avto ehtiyot qism'"
			>
				<Icon name="mdi:car-cog" class="h-40 w-40" />
			</div>
			<div class="flex h-[100%] w-[100%] items-center justify-center text-[--primary] opacity-30" v-else>
				<Icon name="solar:monitor-smartphone-bold" class="h-40 w-40" />
			</div>
		</NuxtLink>
		<div class="flex flex-col gap-3 px-7 pt-5">
			<NuxtLink
				class="w-max rounded-lg border px-3 py-1 text-sm font-bold text-gray-400 first-letter:uppercase hover:border-[--primary] hover:text-[--primary]"
			>
				{{ product.parent0_name_uz }}
			</NuxtLink>
			<NuxtLink
				:to="`/product/${slugify(product.name_uz)}-${product.id}`"
				class="relative inline-block h-[69px] w-[100%] text-ellipsis break-words font-semibold text-gray-700"
			>
				<span
					class="absolute left-0 top-0 line-clamp-5 h-[100%] w-[100%] cursor-pointer overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-[50px] after:w-[100%] after:bg-gradient-to-t after:from-white after:to-transparent hover:h-max hover:bg-white hover:text-[--primary] hover:after:hidden"
				>
					{{ product.parent2_name_uz + ' ' + product.name_uz }}
				</span>
			</NuxtLink>
			<div class="text-2xl font-bold text-[--primary]">
				{{ product.price.toLocaleString('ru-RU') }} сум
			</div>

			<NuxtLink
				:to="localePath(`/product/${slugify(product.name_uz)}-${product.id}`)"
				class="flex cursor-pointer items-center justify-between gap-5 rounded-md border bg-gray-100 p-2 text-black hover:bg-gray-200"
			>
				<p class="text-sm">
					<strong>{{ Math.round(product.price_twelve_month / 12).toLocaleString('ru-RU') }} сум</strong>
					в месяц
				</p>
			</NuxtLink>
			<div class="flex gap-1">
				<v-button
					class="flex w-[100%] items-center justify-center rounded-l-lg px-5 py-3 transition-colors hover:bg-[--primary] hover:text-white active:shadow-inner"
					:to="`/product/${slugify(product.name_uz)}-${product.id}`"
				>
					<span>Купить</span>
				</v-button>
				<button
					class="flex w-[70px] items-center justify-center overflow-hidden rounded-r-lg border border-[--primary] bg-[--primary] text-white transition-colors hover:bg-white hover:text-[--primary] active:shadow-inner"
				>
					<v-cart-button class="hover:text-[--primary]" :id="product.id" :product="product"></v-cart-button>
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const localePath = useLocalePath();
	const runtimeConfig: any = useRuntimeConfig();
	const { slugify } = useFilters();
	

	const props = defineProps<{
		product: any;
	}>();
</script>
