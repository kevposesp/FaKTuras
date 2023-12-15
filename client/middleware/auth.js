// middleware/auth.js

import expressApiService from "~/core/http/express.api.service"

export default defineNuxtRouteMiddleware(async (to) => {
    try {
        const response = await expressApiService.post('/auth/info', {})
        if (response.status !== 200) {
            return '/auth'
        }
    } catch (error) {
        return '/auth'
    }
    
})