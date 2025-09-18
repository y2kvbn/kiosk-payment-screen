<template>
  <div>
    <WelcomePage v-if="currentPage === 'welcome'" @loading-complete="setCurrentPage('kiosk')" />
    <KioskPage v-else-if="currentPage === 'kiosk'" @start-payment="setCurrentPage('scanBarcode')" @go-home="setCurrentPage('welcome')" />
    <ScanBarcodePage v-else-if="currentPage === 'scanBarcode'" @scan-complete="setCurrentPage('insertCard')" @go-home="setCurrentPage('kiosk')" />
    <InsertCardPage v-else-if="currentPage === 'insertCard'" @card-inserted="setCurrentPage('readingCard')" @go-home="setCurrentPage('kiosk')" />
    <ReadingCardPage v-else-if="currentPage === 'readingCard'" @card-read-success="setCurrentPage('paymentDetails')" @go-home="setCurrentPage('kiosk')" />
    <PaymentDetailsPage v-else-if="currentPage === 'paymentDetails'" @confirm-payment="handlePayment" @go-home="setCurrentPage('kiosk')" />
    <PaymentPage v-else-if="currentPage === 'payment'" :payment-method="paymentMethod" @payment-success="setCurrentPage('cardSuccess')" @go-home="setCurrentPage('kiosk')" @go-back="setCurrentPage('paymentDetails')" />
    <CardSuccessPage v-else-if="currentPage === 'cardSuccess'" @go-home="setCurrentPage('welcome')" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WelcomePage from './components/WelcomePage.vue';
import KioskPage from './components/KioskPage.vue';
import ScanBarcodePage from './components/ScanBarcodePage.vue';
import InsertCardPage from './components/InsertCardPage.vue';
import ReadingCardPage from './components/ReadingCardPage.vue';
import PaymentDetailsPage from './components/PaymentDetailsPage.vue';
import PaymentPage from './components/PaymentPage.vue';
import CardSuccessPage from './components/CardSuccessPage.vue';

const currentPage = ref('welcome');
const paymentMethod = ref('cash');

const setCurrentPage = (page) => {
  currentPage.value = page;
};

const handlePayment = (method) => {
  paymentMethod.value = method;
  setCurrentPage('payment');
}

</script>

<style scoped>
/* Add any global styles if needed */
</style>
