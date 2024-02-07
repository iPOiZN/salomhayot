<template>
	<div class="relative">
		<yandex-map
			v-model="map"
			:settings="{
				location: {
					center: [64.42, 39.7681],
					zoom: 12,
				},
			}"
			height="400px"
			cursor-grab
		>
			<yandex-map-default-scheme-layer :settings="{ theme: 'light' }" />
			<yandex-map-default-features-layer />
			<yandex-map-listener
				:settings="{ onActionEnd: (event) => $emit('updateMarkerCoordinates', event.location.center) }"
			/>
			<yandex-map-controls :settings="{ position: 'right' }">
				<yandex-map-zoom-control />
				<yandex-map-geolocation-control  />
			</yandex-map-controls>
			<div v-for="(item, index) in shops" :key="index">
				<yandex-map-marker :settings="{ coordinates: item.coordinates }">
					<div
						class="relative box-border w-[50px] translate-x-[-50%] translate-y-[-50%] cursor-pointer shadow-xl rounded-full bg-white p-2"
					>
						<img
							alt=""
							:src="'/favicon/favicon-32x32.png'"
							:style="{
								width: '100%',
							}"
							@click="map?.setLocation({ center: item.coordinates, zoom: 13, duration: 400 })"
						/>
					</div>
				</yandex-map-marker>
			</div>

			<!-- <yandex-map-default-marker
				v-model="marker"
				:settings="{
					draggable,
					mapFollowsOnDrag: true,
					coordinates: [64.42, 39.7681],
					onDragEnd: (event) => {
						markerCoordinates = event;
						$emit('updateMarkerCoordinates', event);
					},
				}"
			/> -->
		</yandex-map>
		<div
			class="absolute left-1/2 top-20 w-max -translate-x-1/2 rounded-xl bg-white/50 px-4 py-2 text-center text-2xl font-bold text-black"
		>
			{{ address }}
		</div>
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[--primary]">
			<Icon name="mdi:map-marker" size="60" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		YandexMap,
		YandexMapControls,
		YandexMapDefaultSchemeLayer,
		YandexMapZoomControl,
		YandexMapMarker,
		YandexMapDefaultFeaturesLayer,
		YandexMapGeolocationControl,
		YandexMapListener,
	} from 'vue-yandex-maps';
	import type { YMap, LngLat, YMapFeatureProps } from '@yandex/ymaps3-types';

	const props = defineProps<{
		address: string;
	}>();

	const map = shallowRef<YMap | null>(null);
	// const marker = shallowRef<YMapDefaultMarker | null>(null);
	// const controlMode = ref<null | 'bound' | 'path'>(null);
	// const draggable = ref(true);

	const markerCoordinates = ref<null | LngLat>(null);

	const shops: { [key: string]: { coordinates: number[] } } = {
		shop1: {
			coordinates: [64.32, 39.7681],
		},
		shop2: {
			coordinates: [64.52, 39.7881],
		},
		shop3: {
			coordinates: [64.62, 39.7281],
		},
	};
</script>
