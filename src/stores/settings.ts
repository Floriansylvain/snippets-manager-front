import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
	const getCookie = (name: string): string | null => {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
		return match ? match[2] : null
	}

	const setCookie = (name: string, value: string, days: number = 365) => {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = 'expires=' + date.toUTCString()
		document.cookie = `${name}=${value}; ${expires}; path=/`
	}

	const darkModeCookie = getCookie('darkModeEnabled')
	const darkModeEnabled = ref(
		darkModeCookie !== null
			? darkModeCookie === 'true'
			: window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	if (darkModeCookie === null) setCookie('darkModeEnabled', darkModeEnabled.value.toString())

	function switchDarkMode() {
		darkModeEnabled.value = !darkModeEnabled.value
		setCookie('darkModeEnabled', darkModeEnabled.value.toString())
	}

	return { darkModeEnabled, switchDarkMode }
})
