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

        <!-- Combined View Area -->
        <div class="payment-view-area">
          <div class="card-instruction">
            <img :src="paymentImage" alt="Payment Method" class="payment-method-img"/>
            <p class="instruction-text-main">{{ instructionText.main }}</p>
            <p class="instruction-text-sub">{{ instructionText.sub }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons-container" :class="{ 'processing': isProcessing }">
             <button v-if="paymentView === 'select' || paymentView === 'cash'" class="action-button cash-button" @click="handleCashAction" :disabled="isProcessing">
                <span class="icon">$</span>
                <div>
                  {{ paymentView === 'select' ? '現金繳費' : '確認付款' }}<br>
                  <span class="subtext">{{ paymentView === 'select' ? 'Cash' : 'CONFIRM' }}</span>
                </div>
            </button>
             <button v-if="paymentView === 'select' || paymentView === 'card'" class="action-button card-button" @click="handleCardAction" :disabled="isProcessing">
                <span class="icon">💳</span>
                <div>
                  {{ paymentView === 'select' ? '信用卡' : '確認付款' }}<br>
                  <span class="subtext">{{ paymentView === 'select' ? 'Credit Card' : 'CONFIRM' }}</span>
                </div>
            </button>
             <button v-if="paymentView !== 'select'" class="action-button cancel-button" @click="cancelPayment" :disabled="isProcessing">
                <span class="icon">✕</span>
                <div>
                  取消 <br>
                  <span class="subtext">CANCEL</span>
                </div>
            </button>
          </div>
        </div>

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

const paymentImage = computed(() => {
  if (paymentView.value === 'cash') return 'https://i.ibb.co/tTwXvTHs/Cash-Paying.gif';
  if (paymentView.value === 'card') return 'https://i.ibb.co/4ZjcJ87w/istockphoto-1330150853-612x612-Photoroom.png';
  return 'https://i.ibb.co/qMs91zsm/Chat-GPT-Image-2025-9-23-10-29-28.png';
});

const instructionText = computed(() => {
  switch (paymentView.value) {
    case 'cash':
      return { main: '請投入紙鈔或硬幣', sub: 'Please put in cash' };
    case 'card':
      return { main: '請感應信用卡', sub: 'Please tap your credit card' };
    case 'processing':
       return { main: "處理中, 請稍後", sub: "Processing, please wait" };
    default:
      return { main: '確認就醫資料,並選擇繳費方式', sub: 'Confirm medical details and select a payment method' };
  }
});

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

const handleCashAction = () => {
  if (paymentView.value === 'select') {
    paymentView.value = 'cash';
  } else {
    confirmPayment();
  }
};

const handleCardAction = () => {
  if (paymentView.value === 'select') {
    paymentView.value = 'card';
  } else {
    confirmPayment();
  }
};

const cancelPayment = () => {
  if (isProcessing.value) return;
  router.push('/kiosk'); // Navigate to the main kiosk page
};

const confirmPayment = () => {
  isProcessing.value = true;
  const originalView = paymentView.value;
  paymentView.value = 'processing';
  clearInterval(timer); // Stop countdown during processing
  setTimeout(() => {
    router.push('/card-success');
  }, 3000);
}

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
  cursor: pointer;
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
  color: #333;
}

.table-header {
  background-color: #e0e0e0;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.table-header span {
  font-size: 20px; /* Increased by ~10% from 18px */
}

.table-row {
  border-bottom: 1px solid #e0e0e0;
  font-size: 22px; /* Increased by 10% from 20px */
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
  font-size: 26px; /* Increased by ~10% from 24px */
  font-weight: bold;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.table-footer .total-amount {
  font-size: 33px; /* Increased by 10% from 30px */
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  flex-shrink: 0; /* Prevent shrinking */
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

.payment-view-area {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.card-instruction {
  text-align: center;
  margin-top: 20px; /* Add some space */
}

.payment-method-img {
  width: 270px;  /* 250px * 1.08 */
  height: 194px; /* 180px * 1.08 */
  object-fit: contain; /* Ensure aspect ratio is maintained */
  margin-bottom: 15px;
  border-radius: 8px;
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
  margin-top: 20px; /* Add space */
}

.action-buttons-container.processing {
    justify-content: center;
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
  transition: all 0.2s;
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

.cancel-button {
  background-color: #d9534f; /* Red color for cancel */
  box-shadow: 0 4px #b54541;
  flex: 1.2; 
}

.action-button:disabled {
  background-color: #9a9a9a;
  box-shadow: 0 4px #7b7b7b;
  cursor: not-allowed;
  opacity: 0.7;
}

</style>
