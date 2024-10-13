<script setup lang="ts">
import CategoriesTable from '@/components/CategoriesTable.vue'
import CategoryCreate from '@/components/CategoryCreate.vue'
import type { Category } from '@/composables/category'
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref, type Ref } from 'vue'

const categoriesStore = useCategoriesStore()
const fetchedCategories: Ref<Category | undefined> = ref()
const loading: Ref<boolean> = ref(true)

async function fetchCategories() {
	const categoriesPromise = await categoriesStore.getCategories()
	fetchedCategories.value = await categoriesPromise.json()
	loading.value = false
}

onMounted(async () => {
	await fetchCategories()
})
</script>

<template>
	<header class="d-flex align-center justify-space-between">
		<h1 class="text-h3">Categories</h1>
		<CategoryCreate @categoryCreated="fetchCategories" />
	</header>
	<CategoriesTable
		@categoriesUpdated="fetchCategories"
		:fetchedCategories="fetchedCategories"
		:loading="loading"
		:itemsTotal="fetchedCategories?.total ?? 0"
	/>
</template>
