<script setup lang="ts">
const email = ref("")
const password = ref("")
const isLoading = ref(false)
const errorMessage = ref("")

const config = useRuntimeConfig()

async function onSubmit() {
    if (!email.value || !password.value) {
        errorMessage.value = "Please fill in all fields"
        return
    }

    isLoading.value = true
    errorMessage.value = ""

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
        errorMessage.value = "Invalid email or password. Please try again."
    } finally {
        isLoading.value = false
    }
}

definePageMeta({
  layout: 'default'
})
</script>

<template>

    <div class="o-container">
            <AppHeader />
        <div class="o-section o-section--center">
            <div class="o-section__content">
                <h1>Sign In to Foodieland</h1>
                <p>Access your recipes and personalized recommendations</p>
            </div>

            <div class="m-loginForm">
                <div v-if="errorMessage" class="m-loginForm__error">
                    {{ errorMessage }}
                </div>
        
                <form class="m-loginForm__form" @submit.prevent="onSubmit">
                    <div class="m-loginForm__group">
                        <label for="email" class="m-loginForm__label">Email Address</label>
                        <input 
                            id="email"
                            v-model="email" 
                            type="email"
                            class="m-loginForm__input"
                            placeholder="Enter your email"
                            required
                        >
                    </div>

                    <div class="m-loginForm__group">
                        <label for="password" class="m-loginForm__label">Password</label>
                        <input 
                            id="password"
                            v-model="password" 
                            type="password"
                            class="m-loginForm__input"
                            placeholder="Enter your password"
                            required
                        >
                    </div>

                    <button 
                        type="submit" 
                        class="m-loginForm__submit"
                        :disabled="isLoading"
                    >
                        {{ isLoading ? 'Signing in...' : 'Sign In' }}
                    </button>
                </form>

                <div class="m-loginForm__footer">
                    <p>Don't have an account? <NuxtLink to="/signup" class="m-loginForm__link">Sign up</NuxtLink></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.m-loginForm {
    max-width: 480px;
    margin: 40px auto;
    padding: 40px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &__error {
        background-color: #fee2e2;
        color: #991b1b;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 24px;
        font-size: 14px;
        border-left: 4px solid #dc2626;
    }

    &__form {
        margin-bottom: 24px;
    }

    &__group {
        margin-bottom: 24px;
    }

    &__label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
    }

    &__input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        font-size: 16px;
        font-family: inherit;
        transition: all 0.3s ease;
        background-color: #f9fafb;

        &:focus {
            outline: none;
            border-color: #3b82f6;
            background-color: white;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        &::placeholder {
            color: #9ca3af;
        }
    }

    &__submit {
        width: 100%;
        padding: 12px 24px;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;

        &:hover:not(:disabled) {
            background-color: #333;
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

    &__footer {
        text-align: center;
        font-size: 14px;
        color: #6b7280;
    }

    &__link {
        color: #3b82f6;
        font-weight: 600;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: #2563eb;
            text-decoration: underline;
        }
    }
}
</style>
