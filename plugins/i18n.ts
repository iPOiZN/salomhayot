export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("i18n:localeSwitched", ({ newLocale }) => {
    const locale = useCookieLocale();
    locale.value = newLocale;
  });
});
