<template>
	<button
		class="button"
		@click="onClick"
		:class="{
			button_outline: type === 'outline',
			[`button_${color}`]: color,
			button_disabled: disabled,
			[`button_${type}`]: type,
			[`button_${size}`]: size,
			button_squared: squared,
			'button_full-width': fullWidth,
		}"
		:style="`${color ? '--primary:' + color : ''}`"
	>
		<!-- <span class="button-text"> -->
		<slot />
		<!-- </span> -->
	</button>
</template>

<script setup lang="ts">
	const props = defineProps<{
		disabled?: boolean;
		type?: 'outline';
		size?: 'sm';
		squared?: boolean;
		fullWidth?: boolean;
		to?: string;
		toHash?: string;
		color?: string;
	}>();

	const router = useRouter();
	const localePath = useLocalePath();
	function onClick() {
		if (props.to) {
			router.push({
				path: localePath(props.to),
				hash: props.toHash,
			});
		}
	}
</script>

<style lang="scss" scoped>
	.button {
		display: inline-block;
		background-color: var(--primary);
		color: #fff;
		font-weight: 600;
		padding: 11px 20px;
		border: none;
		// border-radius: 30px;
		cursor: pointer;
		border: 1px solid var(--primary);
		transition:
			0.2s background-color,
			0.2s color;
		overflow: hidden;
		&:hover,
		&:focus {
			background-color: #fff;
			color: var(--primary);
		}

		&.hover_off {
			&:hover,
			&:focus {
				background-color: var(--primary);
				color: #fff;
			}
		}

		// &:hover &-text {
		//   display: block;
		//   animation: textAnim 0.5s ease-in-out 1 forwards;
		//   @keyframes textAnim {
		//     0% {
		//       transform: translateY(0px);
		//       opacity: 1;
		//     }
		//     48% {
		//       transform: translateY(-50px) scaleY(2);
		//       opacity: 1;
		//     }
		//     49% {
		//       transform: translateY(-50px);
		//       opacity: 0;
		//     }
		//     50% {
		//       transform: translateY(50px);
		//       opacity: 0;
		//     }
		//     51% {
		//       transform: translateY(50px) scaleY(3);
		//       opacity: 1;
		//     }
		//     100% {
		//       transform: translateY(0px);
		//       opacity: 1;
		//     }
		//   }
		// }

		&_outline {
			border: 1px solid var(--primary);
			color: var(--primary);
			background-color: transparent;
			transition:
				0.2s background-color,
				0.2s color;

			&:hover {
				background-color: var(--primary);
				color: #fff;
			}
			&.hover_off {
				&:hover,
				&:focus {
					background-color: #fff;
					color: var(--primary);
				}
			}
		}

		&_squared {
			border-radius: 4px;
		}

		&_disabled {
			color: #8d9194;
			background-color: #f4f5f6;
			pointer-events: none;
			border: 1px solid transparent;
		}

		&_full-width {
			width: 100%;
		}

		&_sm {
			padding: 7px 16px;
		}
	}
</style>
