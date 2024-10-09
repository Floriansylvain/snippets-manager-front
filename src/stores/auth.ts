import { useApi } from '@/composables/api'
import { defineStore } from 'pinia'

interface LoginFields {
	email: string
	password: string
}

export const useAuthStore = defineStore('auth', async () => {
	const api = useApi()

	const postLogin = async (credentials: LoginFields) => {
		const loginPromise = await fetch(`${api.url}/session/login`, {
			method: 'POST',
			body: JSON.stringify(credentials)
		})
		return await loginPromise.json()
	}

	return { postLogin }
})
