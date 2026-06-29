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
		'experience.title': 'Expérience',
		'experience.mobsuccess.role': 'Full-Stack Engineer chez',
		'experience.mobsuccess.period': '2023 - 2026, Paris (remote)',
		'experience.mobsuccess.description':
			"Développement d'applications web permettant à de grandes entreprises françaises de gérer leurs campagnes publicitaires numériques, contribuant à l'acquisition de nouveaux clients majeurs. Pilotage de plusieurs migrations techniques structurantes. Responsable de déploiements en production.",
		'experience.connivence.role': 'Développeur Front-End en alternance chez',
		'experience.connivence.period': '2021 - 2022, Limoges',
		'experience.connivence.description':
			"Conception d'une application de gestion des stagiaires permettant l'inscription et l'exportation de documents administratifs, ce qui a permis d'augmenter les ventes de formations.",
	},
	en: {
		'hero.status': 'Available now (remote/Limoges)',
		'hero.title': 'Full-Stack React & TypeScript Engineer',
		'hero.subtitle':
			'+4 years of experience, specialized in developer experience and modern web applications',
		'hero.cta.primary': "Let's talk",
		'hero.cta.secondary': 'Copy my email',
		'hero.cta.copied': 'Email copied!',
		'experience.title': 'Experience',
		'experience.mobsuccess.role': 'Full-Stack Engineer at',
		'experience.mobsuccess.period': '2023 - 2026, Paris (remote)',
		'experience.mobsuccess.description':
			'Development of web applications enabling large French companies to manage their digital advertising campaigns, contributing to the acquisition of major new clients. Led several key technical migrations. Responsible for production deployments.',
		'experience.connivence.role': 'Frontend Developer (apprenticeship) at',
		'experience.connivence.period': '2021 - 2022, Limoges',
		'experience.connivence.description':
			'Design of an intern management application enabling registration and export of administrative documents, which helped increase training sales.',
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
