<template>
  <div class="receipt-container">
    <div class="toolbar no-print">
      <button @click="goBack" class="btn back-btn">返回</button>
      <button @click="printReceipt" class="btn print-btn">列印收據</button>
    </div>

    <!-- Render receipt only if paymentDetails exists -->
    <div v-if="paymentDetails" class="receipt-paper" id="receipt-content">
      <div class="receipt-header">
        <h1>臺安醫院雙十分院</h1>
        <h2>醫療費用收據</h2>
        <h3>Tai-An Hospital Shuang Shi Branch - Medical Expense Receipt</h3>
      </div>

      <div class="patient-info">
        <div class="info-row">
          <span>姓名 (Name): <strong>{{ paymentDetails.patientName }}</strong></span>
          <span>病歷號 (Chart No.): <strong>{{ paymentDetails.chartNumber }}</strong></span>
        </div>
        <div class="info-row">
          <span>收據日期 (Date): <strong>{{ paymentDetails.date }}</strong></span>
          <span>收據號碼 (Receipt No.): <strong>{{ paymentDetails.receiptNumber }}</strong></span>
        </div>
      </div>
      
      <div class="billing-section">
        <div class="stamp-watermark">
            臺安醫院<br>醫療費用<br>專用章
        </div>
        <table class="billing-table">
          <thead>
            <tr>
              <th class="item-col">費用項目 (Description)</th>
              <th class="amount-col">金額 (Amount NT$)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paymentDetails.items" :key="item.name">
              <td>{{ item.name }}</td>
              <td class="text-right">{{ item.amount.toLocaleString() }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td><strong>總計 (Total)</strong></td>
              <td class="text-right"><strong>{{ totalAmount.toLocaleString() }}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="receipt-footer">
        <span>此收據為電腦列印，僅供參考</span>
        <span>Printed by automated system, for reference only.</span>
      </div>
    </div>
    
    <!-- Show a message if data is missing -->
    <div v-else class="loading-error">
        <h2>無法載入收據資料</h2>
        <p>正在將您導回首頁...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// This will hold the data passed from the previous page.
const paymentDetails = ref(null);

// This computed property will only calculate if paymentDetails is not null.
const totalAmount = computed(() => {
  if (!paymentDetails.value) return 0;
  return paymentDetails.value.items.reduce((sum, item) => sum + item.amount, 0);
});

onMounted(() => {
  const state = history.state;

  // 1. Check if the required paymentDetails data exists.
  if (state && state.paymentDetails) {
    paymentDetails.value = state.paymentDetails;

    // 2. Check for the autoPrint flag.
    if (state.autoPrint) {
      // Use nextTick to ensure the DOM is fully updated before printing.
      // vue.nextTick(() => {
        printReceipt();
      // });
    }
  } else {
    // 3. If no data, redirect to home page after a short delay.
    console.error("ReceiptPage: No payment details found in history state.");
    setTimeout(() => {
      router.push({ name: 'WelcomePage' });
    }, 2000);
  }
});

const printReceipt = () => {
  // Standard browser print functionality
  window.print();
};

const goBack = () => {
  // Navigate back to the main kiosk page, not the success page.
  router.push({ name: 'WelcomePage' });
};

</script>


<style scoped>
/* General Styles */
.receipt-container {
  padding: 2rem;
  background-color: #e9e9e9;
  font-family: 'Microsoft JhengHei', 'Heiti TC', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toolbar {
  width: 210mm; /* Match A5 landscape width */
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.back-btn {
  background-color: #6c757d;
  color: white;
}
.back-btn:hover {
  background-color: #5a6268;
}
.print-btn {
  background-color: #007bff;
  color: white;
}
.print-btn:hover {
  background-color: #0056b3;
}

/* Receipt Paper Styles */
.receipt-paper {
  width: 210mm; /* A5 Landscape Width */
  height: 148mm; /* A5 Landscape Height */
  padding: 15mm;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  color: #333;
  position: relative; /* For watermark positioning */
}

.loading-error {
    text-align: center;
    padding: 4rem;
    font-size: 1.2rem;
    color: #555;
}

.receipt-header {
  text-align: center;
  margin-bottom: 1.5rem;
}
.receipt-header h1 {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}
.receipt-header h2 {
  font-size: 1.5rem;
  margin: 0.2rem 0;
  font-weight: normal;
}
.receipt-header h3 {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
  font-weight: normal;
}

.patient-info {
  border-top: 2px dashed #ccc;
  border-bottom: 2px dashed #ccc;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.info-row:last-child {
  margin-bottom: 0;
}
.info-row span {
  flex: 1;
}

.billing-section {
    position: relative; /* Needed for the watermark */
    min-height: 40%; /* Ensure space for watermark */
}

.stamp-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-20deg);
    color: #ff0000;
    border: 5px solid #ff0000;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    line-height: 1.2;
    opacity: 0.15;
    pointer-events: none; /* Make it unclickable */
    z-index: 0;
}

.billing-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  position: relative; /* To appear above watermark */
  z-index: 1;
  background-color: transparent; /* Allows watermark to be visible */
}

.billing-table th, .billing-table td {
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid #eee;
}

.billing-table thead th {
  text-align: left;
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;
}

.item-col {
  width: 80%;
}

.amount-col {
  width: 20%;
}

.text-right {
  text-align: right;
}

.total-row td {
  border-top: 2px solid #333;
  padding-top: 1rem;
  font-size: 1.1rem;
}

.receipt-footer {
  position: absolute;
  bottom: 15mm;
  left: 15mm;
  right: 15mm;
  text-align: center;
  font-size: 0.75rem;
  color: #888;
}
.receipt-footer span {
    display: block;
}


/* --- Print Styles --- */
@media print {
  @page {
    size: A5 landscape;
    margin: 0;
  }

  body, .receipt-container {
    background-color: #fff;
    padding: 0;
    margin: 0;
  }
  
  .no-print {
    display: none;
  }

  .receipt-paper {
    width: 100%;
    height: 100%;
    box-shadow: none;
    border: none;
    padding: 10mm; /* Adjust margins for printing */
    box-sizing: border-box;
  }

  .receipt-header h1 { font-size: 16pt; }
  .receipt-header h2 { font-size: 14pt; }
  .receipt-header h3 { font-size: 8pt; }
  
  .patient-info, .billing-table {
      font-size: 9pt;
  }
  
  .total-row td {
      font-size: 10pt;
  }
  
  .stamp-watermark {
      opacity: 0.1; /* Make it lighter for printing */
  }

  .receipt-footer {
      bottom: 10mm;
      left: 10mm;
      right: 10mm;
      font-size: 7pt;
  }
}
</style>