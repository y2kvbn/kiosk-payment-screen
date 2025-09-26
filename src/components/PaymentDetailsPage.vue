<template>
  <div class="page-container">
    <header class="header">
      <div class="logo-container">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo" class="logo-img">
        <span class="logo-text">臺安醫院雙十分院 <br> Tai-An Hospital Shuang Shi Branch</span>
      </div>
      <div class="countdown-container">
        自動回首頁：<span class="seconds">{{ countdown }}</span>
      </div>
    </header>

    <div class="info-bar">
        <img src="/payment_icon.png" alt="Payment Icon" class="info-icon">
        <div class="info-text">
            <div class="info-title">繳費資訊</div>
            <div class="info-subtitle">Payment Information</div>
        </div>
    </div>

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
            <div class="table-row" v-for="(item, index) in paymentData.summaryItems" :key="index">
              <span>{{ item.date }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.mrn }}</span>
              <span>{{ item.clinic }}</span>
              <span>{{ item.amount.toLocaleString() }}</span>
            </div>
          </div>
          <div class="table-footer">
            <span>合計金額 <br>Total expense</span>
            <span class="total-amount">{{ totalAmount.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="amount-payable">
          <span class="label">應繳金額 <br>AMOUNT PAYABLE</span>
          <span class="amount">{{ totalAmount.toLocaleString() }}</span>
        </div>

        <div class="payment-view-area">
          <div class="card-instruction">
            <img :src="paymentImage" alt="Payment Method" class="payment-method-img"/>
            <p class="instruction-text-main">{{ instructionText.main }}</p>
            <p class="instruction-text-sub">{{ instructionText.sub }}</p>
          </div>

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

const paymentView = ref('select');
const paymentMethod = ref(null);
const isProcessing = ref(false);

const paymentData = ref({
  patientName: '王大明',
  chartNumber: '984751',
  summaryItems: [
    { date: '2024/07/26', name: '王大明', mrn: '984751', clinic: '心臟內科', amount: 1000 },
    { date: '2024/07/26', name: '王大明', mrn: '984751', clinic: '皮膚科', amount: 500 },
    { date: '2024/07/26', name: '王大明', mrn: '984751', clinic: '家醫科', amount: 400 },
    { date: '2024/07/26', name: '王大明', mrn: '984751', clinic: '耳鼻喉科', amount: 350 },
  ],
  detailedItems: [
    { name: '掛號費', amount: 150 },
    { name: '門診診察費 - 心臟內科', amount: 450 },
    { name: '藥品費 - 心臟內科', amount: 400 },
    { name: '門診診察費 - 皮膚科', amount: 250 },
    { name: '藥品費 - 皮膚科', amount: 250 },
    { name: '門診診察費 - 家醫科', amount: 200 },
    { name: '藥品費 - 家醫科', amount: 200 },
    { name: '門診診察費 - 耳鼻喉科', amount: 150 },
    { name: '藥品費 - 耳鼻喉科', amount: 200 },
  ]
});

const totalAmount = computed(() => {
  return paymentData.value.detailedItems.reduce((sum, item) => sum + item.amount, 0);
});

const paymentImage = computed(() => {
  if (paymentView.value === 'processing') {
    if (paymentMethod.value === 'cash') return 'https://i.ibb.co/tTwXvTHs/Cash-Paying.gif';
    if (paymentMethod.value === 'card') return 'https://i.ibb.co/4ZjcJ87w/istockphoto-1330150853-612x612-Photoroom.png';
  }
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

const resetCountdown = () => {
  countdown.value = 120;
};

onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      goHome();
    }
  }, 1000);
  window.addEventListener('click', resetCountdown);
});

onUnmounted(() => {
  clearInterval(timer);
  window.removeEventListener('click', resetCountdown);
});

const goHome = () => {
  router.push('/kiosk');
};

const handleCashAction = () => {
  if (paymentView.value === 'select') {
    paymentView.value = 'cash';
    paymentMethod.value = 'cash';
  } else {
    confirmPayment();
  }
};

const handleCardAction = () => {
  if (paymentView.value === 'select') {
    paymentView.value = 'card';
    paymentMethod.value = 'card';
  } else {
    confirmPayment();
  }
};

const cancelPayment = () => {
  if (isProcessing.value) return;
  paymentView.value = 'select';
  paymentMethod.value = null;
};

const confirmPayment = () => {
  isProcessing.value = true;
  paymentView.value = 'processing';
  clearInterval(timer);
  window.removeEventListener('click', resetCountdown); // Stop resetting during processing

  setTimeout(() => {
    router.push({
      name: 'PaymentReceivedPage',
      state: { 
        paymentDetails: JSON.parse(JSON.stringify(paymentData.value)),
        paymentMethod: paymentMethod.value
      }
    });
  }, 3000);
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');

.page-container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f4f8;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
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
  margin-right: 10px;
}

.logo-text {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.2;
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

.info-bar {
    display: flex;
    align-items: center;
    padding: 12px 30px;
    background-color: #66A390; /* A shade of green */
    color: white;
}

.info-icon {
    height: 50px;
    width: 50px;
    margin-right: 20px;
    object-fit: contain;
}

.info-text {
    display: flex;
    flex-direction: column;
}

.info-title {
    font-size: 1.8em;
    font-weight: bold;
}

.info-subtitle {
    font-size: 1em;
    opacity: 0.9;
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
  background-color: #e9ecef;
  font-weight: bold;
  font-size: 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}


.table-row {
  border-bottom: 1px solid #dee2e6;
  font-size: 24px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-body {
  flex-grow: 1;
  overflow-y: auto;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background-color: #8db59d;
  color: white;
  font-size: 26px;
  font-weight: bold;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.table-footer .total-amount {
  font-size: 33px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.amount-payable {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-shrink: 0;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 15px;
  margin-bottom: 15px;
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
  margin-top: 20px;
}

.payment-method-img {
  width: 342px;
  height: 245px;
  object-fit: contain;
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
  margin-top: 20px;
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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
}

.card-button {
  background-color: #4267b2;
}

.cancel-button {
  background-color: #d9534f;
  flex: 1.2;
}

.action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
}

.action-button:active {
    transform: translateY(1px);
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
}

.action-button:disabled {
  background-color: #9a9a9a;
  cursor: not-allowed;
  opacity: 0.7;
  transform: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

</style>