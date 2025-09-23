<template>
  <div class="page-view">
    <div class="success-content">
      <div class="success-icon">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
      <h1 class="main-message">繳費成功！</h1>
      <h2 class="sub-message">請選擇您的下一步</h2>
      <div class="button-group">
        <button class="home-button" @click="goHome">回首頁</button>
        <button class="print-button" @click="goToReceiptPage">列印收據</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const receiptData = ref(null);

// Simplified onMounted: Only retrieves data, no timers.
onMounted(() => {
  if (history.state && history.state.paymentDetails) {
    receiptData.value = history.state.paymentDetails;
  }
});

// goHome: Navigates to the WelcomePage as requested.
const goHome = () => {
  router.push({ name: 'WelcomePage' });
};

// goToReceiptPage: Navigates with state for auto-printing.
const goToReceiptPage = () => {
  if (receiptData.value) {
    router.push({
      name: 'ReceiptPage',
      state: { 
        paymentDetails: receiptData.value,
        autoPrint: true 
      }
    });
  } else {
    // Fallback if data is somehow missing
    console.error("Receipt data is missing. Cannot proceed to print.");
    goHome();
  }
};
</script>

<style scoped>
/* Styles remain unchanged and correct */
.page-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://i.ibb.co/Kc1mq3ZK/a901b86c-34ce-4727-8160-2149c5611b5c-processed-lightpdf-com.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Microsoft JhengHei', sans-serif;
  text-align: center;
}

.success-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 50px 80px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 80%;
  max-width: 1000px;
}

.success-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4caf50;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
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
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 60px #4caf50;
  }
}

.main-message {
  color: #333;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.sub-message {
  color: #555;
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.home-button, .print-button {
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.home-button {
  background-color: #007bff;
}

.home-button:hover {
  background-color: #0056b3;
}

.print-button {
  background-color: #28a745;
}

.print-button:hover {
  background-color: #218838;
}
</style>