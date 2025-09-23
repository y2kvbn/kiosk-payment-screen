<template>
  <div class="payment-container">
    <div class="top-bar">
      <div class="timer-container">
        剩餘秒數：<span class="timer">{{ countdown }}</span>
      </div>
      <button class="home-button" @click="goHome">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        首頁
      </button>
    </div>

    <div class="main-content">
      <div class="left-panel">
        <div class="step-header-1">
          <span class="step-number">1</span>
          <div class="step-text">
            <div>確認繳費項目</div>
            <div class="step-subtitle">PAYMENT INFORMATION</div>
          </div>
        </div>
        <div class="billing-table-container">
          <table class="billing-table">
            <thead>
              <tr>
                <th>日期<span class="en">Date</span></th>
                <th>姓名<span class="en">Name</span></th>
                <th>病歷號<span class="en">MRN</span></th>
                <th>科別<span class="en">Clinic</span></th>
                <th>應繳金額<span class="en">Amount Due</span></th>
              </tr>
            </thead>
            <tbody>
              <!-- Empty rows for design -->
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
              <tr><td></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>
        <div class="total-expense">
          合計金額 <span class="en-total">Total expense</span>
        </div>
      </div>

      <div class="right-panel">
        <div class="step-header-2">
          <span class="step-number">2</span>
          <div class="step-text">
            <div>繳費資訊</div>
            <div class="step-subtitle">PAYMENT INFORMATION</div>
          </div>
        </div>
        <div class="payment-info">
          <div class="amount-payable">
            <div class="amount-label">應繳金額<br><span class="en-small">AMOUNT PAYABLE</span></div>
            <div class="amount-value">2,250</div>
          </div>
          <div class="card-reader-info">
            <img :src="paymentImage" alt="Payment Method" class="card-reader-image">
            <div class="instruction-text">
              <p class="main-instruction">{{ instructionText.main }}</p>
              <p class="en-instruction">{{ instructionText.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-buttons">
      <button class="cash-button" @click="payWithCash" :disabled="isProcessing">
        <div class="button-icon-wrapper">
          <span class="button-icon-cash">$</span>
        </div>
        <div class="button-text">
          <span class="main-text">現金繳費</span>
          <span class="en-button">Cash</span>
        </div>
      </button>
      <button class="credit-card-button" @click="payWithCreditCard" :disabled="isProcessing">
        <div class="button-icon-wrapper">
          <svg class="button-icon-cc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="white" d="M512 288h-96v64h96v-64zm-128 0h-96v64h96v-64zm-128 0H160v64h96v-64zM640 96L0 96v320c0 35.3 28.7 64 64 64h512c35.3 0 64-28.7 64-64V96zM248 416c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm120 0c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm120 0c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zM576 64H64C28.7 64 0 35.3 0 0v0h576c35.3 0 64 28.7 64 64v0z" />
          </svg>
        </div>
        <div class="button-text">
          <span class="main-text">信用卡</span>
          <span class="en-button">Credit Card</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(118);
let timer = null;
const selectedPayment = ref(null);
const isProcessing = ref(false);

const paymentImage = computed(() => {
  if (selectedPayment.value === 'cash') {
    return 'https://i.ibb.co/tTwXvTHs/Cash-Paying.gif';
  }
  if (selectedPayment.value === 'card') {
    return 'https://i.ibb.co/4ZjcJ87w/istockphoto-1330150853-612x612-Photoroom.png';
  }
  return 'https://i.ibb.co/qMs91zsm/Chat-GPT-Image-2025-9-23-10-29-28.png';
});

const instructionText = computed(() => {
  if (selectedPayment.value === 'cash') {
    return { main: '請將現金放入指定位置', sub: 'Please insert cash into the designated slot' };
  }
  if (selectedPayment.value === 'card') {
    return { main: '請感應或插入信用卡', sub: 'Please tap or insert your credit card' };
  }
  return { main: '確認就醫資料,並選擇繳費方式', sub: 'Please confirm your medical details and select a payment method' };
});

const goHome = () => {
  // Robust fix: Clear timer before navigating
  clearInterval(timer);
  router.push('/');
};

const payWithCash = () => {
  isProcessing.value = true;
  selectedPayment.value = 'cash';
  // Robust fix: Clear timer before navigating
  clearInterval(timer);
  setTimeout(() => {
    router.push('/payment');
  }, 2000);
};

const payWithCreditCard = () => {
  isProcessing.value = true;
  selectedPayment.value = 'card';
  // Robust fix: Clear timer before navigating
  clearInterval(timer);
  setTimeout(() => {
    router.push('/insert-card');
  }, 2000);
};

onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      // The timer clears itself before navigating away
      clearInterval(timer);
      router.push('/kiosk');
    }
  }, 1000);
});

onUnmounted(() => {
  // This acts as a final fallback.
  clearInterval(timer);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');

.payment-container {
  width: 100vw;
  height: 100vh;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans TC', sans-serif;
  overflow: hidden;
}

.top-bar {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;
}

.timer-container {
  background-color: #2c3e50;
  color: #fff;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 1.4em;
  font-weight: bold;
}

.timer {
  color: #f1c40f;
  margin-left: 8px;
  font-weight: 700;
}

.home-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-content {
  display: flex;
  flex-grow: 1;
  padding: 80px 30px 20px 30px;
  gap: 20px;
}

.left-panel, .right-panel {
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.left-panel {
  width: 45%;
}

.right-panel {
  width: 55%;
}

.step-header-1, .step-header-2 {
  color: white;
  padding: 10px 25px;
  font-size: 1.8em;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #6a9c78;
}

.step-header-1 {
  border-radius: 8px 8px 0 0;
}

.step-header-2 {
  border-radius: 8px 8px 0 0;
  position: relative;
  left: -10px;
  padding-left: 35px;
  clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%);
}

.step-number {
  font-size: 1.8em;
  font-weight: 100;
}

.step-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.step-subtitle {
  font-size: 0.5em;
  font-weight: normal;
  letter-spacing: 1px;
}

.billing-table-container {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  flex-grow: 1;
}

.billing-table {
  width: 100%;
  border-collapse: collapse;
}

.billing-table thead tr {
    background-color: #e8f0e8;
}

.billing-table th {
  text-align: left;
  padding: 10px 15px;
  font-weight: bold;
  font-size: 0.9em;
  color: #555;
  border-bottom: 1px solid #ddd;
}

.billing-table th .en {
  display: block;
  font-size: 0.8em;
  font-weight: normal;
  color: #777;
}

.billing-table tbody tr {
    height: 45px;
}
.billing-table tbody td {
  border-bottom: 1px solid #eee;
}

.total-expense {
  background-color: #8db596;
  color: white;
  padding: 15px 25px;
  text-align: left;
  font-size: 1.3em;
  font-weight: bold;
  border-radius: 0 0 8px 8px;
}

.total-expense .en-total {
  font-size: 0.8em;
  font-weight: normal;
  margin-left: 10px;
}

.payment-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 30px;
}

.amount-payable {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}

.amount-label {
  font-size: 1.4em;
  color: #555;
  line-height: 1.3;
}

.en-small {
  font-size: 0.8em;
  color: #888;
}

.amount-value {
  font-size: 3.5em;
  font-weight: bold;
  color: #d9534f;
  margin-left: 30px;
}

.card-reader-info {
  text-align: center;
}

.card-reader-image {
  width: 250px;
  height: 180px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 20px;
}

.instruction-text .main-instruction {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.instruction-text .en-instruction {
  font-size: 1.1em;
  color: #777;
}

.footer-buttons {
  display: flex;
  width: calc(100% - 60px);
  margin: 0 30px 25px 30px;
  gap: 20px;
}

.cash-button, .credit-card-button {
  flex: 1;
  padding: 12px 25px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 25px;
  box-shadow: 0 6px 10px rgba(0,0,0,0.1);
  transition: background-color 0.3s, opacity 0.3s;
}

.cash-button:disabled, .credit-card-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cash-button {
  background-color: #f7931e;
  color: #fff;
}

.credit-card-button {
  background-color: #3b5998;
  color: #fff;
}

.button-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon-cash {
  background-color: #d67d1a;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2em;
  font-weight: bold;
}

.button-icon-cc {
  width: 80px;
}

.button-text {
  text-align: left;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.main-text {
  font-size: 2em;
  font-weight: bold;
}

.en-button {
  font-size: 1em;
  font-weight: normal;
  color: #f0f0f0;
}
</style>
