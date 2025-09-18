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
      <h2 class="sub-message">請取回您的收據及健保卡</h2>
      <p class="countdown-message">{{ countdown }} 秒後將自動返回首頁</p>
      <button class="home-button" @click="goHome">回首頁</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['go-home']);
const countdown = ref(3); // Changed countdown to 3 seconds
let countdownTimer;

const goHome = () => {
  emit('go-home');
};

onMounted(() => {
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
.page-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  background-color: #e0f2f1;
  text-align: center;
}

.success-content {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8vh 8vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-message {
  font-size: 4.5rem;
  color: #28a745;
  font-weight: bold;
  margin: 20px 0;
}

.sub-message {
  font-size: 3rem;
  color: #333;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 3rem;
}

.countdown-message {
  font-size: 1.5rem;
  color: #6c757d;
  margin-bottom: 2rem;
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
  background-color: #007bff;
  color: white;
}

.home-button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

.success-icon {
  width: 120px;
  height: 120px;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #4bb71b;
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
    box-shadow: inset 0px 0px 0px 60px #4bb71b;
  }
}
</style>
