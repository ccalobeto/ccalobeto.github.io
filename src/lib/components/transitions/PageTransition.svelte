<script lang="ts">
	import { prefersReducedMotion } from '$lib/data/store'
	import { TIMING_DURATION } from '$lib/data/constants'
	import { cubicOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	let yIn: number = $derived($prefersReducedMotion ? 0 : 12)

	interface Props {
		refresh?: string | boolean;
		span?: boolean;
		transitionIn?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		refresh = '',
		span = false,
		transitionIn = true,
		children
	}: Props = $props();
</script>

<!--
	No out:transition on purpose. children is a single live snippet reference
	threaded down from the root layout -- shared by both the outgoing and
	incoming instance of this keyed block, not a frozen snapshot of the old
	page. Measured live (DOM text + height sampled every 5ms during a real
	navigation): by ~12ms after a nav click, the "outgoing" wrapper was
	already rendering the NEW page's text, because SvelteKit swaps `children`
	before Svelte gets to the keyed block's destroy/create step. So the old
	content never actually faded out -- it just vanished, replaced a frame
	later by two overlapping copies of the new page cross-fading into each
	other, which is what read as a page jump. A matching out:transition can't
	fix this without first giving the outgoing instance its own frozen copy
	of the old content; until that's worth the complexity, the honest
	version is: old page disappears instantly (plain SPA swap), new page
	fades in once.
-->
{#key refresh}
	<div
		class="transition-wrapper"
		class:span
		in:fly|global={{
			y: yIn,
			duration: transitionIn ? TIMING_DURATION : 0,
			easing: cubicOut
		}}
	>
		{@render children?.()}
	</div>
{/key}

<style lang="scss">
	.transition-wrapper {
		&.span {
			grid-column: 1 / -1;
			grid-row: 1 / 2;
		}
	}
</style>
