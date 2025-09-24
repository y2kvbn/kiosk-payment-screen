<template>
  <div class="page-view">
    <div class="success-content no-print">
      <div class="success-icon">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h1 class="main-message">付款成功！</h1>
      <h2 class="sub-message">感謝您的使用，請選擇下一步操作</h2>
      <div class="button-group">
        <button class="home-button" @click="goHome">回首頁</button>
        <button class="print-button" @click="printReceipt">列印收據</button>
      </div>
    </div>

    <!-- Hidden receipt for printing -->
    <div v-if="receiptData" class="receipt-container" id="receipt-content">
        <div class="receipt-header">
            <div class="hospital-logo">
                <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo">
                <h1>臺安醫院-雙十分院</h1>
            </div>
            <h2>住院醫療費用明細收據 <br><span>INPATIENT BILLING STATEMENT AND RECEIPT</span></h2>
        </div>
        
        <div class="patient-details">
            <div class="detail-grid">
                <div class="grid-item"><span>日期 Statement Date:</span> {{ todayDate }}</div>
                <div class="grid-item"><span>費用期間 Period Covered:</span> {{ todayDate }}</div>
                <div class="grid-item"><span>收據單號 Recpt. No.:</span> {{ receiptNumber }}</div>
                <div class="grid-item"><span>病歷號 Chart No.:</span> {{ receiptData.chartNumber }}</div>
                <div class="grid-item"><span>姓 名 Name:</span> {{ receiptData.patientName }}</div>
                <div class="grid-item"><span>繳款方式 Payment Option:</span> {{ paymentMethod }}</div>
                <div class="grid-item"><span>主治醫師 Doctor:</span> 陳一心</div>
                <div class="grid-item"><span>看診身份 Status:</span> 健保</div>
                <div class="grid-item"><span>床號 Bed No.:</span> 0604-001</div>
                <div class="grid-item"><span>科 別 Service:</span> (多科)</div>
                <div class="grid-item"><span>收費人員 Cashier:</span> KIOSK-01</div>
                <div class="grid-item"><span>印表時間:</span> {{ printTime }}</div>
            </div>
        </div>

        <div class="items-section">
             <div class="stamp-overlay">
                <div class="stamp-circle">
                    <div class="stamp-text-top">臺安醫院</div>
                    <div class="stamp-text-center">{{ stampDate }}</div>
                    <div class="stamp-text-bottom">費用專用</div>
                </div>
            </div>
            <div class="items-grid">
                <div class="items-column">
                    <div class="items-header">
                        <span>費用項目 Service</span>
                        <span class="amount-col">健保 NHI(NTS)</span>
                        <span class="amount-col">自費 Self Pay(NTS)</span>
                    </div>
                    <div class="items-body">
                        <div v-for="(item, index) in leftColumnItems" :key="`L-${index}`" class="item-row">
                            <span>{{ item.name }}</span>
                            <span class="amount-col">{{ item.amount.toLocaleString() }}</span>
                            <span class="amount-col">0</span>
                        </div>
                    </div>
                </div>
                <div class="items-column">
                    <div class="items-header">
                        <span>費用項目 Service</span>
                        <span class="amount-col">健保 NHI(NTS)</span>
                        <span class="amount-col">自費 Self Pay(NTS)</span>
                    </div>
                     <div class="items-body">
                        <div v-for="(item, index) in rightColumnItems" :key="`R-${index}`" class="item-row">
                            <span>{{ item.name }}</span>
                             <span class="amount-col">{{ item.amount.toLocaleString() }}</span>
                            <span class="amount-col">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="summary-section">
           <div class="summary-grid">
                <div class="summary-item label">部份負擔總額:</div>
                <div class="summary-item value">5%: 0</div>
                <div class="summary-item value">10%: 0</div>
                <div class="summary-item value">20%: 0</div>
                <div class="summary-item value">30%: 0</div>
                <div class="summary-item value">合計 Total: 0</div>
            </div>
            <div class="final-summary">
                <div class="final-item">
                    <span>總金額 Total Billed:</span>
                    <span class="amount">{{ totalAmount.toLocaleString() }}</span>
                </div>
                <div class="final-item">
                    <span>實繳金額 Billed Net:</span>
                    <span class="amount">{{ totalAmount.toLocaleString() }}</span>
                </div>
                <div class="final-item">
                    <span>尚欠金額 Balance:</span>
                    <span class="amount">0</span>
                </div>
                <div class="final-item right-aligned">
                    <span>Amount Payable:</span>
                    <span class="amount">{{ totalAmount.toLocaleString() }}</span>
                </div>
           </div>
        </div>
         <div class="receipt-footer-note">
            ※注意事項請參看背面 - Please turn over for English translation -
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const receiptData = ref(null);
const paymentMethod = ref('信用卡'); // Assuming card payment for now

const today = new Date();
const todayDate = today.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
const printTime = today.toLocaleTimeString('zh-TW', { hour12: false });
const stampDate = `${today.getMonth() + 1}.${today.getDate()}`;

const receiptNumber = computed(() => {
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `KIOSK${year}${month}${day}001`;
});

const totalAmount = computed(() => {
    if (!receiptData.value || !receiptData.value.detailedItems) return 0;
    return receiptData.value.detailedItems.reduce((sum, item) => sum + item.amount, 0);
});

const leftColumnItems = computed(() => {
    if (!receiptData.value || !receiptData.value.detailedItems) return [];
    const items = receiptData.value.detailedItems;
    const mid = Math.ceil(items.length / 2);
    return items.slice(0, mid);
});

const rightColumnItems = computed(() => {
    if (!receiptData.value || !receiptData.value.detailedItems) return [];
    const items = receiptData.value.detailedItems;
    const mid = Math.ceil(items.length / 2);
    return items.slice(mid);
});

onMounted(() => {
  if (history.state && history.state.paymentDetails) {
    receiptData.value = history.state.paymentDetails;
    if (history.state.paymentMethod) {
        paymentMethod.value = history.state.paymentMethod === 'cash' ? '現金' : '信用卡';
    }
  } else {
    console.error("Receipt data is not available.");
  }
});

const goHome = () => {
  router.push('/kiosk');
};

const printReceipt = () => {
  window.print();
};
</script>

<style scoped>
/* --- Non-Print Styles --- */
.page-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://i.ibb.co/QFVmVBhj/694578.jpg');
  background-size: cover;
  font-family: 'Microsoft JhengHei', sans-serif;
  text-align: center;
}

.success-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 50px 80px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.success-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke: #4caf50;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #4caf50;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% { stroke-dashoffset: 0; }
}
@keyframes scale {
  0%, 100% { transform: none; }
  50% { transform: scale3d(1.1, 1.1, 1); }
}
@keyframes fill {
  100% { box-shadow: inset 0px 0px 0px 60px #4caf50; }
}

.main-message {
  font-size: 3rem;
  font-weight: bold;
}
.sub-message {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 40px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.home-button, .print-button {
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}
.home-button { background-color: #007bff; }
.home-button:hover { background-color: #0056b3; }
.print-button { background-color: #28a745; }
.print-button:hover { background-color: #218838; }


/* --- General Print Styles --- */
@media print {
  .no-print {
    display: none !important;
  }
  .page-view {
    background: none;
    display: block;
    height: auto;
    text-align: left;
  }
  .receipt-container {
    display: block !important;
  }
}

@page {
  size: A5 landscape;
  margin: 1cm;
}

/* --- Receipt Styles (Hidden by default) --- */
.receipt-container {
  display: none; /* Hidden by default */
  width: 100%;
  font-family: 'Microsoft JhengHei', 'Heiti TC', sans-serif;
  color: #000;
  background: white;
  padding: 15px;
  box-sizing: border-box;
}

.receipt-header {
  text-align: center;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.hospital-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.hospital-logo img {
  height: 24px;
}
.receipt-header h1 {
  font-size: 20px; 
  font-weight: bold;
  margin: 0;
}
.receipt-header h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0 0 0;
}
.receipt-header h2 span {
  font-size: 12px;
  font-weight: normal;
}

.patient-details {
  margin-bottom: 10px;
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  gap: 2px 10px;
  font-size: 11px;
}
.grid-item span {
  font-weight: bold;
}

.items-section {
  position: relative;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  padding: 5px 0;
}

.stamp-overlay {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
}
.stamp-circle {
    border: 3px solid red;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
    line-height: 1.2;
}
.stamp-text-center {
    font-size: 18px;
    border-top: 2px solid red;
    border-bottom: 2px solid red;
    margin: 2px 0;
    padding: 1px 0;
}

.items-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font-size: 11px;
}
.items-column .items-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding-bottom: 3px;
}
.items-body {
  padding-top: 3px;
  min-height: 100px; /* Ensure space for the stamp */
}
.item-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
.amount-col {
  text-align: right;
}

.summary-section {
  margin-top: 5px;
  font-size: 11px;
}
.summary-grid {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.summary-item.label { font-weight: bold; }

.final-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 20px;
}
.final-item {
    display: flex;
    justify-content: space-between;
}
.final-item .amount {
    text-align: right;
    min-width: 60px;
}
.final-item.right-aligned {
    grid-column: 2;
    font-weight: bold;
}

.receipt-footer-note {
    margin-top: 10px;
    font-size: 10px;
    text-align: center;
}
</style>