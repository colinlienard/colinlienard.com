export const defaultLang = 'fr';

export const languages = {
	fr: { label: 'FR', path: '/' },
	en: { label: 'EN', path: '/en/' },
} as const;

export const ui = {
	fr: {
		'hero.status': 'Disponible maintenant (remote/Limoges)',
		'hero.title': 'Full-Stack Engineer React & TypeScript',
		'hero.subtitle':
			'+4 ans d’expérience, spécialisé dans l’expérience développeur et les applications web modernes',
		'hero.cta.primary': 'Discutons',
		'hero.cta.secondary': 'Copier mon e-mail',
		'hero.cta.copied': 'E-mail copié !',
	},
	en: {
		'hero.status': 'Available now (remote/Limoges)',
		'hero.title': 'Full-Stack React & TypeScript Engineer',
		'hero.subtitle':
			'+4 years of experience, specialized in developer experience and modern web applications',
		'hero.cta.primary': "Let's talk",
		'hero.cta.secondary': 'Copy my email',
		'hero.cta.copied': 'Email copied!',
	},
} as const;

export type Lang = keyof typeof ui;

export function getLang(locale: string | undefined): Lang {
	if (locale && Object.hasOwn(ui, locale)) return locale as Lang;
	return defaultLang;
}

export function useTranslations(locale: string | undefined) {
	const lang = getLang(locale);
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key];
	};
}
