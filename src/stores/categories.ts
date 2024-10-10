import { useApi } from '@/composables/api'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', () => {
	const api = useApi()

	const getCategories = async (): Promise<Response> => {
		return await fetch(`${api.url}/category`, api.options)
	}

	const postCategory = async (name: string): Promise<Response> => {
		return await fetch(`${api.url}/category`, {
			...api.options,
			method: 'POST',
			body: JSON.stringify({ name })
		})
	}

	const deleteCategory = async (id: number): Promise<Response> => {
		return await fetch(`${api.url}/category/${id}`, {
			...api.options,
			method: 'DELETE'
		})
	}

	return { getCategories, postCategory, deleteCategory }
})
