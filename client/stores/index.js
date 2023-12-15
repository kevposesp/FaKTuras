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
                await this.getInfoMyUser()
                return true
            } catch (error) {
                return error.response
            }
        },
        async getInfoMyUser() {
            try {
                const response = await expressApiService.post('/auth/info', {});
                this._user = response.data.user;
                return true
            } catch (error) {
                return error.response
            }
        },
        logout() {
            delete localStorage.jwt;
            delete localStorage.rjwt;
            this._user = {};
        },
    }
});
