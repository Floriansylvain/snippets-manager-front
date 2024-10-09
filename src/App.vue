<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useSettingsStore } from './stores/settings'
import FooterBar from './components/FooterBar.vue'
import { defineAsyncComponent } from 'vue'

const settingsStore = useSettingsStore()
const router = useRouter()

const excludedNavBarRoutes = ['/login', '/register']

const NavBarLoaded = defineAsyncComponent(() => import('./components/NavBar.vue'))
</script>

<template>
	<VThemeProvider :theme="settingsStore.darkModeEnabled ? 'dark' : 'light'" with-background>
		<VApp>
			<VLayout>
				<NavBarLoaded v-if="!excludedNavBarRoutes.includes(router.currentRoute.value.path)" />
				<VMain>
					<section class="pa-4 d-flex flex-column ga-4 w-100 h-100">
						<RouterView />
					</section>
				</VMain>
				<FooterBar app />
			</VLayout>
		</VApp>
	</VThemeProvider>
</template>

<style scoped></style>
