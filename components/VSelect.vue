<template>
	<VueMultiselect
		v-model="value"
		:options="options"
		:multiple="multiple"
		:label="mapValues ? 'label' : ''"
		placeholder=""
		select-label=""
		:searchable="multiple"
		:loading="loading"
		allow-empty
		hide-selected
		:optionsLimit="99999"
		@open="onOpen"
	>
		<template #selection="{ isOpen }">
			<span v-if="multiple && modelValue?.length && !isOpen">{{
				$t('blocks.select.chosenCount', { n: modelValue?.length })
			}}</span>
			<span
				v-else-if="(!modelValue || !modelValue.length) && !(isOpen && searchable)"
				class="placeholder"
			>
				{{ placeholder || $t('blocks.select.notSelected') }}
			</span>
		</template>
		<template #noOptions>
			{{ $t('blocks.select.noOptions') }}
		</template>
		<template #noResult>
			{{ $t('blocks.select.noOptions') }}
		</template>
	</VueMultiselect>
</template>

<script setup lang="ts">
	import VueMultiselect from 'vue-multiselect';

	const props = defineProps<{
		modelValue?: string | string[] | undefined[];
		options?: unknown[];
		optionsPath?: string;
		mapValues?: boolean;
		multiple?: boolean;
		placeholder?: string;
		searchable?: boolean;
	}>();

	const loading = ref(false);
	const options = ref(props.options || []);

	const emit = defineEmits<{
		(e: 'update:modelValue', value: unknown[]): void;
	}>();

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(newValue: any) {
			if (!props.multiple) {
				emit('update:modelValue', [newValue]);
			} else {
				emit('update:modelValue', newValue);
			}
		},
	});

	function onOpen() {
		if (options.value.length || !props.optionsPath) {
			return;
		}

		loading.value = true;
		fetch(props.optionsPath)
			.then((response) => response.json())
			.then((response) => {
				options.value = response;
			})
			.finally(() => {
				loading.value = false;
			});
	}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
	.multiselect,
	.multiselect__input,
	.multiselect__single,
	.multiselect__option {
		font-size: 14px;
		text-transform: capitalize;
	}

	.multiselect {
		cursor: pointer;
		&__tag {
			background-color: var(--primary);
			padding-right: 17px;
			padding-left: 7px;

			&-icon {
				width: 15px;
				padding-right: 4px;

				&::after {
					color: #fff;
				}
			}
		}

		&__tags {
			min-height: 51px;
			// padding-top: 14px;
			// padding-top: 8px;
			padding: 8px 0;
			padding-left: 10px;
			display: flex;
			align-items: center;
      border: 1px solid #DADCDC;
      border-radius: 10px;
		}

		&__option {
			white-space: normal;
			min-height: 51px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-left: 21px;
			&--highlight {
				// background-color: var(--primary);
				background-color: #fff;
				color: var(--text-color);
				&:hover {
					background-color: var(--primary);
					color: #fff;
				}
			}
		}

		&__select {
			min-height: 51px;
			z-index: 1;
			&:before {
				top: 61%;
				transform-origin: center;
			}
		}

		&__single {
			font-size: 14px;
			color: var(--text-color);
			font-weight: 400;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background-color: #fff;
			margin-bottom: 0;
		}

		&__spinner {
			height: calc(100% - 4px);

			&:before,
			&:after {
				border-color: var(--primary) transparent transparent;
			}
		}
	}
</style>

<style lag="scss" scoped>
	.placeholder {
		color: #bcbec0;
		font-weight: 400;
	}
</style>

