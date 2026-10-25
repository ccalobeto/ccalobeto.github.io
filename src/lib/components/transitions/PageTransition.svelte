<script lang="ts">
	import { prefersReducedMotion } from '$lib/data/store'
	import { TIMING_DURATION } from '$lib/data/constants'
	import { cubicIn, cubicOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	let yIn: number = $derived($prefersReducedMotion ? 0 : 12)
	let yOut: number = $derived($prefersReducedMotion ? 0 : -12)

	
	

	interface Props {
		refresh?: string | boolean;
		span?: boolean;
		transitionIn?: boolean;
		transitionOut?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		refresh = '',
		span = false,
		transitionIn = true,
		transitionOut = true,
		children
	}: Props = $props();
</script>

<!--
	The outgoing and incoming instances of .transition-wrapper briefly coexist
	while they cross-fade -- without .transition-stage, Svelte stacks them in
	normal flow (old content's height, then new content's height, added
	together) until the outgoing one is removed, which reads as a page jump on
	any route whose height differs much from the one navigated away from.
	Placing both in the same grid cell overlaps them instead.

	in:fly used to carry delay: TIMING_DURATION, waiting for the whole out
	transition to finish before starting the in one. Measured live (DOM
	opacity sampled every 20ms during a real navigation): the outgoing
	wrapper doesn't actually hit 0 until a bit after that delay elapses, so
	there was a ~20-40ms window where both wrappers sat at ~0 opacity --
	a brief flash to blank, which read as a jump. Dropping the delay lets
	them cross-fade over the same window instead.
-->
<div class="transition-stage">
	{#key refresh}
		<div
			class="transition-wrapper"
			class:span
			in:fly|global={{
				y: yIn,
				duration: transitionIn ? TIMING_DURATION : 0,
				easing: cubicOut
			}}
			out:fly|global={{
				y: yOut,
				duration: transitionOut ? TIMING_DURATION : 0,
				easing: cubicIn
			}}
		>
			{@render children?.()}
		</div>
	{/key}
</div>

<style lang="scss">
	.transition-stage {
		display: grid;
	}

	.transition-wrapper {
		grid-column: 1;
		grid-row: 1;

		&.span {
			grid-column: 1 / -1;
			grid-row: 1 / 2;
		}
	}
</style>
