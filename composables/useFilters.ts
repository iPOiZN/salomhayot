export const useFilters = () => {
	const formatPrice = (value: string | number) => {
		if (value) {
			let formattedPrice = value;
			if (value.toString().includes('.')) {
				let parts = String(value).split('.');
				let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
				formattedPrice = integerPart + '.' + parts[1];
			} else {
				const val = (Number(value) / 1).toFixed(0).replace(' ', ',');
				formattedPrice = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
			}
			return formattedPrice;
		}
		return 0;
	};
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	function slugify(str: string) {
		str = str.replace(/^\s+|\s+$/g, '');
		str = str.toLowerCase();
		str = str
			.replace(/[^a-z0-9 -]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
		return str;
	}

	function cyrillicToLatin(text: string) {
		const cyrillicToLatinMap = {
			а: 'a',
			б: 'b',
			в: 'v',
			г: 'g',
			д: 'd',
			е: 'e',
			ё: 'yo',
			ж: 'j',
			з: 'z',
			и: 'i',
			й: 'y',
			к: 'k',
			л: 'l',
			м: 'm',
			н: 'n',
			о: 'o',
			п: 'p',
			р: 'r',
			с: 's',
			т: 't',
			у: 'u',
			ф: 'f',
			х: 'x',
			ц: 'ts',
			ч: 'ch',
			ш: 'sh',
			щ: 'sh',
			ъ: '`',
			ы: 'i',
			ь: '',
			э: 'e',
			ю: 'yu',
			я: 'ya',
		};

		return text.replace(/[а-яё]/g, (match) => cyrillicToLatinMap[match] || match);
	}

	return {
		formatPrice,
		slugify,
		cyrillicToLatin,
		capitalizeFirstLetter,
	};
};
