<template>
  <div class="payment-details-container">
    <div class="left-panel">
      <div class="patient-info-section">
        <h3>就醫資料 PATIENT INFORMATION</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">病歷號</span>
            <span class="value">984751</span>
          </div>
          <div class="info-item">
            <span class="label">姓名</span>
            <span class="value">王曉明</span>
          </div>
          <div class="info-item">
            <span class="label">看診日期</span>
            <span class="value">2025/09/10</span>
          </div>
        </div>
      </div>
      <div class="cost-summary-section">
        <h3>費用明細 COST DETAILS</h3>
        <div class="cost-grid">
          <div class="cost-item">
            <span class="label">科別</span>
            <span class="value">家醫科</span>
            <span class="amount">340</span>
          </div>
          <div class="cost-item">
            <span class="label">科別</span>
            <span class="value">外科</span>
            <span class="amount">540</span>
          </div>
          <div class="cost-item">
            <span class="label">科別</span>
            <span class="value">放射科</span>
            <span class="amount">750</span>
          </div>
          <div class="cost-item">
            <span class="label">科別</span>
            <span class="value">藥劑科</span>
            <span class="amount">620</span>
          </div>
        </div>
        <div class="total-cost">
          <span class="label">合計金額</span>
          <span class="amount">2,250</span>
        </div>
      </div>
      <div class="nav-buttons">
        <button class="btn-prev" @click="goBack">上一步</button>
      </div>
    </div>
    <div class="right-panel">
      <!-- Payment Method Selection -->
      <div v-if="!paymentMethod">
        <div class="amount-payable-section">
          <div class="payable-text">
            <div class="payable-title">應繳金額</div>
            <div class="payable-subtitle">AMOUNT PAYABLE</div>
          </div>
          <div class="payable-amount">2,250</div>
          <div class="payable-warning">※金額超過3,000元, 僅提供現金繳費<br>Amount exceed 3,000 dollars use cash for payment only</div>
        </div>
        <div class="select-payment-section">
          <div class="instruction-text">請確認就醫資料並選擇繳費方式<br>Please confirm your medical information and select a payment method</div>
          <div class="payment-buttons">
            <button class="payment-btn cash-btn" @click="selectPaymentMethod('cash')">
              <span class="btn-icon">💰</span>
              <div>
                <div class="btn-title">現金繳費</div>
                <div class="btn-subtitle">CASH</div>
              </div>
            </button>
            <button class="payment-btn card-btn" @click="selectPaymentMethod('card')">
              <span class="btn-icon">💳</span>
              <div>
                <div class="btn-title">信用卡繳費</div>
                <div class="btn-subtitle">CREDIT CARD</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <!-- Cash Payment Steps -->
      <div v-if="paymentMethod === 'cash'">
        <CashPaymentSteps :steps="cashSteps" :currentStep="currentCashStep" @go-back="paymentMethod = null" />
      </div>
      <!-- Card Payment Steps -->
      <div v-if="paymentMethod === 'card'">
        <CardPaymentSteps :steps="cardSteps" :currentStep="currentCardStep" @go-back="paymentMethod = null" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CashPaymentSteps from './CashPaymentSteps.vue';
import CardPaymentSteps from './CardPaymentSteps.vue';

const router = useRouter();
const paymentMethod = ref(null);
const currentCashStep = ref(0);
const currentCardStep = ref(0);

const cashSteps = [
  { title: '繳費說明', instruction: '為節省您寶貴的時間，本機具僅接受下列面額鈔券，造成不便之處，敬請見諒。' },
  { title: '現金入口', instruction: '請將現金逐張平整放入，單次最多可放入20張。' },
  { title: '完成繳費', instruction: '繳費已完成，請取回您的收據。' }
];

const cardSteps = [
  { title: '感應信用卡', instruction: '請將信用卡放置於感應區。' },
  { title: '處理中', instruction: '正在處理您的付款，請稍候...' },
  { title: '繳費成功', instruction: '交易成功，請取回您的信用卡及收據。' }
];

const selectPaymentMethod = (method) => {
  paymentMethod.value = method;
  if (method === 'cash') {
    startCashProcess();
  } else if (method === 'card') {
    startCardProcess();
  }
};

const startCashProcess = () => {
  currentCashStep.value = 1;
  setTimeout(() => {
    currentCashStep.value = 2;
    setTimeout(() => {
      currentCashStep.value = 3; 
      setTimeout(() => router.push({ name: 'CardSuccessPage' }), 2000); 
    }, 3000);
  }, 3000);
};

const startCardProcess = () => {
  currentCardStep.value = 1;
  setTimeout(() => {
    currentCardStep.value = 2;
    setTimeout(() => {
      currentCardStep.value = 3;
      setTimeout(() => router.push({ name: 'CardSuccessPage' }), 2000);
    }, 3000);
  }, 3000);
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.payment-details-container {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Microsoft JhengHei', sans-serif;
}

.left-panel, .right-panel {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.left-panel {
  background-color: #fff;
  border-right: 1px solid #dee2e6;
  font-size: 1.2rem; /* Increased base font size */
}

.right-panel {
  justify-content: center;
}

h3 {
  font-size: 1.8em; /* Relative to parent */
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
}

.info-grid, .cost-grid {
  display: grid;
  gap: 15px;
  font-size: 1.2em; /* Relative to parent */
}

.info-item, .cost-item {
  display: contents;
}

.info-item .label, .cost-item .label {
  font-weight: bold;
  color: #555;
}

.info-item .value, .cost-item .value, .cost-item .amount {
  text-align: right;
  color: #333;
}

.cost-grid {
  grid-template-columns: 1fr 1fr 1fr;
}

.cost-item .amount {
  font-weight: bold;
}

.total-cost {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px dashed #ccc;
  font-size: 1.5em; /* Relative to parent */
  font-weight: bold;
  color: #d9534f;
}

.nav-buttons {
  margin-top: auto;
}

.btn-prev {
  width: 100%;
  padding: 15px;
  font-size: 1.2em;
  border-radius: 5px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-prev:hover {
  background-color: #5a6268;
}

.amount-payable-section {
  text-align: center;
  margin-bottom: 40px;
}

.payable-text .payable-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.payable-text .payable-subtitle {
  font-size: 1.5rem;
  color: #6c757d;
}

.payable-amount {
  font-size: 6rem;
  font-weight: bold;
  color: #007bff;
  margin: 10px 0;
  line-height: 1;
}

.payable-warning {
  font-size: 1.3rem; /* Increased font size */
  color: #d9534f;
  font-weight: bold;
}

.select-payment-section .instruction-text {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.payment-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.payment-btn {
  flex: 1;
  max-width: 300px;
  padding: 20px;
  font-size: 1.8rem;
  border-radius: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-align: left;
}

.payment-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.cash-btn {
  background-color: #28a745;
  color: white;
}

.card-btn {
  background-color: #007bff;
  color: white;
}

.btn-icon {
  font-size: 3rem;
}

.btn-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.btn-subtitle {
  font-size: 1rem;
}
</style>
