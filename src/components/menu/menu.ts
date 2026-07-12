export type MenuTranslations = {
	role: string;
	available: string;
	location: string;
	sections: string;
	language: string;
	theme: string;
	hero: string;
	experience: string;
	projects: string;
	stack: string;
	light: string;
	dark: string;
	system: string;
};

export function getParisTime(lang?: string) {
	const isEnglish = lang === 'en';
	return new Intl.DateTimeFormat(isEnglish ? 'en-US' : 'fr-FR', {
		timeZone: 'Europe/Paris',
		hour: isEnglish ? 'numeric' : '2-digit',
		minute: '2-digit',
	}).format(new Date());
}
