import { useApi } from '@/composables/api'
import { useCookie } from '@/composables/cookies'
import { defineStore } from 'pinia'

interface LoginFields {
	email: string
	password: string
}

export const useAuthStore = defineStore('auth', () => {
	const api = useApi()
	const cookie = useCookie()

	const postLogin = async (credentials: LoginFields): Promise<Response> => {
		const loginPromise = await fetch(`${api.url}/session/login`, {
			...api.options,
			method: 'POST',
			body: JSON.stringify(credentials)
		})
		cookie.setCookie('loggedIn', new Date(new Date().getTime() + 7200000).toString())
		return loginPromise
	}

	const postLogout = async (): Promise<Response> => {
		return await fetch(`${api.url}/session/logout`, {
			...api.options,
			method: 'POST'
		})
	}

	return { postLogin, postLogout }
})
