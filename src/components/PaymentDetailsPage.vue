<template>
  <div class="container">
    <header class="header">
      <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo" class="header-logo">
      <div class="steps">
        <div class="step"><span>1</span> 確認繳費項目 <span class="subtitle">PAYMENT INFOMATION</span></div>
        <div class="step active"><span>2</span> 繳費資訊 <span class="subtitle">PAYMENT INFOMATION</span></div>
      </div>
      <div class="header-right">
        <div class="countdown" @click="resetCountdown">剩餘秒數：{{ countdown }}</div>
        <button class="home-button" @click="goHome">
          <span class="icon">🏠</span> 首頁
        </button>
      </div>
    </header>

    <main class="main-content">
      <div class="left-panel">
        <div class="payment-list">
          <div class="table-header">
            <span>日期 <br>Date</span>
            <span>姓名 <br>Name</span>
            <span>病歷號 <br>MRN</span>
            <span>科別 <br>Clinic</span>
            <span>應繳金額 <br>Amount Due</span>
          </div>
          <div class="table-body">
            <div class="table-row" v-for="(item, index) in paymentItems" :key="index">
              <span>{{ item.date }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.mrn }}</span>
              <span>{{ item.clinic }}</span>
              <span>{{ item.amount }}</span>
            </div>
          </div>
          <div class="table-footer">
            <span>合計金額 <br>Total expense</span>
            <span class="total-amount">{{ totalAmount }}</span>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="amount-payable">
          <span class="label">應繳金額 <br>AMOUNT PAYABLE</span>
          <span class="amount">{{ totalAmount }}</span>
        </div>

        <!-- Processing View -->
        <template v-if="isProcessing">
            <div class="card-instruction">
                <img src="https://i.imgur.com/J6bBIp5.png" alt="Processing" class="card-reader-img"/>
                <p class="instruction-text-main">{{ processingTextMain }}</p>
                <p class="instruction-text-sub">{{ processingTextSub }}</p>
            </div>
            <div class="action-buttons-container" style="visibility: hidden;">
                <button class="action-button"></button>
                <button class="action-button"></button>
            </div>
        </template>

        <!-- View for selecting payment method -->
        <template v-else-if="paymentView === 'select'">
          <div class="card-instruction">
            <img src="https://i.imgur.com/J6bBIp5.png" alt="Payment Options" class="card-reader-img"/>
            <p class="instruction-text-main">請選擇繳費方式</p>
            <p class="instruction-text-sub">Please select a payment method</p>
          </div>
          <div class="action-buttons-container">
            <button class="action-button cash-button" @click="selectCashPayment">
              <span class="icon">$</span>
              <div>
                現金繳費 <br>
                <span class="subtext">Cash</span>
              </div>
            </button>
            <button class="action-button card-button" @click="selectCardPayment">
              <span class="icon">💳</span>
              <div>
                信用卡 <br>
                <span class="subtext">Credit Card</span>
              </div>
            </button>
          </div>
        </template>

        <!-- View for cash payment -->
        <template v-else-if="paymentView === 'cash'">
          <div class="cash-payment-details">
            <div class="cash-info-row">
              <span class="label">投入金額<br>AMOUNT PAID</span>
              <span class="cash-amount">0</span>
            </div>
            <div class="cash-info-row">
              <span class="label">應找金額<br>CHANGE</span>
              <span class="cash-amount">0</span>
            </div>
          </div>
          <div class="card-instruction">
            <img src="https://i.imgur.com/GhpGy3a.png" alt="Insert Cash" class="cash-insert-img"/>
            <p class="instruction-text-main">請投入紙鈔或硬幣</p>
            <p class="instruction-text-sub">Please put in cash</p>
          </div>
           <div class="action-buttons-container cash-actions">
             <button class="action-button cancel-button" @click="cancelPayment">
              <span class="icon">✕</span>
              <div>
                取消繳費 <br>
                <span class="subtext">CANCEL</span>
              </div>
            </button>
            <button class="action-button cash-button" @click="confirmCashPayment">
              <span class="icon">✓</span>
              <div>
                 確認付款 <br>
                <span class="subtext">CONFIRM</span>
              </div>
            </button>
          </div>
        </template>
        
        <!-- View for card payment -->
        <template v-else-if="paymentView === 'card'">
          <div class="card-instruction">
            <img src="https://i.imgur.com/J6bBIp5.png" alt="Payment Options" class="card-reader-img"/>
            <p class="instruction-text-main">請感應信用卡</p>
            <p class="instruction-text-sub">Please tap your credit card</p>
          </div>
          <div class="action-buttons-container cash-actions">
             <button class="action-button cancel-button" @click="cancelPayment">
              <span class="icon">✕</span>
              <div>
                取消 <br>
                <span class="subtext">CANCEL</span>
              </div>
            </button>
            <button class="action-button card-button" @click="confirmCardPayment">
              <span class="icon">✓</span>
              <div>
                確認付款 <br>
                <span class="subtext">CONFIRM</span>
              </div>
            </button>
          </div>
        </template>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(120);
let timer;

const paymentView = ref('select'); // 'select', 'cash', or 'card'
const isProcessing = ref(false);
const processingTextMain = ref("");
const processingTextSub = ref("");

onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      if (router.currentRoute.value.path.includes('payment-details')) {
          router.push('/kiosk');
      }
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const resetCountdown = () => {
  countdown.value = 120;
};

const paymentItems = ref([
  { date: '2024/07/26', name: '王大明', mrn: '123456', clinic: '心臟內科', amount: 1500 },
  { date: '2024/07/26', name: '王大明', mrn: '123456', clinic: '皮膚科', amount: 750 },
]);

const totalAmount = computed(() => {
    const total = paymentItems.value.reduce((total, item) => total + item.amount, 0);
    return total.toLocaleString();
});

const goHome = () => {
  router.push('/kiosk');
};

const selectCashPayment = () => {
  paymentView.value = 'cash';
};

const selectCardPayment = () => {
  paymentView.value = 'card';
};

const cancelPayment = () => {
  if (isProcessing.value) return;
  paymentView.value = 'select';
};

const processPayment = () => {
  isProcessing.value = true;
  clearInterval(timer);
  setTimeout(() => {
    router.push('/card-success');
  }, 5000);
}

const confirmCardPayment = () => {
  processingTextMain.value = "感應完成, 請稍後";
  processingTextSub.value = "Tap complete, please wait";
  processPayment();
};

const confirmCashPayment = () => {
  processingTextMain.value = "確認金額, 找零中, 請稍後";
  processingTextSub.value = "Confirming amount, making change, please wait";
  processPayment();
};

</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  font-family: 'Microsoft JhengHei', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  background-color: #5a9a78;
  color: white;
  padding: 10px 30px;
}

.header-logo {
  height: 50px;
  margin-right: 30px;
}

.steps {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.step {
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-right: 40px;
  opacity: 0.7;
}

.step.active {
  opacity: 1;
}

.step span:first-child {
  background-color: white;
  color: #5a9a78;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 10px;
}

.step .subtitle {
  font-size: 14px;
  margin-left: 8px;
  opacity: 0.8;
}

.header-right {
  display: flex;
  align-items: center;
}

.countdown {
  background-color: #3e3e3e;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #ffff00;
  margin-right: 20px;
  cursor: pointer; /* Add cursor pointer for the new click event */
}

.home-button {
  background-color: #4c82a8;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 25px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.home-button .icon {
  margin-right: 8px;
  font-size: 24px;
}

.main-content {
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
}

.left-panel {
  flex: 1.2;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
}

.payment-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr;
  text-align: center;
  align-items: center;
  padding: 18px 10px;
  font-size: 18px;
  color: #333;
}

.table-header {
  background-color: #e0e0e0;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.table-header span {
  font-size: 18px;
}

.table-row {
  border-bottom: 1px solid #e0e0e0;
  font-size: 20px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-body {
  flex-grow: 1;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background-color: #8db59d;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.table-footer .total-amount {
  font-size: 30px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 30px;
}

.amount-payable {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.amount-payable .label {
  font-size: 20px;
  color: #555;
  margin-right: 20px;
  text-align: right;
  line-height: 1.4;
}

.amount-payable .amount {
  font-size: 60px;
  font-weight: bold;
  color: #d9534f;
}

.card-instruction {
  text-align: center;
}

.card-reader-img {
  width: 220px;
  margin-bottom: 15px;
}

.instruction-text-main {
  font-size: 28px;
  font-weight: bold;
  color: #c00;
  margin-bottom: 5px;
}

.instruction-text-sub {
  font-size: 18px;
  color: #555;
}

.action-buttons-container {
  display: flex;
  width: 100%;
  gap: 20px;
}

.action-button {
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  color: white;
  font-size: 28px;
  font-weight: bold;
  border: 2px solid rgba(0,0,0,0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  line-height: 1.2;
  transition: background-color 0.2s;
}

.action-button .icon {
  font-size: 40px;
}

.action-button .subtext {
  font-size: 18px;
  font-weight: normal;
}

.cash-button {
  background-color: #f0ad4e;
  box-shadow: 0 4px #c28b3d;
}

.card-button {
  background-color: #4267b2;
  box-shadow: 0 4px #35538f;
}

.action-button:disabled,
.action-button.card-switch-button:disabled {
  background-color: #9a9a9a;
  box-shadow: 0 4px #7b7b7b;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Styles for the new cash payment view */
.cash-payment-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
}

.cash-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
}

.cash-info-row .label {
  color: #555;
  text-align: left;
  line-height: 1.3;
}

.cash-info-row .cash-amount {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.cash-insert-img {
  width: 300px;
  margin-bottom: 15px;
}

.action-buttons-container.cash-actions {
  justify-content: space-between;
}

.cancel-button {
  background-color: #4db9d3;
  box-shadow: 0 4px #419bab;
  flex: 1.5; /* Make it wider */
}

.card-switch-button {
  background-color: #9a9a9a;
  box-shadow: 0 4px #7b7b7b;
  flex: 1;
}

.credit-card-icon {
  height: 32px;
  filter: brightness(0) invert(1);
}

.cancel-button .icon {
  font-size: 32px;
  font-weight: bold;
}
</style>
