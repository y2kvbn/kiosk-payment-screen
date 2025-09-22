<template>
  <div class="payment-steps-container">
    <div v-if="currentStep > 0 && currentStep <= steps.length">
      <h2>{{ steps[currentStep - 1].title }}</h2>
      <p class="instruction">{{ steps[currentStep - 1].instruction }}</p>
      
      <!-- Spinner for processing steps -->
      <div v-if="steps[currentStep - 1].title === '處理中'" class="spinner"></div>

      <!-- Success icon for the last step -->
       <div v-if="currentStep === steps.length" class="success-animation">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>

    </div>
    <div class="nav-buttons">
        <button v-if="currentStep < steps.length" @click="$emit('go-back')" class="btn-back">返回</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: Array,
  currentStep: Number
});
defineEmits(['go-back']);
</script>

<style scoped>
.payment-steps-container {
  text-align: center;
  padding: 40px;
}
h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
}
.instruction {
  font-size: 1.5rem;
  color: #555;
  min-height: 100px;
}
.nav-buttons {
    margin-top: 50px;
}
.btn-back {
  width: 100%;
  padding: 15px;
  font-size: 1.2em;
  border-radius: 5px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-back:hover {
    background-color: #5a6268;
}

.spinner {
  margin: 30px auto;
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-animation {
  width: 100px;
  height: 100px;
  margin: 20px auto;
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
</style>
