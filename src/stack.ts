import TanStackIcon from 'virtual:icons/custom/tanstack';
import AmplifyIcon from 'virtual:icons/logos/aws-amplify';
import ClaudeIcon from 'virtual:icons/logos/claude-icon';
import CloudflareIcon from 'virtual:icons/logos/cloudflare-icon';
import DockerIcon from 'virtual:icons/logos/docker-icon';
import FigmaIcon from 'virtual:icons/logos/figma';
import GitIcon from 'virtual:icons/logos/git-icon';
import CiCdIcon from 'virtual:icons/logos/github-actions';
import HonoIcon from 'virtual:icons/logos/hono';
import NodeJsIcon from 'virtual:icons/logos/nodejs-icon-alt';
import PandaCssIcon from 'virtual:icons/logos/pandacss-icon';
import PostgresIcon from 'virtual:icons/logos/postgresql';
import ReactIcon from 'virtual:icons/logos/react';
import SvelteIcon from 'virtual:icons/logos/svelte-icon';
import TailwindIcon from 'virtual:icons/logos/tailwindcss-icon';
import TypeScriptIcon from 'virtual:icons/logos/typescript-icon';
import VitestIcon from 'virtual:icons/logos/vitest';

const stack = {
	amplify: { name: 'Amplify', icon: AmplifyIcon },
	cicd: { name: 'CI/CD', icon: CiCdIcon },
	claude: { name: 'Claude', icon: ClaudeIcon },
	cloudflare: { name: 'Cloudflare', icon: CloudflareIcon },
	docker: { name: 'Docker', icon: DockerIcon },
	figma: { name: 'Figma', icon: FigmaIcon },
	git: { name: 'Git', icon: GitIcon },
	hono: { name: 'Hono', icon: HonoIcon },
	node: { name: 'Node.js', icon: NodeJsIcon },
	pandacss: { name: 'Panda CSS', icon: PandaCssIcon },
	postgres: { name: 'Postgres', icon: PostgresIcon },
	react: { name: 'React', icon: ReactIcon },
	svelte: { name: 'Svelte', icon: SvelteIcon },
	tailwind: { name: 'Tailwind CSS', icon: TailwindIcon },
	vitest: { name: 'Vitest', icon: VitestIcon },
	tanstack: { name: 'TanStack', icon: TanStackIcon },
	typescript: { name: 'TypeScript', icon: TypeScriptIcon },
};

export type StackItem = keyof typeof stack;

export function getStackItem(name: StackItem) {
	return stack[name];
}
