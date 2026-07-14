export const defaultLang = 'fr';

export const languages = {
	fr: { label: 'FR', icon: '🇫🇷', path: '/' },
	en: { label: 'EN', icon: '🇬🇧', path: '/en' },
} as const;

export const ui = {
	fr: {
		'menu.role': 'Full-Stack Engineer',
		'menu.available': 'Disponible en septembre',
		'menu.location': 'Limoges et distanciel',
		'menu.sections': 'Sections',
		'menu.language': 'Langue',
		'menu.theme': 'Thème',
		'menu.light': 'Clair',
		'menu.dark': 'Sombre',
		'menu.system': 'Système',
		'seo.title': 'Colin Lienard • Full-Stack Engineer',
		'seo.description':
			"Colin Lienard, Full-Stack Engineer React & TypeScript basé à Limoges. +4 ans d'expérience, spécialisé dans l'expérience développeur et les interfaces web complexes.",
		'hero.title': 'Accueil',
		'hero.cta.secondary': 'Copier mon e-mail',
		'hero.cta.copied': 'E-mail copié !',
		'hero.p1.pre': '👋 Hey ! Je suis un ',
		'hero.p1.role': 'ingénieur full-stack',
		'hero.p1.mid1':
			" avec +4 ans d'expérience, spécialisé dans l'expérience développeur et les interfaces web complexes. Basé à ",
		'hero.p1.city': 'Limoges',
		'hero.p1.mid2': ', je travaille en ',
		'hero.p1.remote': 'distanciel',
		'hero.p1.post': '.',
		'hero.p2.pre': "J'aide des ",
		'hero.p2.link': 'startups',
		'hero.p2.mid1': ' à transformer une idée en produit solide et soigné. Je me concentre sur le ',
		'hero.p2.mid2': ' tout en ayant la capacité de contribuer au ',
		'hero.p2.post': '.',
		'hero.p3.pre': 'En parallèle, je crée et maintiens des projets ⭐ ',
		'hero.p3.link': 'open-source',
		'hero.p3.post': ' utilisés par des centaines de développeurs.',
		'experience.title': 'Expérience',
		'experience.mobsuccess.role': 'Full-Stack Engineer chez',
		'experience.mobsuccess.period': '2023 - Présent, Paris (distanciel)',
		'experience.mobsuccess.b1':
			'Développé des applications web utilisées par de grandes entreprises françaises pour piloter leurs campagnes publicitaires.',
		'experience.mobsuccess.b2':
			'Créé un assistant IA permettant aux utilisateurs de poser des questions et de déclencher des actions agentiques.',
		'experience.mobsuccess.b3':
			'Optimisé les performances des applications et des suites de tests.',
		'experience.mobsuccess.b3.tooltip':
			'Temps de chargement des applications réduit de 1,5 s et durée des runs de tests réduite de 20 %.',
		'experience.mobsuccess.b4': 'Mené plusieurs migrations techniques structurantes.',
		'experience.mobsuccess.b4.tooltip':
			'Create React App → Vite, JS → TS, React Router → TanStack Router, adoption du React Compiler.',
		'experience.mobsuccess.b5': 'Assuré les déploiements en production.',
		'experience.connivence.role': 'Développeur Front-End en alternance chez',
		'experience.connivence.period': '2021 - 2022, Limoges',
		'experience.connivence.b1':
			'Conçu une application de gestion des stagiaires (inscriptions et export de documents administratifs) qui a fluidifié la vente de formations.',
		'projects.title': 'Open-source',
		'projects.moreOn': 'Voir tout sur',
		'stack.title': 'Stack technique',
		'contact.title': 'Restons en contact',
		'footer.allRightsReserved': 'Tous droits réservés',
	},
	en: {
		'menu.role': 'Full-Stack Engineer',
		'menu.available': 'Available in September',
		'menu.location': 'France and remote',
		'menu.sections': 'Sections',
		'menu.language': 'Language',
		'menu.theme': 'Theme',
		'menu.light': 'Light',
		'menu.dark': 'Dark',
		'menu.system': 'System',
		'seo.title': 'Colin Lienard • Full-Stack Engineer',
		'seo.description':
			'Colin Lienard, Full-Stack React & TypeScript Engineer based in Limoges, France. +4 years of experience, specialized in developer experience and complex web interfaces.',
		'hero.title': 'Home',
		'hero.cta.secondary': 'Copy my email',
		'hero.cta.copied': 'Email copied!',
		'hero.p1.pre': "👋 Hey! I'm a ",
		'hero.p1.role': 'full-stack engineer',
		'hero.p1.mid1':
			' with 4+ years of experience, specialized in developer experience and complex web interfaces. Based in ',
		'hero.p1.city': 'Limoges, France 🇫🇷',
		'hero.p1.mid2': ', working ',
		'hero.p1.remote': 'remotely',
		'hero.p1.post': '.',
		'hero.p2.pre': 'I help ',
		'hero.p2.link': 'startups',
		'hero.p2.mid1': ' turn an idea into a solid, polished product. I focus on the ',
		'hero.p2.mid2': ' while also contributing to the ',
		'hero.p2.post': '.',
		'hero.p3.pre': 'On the side, I create and maintain ⭐ ',
		'hero.p3.link': 'open-source',
		'hero.p3.post': ' projects used by hundreds of developers.',
		'experience.title': 'Experience',
		'experience.mobsuccess.role': 'Full-Stack Engineer at',
		'experience.mobsuccess.period': '2023 - Present, Paris (remote)',
		'experience.mobsuccess.b1':
			'Built web applications used by major French companies to run their advertising campaigns.',
		'experience.mobsuccess.b2':
			'Created an AI chat companion letting users ask questions and trigger agentic actions.',
		'experience.mobsuccess.b3': 'Optimized application performance and test suites.',
		'experience.mobsuccess.b3.tooltip': 'Cut app load time by 1.5s and test-run duration by 20%',
		'experience.mobsuccess.b4': 'Led several key technical migrations..',
		'experience.mobsuccess.b4.tooltip':
			'Create React App → Vite, JS → TS, React Router → TanStack Router, React Compiler adoption.',
		'experience.mobsuccess.b5': 'Owned production deployments.',
		'experience.connivence.role': 'Frontend Developer (apprenticeship) at',
		'experience.connivence.period': '2021 - 2022, Limoges',
		'experience.connivence.b1':
			'Built an intern-management app (registrations and admin document export) that streamlined training sales.',
		'projects.title': 'Open-Source',
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
