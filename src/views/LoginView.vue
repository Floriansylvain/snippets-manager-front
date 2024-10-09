<script setup lang="ts">
import { ref } from 'vue'

const valid = ref()
const email = ref()
const emailRules = ref()
const password = ref()
const passwordRules = ref()
</script>

<template>
	<section class="d-flex w-100 h-100 justify-center align-center flex-column ga-16 containter">
		<h1 class="text-h4 text-md-h3 text-lg-h2 text-xl-h2">SnippetsManager</h1>
		<VCard max-width="350" class="w-100 pa-2" variant="flat">
			<VCardTitle>Login</VCardTitle>
			<VCardSubtitle>Enter your credentials to log in.</VCardSubtitle>
			<VForm v-model="valid" class="pa-4 d-flex flex-column ga-4">
				<VTextField
					color="primary"
					v-model="email"
					:rules="emailRules"
					label="E-mail"
					hide-details
					required
					type="email"
				/>
				<div class="d-flex flex-column ga-1">
					<VTextField
						color="primary"
						v-model="password"
						:rules="passwordRules"
						label="Password"
						hide-details
						required
						type="password"
						autocomplete
					/>
					<VBtn variant="plain" color="primary-darken-1" size="small" class="pa-0 align-self-start">
						Reset password
					</VBtn>
				</div>
				<section class="d-flex flex-column ga-2">
					<VBtn variant="flat" color="primary">Log in</VBtn>
					<VBtn variant="outlined" color="primary">Create account</VBtn>
				</section>
			</VForm>
		</VCard>
	</section>
</template>
