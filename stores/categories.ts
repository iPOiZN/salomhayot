import { defineStore } from 'pinia';
type TMainCategory = {
	id: number;
	name: string;
};
type TChildCategory = {
	id: number;
	parent_id: number;
	path: string;
	name: string;
};
export const useCategoriesStore = defineStore('categories', {
	state: () => ({
		main_categories: [] as TMainCategory[],
		child_categories: [] as TChildCategory[],
		child2_categories: [] as TChildCategory[],
	}),
	getters: {
	},
	actions: {
		setMainCategories(data: TMainCategory[]) {
			this.main_categories = data
		},
		setChildCategories(data: TChildCategory[]) {
			this.child_categories = data
		},
		setChild2Categories(data: TChildCategory[]) {
			this.child2_categories = data
		},
	},
});
