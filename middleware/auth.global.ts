export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path !== from.path && process.client) {
		window.scrollTo(0, 0);
		document.querySelector('.layout__wrapper')?.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
});
