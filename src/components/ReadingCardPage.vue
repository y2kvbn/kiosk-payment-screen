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
      <div class="content-panel">
        <div class="icon-container">
          <div class="loader"></div>
        </div>
        <h1 class="status-text">讀取卡片中，請稍候...</h1>
        <p class="status-subtitle">Reading card, please wait...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['card-read-success', 'go-home']);

const countdown = ref(118);

const goHome = () => {
  emit('go-home');
};

let countdownTimer;
let navigationTimer;

onMounted(() => {
  // Start countdown timer
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      goHome();
    }
  }, 1000);

  // Simulate card reading for 3 seconds
  navigationTimer = setTimeout(() => {
    emit('card-read-success');
  }, 3000);
});

onUnmounted(() => {
  clearInterval(countdownTimer);
  clearTimeout(navigationTimer);
});

</script>

<style scoped>
/* Using similar styles from other pages for consistency */
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

.step-number-inactive { opacity: 0.7; }
.step-text, .step-text-inactive {
  display: flex;
  flex-direction: column;
  font-size: 1.7rem;
}

.step-text { font-weight: bold; }
.step-text-inactive { font-weight: normal; }

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
}

.main-content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.content-panel {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 60px 100px;
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.icon-container {
  margin-bottom: 30px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: 0 auto; /* Center the loader */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-text {
  font-size: 2.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.status-subtitle {
  font-size: 1.5rem;
  color: #666;
}
</style>
