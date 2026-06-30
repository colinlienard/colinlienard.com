type Section = Record<string, number | number[]>;
type Config = Record<string, Section>;

const INT_FIELDS = new Set(['bokeh.samples']);

function hexToArr(h: string): number[] {
	const n = Number.parseInt(h.replace('#', ''), 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => Math.round((c / 255) * 1e4) / 1e4);
}

function arrToHex(a: number[]) {
	return (
		'#' +
		a
			.map((c) =>
				Math.round(c * 255)
					.toString(16)
					.padStart(2, '0'),
			)
			.join('')
	);
}

function niceCeil(x: number) {
	const p = Math.pow(10, Math.floor(Math.log10(x)));
	const m = x / p;
	return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
}

function bounds(v: number, isInt: boolean) {
	if (isInt) return { min: 1, max: Math.max(8, v * 3), step: 1 };
	const span = niceCeil(Math.max(Math.abs(v) * 3, 1e-3));
	const min = v < 0 ? -span : 0;
	return { min, max: span, step: (span - min) / 1000 };
}

function css(el: HTMLElement, s: Partial<CSSStyleDeclaration>) {
	return Object.assign(el.style, s);
}

export function createDevPanel(config: Config, onChange: () => void) {
	const DEFAULTS = structuredClone(config);
	const cfg = config;

	const panel = document.createElement('div');
	css(panel, {
		position: 'fixed',
		top: '96px',
		right: '12px',
		width: '248px',
		maxHeight: '80vh',
		overflowY: 'auto',
		zIndex: '2147483647',
		background: 'rgba(18,18,18,0.92)',
		color: '#e6e6e6',
		font: '11px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace',
		padding: '10px',
		borderRadius: '8px',
		boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
		backdropFilter: 'blur(8px)',
		userSelect: 'none',
	});

	const header = document.createElement('div');
	css(header, { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' });
	const title = document.createElement('strong');
	title.textContent = 'sunlit config';
	css(title, { flex: '1', fontWeight: '600', letterSpacing: '0.04em' });

	const body = document.createElement('div');

	const mkBtn = (label: string) => {
		const b = document.createElement('button');
		b.textContent = label;
		css(b, {
			cursor: 'pointer',
			background: 'rgba(255,255,255,0.1)',
			color: '#e6e6e6',
			border: '1px solid rgba(255,255,255,0.15)',
			borderRadius: '5px',
			padding: '2px 7px',
			font: 'inherit',
		});
		return b;
	};

	const collapse = mkBtn('–');
	collapse.title = 'collapse';
	const copy = mkBtn('copy');
	copy.title = 'copy CONFIG to clipboard';
	const reset = mkBtn('reset');
	reset.title = 'revert to source defaults';

	header.append(title, copy, reset, collapse);
	panel.append(header, body);
	document.body.append(panel);

	// --- control rows -------------------------------------------------------
	const rebuilders: Array<() => void> = []; // sync inputs ← CONFIG (for reset)

	const numberRow = (label: string, path: string, get: () => number, set: (v: number) => void) => {
		const isInt = INT_FIELDS.has(path);
		const row = document.createElement('label');
		css(row, {
			display: 'grid',
			gridTemplateColumns: '1fr 52px',
			gap: '4px 6px',
			margin: '4px 0',
			alignItems: 'center',
		});

		const name = document.createElement('span');
		name.textContent = label;
		css(name, { opacity: '0.8' });

		const num = document.createElement('input');
		num.type = 'number';
		css(num, {
			width: '100%',
			background: 'rgba(255,255,255,0.08)',
			color: '#e6e6e6',
			border: '1px solid rgba(255,255,255,0.12)',
			borderRadius: '4px',
			padding: '1px 4px',
			font: 'inherit',
		});

		const slider = document.createElement('input');
		slider.type = 'range';
		css(slider, { gridColumn: '1 / -1', width: '100%', margin: '0', accentColor: '#cba76a' });

		const syncBounds = () => {
			const v = get();
			const { min, max, step } = bounds(v, isInt);
			slider.min = String(min);
			slider.max = String(Math.max(max, v));
			slider.step = String(isInt ? 1 : step);
			num.step = String(isInt ? 1 : step);
		};
		const sync = () => {
			const v = get();
			num.value = String(isInt ? Math.round(v) : +v.toFixed(4));
			slider.value = String(v);
		};
		const commit = (raw: number) => {
			const v = isInt ? Math.round(raw) : raw;
			set(v);
			// let the slider grow if a typed value exceeds its range
			if (v > +slider.max) slider.max = String(v);
			sync();
			onChange();
		};

		slider.addEventListener('input', () => commit(+slider.value));
		num.addEventListener('input', () => commit(+num.value));

		syncBounds();
		sync();
		rebuilders.push(() => {
			syncBounds();
			sync();
		});

		row.append(name, num, slider);
		return row;
	};

	const colorRow = (label: string, get: () => number[], set: (v: number[]) => void) => {
		const row = document.createElement('label');
		css(row, {
			display: 'grid',
			gridTemplateColumns: '1fr auto',
			gap: '6px',
			margin: '4px 0',
			alignItems: 'center',
		});
		const name = document.createElement('span');
		name.textContent = label;
		css(name, { opacity: '0.8' });
		const input = document.createElement('input');
		input.type = 'color';
		css(input, {
			width: '36px',
			height: '20px',
			padding: '0',
			border: 'none',
			background: 'none',
			cursor: 'pointer',
		});
		const sync = () => (input.value = arrToHex(get()));
		input.addEventListener('input', () => {
			set(hexToArr(input.value));
			onChange();
		});
		sync();
		rebuilders.push(sync);
		row.append(name, input);
		return row;
	};

	for (const [section, sectionObj] of Object.entries(cfg)) {
		const group = document.createElement('div');
		css(group, {
			borderTop: '1px solid rgba(255,255,255,0.1)',
			paddingTop: '4px',
			marginTop: '6px',
		});
		const heading = document.createElement('div');
		heading.textContent = section;
		css(heading, { fontWeight: '600', color: '#cba76a', marginBottom: '2px' });
		group.append(heading);

		for (const [key, val] of Object.entries(sectionObj)) {
			const path = `${section}.${key}`;

			if (section === 'colors') {
				group.append(
					colorRow(
						key,
						() => cfg[section][key] as number[],
						(v) => (cfg[section][key] = v),
					),
				);
			} else if (Array.isArray(val)) {
				for (const [i] of val.entries()) {
					group.append(
						numberRow(
							`${key}[${i}]`,
							`${path}[${i}]`,
							() => (cfg[section][key] as number[])[i],
							(v) => ((cfg[section][key] as number[])[i] = v),
						),
					);
				}
			} else {
				group.append(
					numberRow(
						key,
						path,
						() => cfg[section][key] as number,
						(v) => (cfg[section][key] = v),
					),
				);
			}
		}
		body.append(group);
	}

	// --- header actions -----------------------------------------------------
	let isOpen = false;
	body.style.display = 'none';
	collapse.textContent = '+';
	collapse.addEventListener('click', () => {
		isOpen = !isOpen;
		body.style.display = isOpen ? '' : 'none';
		collapse.textContent = isOpen ? '–' : '+';
	});

	reset.addEventListener('click', () => {
		const d = structuredClone(DEFAULTS);
		for (const [s, sec] of Object.entries(d))
			for (const [k, value] of Object.entries(sec)) cfg[s][k] = value;
		for (const fn of rebuilders) fn();
		onChange();
	});

	copy.addEventListener('click', async () => {
		const lines: string[] = ['const CONFIG = {'];
		for (const [s, sec] of Object.entries(cfg)) {
			lines.push(`\t${s}: {`);
			for (const [k, v] of Object.entries(sec)) {
				const out =
					s === 'colors'
						? `hex('${arrToHex(v as number[])}')`
						: Array.isArray(v)
							? `[${v.map((n) => +n.toFixed(4)).join(', ')}]`
							: String(+(v as number).toFixed(4));
				lines.push(`\t\t${k}: ${out},`);
			}
			lines.push('\t},');
		}
		lines.push('};');
		const text = lines.join('\n');
		try {
			await navigator.clipboard.writeText(text);
			copy.textContent = 'copied!';
			setTimeout(() => (copy.textContent = 'copy'), 1000);
		} catch {
			console.warn('[sunlit] clipboard blocked, here is the config:\n' + text);
			copy.textContent = 'logged';
			setTimeout(() => (copy.textContent = 'copy'), 1000);
		}
	});
}
