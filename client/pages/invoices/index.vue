<template>
    <div class="invoices">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
            <div class="max-w-sm px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                <a @click="createInvoice()"
                    class="text-white block w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-green-900">Nueva
                    factura</a>
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Numero de factura
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Precio
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="(inv, index) in invoicesData.data" :key="index">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ inv.number_invoice }}
                        </th>
                        <td class="px-6 py-4">
                            {{ inv.formatted_date }}
                        </td>
                        <td class="px-6 py-4">
                            {{ inv.totalAmount }} €
                        </td>
                        <td class="px-6 py-4">
                            <NuxtLink :to="'/invoices/' + inv.id + '/edit'">
                                <button type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path
                                            d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                        <path
                                            d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                    </svg>
                                </button>
                            </NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation">
                <span
                    class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                    <span class="font-semibold text-gray-900 dark:text-white">{{ filters.sizePage }}</span> of <span
                        class="font-semibold text-gray-900 dark:text-white">{{ invoicesData.totalCount }}</span></span>
                <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a @click="filters.currentPage > 1 ? filters.currentPage-- : ''; changePage()"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li v-for="(pag, index) in invoicesData.totalPages" :key="index">
                        <a @click="filters.currentPage = pag; changePage()"
                            :class="pag == filters.currentPage ? 'flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'">{{
                                pag }}</a>
                    </li>
                    <li>
                        <a @click="filters.currentPage === invoicesData.totalPages ? '' : filters.currentPage++; changePage()"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
definePageMeta({ middleware: 'auth' })

const router = useRouter()
const store = useInvoiceStore()
store.getInvoices({ page: 1, pageSize: 10 })
const invoicesData = computed(() => store.invoices)

const filters = reactive({
    currentPage: 1,
    sizePage: 10
})

const formFilters = () => {
    return {
        page: filters.currentPage,
        pageSize: filters.sizePage
    }
}

const changePage = () => {
    store.getInvoices(formFilters())
}

const createInvoice = async () => {
    const res = await store.createInvoice()
    if (res.status == 'OK') {
        router.push('invoices/' + res.id + '/edit')
    }
}

</script>

<style></style>