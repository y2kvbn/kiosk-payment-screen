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
        <span class="info-icon">👤</span>
        <div class="info-text">
            <div class="info-title">健保卡資訊</div>
            <div class="info-subtitle">Health insurance card information</div>
        </div>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(30);

const goHome = () => {
  router.push({ name: 'WelcomePage' });
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
    router.push({ name: 'CardProcessedPage' });
  }, 3000);
});

onUnmounted(() => {
  clearInterval(countdownTimer);
  clearTimeout(navigationTimer);
});

</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f0f4f8;
  font-family: 'Microsoft JhengHei', sans-serif;
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
    padding: 15px 30px;
    background-color: #66A390;
    color: #fff;
}

.info-icon {
    font-size: 2.5rem;
    margin-right: 20px;
}

.info-text {
    font-size: 1.8rem;
    font-weight: bold;
}

.info-subtitle {
    font-size: 1rem;
    font-weight: normal;
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
