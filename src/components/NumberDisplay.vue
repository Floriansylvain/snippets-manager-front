<script setup lang="ts">
const props = defineProps<{
	label: string
	data: number | undefined
}>()
</script>

<template>
	<VSkeletonLoader v-if="!props.data" width="100" height="100" type="heading" />

	<VCard v-else class="d-flex align-center justify-center flex-column pa-4" variant="flat">
		<p class="text-h4">{{ props.data }}</p>
		<h2 class="text-subtitle-1">{{ props.label }}</h2>
	</VCard>
</template>
