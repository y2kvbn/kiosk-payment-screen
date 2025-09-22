<template>
  <div class="welcome-container">
    <div class="content-box">
      <div class="logo-container">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo" class="logo-icon">
      </div>
      <h1 class="main-title">自助繳費機</h1>
      <p class="welcome-message">Welcome to use the Self-service payment machine of TASSH HOSPITAL</p>
    </div>
    <div v-if="!isLoading" class="start-button-container">
      <button @click="startLoading" class="start-button">開啟程式</button>
    </div>
    <div v-else class="loading-container">
      <p class="loading-text">機器啟動中, 請稍後...</p>
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const progress = ref(0);

const startLoading = () => {
  isLoading.value = true;
  const intervals = [
    { percent: 10, delay: 500 },
    { percent: 50, delay: 1000 },
    { percent: 80, delay: 1500 },
    { percent: 100, delay: 2000 },
  ];

  intervals.forEach(interval => {
    setTimeout(() => {
      progress.value = interval.percent;
      if (interval.percent === 100) {
        setTimeout(() => router.push({ name: 'KioskPage' }), 500);
      }
    }, interval.delay);
  });
};
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://i.ibb.co/Kc1mq3ZK/a901b86c-34ce-4727-8160-2149c5611b5c-processed-lightpdf-com.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Microsoft JhengHei', sans-serif;
}

.content-box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 50px 80px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 80%;
  max-width: 1000px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.logo-icon {
  height: 60px;
}

.main-title {
  font-size: 5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.welcome-message {
  font-size: 1.5rem;
  color: #555;
  margin-top: 10px;
}

.start-button-container {
  margin-top: 40px;
}

.start-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 20px 60px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
}

.start-button:hover {
  background-color: #0056b3;
}

.loading-container {
  margin-top: 40px;
  text-align: center;
  width: 80%;
  max-width: 1000px;
}

.loading-text {
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 30px;
  background-color: #007bff;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}
</style>
