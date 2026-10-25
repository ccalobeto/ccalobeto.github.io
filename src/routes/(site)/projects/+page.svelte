<script lang="ts">
	import Main from '$lib/components/Main.svelte'
	import { metaImagesUrl, siteTitles } from '$lib/config'
</script>

<svelte:head>
	<title>J{siteTitles.projects}</title>
	<meta
		data-key="description"
		name="description"
		content="Una muestra de mis proyectos."
	/>
	<meta property="og:image" content={metaImagesUrl.ogImage} />
	<meta name="twitter:image" content={metaImagesUrl.twitterImage} />
</svelte:head>

<Main>
	<div class="projects compressed-content double-wide">
		<div class="projects-hero">
			<p class="eyebrow">Proyectos — datos abiertos</p>
			<h2>Mapas, datos y las historias que <em>esconden</em>.</h2>
			<p class="intro">
				Cuatro piezas sobre geografía, riesgo y migración en el Perú y
				Ecuador — de segmentación comercial a sismos y desapariciones,
				contadas con datos abiertos.
			</p>
		</div>

		<div class="project-grid">
			<a class="project-card" href="https://h3-sales-quota.pages.dev/">
				<div class="frame" style="--card-bg: hsl(60, 64%, 80%);">
					<span class="num">01</span>
					<img
						src="/images/post_images/peru-spatial-index.gif"
						alt="Demo de segmentación hexagonal para prospección de clientes"
						loading="lazy"
					/>
					<div class="scrim">
						<h3>
							Indexado Espacial <span class="ext" aria-hidden="true">↗</span>
						</h3>
					</div>
				</div>
				<span class="cat">Herramienta visual</span>
				<p class="desc">
					Segmentación hexagonal para prospección de clientes por <b
						>facturación geográfica</b
					>. Reduce costos operativos al enfocar mejor la atención comercial.
				</p>
			</a>

			<a
				class="project-card"
				href="https://ccalobeto.github.io/latam-cartography/"
			>
				<div class="frame" style="--card-bg: hsl(210, 78%, 80%);">
					<span class="num">02</span>
					<img
						src="/images/post_images/latam-carto-qresize.png"
						alt="Visualización de capas cartográficas del Perú"
						loading="lazy"
					/>
					<div class="scrim">
						<h3>
							Cartografía de Perú <span class="ext" aria-hidden="true">↗</span>
						</h3>
					</div>
				</div>
				<span class="cat">Datos geoespaciales</span>
				<p class="desc">
					Descarga la cartografía del Perú en formatos ligeros como <b
						>topojson</b
					>, lista para tus proyectos de analítica. Incluye capas
					departamentales, provinciales y distritales.
				</p>
			</a>

			<a
				class="project-card"
				rel="external"
				href="https://ccalobeto.github.io/earthquakes/"
			>
				<div class="frame" style="--card-bg: hsl(0, 85%, 80%);">
					<span class="num">03</span>
					<img
						src="/images/post_images/peru-earthquakes-qresize.png"
						alt="Mapa de sismos en el Perú"
						loading="lazy"
					/>
					<div class="scrim">
						<h3>
							Terremotos en el Perú <span class="ext" aria-hidden="true">↗</span
							>
						</h3>
					</div>
				</div>
				<span class="cat">Visualización de datos</span>
				<p class="desc">
					Ubicación, profundidad e intensidad de los sismos ocurridos en el
					Perú. Visualización interactiva para explorar patrones geográficos.
				</p>
			</a>

			<a
				class="project-card"
				rel="external"
				href="https://ccalobeto.github.io/missed-ec/"
			>
				<div class="frame" style="--card-bg: hsl(30, 25%, 50%);">
					<span class="num">04</span>
					<img
						src="/images/post_images/missing-child-qresize.png"
						alt="Análisis de desapariciones en Ecuador"
						loading="lazy"
					/>
					<div class="scrim">
						<h3>
							Desapariciones en Ecuador <span class="ext" aria-hidden="true"
								>↗</span
							>
						</h3>
					</div>
				</div>
				<span class="cat">Análisis de datos</span>
				<p class="desc">
					Análisis de datos sobre las causas detrás de la desaparición de
					personas en Ecuador. Una mirada cuantitativa a un problema social
					urgente.
				</p>
			</a>

			<div class="project-card project-card--more">
				<div class="body">
					<h3>Otros proyectos y&nbsp;apps</h3>
					<p>
						Puedes encontrar más de mi trabajo en <a
							href="https://github.com/ccalobeto">GitHub</a
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</Main>

<style lang="scss">
	.projects {
		padding-block: var(--halfNote) var(--wholeNote);
	}

	.projects-hero {
		margin-bottom: var(--wholeNote);

		> * {
			opacity: 0;
			transform: translateY(12px);
			animation: hero_rise 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;

			:global(.reduce-motion) & {
				opacity: 1;
				transform: translateY(0);
				animation: none;
			}
		}

		.eyebrow {
			animation-delay: 0.05s;
		}

		h2 {
			animation-delay: 0.15s;
		}

		.intro {
			animation-delay: 0.3s;
		}
	}

	@keyframes hero_rise {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.projects-hero .eyebrow {
		font-family: var(--labelFont);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--secondaryInk);
		margin: 0 0 var(--eighthNote);
	}

	.projects-hero h2 {
		font-family: var(--headingFont);
		font-weight: normal;
		font-size: clamp(2rem, 5vw, 3.2rem);
		line-height: 1.08;
		margin: 0;
		max-width: 18ch;

		em {
			font-style: italic;
		}
	}

	.projects-hero .intro {
		margin: var(--eighthNote) 0 0;
		max-width: 42ch;
		font-size: 1.05rem;
		color: var(--secondaryInk);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--dottedHalfNote);
	}

	.project-card {
		display: block;
		color: inherit;
		text-decoration: none;
		transition: transform 0.25s ease;

		&--more {
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px dashed var(--lightGray);
			min-height: 10rem;

			h3 {
				font-size: 1.3rem;
				margin: 0 0 0.3rem;
			}

			p {
				margin: 0;
			}
		}
	}

	.frame {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		border: 1px solid var(--lightGray);
		// --card-bg is each screenshot's extracted accent color (see
		// scripts/dominant-color.mjs) -- it only shows briefly while the
		// lazy-loaded image paints, so it doesn't need text-contrast checks.
		background: var(--card-bg, var(--paper));

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			transition: transform 0.25s ease;
			// The four screenshots range from bright basemaps to dark panels -- a
			// shared, mild filter levels their perceived brightness so the grid
			// doesn't read as a contrast jump from tile to tile.
			filter: saturate(0.85) contrast(0.95) brightness(0.97);
		}
	}

	.num {
		position: absolute;
		top: var(--eighthNote);
		left: var(--eighthNote);
		z-index: 2;
		font-family: var(--labelFont);
		font-size: 0.75rem;
		font-weight: bold;
		background: var(--paper);
		color: var(--ink);
		border: 1px solid var(--lightGray);
		padding: 0.15rem 0.4rem;
	}

	// The scrim sits over a photograph, not the page surface -- a fixed dark
	// gradient + white type keeps the title legible against any of the four
	// images, in either site theme, instead of depending on --ink/--paper.
	.scrim {
		position: absolute;
		inset: auto 0 0 0;
		padding: 2.5rem var(--eighthNote) var(--eighthNote);
		background: linear-gradient(
			to top,
			rgba(8, 14, 26, 0.82),
			rgba(8, 14, 26, 0) 100%
		);

		h3 {
			margin: 0;
			font-size: 1.3rem;
			font-weight: normal;
			color: #fff;
			display: inline-flex;
			align-items: baseline;
			gap: 0.3em;
		}

		.ext {
			font-family: var(--labelFont);
			font-size: 0.6em;
			color: hsla(0, 0%, 100%, 0.7);
			transition: transform 0.2s ease;
		}
	}

	.cat {
		display: block;
		margin-top: var(--eighthNote);
		font-family: var(--labelFont);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--secondaryInk);
	}

	.desc {
		margin: 0.3rem 0 0;
		font-size: 0.95rem;
	}

	// Only animate the hover tilt/scale on devices that can genuinely hover
	// (mouse/trackpad) -- touch devices just get the static card, no stuck state.
	@media (hover: hover) {
		.project-card:hover {
			transform: translateY(-4px);
		}

		.project-card:nth-child(odd):hover .frame img {
			transform: rotate(-2deg) scale(1.08);
		}

		.project-card:nth-child(even):hover .frame img {
			transform: rotate(2deg) scale(1.08);
		}

		.project-card:hover .scrim .ext {
			transform: translate(0.15em, -0.15em);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.project-card,
		.frame img,
		.scrim .ext {
			transition: none;
		}

		@media (hover: hover) {
			.project-card:hover {
				transform: none;
			}

			.project-card:nth-child(odd):hover .frame img,
			.project-card:nth-child(even):hover .frame img {
				transform: none;
			}
		}
	}
</style>
