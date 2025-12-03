<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';

const email = ref("")
const password = ref("")

const config = useRuntimeConfig()

async function onSubmit() {
    try {
        console.log('=> Api call to login')
        const response = await $fetch<{ data: { token: string } }>(`${config.public.apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                email: email.value,
                password: password.value
            }
        });

        const token = response.data.token 
        const tokenCookie = useCookie('recipe_token')
        tokenCookie.value = token
        
        console.log('Login response:', response)
        
        // Redirect to dashboard after successful login
        await navigateTo('/dashboard')
    } catch (err) {
        console.error('Login failed:', err)
    }
}




</script>

<template>
    <div>
        <AppHeader/>
        <main>
            <h1>Login Page</h1>
        
            <form action="" @submit.prevent="onSubmit">
                <input v-model="email" type="text">
                <input v-model="password" type="password">
                <button type="submit">Login</button>
            </form>
        </main>
    </div>
</template>