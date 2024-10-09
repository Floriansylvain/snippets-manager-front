<script setup lang="ts">
interface Category {
	categories: {
		id: number
		name: string
		user_id: number
	}[]
	pagination: {
		skip: number
		take: number
	}
	links: {
		next: string
		prev: string
	}
	total: number
}
</script>

<template>
	<VDataTable
		:headers="[
			{ title: 'Name', key: 'name', sortable: true },
			{ title: 'Actions', key: 'actions', align: 'end', sortable: false }
		]"
		:items="[
			{ name: 'pouet' },
			{ name: 'pouet' },
			{ name: 'pouet' },
			{ name: 'pouet' },
			{ name: 'pouet' },
			{ name: 'pouet' },
			{ name: 'pouet' }
		]"
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
