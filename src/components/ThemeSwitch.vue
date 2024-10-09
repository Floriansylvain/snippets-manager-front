<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>

<template>
	<div class="d-flex align-center ga-2 pa-2">
		<VBtn
			variant="plain"
			icon="mdi-theme-light-dark"
			:onclick="settingsStore.switchDarkMode"
		></VBtn>
	</div>
</template>
