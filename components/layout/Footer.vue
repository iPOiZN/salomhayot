<template>
	<footer class="mt-auto bg-[--bg-secondary]">
		<nav>
			<div class="container mx-auto">
				<div class="flex gap-5 pb-20 pt-10">
					<div class="basis-1/3">
						<div>
								<NuxtLink>
									<div
										class="text-md rounded-md bg-[--primary] px-10 py-3 font-bold uppercase text-white hover:opacity-90"
									>
										salomhayot
									</div>
								</NuxtLink>
							<p class="my-3">Возникли вопросы? Звоните:</p>
							<a href="tel:+998553033000" class="text-2xl font-semibold">
								<Icon name="mingcute:phone-fill" />
								+998 55 303 30 00
							</a>
							<div class="mt-3 flex items-center gap-5">
								<ul class="flex gap-5">
									<li>
										<a
											class="flex items-center justify-center rounded-full bg-white p-2 transition-colors hover:bg-[--primary] hover:text-white"
											href="https://t.me/salom_hayot_uzb"
											target="_blank"
										>
											<Icon class="h-7 w-7" name="ic:outline-telegram" />
										</a>
									</li>
									<li>
										<a
											class="flex items-center justify-center rounded-full bg-white p-2 transition-colors hover:bg-[--primary] hover:text-white"
											href="https://www.instagram.com/salomhayot/"
											target="_blank"
										>
											<Icon class="h-7 w-7" name="mdi:instagram" />
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="basis-1/3">
						<div>
							<p class="mb-2 font-bold">Интернет-магазин</p>
							<ul class="flex flex-col gap-2">
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]"
										>Каталог товаров</NuxtLink
									>
								</li>
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]"
										>Доставка и оплата</NuxtLink
									>
								</li>
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]">Корзина</NuxtLink>
								</li>
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]"
										>Личный кабинет</NuxtLink
									>
								</li>
							</ul>
						</div>
					</div>
					<div class="basis-1/3">
						<div>
							<p class="mb-2 font-bold">Информация</p>
							<ul class="flex flex-col gap-2">
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]">О нас</NuxtLink>
								</li>
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]">Акции</NuxtLink>
								</li>
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]"
										>Адреса магазинов</NuxtLink
									>
								</li>
								<li>
									<NuxtLink class="font-medium text-gray-700 hover:text-[--primary]"
										>Вопрос-ответ</NuxtLink
									>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<div class="bg-white">
			<div class="container mx-auto">
				<div class="flex justify-between py-5">
					<p class="">© Все права защищены.</p>
					<p class="font-bold">Salom Hayot</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
