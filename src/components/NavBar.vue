<script setup lang="ts">
import { useCookie } from '@/composables/cookies'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const cookie = useCookie()

const navItems = [
	{
		name: 'Dashboard',
		icon: 'mdi-view-dashboard',
		path: '/'
	},
	{
		name: 'Categories',
		icon: 'mdi-shape-plus',
		path: '/categories'
	}
	// {
	// 	name: 'Snippets',
	// 	icon: 'mdi-code-braces-box',
	// 	path: '/snippets'
	// },
	// {
	// 	name: 'Account',
	// 	icon: 'mdi-account-box',
	// 	path: '/account'
	// }
]

function disconnect(): void {
	authStore.postLogout()
	cookie.setCookie('loggedIn', '', 0)
	router.push('/login')
}
</script>

<template>
	<VNavigationDrawer :width="300" persistent permanent>
		<VListItem title="SnippetsManager" subtitle="by Florian Sylvain" class="py-2" />
		<VDivider />
		<VList class="pa-0">
			<VListItem
				v-for="item of navItems"
				:key="item.name"
				:title="item.name"
				:active="(() => router.currentRoute.value.path === item.path)()"
				:prepend-icon="item.icon"
				:to="item.path"
				class="ma-2"
				color="primary"
				rounded
			/>
		</VList>
		<template v-slot:append>
			<VListItem
				prepend-icon="mdi-logout"
				class="ma-2"
				color="error"
				variant="plain"
				active
				rounded
				@click="disconnect"
			>
				Disconnect
			</VListItem>
		</template>
	</VNavigationDrawer>
</template>
