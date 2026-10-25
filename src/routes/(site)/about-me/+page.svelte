<script lang="ts">
	import Main from '$lib/components/Main.svelte'
	import { siteTitles } from '$lib/config'
</script>

<svelte:head>
	<title>{siteTitles.aboutMe}</title>
	<meta
		data-key="description"
		name="description"
		content="Un poco de mi vida personal y profesional."
	/>
</svelte:head>

<Main>
	<div class="compressed-content wider writing">
		<div class="intro-header">
			<img
				class="profile-pic"
				src="/images/bio-photo.jpg"
				alt="Mi foto generada con IA ;)."
			/>
			<div class="intro-header__text">
				<h2>Acerca de Mi</h2>
				<p>
					Soy <strong>Analytics Engineer</strong> en una empresa privada, donde
					diseño y desarrollo plataformas de datos end-to-end en la nube — desde
					la ingesta y transformación hasta modelos de pronóstico de demanda. Mi
					trabajo más reciente: una arquitectura Datalake en AWS que automatiza
					seis datamarts y distribuye cerca de
					<strong>1,800 series pronosticadas</strong> cada mes.
				</p>
			</div>
		</div>

		<p>
			Este sitio es mi espacio personal para explorar la analítica más allá de
			la empresa: desde segmentación geoespacial para negocios hasta análisis
			con impacto social, como sismos y desapariciones en Perú y Ecuador; y que
			podrás ver en <a href="/projects">Proyectos</a>.
		</p>

		<p>
			Soy Ingeniero Electrónico de formación. Antes de dedicarme a los datos
			trabajé en <em>telecomunicaciones</em>, en roles comerciales y de recursos
			humanos — ahí descubrí mi interés por el análisis y la automatización, que
			profundicé después como
			<strong>Data Science Specialist</strong> en una empresa de Biotecnología
			Nutracéutica y actualmente como <strong>Analytics Engineer</strong> en una
			empresa de Manufactura.
		</p>
	</div>
</Main>

<style lang="scss">
	.writing {
		h2 {
			margin-bottom: var(--quarterNote);
		}
	}

	.intro-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--halfNote);
		margin-bottom: var(--halfNote);
		text-align: center;

		@media (min-width: vars.$xxs) {
			flex-direction: row;
			align-items: flex-start;
			text-align: left;
		}

		&__text {
			flex: 1;

			h2 {
				margin-bottom: var(--quarterNote);
			}

			p {
				margin-bottom: 0;
			}
		}
	}

	.profile-pic {
		aspect-ratio: 1 / 1;
		object-fit: cover;
		border-radius: 10rem;
		width: 10rem;
		flex-shrink: 0;

		@media (min-width: vars.$xxs) {
			width: 12rem;
		}

		@media (min-width: vars.$xs) {
			width: 14rem;
		}
	}
</style>
