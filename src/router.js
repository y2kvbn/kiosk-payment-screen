
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
import PaymentChoicePage from './components/PaymentChoicePage.vue';

// --- Global Timer Cleaner ---
// This is a robust solution to prevent timers from one page affecting another.

// 1. Keep track of all active timers.
const activeTimers = {
  timeouts: new Set(),
  intervals: new Set()
};

// 2. Wrap the original setTimeout and setInterval functions.
const originalSetTimeout = window.setTimeout;
const originalSetInterval = window.setInterval;
const originalClearTimeout = window.clearTimeout;
const originalClearInterval = window.clearInterval;

window.setTimeout = (fn, delay) => {
  const id = originalSetTimeout(fn, delay);
  activeTimers.timeouts.add(id);
  return id;
};

window.setInterval = (fn, delay) => {
  const id = originalSetInterval(fn, delay);
  activeTimers.intervals.add(id);
  return id;
};

window.clearTimeout = (id) => {
  activeTimers.timeouts.delete(id);
  originalClearTimeout(id);
};

window.clearInterval = (id) => {
  activeTimers.intervals.delete(id);
  originalClearInterval(id);
};

// 3. Create a function to clear all tracked timers.
const clearAllTimers = () => {
  activeTimers.timeouts.forEach(id => originalClearTimeout(id));
  activeTimers.intervals.forEach(id => originalClearInterval(id));
  activeTimers.timeouts.clear();
  activeTimers.intervals.clear();
};
// --- End of Global Timer Cleaner ---


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
  { path: '/payment-choice', name: 'PaymentChoicePage', component: PaymentChoicePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 4. Register the cleaner as a global navigation guard.
// This will run BEFORE every single route change.
router.beforeEach((to, from, next) => {
  clearAllTimers();
  next(); // Proceed with the navigation
});

export default router;
