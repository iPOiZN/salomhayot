import { defineStore } from 'pinia';
interface CartItem {
	id: number;
	quantity: number;
	main_photo?: {
		url: string;
	};
	name_uz: string;
	price: number;
	parent0_name_uz?: string;
}

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartItems: [] as { id: number; quantity: number }[],
	}),
	getters: {
		getQuantity: (state) => (id: number) => {
			const item = state.cartItems.find((item) => item.id === id);
			return item ? item.quantity : 0;
		},
		totalItems: (state) => {
			return state.cartItems.reduce((total, item) => total + item.quantity, 0);
		},
	},
	actions: {
		addToCart(id: number, quantity: number = 1, product: object) {
			const item = this.cartItems.find((item) => item.id === id);
			if (item) {
				item.quantity += quantity;
			} else {
				this.cartItems.push({ id, quantity, ...product });
			}
			localStorage.setItem('cart', JSON.stringify(this.cartItems));
		},
		removeFromCart(id: number, quantity: number = 1) {
			const item = this.cartItems.find((item) => item.id === id);
			if (item) {
				if (item.quantity <= quantity) {
					this.cartItems.splice(this.cartItems.indexOf(item), 1);
				} else {
					item.quantity -= quantity;
				}
				localStorage.setItem('cart', JSON.stringify(this.cartItems));
			}
		},
		loadCart() {
			const cart = localStorage.getItem('cart');
			this.cartItems = cart ? JSON.parse(cart) : [];
		},
		clearCart() {
			this.cartItems = [];
			localStorage.removeItem('cart');
		},
		isProductInCart(id: number) {
			return this.cartItems.some((item) => item.id === id);
		},
		updateQuantity(id: number, quantity: any) {
			const item = this.cartItems.find((item) => item.id === id);
			if (item) {
				item.quantity = quantity;
				localStorage.setItem('cart', JSON.stringify(this.cartItems));
			}
		},
	},
});
