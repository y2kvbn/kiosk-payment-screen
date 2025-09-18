<template>
  <div class="container">
    <header class="header">
      <div class="logo">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo">
      </div>
      <div class="current-time">{{ currentTime }}</div>
    </header>
    <div class="page-view">
      <div class="reading-content">
        <div class="spinner"></div>
        <h1 class="main-message">健保卡過卡中，請稍後！</h1>
        <h2 class="sub-message">請勿抽出健保卡。</h2>
        <button class="home-button" @click="goHome">回首頁</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['card-read-success', 'go-home']);

// For the clock
const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-TW', { hour12: false });
};
let timer;

// For the card reading simulation
let successTimer;

onMounted(() => {
  // Clock logic
  updateTime();
  timer = setInterval(updateTime, 1000);

  // Card reading logic
  successTimer = setTimeout(() => {
    emit('card-read-success');
  }, 3000);
});

onUnmounted(() => {
  // Clock logic
  clearInterval(timer);
  // Card reading logic
  clearTimeout(successTimer);
});

const goHome = () => {
  emit('go-home');
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f4f8;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 60px;
}

.current-time {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.page-view {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
}

.reading-content {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8vh 8vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0.9);
}

.spinner {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin-bottom: 40px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.main-message {
  font-size: 4.5rem;
  color: #333;
  font-weight: bold;
  margin: 0;
}

.sub-message {
  font-size: 3rem;
  color: #007bff;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 3rem;
}

.home-button {
  border: none;
  border-radius: 15px;
  padding: 20px 60px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  background-color: #a7d8de;
  color: #333;
}

.home-button:hover {
  background-color: #8ac6cf;
  transform: translateY(-3px);
}
</style>
