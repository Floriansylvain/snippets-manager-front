import { createRouter, createWebHashHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCookie } from '@/composables/cookies'

function isLoggedIn(): boolean {
	const cookie = useCookie()
	const loggedIn = cookie.getCookie('loggedIn')
	if (!loggedIn) return false
	if (new Date(loggedIn) < new Date()) return false
	return true
}

function privateRoutesGuard(): void {
	const router = useRouter()
	if (isLoggedIn()) return
	router.push('/login')
}

function loginRouteGuard(): void {
	const router = useRouter()
	if (!isLoggedIn()) return
	router.push('/')
}

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			beforeEnter: privateRoutesGuard
		},
		{
			path: '/categories',
			name: 'categories',
			component: () => import('../views/CategoriesView.vue'),
			beforeEnter: privateRoutesGuard
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
			beforeEnter: loginRouteGuard
		}
	]
})

export default router
