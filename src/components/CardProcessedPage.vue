
<template>
  <div class="page-container">
    <header class="header">
      <div class="logo-container">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo" class="logo-img">
      </div>
    </header>

    <div class="info-bar">
        <span class="info-icon">💳</span>
        <div class="info-text">
            <div class="info-title">健保卡資訊</div>
            <div class="info-subtitle">Health insurance card information</div>
        </div>
    </div>

    <main class="main-content">
      <div class="card-processed-box">
        <img 
          src="https://i.ibb.co/pvDHXq5r/Chat-GPT-Image-2025-9-18-03-49-32-Photoroom.png" 
          alt="Health Insurance Card" 
          class="health-card-img">
        <h2 class="instruction-text">過卡完成,請抽出健保卡</h2>
        <p class="instruction-subtext">Health insurance card progressing is Finished Please draw out health insurance card</p>
      </div>
    </main>

    <footer class="footer">
      <!-- This footer is intentionally empty to maintain layout consistency -->
    </footer>
  </div>
</template>

<script setup>
import { onMounted, defineEmits } from 'vue';

const emit = defineEmits(['card-removed']);

// Automatically transition to the next page after 3 seconds
onMounted(() => {
  setTimeout(() => {
    emit('card-removed');
  }, 3000);
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
}

.info-bar {
    display: flex;
    align-items: center;
    padding: 15px 30px;
    background-color: #62a691;
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

.card-processed-box {
  background-color: #fff;
  border-radius: 20px;
  padding: 50px 100px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.health-card-img {
  max-width: 400px;
  margin-bottom: 20px;
  border-radius: 15px;
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

.footer {
  padding: 65px; /* Adjust padding to match other footers */
  background-color: #f0f4f8;
}
</style>
