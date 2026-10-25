<script lang="ts">
	import { metaImagesUrl, siteTitles } from '$lib/config'
	import Main from '$lib/components/Main.svelte'
</script>

<svelte:head>
	<title>{siteTitles.home}</title>
	<meta property="og:title" content="Carlos León" />
	<meta
		data-key="description"
		property="og:description"
		name="description"
		content="Analytics Engineer"
	/>
	<meta property="og:image" content={metaImagesUrl.ogImage} />
	<meta name="twitter:image" content={metaImagesUrl.twitterImage} />
</svelte:head>

<Main>
	<div class="intro">
		<div class="intro__headline">
			<h2>
				Hola, mi nombre es <strong>Carlos</strong> y soy Analytics Engineer
			</h2>

			<p class="subhead h3">
				Diseño plataformas de datos en la nube para empresas, y en mi tiempo
				personal exploro cómo la analítica resuelve problemas sociales.
			</p>

			<ul class="capability-tags">
				<li>Data Engineering</li>
				<li>Cloud Architecture</li>
				<li>Analytics</li>
			</ul>
		</div>

		<div class="intro__visual" aria-hidden="true">
			<svg
				class="data-diagram"
				viewBox="0 0 420 280"
				role="presentation"
				preserveAspectRatio="xMidYMid meet"
			>
				<rect class="d-square" x="18" y="190" width="16" height="16" fill="var(--signal)" />
				<rect class="d-square" x="55" y="230" width="10" height="10" fill="var(--route)" />
				<rect class="d-square" x="40" y="140" width="12" height="12" fill="var(--flag)" />
				<rect class="d-square" x="95" y="200" width="20" height="20" fill="var(--yellow)" />
				<rect class="d-square" x="130" y="160" width="9" height="9" fill="var(--orange)" />
				<rect class="d-square" x="160" y="220" width="13" height="13" fill="var(--lightBlue)" />
				<rect class="d-square" x="20" y="90" width="8" height="8" fill="var(--route)" />
				<rect class="d-square" x="185" y="140" width="11" height="11" fill="var(--signal)" />
				<rect class="d-square" x="70" y="70" width="10" height="10" fill="var(--orange)" />
				<rect class="d-square" x="110" y="100" width="7" height="7" fill="var(--flag)" />
				<rect class="d-square" x="200" y="190" width="15" height="15" fill="var(--route)" />
				<rect class="d-square" x="145" y="60" width="9" height="9" fill="var(--yellow)" />

				<path
					class="d-line"
					d="M25,250 C100,235 140,190 170,150 C210,100 260,70 320,55 C350,47 370,43 400,40"
					fill="none"
					stroke="var(--accentColor)"
					stroke-width="3"
					stroke-linecap="round"
				/>
				<circle class="d-point" cx="400" cy="40" r="7" fill="var(--accentColor)" />
			</svg>
		</div>
	</div>
</Main>

<style lang="scss">
	@for $i from 1 through 3 {
		.intro .intro__headline > *:nth-child(#{$i}) {
			animation-delay: 0.2 + ($i * 0.14s);
		}
	}

	.intro {
		width: 100%;
		position: relative;
		margin-top: var(--wholeNote);

		// The three tags fade in together as part of the <ul> (a single direct
		// child of .intro__headline, animated below) -- staggering each <li> on
		// its own timeline used to let one tag finish before its siblings,
		// which could read as misaligned heights for a frame or two.
		.intro__headline > * {
			opacity: 0;
			transform: translateY(16px);
			animation: fade_in_intro 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;

			:global(.reduce-motion) & {
				transform: translateY(0);
			}
		}

		@media (min-width: vars.$xl) {
			display: grid;
			grid-template-columns: 48rem 1fr;
			align-items: center;
			gap: 0 calc(var(--wholeNote) * 2);
		}

		h2,
		.subhead {
			font-size: 2.5rem;
			font-size: clamp(1.8rem, calc(1rem + 3vw), 3.5rem);
			margin-bottom: var(--halfNote);
			font-weight: normal;
			max-width: 17em;

			&::before {
				display: none;
			}
		}

		.subhead {
			font-size: clamp(1.2rem, calc(0.6rem + 2vw), 1.8rem);
			margin-top: 0;
			margin-bottom: var(--halfNote);
			color: var(--darkGray);
			line-height: 1.4;
			max-width: 23em;

			:global(.dark) & {
				color: var(--ink);
			}
		}
	}

	.capability-tags {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5em;
		list-style: none;
		margin: 0;
		padding: 0;

		@media (max-width: vars.$xxs) {
			grid-template-columns: 1fr;
		}

		li {
			font-family: var(--labelFont);
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			text-align: center;
			color: var(--tagColor);
			border: 1px solid var(--tagColor);
			padding: 0.3em 0.7em;
		}
	}

	.intro__visual {
		margin-top: var(--wholeNote);
		max-width: 26rem;

		@media (min-width: vars.$xl) {
			margin-top: 0;
			max-width: none;
		}
	}

	.data-diagram {
		width: 100%;
		height: auto;
		overflow: visible;
	}

	@for $i from 1 through 12 {
		.d-square:nth-child(#{$i}) {
			animation-delay: 1.1s + ($i * 0.07s);
		}
	}

	.d-square {
		opacity: 0;
		transform: translateY(12px);
		transform-box: fill-box;
		transform-origin: center;
		animation: fade_in_intro 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;

		:global(.reduce-motion) & {
			transform: translateY(0);
		}
	}

	.d-line,
	.d-point {
		opacity: 0;
		transform: translateY(12px);
		transform-box: fill-box;
		transform-origin: center;
		animation: fade_in_intro 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
		animation-delay: 2s;

		:global(.reduce-motion) & {
			transform: translateY(0);
		}
	}

	.d-point {
		animation-delay: 2.3s;
	}

	@keyframes fade_in_intro {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(html:not(.light) .intro .subhead) {
		@media (prefers-color-scheme: dark) {
			color: var(--ink) !important;
		}
	}
</style>
