<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useSettingsStore } from './stores/settings'
import FooterBar from './components/FooterBar.vue'
import NavBar from './components/NavBar.vue'
import { onMounted, ref } from 'vue'

const settingsStore = useSettingsStore()
const router = useRouter()

const excludedNavBarRoutes = ['/login', '/register']

const isRouterReady = ref(false)

onMounted(() => {
	router.isReady().then(() => (isRouterReady.value = true))
})
</script>

<template>
	<VThemeProvider :theme="settingsStore.darkModeEnabled ? 'dark' : 'light'" with-background>
		<VApp>
			<VLayout>
				<NavBar
					v-if="isRouterReady && !excludedNavBarRoutes.includes(router?.currentRoute.value.path)"
				/>
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
