// middleware/auth.js

import expressApiService from "~/core/http/express.api.service"

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const response = await expressApiService.post('/auth/info', {})
        if (!response) {
            return navigateTo('/auth')
        }
    } catch (error) {
        if (error.response && error.response.status !== 200) {
            return navigateTo('/auth')
        }
    }
})