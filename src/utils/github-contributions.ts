const API = 'https://github-contributions-api.jogruber.de/v4';

export type ContributionDay = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
	total: number;
	days: ContributionDay[];
};

const cache = new Map<string, Promise<Contributions>>();

export function getGithubContributions(username: string) {
	let contributions = cache.get(username);
	if (!contributions) {
		contributions = fetchContributions(username);
		cache.set(username, contributions);
	}
	return contributions;
}

async function fetchContributions(username: string) {
	const response = await fetch(`${API}/${username}?y=last`);
	if (!response.ok) throw new Error(`responded with ${response.status}`);

	const data = (await response.json()) as {
		total: Record<string, number>;
		contributions: ContributionDay[];
	};

	return { total: data.total.lastYear ?? 0, days: data.contributions };
}

export function toWeeks(days: ContributionDay[]) {
	const weeks: (ContributionDay | undefined)[][] = [];
	let week: (ContributionDay | undefined)[] = Array.from({
		length: new Date(days[0].date).getUTCDay(),
	});

	for (const day of days) {
		week.push(day);
		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	}
	if (week.length > 0) {
		weeks.push([...week, ...Array.from<undefined>({ length: 7 - week.length })]);
	}

	return weeks;
}
