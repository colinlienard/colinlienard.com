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

export type MenuItemData = {
	isActive?: boolean;
	isLink?: boolean;
	isCentered?: boolean;
	onselect(): void;
};
