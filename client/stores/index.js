import expressApiService from '~/core/http/express.api.service';

export const useUserStore = defineStore('users', {
    state: () => ({
        _user: {}
    }),
    getters: {
        user: (state) => state._user
    },
    actions: {
        async login(payload) {
            try {
                const response = await expressApiService.post('/auth/signin', payload)
                localStorage.setItem('jwt', response.data.accessToken)
                localStorage.setItem('rjwt', response.data.refreshToken)
            } catch (error) {
                console.error(error);
            }
        },
        async getUser() {
            try {
                const response = await expressApiService.post('/auth/info', {});
                this._user = response.data.user;
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        }
    }
});
