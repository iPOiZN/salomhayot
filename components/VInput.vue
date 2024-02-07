<template>
	<div class="input-group">
		<div class="input-wrapper">
			<textarea
				v-if="type === 'textarea'"
				ref="input"
				class="input"
				:class="{ error: error }"
				:rows="rows"
				:placeholder="placeholder"
				v-model="value"
				:disabled="disabled"
			/>
			<InputGroup v-if="type === 'inputMask'">
				<InputGroupAddon class="addon-input"> +998 </InputGroupAddon>
				<InputMask
					ref="input"
					class="input group-input"
					:class="{ error: error }"
					:rows="rows"
					:mask="mask"
					:placeholder="placeholder"
					v-model="value"
					@focus="$emit('focus', '')"
					:disabled="disabled"
				/>
			</InputGroup>
			<input
				v-else
				ref="input"
				class="input"
				:class="{
					input_icon: icon,
					error: error,
				}"
				:disabled="disabled"
				v-model="value"
				:placeholder="placeholder"
				:type="!isShowPasswordIcon ? 'text' : type"
			/>

			<Icon v-if="icon" :name="icon" class="icon" @click="$emit('iconClick')" />
			<Icon
				v-if="type == 'password'"
				:name="isShowPasswordIcon ? 'tabler:eye' : 'tabler:eye-off'"
				@click="isShowPasswordIcon = !isShowPasswordIcon"
				class="icon"
			/>
		</div>

		<p v-if="maxLength" class="text-12 text-400 mt-10">
			{{ $t('basics.symbolsLeft') }}:
			{{ Math.max(maxLength - value.length, 0) }}
		</p>
	</div>
	<span class="errors" v-if="error">
		<div v-for="error of errors" :key="error.$uid">*{{ error.$message }}</div>
		<!-- {{ errorMsg }} -->
	</span>
</template>

<script setup lang="ts">
	import InputMask from 'primevue/inputmask';
	import InputGroup from 'primevue/inputgroup';
	import InputGroupAddon from 'primevue/inputgroupaddon';
	const props = defineProps<{
		modelValue?: string | number;
		dynamicValue?: string;
		placeholder?: string;
		icon?: string;
		type?: 'password' | 'textarea' | 'number' | 'range' | 'inputMask';
		rows?: string;
		maxLength?: number;
		error?: boolean;
		mask?: string;
		disabled?: boolean;
		errors?: any[];
	}>();

	const emit = defineEmits<{
		(e: 'update:modelValue', value: unknown): void;
		(e: 'focus', value: unknown): void;
		(e: 'iconClick'): void;
	}>();

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(newValue: any) {
			emit('update:modelValue', newValue);
		},
	});
	watch(value, () => {
		emit('update:modelValue', value.value);
	});

	watch(
		() => props.modelValue,
		(newVal, oldVal) => {
			if (!oldVal) {
				value.value = newVal || '';
			}
		}
	);

	const input = ref<HTMLInputElement | null>(null);
	const isShowPasswordIcon = ref(true);
	let timeout: number | undefined;
</script>

<style lang="scss" scoped>
	.input-wrapper {
		display: flex;
		position: relative;
	}

	.icon {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 14px;
		margin: auto;
		font-size: 20px;
		cursor: pointer;
	}

	.footer {
		position: absolute;
		left: 16px;
		right: 16px;
		bottom: 2px;
		padding: 10px 0;
		background-color: #fff;
	}

	.input {
		width: 100%;
		border-radius: 10px;
		border: 1px solid var(--border-color);
		padding: 14px 16px;
		font-weight: 400;
		resize: none;

		&.error {
			border-color: var(--danger);
		}

		&_footer {
			padding-bottom: 38px;
			scroll-padding: 38px;
		}

		&_icon {
			padding-right: 42px;
		}

		&:focus {
			outline-color: var(--primary);
		}

		&::placeholder {
			color: #bcbec0;
		}
	}
	.group-input {
		border-radius: 0 10px 10px 0;
	}
	.addon-input {
		border: 1px solid var(--border-color);
		padding: 14px 16px;
	}

	.errors {
		color: var(--danger);
		font-size: 10px;
	}
</style>
