<script lang="ts">
	import NavLink from './NavLink.svelte'
	import { menu } from './nav'
	import { navItems } from '$lib/config'
</script>

<ul class:open={$menu}>
	<NavLink to={navItems.home.route} text={navItems.home.title} />
	<NavLink to={navItems.projects.route} text={navItems.projects.title} />
	<NavLink to={navItems.about.route} text={navItems.about.title} />
	<!-- <NavLink to={navItems.contact.route} text={navItems.contact.title} /> -->
	<!-- <NavLink to={navItems.uses.route} text={navItems.uses.title} /> -->
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		width: auto;
		font-size: 0.875rem;
		list-style-type: none;
		padding: 0;

		@media (max-width: vars.$sm) {
			list-style-type: none;
			text-align: left;
			width: 100%;
			display: none;
			margin: 0;

			&.open {
				display: block;
			}
		}
	}
</style>
