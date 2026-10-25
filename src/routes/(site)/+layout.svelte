<script lang="ts">
	import type { LayoutData } from './$types'
	import '$lib/assets/styles/global.scss'

	import throttle from 'just-throttle'
	import PageShell from '$lib/components/PageShell.svelte'
	import Header from '$lib/components/header/Header.svelte'
	import PageTransition from '$lib/components/transitions/PageTransition.svelte'
	import { isScrollingDown } from '$lib/data/store'

	interface Props {
		data: LayoutData
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()

	let path: string = $state('')
	$effect(() => {
		;({ path } = data)
	})

	let lastScrollPosition: number = 0

	const handleScroll = throttle(() => {
		// Early return if we're above mobile width
		if (window.outerWidth >= 768) {
			if ($isScrollingDown) $isScrollingDown = false
			return
		}

		const currentScrollPosition = window.scrollY
		const delta = lastScrollPosition - currentScrollPosition
		if (delta > 0 && delta < 10) {
			return
		}

		if (lastScrollPosition > currentScrollPosition) {
			$isScrollingDown = false
		} else if (currentScrollPosition > 240) {
			$isScrollingDown = true
		}
		lastScrollPosition = currentScrollPosition
	}, 100)
</script>

<svelte:window onscroll={handleScroll} />

<PageShell>
	<Header />

	<div class="layout">
		<PageTransition refresh={path}>
			{@render children?.()}
		</PageTransition>
	</div>
</PageShell>
