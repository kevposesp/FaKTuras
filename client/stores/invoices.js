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
                this._invoice.totalAmount = parseInt(this._invoice.totalAmount) + parseInt(response.data.invoiceLine.price)
                return true
            } catch (error) {
                return error.response
            }
        },
        async updateLineInvoice(payload) {
            try {
                const response = await expressApiService.put('/invoice/' + payload.id_invoice + '/line/update', payload)
                let index = this._invoice.invoices_lines.findIndex((item) => item.id == response.data.data.id);
                if (index !== -1) {
                    this._invoice.totalAmount = parseInt(this._invoice.totalAmount) - parseInt(this._invoice.invoices_lines[index].price)
                    this._invoice.totalAmount = parseInt(this._invoice.totalAmount) + parseInt(response.data.data.price)
                    this._invoice.invoices_lines[index] = response.data.data;
                }
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
        },
        async deleteLineInvoice(payload) {
            try {
                const response = await expressApiService.delete('/invoice/' + payload.id_invoice + '/line/' + payload.id + '/delete')
                let index = this._invoice.invoices_lines.findIndex((item) => item.id == payload.id);
                this._invoice.totalAmount = parseInt(this._invoice.totalAmount) - parseInt(this._invoice.invoices_lines[index].price)
                this._invoice.invoices_lines.splice(index, 1);
                return true
            } catch (error) {
                return error.response
            }
        }
    }
});
