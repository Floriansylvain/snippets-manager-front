<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSettingsStore } from './stores/settings'

const settingsStore = useSettingsStore()
</script>

<template>
	<VThemeProvider :theme="settingsStore.darkModeEnabled ? 'dark' : 'light'" with-background>
		<VApp>
			<RouterView />
		</VApp>
	</VThemeProvider>
</template>

<style scoped></style>
