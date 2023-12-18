import expressApiService from '~/core/http/express.api.service';

export const useInvoiceStore = defineStore('invoices', {
    state: () => ({
        _invoices: [],
        _invoice: {}
    }),
    getters: {
        invoices: (state) => state._invoices,
        invoice: (state) => state._invoice
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
        },
        async createInvoice() {
            try {
                const response = await expressApiService.post('/invoice/create')
                return {
                    status: "OK",
                    id: response.data.data.id
                }
            } catch (error) {
                return error.response
            }
        },
        async getInvoice(payload) {
            try {
                const response = await expressApiService.get('/invoice/' + payload)
                this._invoice = response.data.invoice;
                return true
            } catch (error) {
                return error.response                
            }
        },
        async createLineInvoice(payload) {
            try {
                const response = await expressApiService.post('/invoice/' + payload.id_invoice + '/line/create', payload)
                this._invoice.invoices_lines.push(response.data.invoiceLine)
                return true
            } catch (error) {
                return error.response
            }
        },
        async updateInvoice(payload) {
            try {
                const response = await expressApiService.put('/invoice/' + payload.id_invoice + '/update', payload)
                this._invoice.number_invoice = response.data.data.number_invoice
                this._invoice.formatted_date = response.data.data.formatted_date
                return true
            } catch (error) {
                return error.response                
            }
        }
    }
});
