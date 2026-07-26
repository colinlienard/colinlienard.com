const API = 'https://github-contributions-api.jogruber.de/v4';

export type ContributionDay = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = {
	total: number;
	start: string;
	levels: string;
	counts: number[];
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

	const days = data.contributions;

	return {
		total: data.total.lastYear ?? 0,
		start: days[0]?.date ?? '',
		levels: days.map((day) => day.level).join(''),
		counts: days.map((day) => day.count),
	};
}

export function toWeeks({ start, levels, counts }: Contributions) {
	const startDate = new Date(`${start}T00:00:00Z`);
	const weeks: (ContributionDay | undefined)[][] = [];
	let week: (ContributionDay | undefined)[] = Array.from({ length: startDate.getUTCDay() });

	for (const [index, count] of counts.entries()) {
		const date = new Date(startDate);
		date.setUTCDate(date.getUTCDate() + index);
		week.push({
			date: date.toISOString().slice(0, 10),
			count,
			level: Number(levels[index] ?? 0) as ContributionDay['level'],
		});
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
