import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCookie } from '@/composables/cookies'

export const useSettingsStore = defineStore('settings', () => {
	const cookie = useCookie()

	const darkModeCookie = cookie.getCookie('darkModeEnabled')
	const darkModeEnabled = ref(
		darkModeCookie !== null
			? darkModeCookie === 'true'
			: window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	if (darkModeCookie === null) cookie.setCookie('darkModeEnabled', darkModeEnabled.value.toString())

	function switchDarkMode() {
		darkModeEnabled.value = !darkModeEnabled.value
		cookie.setCookie('darkModeEnabled', darkModeEnabled.value.toString())
	}

	return { darkModeEnabled, switchDarkMode }
})
