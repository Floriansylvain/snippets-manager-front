<script setup lang="ts">
import CategoriesTable from '@/components/CategoriesTable.vue'
</script>

<template>
	<header class="d-flex align-center justify-space-between">
		<h1 class="text-h3">Categories</h1>
		<VBtn prepend-icon="mdi-plus" variant="flat" color="primary">Create category</VBtn>
	</header>
	<CategoriesTable />
</template>
