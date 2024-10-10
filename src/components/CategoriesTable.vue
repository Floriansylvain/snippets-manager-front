<script setup lang="ts">
import type { Category } from '@/composables/category'

const props = defineProps<{
	fetchedCategories: Category | undefined
}>()
</script>

<template>
	<VDataTable
		:headers="[
			{ title: 'Name', key: 'name', sortable: true },
			{ title: 'Actions', key: 'actions', align: 'end', sortable: false }
		]"
		:items="props.fetchedCategories?.categories"
	>
		<template
			v-slot:[`item.actions`]="{
				// item
			}"
		>
			<VBtn icon="mdi-pencil" variant="flat" size="small"></VBtn>
			<VBtn icon="mdi-delete" variant="flat" size="small"></VBtn>
		</template>
	</VDataTable>
</template>
