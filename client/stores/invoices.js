import expressApiService from '~/core/http/express.api.service';

export const useInvoiceStore = defineStore('invoices', {
    state: () => ({
        _invoices: []
    }),
    getters: {
        invoices: (state) => state._invoices
    },
    actions: {
        async getInvoices(payload) {
            try {
                const response = await expressApiService.get('/invoice/list' + '?page=' + payload.page + '&=pageSize=' + payload.pageSize)
                this._invoices = response.data;
                return true
            } catch (error) {
                return error.response
            }
        }
    }
});
