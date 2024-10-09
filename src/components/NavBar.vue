<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useRouter } from 'vue-router'

const router = useRouter()
const settingsStore = useSettingsStore()

const navItems = [
	{
		name: 'Dashboard',
		active: router.currentRoute.value.path === '/'
	},
	{
		name: 'Categories',
		active: router.currentRoute.value.path === '/categories'
	},
	{
		name: 'snippets',
		active: router.currentRoute.value.path === '/snippets'
	}
]
</script>

<template>
	<VNavigationDrawer :width="300" persistent>
		<VListItem title="SnippetsManager" subtitle="by Florian Sylvain" class="py-2"></VListItem>
		<VDivider></VDivider>
		<VList class="pa-0">
			<VListItem
				v-for="item of navItems"
				:key="item.name"
				:title="item.name"
				:active="item.active"
				class="ma-2"
				color="primary"
				rounded
				link
			></VListItem>
		</VList>
		<template v-slot:append>
			<div class="d-flex align-center ga-2 pa-2">
				<VBtn variant="tonal" class="flex-grow-1" color="error"> Logout </VBtn>
				<VBtn
					variant="plain"
					icon="mdi-theme-light-dark"
					:onclick="settingsStore.switchDarkMode"
				></VBtn>
			</div>
		</template>
	</VNavigationDrawer>
</template>
