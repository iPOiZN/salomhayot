import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		favorites: [] as number[],
	}),
	getters: {
		isFavorite: (state) => (id: number) => {
			const favIds = state.favorites.map(el=>el.id)
			return favIds.includes(id);
		},
	},
	actions: {
		addToFavorites(id: number) {
			if (!this.favorites.includes(id)) {
				this.favorites.push(id);
				localStorage.setItem('favorites', JSON.stringify(this.favorites));
			}
		},
		rmFromFavorites(id: number) {
			const favIds = this.favorites.map(el=>el.id)

			if (favIds.includes(id)) {
				let p_deleting = this.favorites.find(el => el.id === id);
				this.favorites.splice(this.favorites.indexOf(p_deleting), 1);
				localStorage.setItem('favorites', JSON.stringify(this.favorites));
			}
		},
		loadFavorites() {
			const favorites = localStorage.getItem('favorites');
			this.favorites = favorites ? JSON.parse(favorites) : [];
		},
	},
});


