<template>
	<v-dropdown :icon="'oi:location'" :title="'Ташкент'" :iconColor="'var(--primary)'" :dropdown-id="'countryList'">
		<template #dropdownMenu>
			<ul class="max-h-[150px] overflow-x-clip overflow-y-scroll py-2 text-sm font-medium text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">
				<li>
					<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Бухара</a>
				</li>
				<li>
					<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Самарканд</a>
				</li>
				<li>
					<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Хива</a>
				</li>
				<li>
					<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Фергана</a>
				</li>
				<li>
					<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Навои</a>
				</li>
				<li>
					<a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Андижан</a>
				</li>
			</ul>
		</template>
	</v-dropdown>
</template>

<script setup></script>

<style lang="scss" scoped></style>
