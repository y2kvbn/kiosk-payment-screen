<template>
  <div class="page-container">
    <header class="header">
      <div class="logo-container">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo" class="logo-img">
      </div>
      <div class="countdown-container">
        剩餘秒數：<span class="seconds">{{ countdown }}</span>
      </div>
    </header>

    <div class="progress-bar-container">
      <div class="step-wrapper">
        <div class="step">
          <span class="step-number-inactive">1</span>
          <div class="step-text-inactive">
            <div>確認繳費項目</div>
            <div class="step-subtitle">PAYMENT INFORMATION</div>
          </div>
        </div>
        <div class="step-arrow"></div>
        <div class="step active">
          <span class="step-number">2</span>
          <div class="step-text">
            <div>繳費資訊</div>
            <div class="step-subtitle">PAYMENT INFORMATION</div>
          </div>
        </div>
      </div>
      <button class="home-button-progress" @click="goHome">🏠 首頁</button>
    </div>

    <main class="main-content">
      <div class="bill-details-panel">
        <div class="bill-header">
          <span class="col-date">日期 Date</span>
          <span class="col-name">姓名 Name</span>
          <span class="col-mrn">病歷號 MRN</span>
          <span class="col-clinic">科別 Clinic</span>
          <span class="col-amount">應繳金額 Amount Due</span>
        </div>
        <div class="bill-rows">
          <div class="bill-row">
            <span class="col-date">2025/09/10</span>
            <span class="col-name">王曉明</span>
            <span class="col-mrn">984751</span>
            <span class="col-clinic">家醫科</span>
            <span class="col-amount">340</span>
          </div>
          <div class="bill-row">
            <span class="col-date">2025/09/10</span>
            <span class="col-name">王大明</span>
            <span class="col-mrn">257411</span>
            <span class="col-clinic">外科</span>
            <span class="col-amount">540</span>
          </div>
          <div class="bill-row empty"><span>&nbsp;</span></div>
          <div class="bill-row empty"><span>&nbsp;</span></div>
          <div class="bill-row empty"><span>&nbsp;</span></div>
          <div class="bill-row empty"><span>&nbsp;</span></div>
        </div>
        <div class="bill-footer">
          <span>合計金額 Total expense</span>
          <span class="total-value">880</span>
        </div>
      </div>

      <div class="payment-info-panel">
        <div class="amounts-section">
          <div class="amount-row">
            <span class="amount-label">應繳金額 <span class="sub-label">AMOUNT PAYABLE</span></span>
            <span class="amount-value payable">2,250</span>
          </div>
          <div class="amount-row">
            <span class="amount-label">投入金額 <span class="sub-label">AMOUNT PAID</span></span>
            <span class="amount-value paid">{{ amountPaid }}</span>
          </div>
          <div class="amount-row">
            <span class="amount-label">應找金額 <span class="sub-label">CHANGE</span></span>
            <span class="amount-value change">{{ change }}</span>
          </div>
        </div>
        <div class="cash-machine-area">
            <img src="https://i.imgur.com/3SoQlL9.png" alt="Cash machine" class="cash-machine-img">
        </div>
         <div class="instruction-prompt">
          請投入紙鈔或硬幣
          <br>
          <span class="en-prompt">Please put in cash</span>
        </div>
        <div class="action-buttons">
            <button class="btn btn-cancel" @click="goHome">❌ 取消繳費 <span class="btn-subtitle">CANCEL</span></button>
            <button class="btn btn-credit-alt" @click="goBack">💳 信用卡 <span class="btn-subtitle">CREDIT CARD</span></button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['payment-success', 'go-home', 'go-back']);

const countdown = ref(118);
const totalAmount = 2250;
const amountPaid = ref(0);
const change = computed(() => amountPaid.value > totalAmount ? amountPaid.value - totalAmount : 0);

const goHome = () => {
  emit('go-home');
};

const goBack = () => {
  emit('go-back');
};

let countdownTimer;
let paymentTimer;

onMounted(() => {
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      goHome();
    }
  }, 1000);

  // Simulate cash insertion
  paymentTimer = setInterval(() => {
    if (amountPaid.value < totalAmount) {
        amountPaid.value += 50; // Simulate inserting 50
    } else {
        clearInterval(paymentTimer);
        setTimeout(() => emit('payment-success'), 1500); // Wait a bit then move to success page
    }
  }, 200);
});

onUnmounted(() => {
  clearInterval(countdownTimer);
  clearInterval(paymentTimer);
});

</script>

<style scoped>
/* Reusing styles from PaymentDetailsPage.vue and adding new ones */
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #e8e8e8;
  font-family: 'Microsoft JhengHei', sans-serif;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #fff;
  flex-shrink: 0;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 45px;
}

.countdown-container {
  background-color: #333;
  color: #fff;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 1.5rem;
}

.seconds {
  color: #ffeb3b;
  font-weight: bold;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #62a691;
  padding: 0 30px;
}

.step-wrapper {
  display: flex;
  align-items: center;
}

.step, .step.active {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 15px 0;
}

.step-number-inactive, .step-number {
  font-size: 3rem;
  font-weight: bold;
  margin-right: 15px;
}

.step-number {
    opacity: 1;
}

.step-number-inactive {
    opacity: 0.7;
}

.step-text, .step-text-inactive {
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
}

.step-text {
    font-weight: bold;
}

.step-text-inactive {
    font-weight: normal;
}

.step-subtitle {
  font-size: 0.9rem;
  font-weight: normal;
}

.step-arrow {
  width: 0; 
  height: 0; 
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 25px solid #62a691;
  margin: 0 30px;
}

.home-button-progress {
  background-color: #4a82a0;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 25px;
  padding: 8px 25px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.main-content {
  display: flex;
  flex-grow: 1;
  padding: 20px;
  gap: 20px;
}

.bill-details-panel {
  flex: 5;
  background-color: #f0f4f8;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}

.payment-info-panel {
  flex: 4;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
}

/* Bill details panel styles - copied */
.bill-header, .bill-row {
  display: flex;
  padding: 10px;
  font-size: 1.2rem;
  align-items: center;
}

.bill-header {
  background-color: #d1e0d7;
  font-weight: bold;
  border-bottom: 2px solid #b8c9bf;
}

.bill-row {
  border-bottom: 1px solid #d1e0d7;
  height: 50px;
  box-sizing: border-box;
}

.bill-rows {
  flex-grow: 1;
}

.col-date { flex: 2; }
.col-name { flex: 1.5; }
.col-mrn { flex: 1.5; }
.col-clinic { flex: 1.5; }
.col-amount { flex: 1.5; text-align: right; padding-right: 10px; }

.bill-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #b8c9bf;
  font-size: 1.5rem;
  font-weight: bold;
  border-top: 2px solid #a3b5aa;
  border-radius: 0 0 6px 6px;
}

/* Payment info panel styles - new */

.amounts-section {
    border-bottom: 2px dashed #ccc;
    padding-bottom: 15px;
}

.amount-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.amount-label {
    font-size: 1.5rem;
    color: #555;
    font-weight: bold;
}

.sub-label {
    font-size: 1rem;
    font-weight: normal;
    display: block;
}

.amount-value {
    font-weight: bold;
    font-size: 3rem;
}

.amount-value.payable { color: #d9534f; }
.amount-value.paid { color: #337ab7; }
.amount-value.change { color: #5cb85c; }

.cash-machine-area {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
}

.cash-machine-img {
    max-width: 80%;
    height: auto;
    border-radius: 10px;
}

.instruction-prompt {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #d9534f;
  margin: 15px 0;
}

.en-prompt {
  font-size: 1rem;
  font-weight: normal;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.btn {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
}

.btn-subtitle {
    font-size: 0.9rem;
    font-weight: normal;
    margin-left: 8px;
}

.btn-cancel {
    background-color: #f0f0f0;
    color: #555;
    border: 2px solid #ccc;
}

.btn-credit-alt {
    background-color: #6c757d;
    color: #fff;
    border: 2px solid #5a6268;
}

.btn:hover {
    filter: brightness(1.1);
}
</style>
