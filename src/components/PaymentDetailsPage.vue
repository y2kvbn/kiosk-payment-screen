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
        <div class="step active">
          <span class="step-number">1</span>
          <div class="step-text">
            <div>確認繳費項目</div>
            <div class="step-subtitle">PAYMENT INFORMATION</div>
          </div>
        </div>
        <div class="step-arrow"></div>
        <div class="step">
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

      <div class="payment-options-panel">
        <div class="total-payable-section">
          <div class="total-payable">
            <div class="payable-text">
              <div>應繳金額</div>
              <div class="payable-subtitle">AMOUNT PAYABLE</div>
            </div>
            <div class="payable-amount">2,250</div>
          </div>
          <div class="cash-notice">
            ※金額超過3,000元, 僅提供現金繳費
            <br>
            <span class="en-notice">Amount exceed 3,000 dollars use cash for payment only</span>
          </div>
        </div>

        <div class="selection-prompt">
          請確認就醫資料並選擇繳費方式
          <br>
          <span class="en-prompt">Please confirm your medical information and select a payment method</span>
        </div>
        <div class="payment-buttons">
          <button class="btn btn-cash" @click="confirmPayment('cash')">
            <span class="icon">$</span>
            <div class="btn-text">
              <div>現金繳費</div>
              <div class="btn-subtitle">Cash</div>
            </div>
          </button>
          <button class="btn btn-credit" @click="confirmPayment('credit')">
             <img src="https://i.ibb.co/2S3p9t3/credit-card-icon.png" alt="Credit Card" class="icon-img" />
            <div class="btn-text">
              <div>信用卡</div>
              <div class="btn-subtitle">Credit Card</div>
            </div>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['confirm-payment', 'go-home']);
const countdown = ref(118);

const confirmPayment = (method) => {
  emit('confirm-payment', method);
};

const goHome = () => {
  emit('go-home');
};

let countdownTimer;
onMounted(() => {
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      goHome();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(countdownTimer);
});
</script>

<style scoped>
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

.step {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 15px 0;
}

.step.active {
  font-weight: bold;
}

.step-number {
  font-size: 3rem;
  font-weight: bold;
  margin-right: 15px;
  opacity: 0.7;
}

.step.active .step-number {
    opacity: 1;
}

.step-text {
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
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

.home-button-progress:hover {
  background-color: #3b6b84;
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

.payment-options-panel {
  flex: 4;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 8px;
}

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

.total-value {
  font-weight: bold;
}

.total-payable-section {
  border-bottom: 2px dashed #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.total-payable {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.payable-text {
  font-size: 1.5rem;
  color: #555;
  text-align: right;
}

.payable-subtitle {
  font-size: 1rem;
}

.payable-amount {
  color: #d9534f;
  font-size: 4.5rem;
  font-weight: bold;
}

.cash-notice {
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  margin-top: 15px;
}

.en-notice {
  font-size: 0.9rem;
}

.selection-prompt {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #d9534f;
  margin-bottom: 20px;
}

.en-prompt {
  font-size: 1rem;
  font-weight: normal;
}

.payment-buttons {
  display: flex;
  gap: 20px;
}

.btn {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px solid #555;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-text {
  font-size: 2rem;
  font-weight: bold;
}
.btn-subtitle {
    font-size: 1rem;
}

.icon {
  font-size: 3rem;
  margin-right: 15px;
}
.icon-img {
    height: 3rem;
    margin-right: 15px;
}

.btn-cash {
  background-color: #e8a238;
  color: #fff;
}

.btn-credit {
  background-color: #4a69b6;
  color: #fff;
}

.btn:hover {
    filter: brightness(1.1);
}
</style>
