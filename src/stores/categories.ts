import { useApi } from '@/composables/api'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', () => {
	const api = useApi()

	const getCategories = async () => {
		return await fetch(`${api.url}/category`, api.options)
	}

	return { getCategories }
})
