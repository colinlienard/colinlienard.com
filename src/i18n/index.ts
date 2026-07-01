export const defaultLang = 'fr';

export const languages = {
	fr: { label: 'FR', icon: '🇫🇷', path: '/' },
	en: { label: 'EN', icon: '🇬🇧', path: '/en/' },
} as const;

export const ui = {
	fr: {
		'seo.description':
			'Colin Lienard, Full-Stack Engineer React & TypeScript basé à Limoges. +4 ans d’expérience, spécialisé dans l’expérience développeur et les applications web modernes.',
		'hero.status': 'Disponible maintenant (remote/Limoges)',
		'hero.title': 'Full-Stack Engineer React & TypeScript',
		'hero.subtitle':
			'+4 ans d’expérience, spécialisé dans l’expérience développeur et les applications web modernes',
		'hero.cta.primary': 'Discutons',
		'hero.cta.secondary': 'Copier mon e-mail',
		'hero.cta.copied': 'E-mail copié !',
		'services.title': "Ce que j'apporte",
		'services.lead':
			"J'aide les startups à transformer une idée en produit web solide rapide, soigné et prêt à passer à l'échelle. Du front-end à la mise en production, je prends en charge la technique pour que vous restiez concentrés sur votre produit et vos utilisateurs.",
		'services.card1.title': 'Développement produit de bout en bout',
		'services.card1.description':
			"Des interfaces React & TypeScript jusqu'aux APIs et au déploiement. Un seul interlocuteur pour tout le cycle, capable de livrer vite sans sacrifier la qualité.",
		'services.card2.title': 'Performance & fiabilité',
		'services.card2.description':
			"Des applications rapides, testées et maintenables. J'optimise le temps de chargement, la couverture de tests et l'expérience de développement de vos équipes.",
		'services.card3.title': 'Souci du détail',
		'services.card3.description':
			"Une attention obsessionnelle à l'UI et aux micro-interactions, le genre de finitions qui inspirent confiance et démarquent un produit.",
		'experience.title': 'Expérience',
		'experience.mobsuccess.role': 'Full-Stack Engineer chez',
		'experience.mobsuccess.period': '2023 - 2026, Paris (remote)',
		'experience.mobsuccess.b1':
			'Développé des applications web utilisées par de grandes entreprises françaises pour piloter leurs campagnes publicitaires, un levier direct dans la signature de nouveaux comptes majeurs.',
		'experience.mobsuccess.b2':
			'Optimisé les performances des applications et des tests unitaires.',
		'experience.mobsuccess.b2.tooltip':
			'Temps de chargement des applications réduit de 2,5 s et durée des runs de tests réduite de 22 %.',
		'experience.mobsuccess.b3': 'Mené plusieurs migrations techniques structurantes.',
		'experience.mobsuccess.b3.tooltip':
			'CRA → Vite, JS → TS, React Router → TanStack Router, adoption du React Compiler.',
		'experience.mobsuccess.b4': 'Assuré les déploiements en production.',
		'experience.connivence.role': 'Développeur Front-End en alternance chez',
		'experience.connivence.period': '2021 - 2022, Limoges',
		'experience.connivence.b1':
			'Conçu une application de gestion des stagiaires (inscriptions et export de documents administratifs) qui a fluidifié la vente de formations.',
		'projects.title': 'Open source',
		'projects.moreOn': 'Voir tout sur',
		'stack.title': 'Tech stack',
		'contact.title': 'Restons en contact',
		'footer.allRightsReserved': 'Tous droits réservés',
	},
	en: {
		'seo.description':
			'Colin Lienard, Full-Stack React & TypeScript Engineer based in Limoges, France. +4 years of experience, specialized in developer experience and modern web applications.',
		'hero.status': 'Available now (remote/Limoges)',
		'hero.title': 'Full-Stack React & TypeScript Engineer',
		'hero.subtitle':
			'+4 years of experience, specialized in developer experience and modern web applications',
		'hero.cta.primary': "Let's talk",
		'hero.cta.secondary': 'Copy my email',
		'hero.cta.copied': 'Email copied!',
		'services.title': 'What I bring',
		'services.lead':
			'I help startups turn an idea into a solid web product fast, polished and ready to scale. From the frontend to production, I own the technical side so you can stay focused on your product and your users.',
		'services.card1.title': 'End-to-end product development',
		'services.card1.description':
			'From React & TypeScript interfaces to APIs and deployment. A single point of contact for the whole cycle, shipping fast without cutting corners.',
		'services.card2.title': 'Performance & reliability',
		'services.card2.description':
			"Fast, tested, maintainable applications. I optimize load time, test coverage and your team's developer experience.",
		'services.card3.title': 'Attention to detail',
		'services.card3.description':
			'An obsessive care for UI and micro-interactions, the kind of polish that builds trust and sets a product apart.',
		'experience.title': 'Experience',
		'experience.mobsuccess.role': 'Full-Stack Engineer at',
		'experience.mobsuccess.period': '2023 - 2026, Paris (remote)',
		'experience.mobsuccess.b1':
			'Built web applications used by major French companies to run their advertising campaigns, a direct driver in landing new key accounts.',
		'experience.mobsuccess.b2': 'Optimized application performance and unit tests.',
		'experience.mobsuccess.b2.tooltip': 'Cut app load time by 2.5s and test-run duration by 22%.',
		'experience.mobsuccess.b3': 'Led several key technical migrations.',
		'experience.mobsuccess.b3.tooltip':
			'CRA → Vite, JS → TS, React Router → TanStack Router, React Compiler adoption.',
		'experience.mobsuccess.b4': 'Owned production deployments.',
		'experience.connivence.role': 'Frontend Developer (apprenticeship) at',
		'experience.connivence.period': '2021 - 2022, Limoges',
		'experience.connivence.b1':
			'Built an intern-management app (registrations and admin document export) that streamlined training sales.',
		'projects.title': 'Open Source',
		'projects.moreOn': 'See it all on',
		'stack.title': 'Tech Stack',
		'contact.title': "Let's connect",
		'footer.allRightsReserved': 'All rights reserved',
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
