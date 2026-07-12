/* eslint-disable unicorn/prefer-number-coercion */
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

// From import("svelte/transition").slide
export function slideWithOpacity(
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, axis = 'y' } = {},
): TransitionConfig {
	const style = getComputedStyle(node);

	const primary_property = axis === 'y' ? 'height' : 'width';
	const primary_property_value = Number.parseFloat(style.getPropertyValue(primary_property));
	const secondary_properties = axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
	const padding_start_value = Number.parseFloat(
		style.getPropertyValue(`padding-${secondary_properties[0]}`),
	);
	const padding_end_value = Number.parseFloat(
		style.getPropertyValue(`padding-${secondary_properties[1]}`),
	);
	const margin_start_value = Number.parseFloat(
		style.getPropertyValue(`margin-${secondary_properties[0]}`),
	);
	const margin_end_value = Number.parseFloat(
		style.getPropertyValue(`margin-${secondary_properties[1]}`),
	);
	const border_width_start_value = Number.parseFloat(
		style.getPropertyValue(`border-${secondary_properties[0]}-width`),
	);
	const border_width_end_value = Number.parseFloat(
		style.getPropertyValue(`border-${secondary_properties[1]}-width`),
	);
	return {
		delay,
		duration,
		easing,
		css: (t) =>
			'overflow: hidden;' +
			`opacity: ${Math.max(0, (t - 0.25) * 2)};` +
			`${primary_property}: ${t * primary_property_value}px;` +
			`padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
			`padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
			`margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
			`margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
			`border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;` +
			`border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;` +
			`min-${primary_property}: 0`,
	};
}

// From import("svelte/transition").fly
export function flyWithBlur(
	node: Element,
	{ delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {},
): TransitionConfig {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const [x_value, x_unit] = split_css_unit(x);
	const [y_value, y_unit] = split_css_unit(y);
	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u};
			filter: blur(${u * 2}px);`,
	};
}

function split_css_unit(value: number | string) {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split
		? [Number.parseFloat(split[1]), split[2] || 'px']
		: [/** @type {number} */ value, 'px'];
}
