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
      <div class="card-insertion-box">
        <img 
          src="https://i.ibb.co/pvDHXq5r/Chat-GPT-Image-2025-9-18-03-49-32-Photoroom.png" 
          alt="Health Insurance Card" 
          class="health-card-img" 
          @click="handleCardInsert">
        <h2 class="instruction-text">請插入健保卡</h2>
        <p class="instruction-subtext">Please Insert health insurance card</p>
      </div>
    </main>
    <div class="footer-actions">
      <button class="btn btn-cancel" @click="goHome">❌ 取消繳費 <span class="btn-subtitle">CANCEL</span></button>
    </div>
    <audio ref="audioPlayer" src="/insert_card_sound.mp3" autoplay></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const countdown = ref(30);
const audioPlayer = ref(null);

const handleCardInsert = () => {
  router.push({ name: 'ReadingCardPage' });
};

const goHome = () => {
  router.push({ name: 'WelcomePage' });
};

let countdownTimer;
onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.play();
  }
  
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      goHome();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(countdownTimer);
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

.card-insertion-box {
  background-color: #fff;
  border-radius: 20px;
  padding: 50px 100px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.health-card-img {
  max-width: 400px;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.health-card-img:hover {
    transform: scale(1.05);
}

.instruction-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 20px 0 10px;
}

.instruction-subtext {
  font-size: 1.5rem;
  color: #555;
}

.footer-actions {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #555;
  border: 2px solid #ccc;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-subtitle {
    font-size: 0.9rem;
    font-weight: normal;
    margin-left: 8px;
}

.btn-cancel:hover {
    filter: brightness(1.1);
}
</style>