<template>
	<div class="container mx-auto my-20">
		<div class="flex justify-between">
			<v-heading :level="1">Оформление заказа</v-heading>
		</div>
		<div class="flex flex-col gap-10 md:flex-row">
			<div class="order-1 mb-4 w-full md:order-2 md:mb-0 md:w-1/3 sticky top-0">
				<!-- Product Info -->
				<v-card class="col-span-2 my-6 p-10" :full-width="true">
					<div class="flex justify-between">
						<h5 class="mb-5 font-bold">Состав заказа</h5>
						<span>Изменить</span>
					</div>
					<div v-for="(product, i) in cartStore.cartItems" :key="i" class="mb-5">
						<h5 class="font-medium">{{ product.name_uz }}</h5>
						<div class="flex justify-between">
							<span class="font-semibold"> {{ product.price.toLocaleString('ru-RU') }} so'm</span>
							<span class="">
								<Icon name="ep:close-bold" class="h-3 w-3 text-gray-500" />
								{{ product.quantity }} {{ $t('шт.') }}
							</span>
						</div>
					</div>
					<div class="flex justify-between">
						<h5 class="mb-5 font-bold">Итого:</h5>
						<span class="text-xl font-bold">{{ cartTotalPrice }} so'm</span>
					</div>
				</v-card>
			</div>

			<div class="order-2 w-full md:order-1 md:w-2/3">
				<v-card class="my-6 p-10" :full-width="true">
					<!-- Person INfo -->
					<div>
						<h5 class="mb-5 font-bold">Ваши данные</h5>
						<div class="my-5 rounded-xl border p-10" :full-width="true">
							<form>
								<div class="grid w-full md:grid-cols-2">
									<v-label :label="t('Номер телефона')">
										<v-input
											v-model="form.phone"
											@focus="setPhoneAttr"
											type="inputMask"
											mask="(99) 999 99 99"
											placeholder="(__) ___ __ __"
										/>
									</v-label>
								</div>
								<div class="grid md:grid-cols-2 md:gap-6">
									<div class="group relative w-full">
										<v-label :label="t('Имя')">
											<v-input v-model="username" :placeholder="t(`Имя`)" />
										</v-label>
									</div>
									<div class="group relative w-full">
										<v-label :label="t('Фамилия')">
											<v-input v-model="username" :placeholder="t('Фамилия')" />
										</v-label>
									</div>
								</div>
							</form>
						</div>
					</div>
					<!-- Payment -->
					<div>
						<h5 class="mb-5 font-bold">Способ оплаты</h5>
						<div class="my-5 rounded-xl border p-10" :full-width="true">
							<form @submit.prevent="onSubmit">
								<div class="grid md:grid-cols-2 md:gap-6">
									<!-- <div class="group relative w-full">
										<div
											class="payment-card cursor-pointer rounded-md border-2 border-gray-200 p-4"
											@click="form.payment_type = 1"
											:class="{ 'border-green-500 bg-green-50': form.payment_type == 1 }"
										>
											<input
												id="draft"
												class="peer/draft text-green-500"
												type="radio"
												v-model="form.payment_type"
												name="status"
												:checked="form.payment_type == 1"
												value="1"
											/>
											<label for="draft" class="ml-2 font-bold peer-checked/draft:text-green-500">
												Онлайн
											</label>
											<p class="mt-5">Картами Visa, UzCard, Humo</p>
										</div>
									</div> -->
									<div class="group relative w-full">
										<div
											class="payment-card cursor-pointer rounded-md border-2 border-gray-200 p-4"
											:class="{ 'border-green-500 bg-green-50': form.payment_type == 2 }"
											@click="form.payment_type = 2"
										>
											<input
												id="published"
												class="peer/published text-green-500"
												type="radio"
												value="2"
												v-model="form.payment_type"
												name="status"
												:checked="form.payment_type == 2"
											/>
											<label
												for="published"
												class="ml-2 font-bold peer-checked/published:text-green-500"
											>
												Рассрочка онлайн
											</label>
											<p class="mt-5">Заполнить анкету на сайте</p>
										</div>
									</div>
									<div class="group relative w-full">
										<div
											class="payment-card cursor-pointer rounded-md border-2 border-gray-200 p-4"
											:class="{ 'border-green-500 bg-green-50': form.payment_type == 3 }"
											@click="form.payment_type = 3"
										>
											<input
												id="after"
												value="3"
												class="peer/after text-green-500"
												type="radio"
												v-model="form.payment_type"
												name="status"
												:checked="form.payment_type == 3"
											/>
											<label for="after" class="ml-2 font-bold peer-checked/after:text-green-500">
												При получении
											</label>
											<p class="mt-5">Наличными или картой</p>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
					<!-- Dostavka -->
					<div>
						<h5 class="mb-5 font-bold">Способ получения в Узбекистане</h5>

						<!-- <VMap /> -->

						<div class="flex items-center justify-start gap-5">
							<v-button
								class="rounded-xl px-5 transition-colors hover:bg-[--primary] hover:text-white active:shadow-inner"
								to="/product/iphone"
							>
								<span>Доставка</span>
							</v-button>
							<v-button class="button_outline hover_off rounded-xl" to="/product/iphone">
								<span>Самовывоз</span>
							</v-button>
						</div>

						<div class="my-5 rounded-xl border p-10" :full-width="true">
							<form @submit.prevent="onSubmit">
								<div class="grid md:grid-cols-2 md:gap-6">
									<div class="group relative w-full">
										<v-label :label="$t('Регион/Область доставки')">
											<v-select
												v-model="city"
												:options="regions"
												track-by="id"
												value-by="id"
												searchable
												label="name"
												@update:modelValue="onSelectRegion"
											/>
										</v-label>
									</div>
									<div class="group relative w-full">
										<v-label :label="$t('Город/Район')">
											<v-select
												v-model="city"
												:options="regions"
												track-by="id"
												value-by="id"
												searchable
												label="name"
												@update:modelValue="onSelectRegion"
											/>
										</v-label>
									</div>
								</div>

								<div class="grid md:grid-cols-3 md:gap-6">
									<div class="group relative col-span-2 w-full">
										<v-label :label="t('Адрес')">
											<v-input
												v-model="address"
												:placeholder="t(`Улица/корпус/дом`)"
												:icon="'iconoir:map'"
												@icon-click="showMap = !showMap"
											/>
										</v-label>
									</div>
									<div class="group relative w-full">
										<v-label :label="t('Квартира')">
											<v-input v-model="username" :placeholder="t('35')" />
										</v-label>
									</div>
								</div>
								<Transition>
									<v-map
										class="mb-5 overflow-hidden rounded-xl will-change-auto"
										v-if="showMap"
										:address="address"
										@updateMarkerCoordinates="handleMarkerCoordinates"
									/>
								</Transition>
								<div class="grid md:grid-cols-3 md:gap-6">
									<div class="group relative w-full">
										<v-label :label="$t('Дата')">
											<v-select
												v-model="city"
												:options="regions"
												track-by="id"
												value-by="id"
												searchable
												label="name"
												@update:modelValue="onSelectRegion"
											/>
										</v-label>
									</div>
									<div class="col-span-2 w-full">
										<v-label :label="t('Комментарий курьеру')">
											<v-input v-model="username" :placeholder="t('Домофон')" />
										</v-label>
									</div>
								</div>
							</form>
						</div>
					</div>
				</v-card>
			</div>
		</div>

		<v-button class="button_outline hover_off rounded-xl">
			<span>Далее</span>
		</v-button>
	</div>
</template>

<script lang="ts" setup>
	import { useCartStore } from '@/stores/cart';
	const cartStore = useCartStore();

	const { t } = useI18n();
	const username = ref();
	const city = ref();
	const showMap = ref(false);
	const address = ref();

	const handleMarkerCoordinates = async (coordinates: any) => {
		const { data }: any = await useFetch(
			`https://api.express24.uz/client/v4/geocode/by-coordinates?latitude=${coordinates[1]}&longitude=${coordinates[0]}`
		);
		// const { data }: any = await useFetch(`https://eats.yandex.com/eats/v1/persuggest/v1/finalsuggest`, {
		// 	method: 'POST',
		// 	body: {
		// 		action: 'pin_drop',
		// 		position: coordinates,
		// 	},
		// });
		const response = data.value;
		if (response) {
			address.value = response.name;
		}
	};

	const regions = ref([
		{ name: 'Buxoro', id: 15 },
		{ name: 'Navoiy', id: 18 },
		{ name: 'Farg`ona', id: 10 },
		{ name: 'Andijon', id: 8 },
		{ name: 'Toshkent', id: 9 },
	]);
	const form = reactive({
		payment_type: 2,
		phone: '',
	});
	const cartTotalPrice = computed(() => {
		return cartStore.cartItems
			.map((item) => item.price)
			.reduce((a, b) => a + b, 0)
			.toLocaleString('ru-RU');
	});

	function setPhoneAttr() {}
	function onSelectRegion(item: any) {
		console.log(item[0].id);
	}
	function onSubmit() {
		console.log(555);
	}
</script>

<style scoped lang="scss">
	.v-enter-active,
	.v-leave-active {
		transition: all 0.4s;
	}
	.v-enter-from,
	.v-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
