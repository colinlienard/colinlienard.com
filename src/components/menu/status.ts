const GITHUB_USER = 'colinlienard';
const CACHE_KEY = 'gh-contributions';
const CACHE_TTL = 60 * 60 * 1000;

export function getParisTime(lang?: string) {
	const isEnglish = lang === 'en';
	return new Intl.DateTimeFormat(isEnglish ? 'en-US' : 'fr-FR', {
		timeZone: 'Europe/Paris',
		hour: isEnglish ? 'numeric' : '2-digit',
		minute: '2-digit',
	}).format(new Date());
}

function getCachedContributions(): number | null {
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const { data, at } = JSON.parse(raw);
		if (Date.now() - at > CACHE_TTL) return null;
		return data;
	} catch {
		return null;
	}
}

export async function getWeekContributions(): Promise<number | null> {
	const cached = getCachedContributions();
	if (cached !== null) return cached;
	try {
		const res = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
		);
		if (!res.ok) return null;
		const { contributions } = (await res.json()) as {
			contributions: Array<{ date: string; count: number }>;
		};
		const week = contributions.slice(-7).reduce((sum, day) => sum + day.count, 0);
		localStorage.setItem(CACHE_KEY, JSON.stringify({ data: week, at: Date.now() }));
		return week;
	} catch {
		return null;
	}
}
