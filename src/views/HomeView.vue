<script setup lang="ts">
import NumberDisplay from '@/components/NumberDisplay.vue'
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref } from 'vue'

const categoriesStore = useCategoriesStore()

const totalCategories = ref(undefined as number | undefined)

onMounted(async () => {
	const fetchedCategories = await categoriesStore.getCategories()
	const response = await fetchedCategories.json()
	totalCategories.value = response.total
})
</script>

<template>
	<h1 class="text-h3">Dashboard</h1>
	<section class="d-flex align-center">
		<NumberDisplay label="Categories" :data="totalCategories" />
	</section>
</template>
