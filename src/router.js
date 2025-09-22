
import { createRouter, createWebHistory } from 'vue-router';
import WelcomePage from './components/WelcomePage.vue';
import KioskPage from './components/KioskPage.vue';
import ScanBarcodePage from './components/ScanBarcodePage.vue';
import InsertCardPage from './components/InsertCardPage.vue';
import ReadingCardPage from './components/ReadingCardPage.vue';
import CardProcessedPage from './components/CardProcessedPage.vue';
import CardSuccessPage from './components/CardSuccessPage.vue';
import PaymentDetailsPage from './components/PaymentDetailsPage.vue';
import PaymentPage from './components/PaymentPage.vue';
import ReceiptPage from './components/ReceiptPage.vue';

const routes = [
  { path: '/', name: 'WelcomePage', component: WelcomePage },
  { path: '/kiosk', name: 'KioskPage', component: KioskPage },
  { path: '/scan-barcode', name: 'ScanBarcodePage', component: ScanBarcodePage },
  { path: '/insert-card', name: 'InsertCardPage', component: InsertCardPage },
  { path: '/reading-card', name: 'ReadingCardPage', component: ReadingCardPage },
  { path: '/card-processed', name: 'CardProcessedPage', component: CardProcessedPage },
  { path: '/card-success', name: 'CardSuccessPage', component: CardSuccessPage },
  { path: '/payment-details', name: 'PaymentDetailsPage', component: PaymentDetailsPage },
  { path: '/payment', name: 'PaymentPage', component: PaymentPage },
  { path: '/receipt', name: 'ReceiptPage', component: ReceiptPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
