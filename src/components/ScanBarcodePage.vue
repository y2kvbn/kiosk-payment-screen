<template>
  <div class="container">
    <header class="header">
      <div class="logo">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo">
      </div>
      <div class="current-time">{{ currentTime }}</div>
    </header>

    <main class="main-content">
      <h1 class="title">請將批價單或收據上的條碼對準下方的掃描器</h1>
      <div class="scanner-area">
        <img src="https://i.ibb.co/PG99ZD41/2025-09-18-181533.png" alt="Barcode" class="scanner-gif" @click="handleScan">
        <div class="scanner-line"></div>
      </div>
      <p class="instruction">請將手機或紙本條碼對準掃描器</p>
    </main>

    <footer class="footer">
      <button class="back-button" @click="goHome">回首頁</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['scan-complete', 'go-home']);
const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-TW', { hour12: false });
};

let timer;
onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const handleScan = () => {
  // Simulate a successful scan
  emit('scan-complete');
};

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
  font-family: 'Microsoft JhengHei', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
}

.scanner-area {
  position: relative;
  margin-bottom: 40px;
}

.scanner-gif {
  width: 300px;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
}

.scanner-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #ff0000;
  box-shadow: 0 0 10px #ff0000;
  animation: scan 2s infinite linear;
}

@keyframes scan {
  0% { top: 0; }
  50% { top: 100%; }
  100% { top: 0; }
}

.instruction {
  font-size: 1.8rem;
  color: #555;
}

.footer {
  padding: 20px 40px;
  background-color: #ffffff;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
