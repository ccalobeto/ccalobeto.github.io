<script lang="ts">
	import Loader from '$lib/components/Loader.svelte'
	import SiteFooter from '$lib/components/SiteFooter.svelte'
	import { prefersReducedData } from '$lib/assets/js/utils'
	import { isLoading, prefersReducedMotion } from '$lib/data/store'
	import { onMount } from 'svelte'
	import { afterNavigate, beforeNavigate, preloadCode } from '$app/navigation'
	import { dev } from '$app/environment'

	interface Props {
		showFooter?: boolean
		children?: import('svelte').Snippet
	}

	let { showFooter = true, children }: Props = $props()

	let root: HTMLElement

	beforeNavigate(({ to }) => {
		if (to?.route?.id) {
			$isLoading = true
			root.classList.remove('smooth-scroll')
		}
	})

	afterNavigate(() => {
		$isLoading = false
		root.classList.add('smooth-scroll')
	})

	onMount(() => {
		root = document.documentElement
		root.classList.add('smooth-scroll')
		if (!prefersReducedData()) {
			const routesToPreload = ['/', '/projects', '/about-me']
			routesToPreload.forEach((route) => preloadCode(route))
		}
	})
</script>

<svelte:head>
	<meta property="og:site_name" content="Carlos León" />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if !dev}
		<script
			defer
			data-domain="ccalobeto.github.io"
			src="https://plausible.io/js/plausible.js"
		></script>
	{/if}
</svelte:head>

<div id="app" class:reduce-motion={$prefersReducedMotion}>
	<Loader loading={$isLoading} />

	{@render children?.()}

	{#if showFooter}
		<SiteFooter />
	{/if}
</div>
