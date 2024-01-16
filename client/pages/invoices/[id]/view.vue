<template>
    <div class="view">
        <div class="bg-white rounded-lg shadow-lg px-8 max-w-xl mx-auto" :class="p ? 'py-5' : ''" ref="pdfSection">
            <div class="flex items-center justify-between mb-4">
                <div class="text-gray-700">
                    <div class="text-sm">Fecha: {{ invoice.formatted_date }}</div>
                    <div class="text-sm">Factura #: {{ invoice.number_invoice }}</div>
                </div>
            </div>

            <div class="grid grid-cols-4 w-full text-left mb-8 text-xs">
                <div class="border-b flex col-span-4">
                    <div class="w-1/4 text-gray-700 font-bold uppercase py-2">Nº Siniestro</div>
                    <div class="w-1/4 text-gray-700 font-bold uppercase py-2">Nombre</div>
                    <div class="w-1/4 text-gray-700 font-bold uppercase py-2">Trabajo</div>
                    <div class="w-1/4 text-gray-700 font-bold uppercase py-2">Precio</div>
                </div>


                <div v-for="(line, index) in invoice.invoices_lines" :key="index" class="border-b flex col-span-4">
                    <div class="w-1/4" :class="p ? 'py-1' : 'pb-3'">{{ line.accident_number }}</div>
                    <div class="w-1/4" :class="p ? 'py-1' : 'pb-3'">{{ line.name }}</div>
                    <div class="w-1/4" :class="p ? 'py-1' : 'pb-3'">{{ line.job }}</div>
                    <div class="w-1/4" :class="p ? 'py-1' : 'pb-3'">{{ line.price }} €</div>
                </div>

                <div class="border-b col-span-4 flex items-center" :class="p ? 'py-1' : 'pb-3'">
                    <div class="w-1/4"></div>
                    <div class="w-1/4"></div>
                    <div class="w-1/4 font-medium font-black text-gray-900 whitespace-nowrap dark:text-white text-left">
                        Total bruto
                    </div>
                    <div class="w-1/4 font-medium font-black text-gray-900 whitespace-nowrap dark:text-white">
                        {{ invoice.totalAmount }} €
                    </div>
                </div>
            </div>

        </div>

        <div class="flex items-center justify-center m-5">
            <NuxtLink :to="'/invoices/' + id + '/edit'">
                <button type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Volver a editar
                </button>
            </NuxtLink>
            <button @click="p = false; loaded = false;
            exportToPDF(invoice.number_invoice + '-' + invoice.formatted_date + '.pdf', pdfSection, { orientation: 'p' }, { html2canvas: { scale: 0.7, useCORS: true }, margin: [50, 0, 50, 15], autoPaging: 'text', width: 600, windowWidth: 600 });
            generatePdf()" type="button"
                class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Descargar PDF
                <svg class="w-6 h-6 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 16 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                </svg>
            </button>
        </div>
        <Loader v-if="!loaded"/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { exportToPDF } from '#imports'
import { useRoute } from 'vue-router';
definePageMeta({ middleware: 'auth' })

const pdfSection = ref

const p = ref(true)

const route = useRoute()
const store = useInvoiceStore()
const id = computed(() => route.params.id)
store.getInvoice(id.value)
const invoice = computed(() => store.invoice)

const loaded = ref(true)

const generatePdf = async () => {
    setTimeout(() => {
        p.value = true
        loaded.value = true
    }, 1500);
}

</script>

<style lang="scss"></style>