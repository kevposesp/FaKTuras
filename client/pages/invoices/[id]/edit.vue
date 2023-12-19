<template>
  <div class="edit">
    <div
      class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex justify-between">
        <div>
          <div class="mb-5 max-w-sm">
            <label for="n_inv" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero de
              factura</label>
            <p v-if="invoiceEdit.number_invoice == 0">{{ invoice.number_invoice }}</p>
            <input type="text" id="n_inv" v-if="invoiceEdit.number_invoice != 0"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="343" v-model="invoiceEdit.number_invoice" required>
          </div>
          <div class="mb-5 max-w-sm">
            <label for="date_inv" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
            <p v-if="invoiceEdit.number_invoice == 0">{{ invoice.formatted_date }}</p>
            <input type="text" id="date_inv" v-if="invoiceEdit.number_invoice != 0"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="10/10/2023" v-model="invoiceEdit.formatted_date" required>
          </div>
        </div>
        <div class="">
          <div class="flex">
            <button type="button" @click="editInvoice()" v-if="invoiceEdit.number_invoice == 0"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 18">
                <path
                  d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                <path
                  d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
              </svg>
            </button>
            <button type="button" @click="updateInvoice()" v-if="invoiceEdit.number_invoice != 0"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 16 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
              </svg>
            </button>
            <NuxtLink :to="'/invoices/' + id + '/view'">
              <button type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 20 14">
                  <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                  </g>
                </svg>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="lines">
        <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Lineas de factura</h2>
        <hr>


        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Nº Siniestro
                </th>
                <th scope="col" class="px-6 py-3">
                  Descripcion
                </th>
                <th scope="col" class="px-6 py-3">
                  Trabajo
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
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                v-for="(line, index) in invoice.invoices_lines" :key="index">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <p v-if="line.id != lineEdit.id">{{ line.accident_number }}</p>
                  <input type="text" v-model="lineEdit.accident_number" v-if="line.id === lineEdit.id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="00000000" required>
                </th>
                <td class="px-6 py-4">
                  <p v-if="line.id != lineEdit.id">{{ line.description }}</p>
                  <input type="text" v-model="lineEdit.description" v-if="line.id === lineEdit.id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="00000000" required>
                </td>
                <td class="px-6 py-4">
                  <p v-if="line.id != lineEdit.id">{{ line.job }}</p>
                  <input type="text" v-model="lineEdit.job" v-if="line.id === lineEdit.id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="00000000" required>
                </td>
                <td class="px-6 py-4">
                  <p v-if="line.id != lineEdit.id">{{ line.price }} €</p>
                  <input type="text" v-model="lineEdit.price" v-if="line.id === lineEdit.id"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="00000000" required>
                </td>
                <td class="px-6 py-4 flex">
                  <button type="button" @click="editLine(line)" v-if="line.id != lineEdit.id"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path
                        d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                      <path
                        d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                  </button>
                  <button type="button" @click="updateLine()" v-if="line.id === lineEdit.id"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                    </svg>
                  </button>
                  <DeleteModal :title="'Delete Line'" :id="line.id" :accident_number="line.accident_number"
                    @deleteEmit="deleteLine($event)" />
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-if="lineEdit.id == ''">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <input type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="00000000" v-model="newLine.accident_number" required>
                </th>
                <td class="px-6 py-4">
                  <input type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Descripcion" v-model="newLine.description" required>
                </td>
                <td class="px-6 py-4">
                  <input type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Pintura" v-model="newLine.job" required>
                </td>
                <td class="px-6 py-4">
                  <input type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="40" v-model="newLine.price" required>
                </td>
                <td class="px-6 py-4 flex">
                  <button type="button" @click="createLine()"
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                </th>
                <td class="px-6 py-4">

                </td>
                <td class="px-6 py-4">

                </td>
                <td class="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Total bruto
                </td>
                <td class="px-6 py-4 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ invoice.totalAmount }} €
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const store = useInvoiceStore()
const id = computed(() => route.params.id)
store.getInvoice(id.value)
const invoice = computed(() => store.invoice)

const lineEdit = reactive({
  id: '',
  accident_number: '',
  description: '',
  job: '',
  price: ''
})

const invoiceEdit = reactive({
  number_invoice: 0,
  formatted_date: ''
})

const editInvoice = () => {
  invoiceEdit.number_invoice = invoice.value.number_invoice
  invoiceEdit.formatted_date = invoice.value.formatted_date
}

const editLine = (line) => {
  lineEdit.id = line.id
  lineEdit.accident_number = line.accident_number
  lineEdit.description = line.description
  lineEdit.job = line.job
  lineEdit.price = line.price
}

const newLine = reactive({
  id: '',
  accident_number: '',
  description: '',
  job: '',
  price: ''
})

const formLine = (r) => {
  return {
    id: r.id,
    accident_number: r.accident_number,
    description: r.description,
    job: r.job,
    price: parseFloat(r.price).toFixed(2),
    id_invoice: id.value
  }
}

const formInvoice = (i) => {
  return {
    number_invoice: i.number_invoice,
    formatted_date: i.formatted_date,
    id_invoice: id.value
  }
}

const createLine = async () => {
  const res = await store.createLineInvoice(formLine(newLine))
  if (res == true) {
    newLine.id = ''
    newLine.accident_number = ''
    newLine.description = ''
    newLine.job = ''
    newLine.price = ''
  }
}

const updateInvoice = async () => {
  const res = await store.updateInvoice(formInvoice(invoiceEdit))
  if (res == true) {
    invoiceEdit.number_invoice = 0
    invoiceEdit.formatted_date = ''
  }
}

const updateLine = async () => {
  const res = await store.updateLineInvoice(formLine(lineEdit))
  if (res == true) {
    lineEdit.id = ''
    lineEdit.accident_number = ''
    lineEdit.description = ''
    lineEdit.job = ''
    lineEdit.price = ''
  }
}

const deleteLine = async (id_line) => {
  const res = await store.deleteLineInvoice({ id: id_line, id_invoice: id })
}

</script>

<style></style>