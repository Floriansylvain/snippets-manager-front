<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue'
</script>

<template>
	<VFooter class="d-flex align-center justify-space-between">
		<div>{{ new Date().getFullYear() }} — <strong>SnippetsManager</strong></div>
		<ThemeSwitch />
	</VFooter>
</template>
