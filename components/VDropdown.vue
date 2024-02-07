<template>
	<button
		id="multiLevelDropdownButton"
		data-dropdown-placement="bottom"
		:data-dropdown-toggle="dropdownId"
		:data-dropdown-trigger="hover ? 'hover' : 'click'"
		type="button"
		:data-dropdown-offset-distance="yDistance"
		:data-dropdown-offset-skidding="xDistance"
		@onShow="onShow"
	>
		<span
			class="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#00c65e]/[.4] dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			v-if="!customBtn"
		>
			<div :style="`color:${iconColor}`" v-if="icon">
				<Icon :name="icon ? icon : 'tabler:chevron-down'" />
			</div>
			<span>{{ title }}</span>
			<Icon name="tabler:chevron-down" class="h-5 w-5" v-if="chevron" />
		</span>
		<slot name="custom-button" v-if="customBtn"></slot>
	</button>
	<!-- Dropdown menu -->
	<div
		:id="dropdownId"
		class="z-50 hidden divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
	>
		<slot name="dropdownMenu"></slot>
	</div>
</template>

<script setup lang="ts">
	import { initFlowbite } from 'flowbite';
	import type { DropdownOptions, DropdownInterface } from 'flowbite';

	const options: DropdownOptions = {
		//   placement: 'bottom',
		//   triggerType: 'click',
		//   offsetSkidding: 0,
		//   offsetDistance: 10,
		//   delay: 300,
		onHide: () => {
			console.log('dropdown has been hidden');
		},
		onShow: () => {
			console.log('dropdown has been shown');
		},
		onToggle: () => {
			console.log('dropdown has been toggled');
		},
	};

	defineProps({
		title: String,
		icon: String,
		iconColor: String,
		xDistance: String,
		yDistance: String,
		hover: { type: Boolean, default: false },
		chevron: { type: Boolean, default: true },
		dropdownId: { type: String, required: true },
		customBtn: { type: Boolean, default: false },
	});
	

	onMounted(() => {
		initFlowbite();
	});
</script>

<style lang="scss" scoped></style>
