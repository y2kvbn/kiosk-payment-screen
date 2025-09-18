<template>
  <div class="kiosk-container">
    <div class="header">
      <div class="logo">
        <img src="https://i.ibb.co/tTrdQpY1/logo2.png" alt="Logo" />
      </div>
      <div class="date-time">{{ currentTime }}</div>
    </div>

    <div class="main-content">
      <div class="left-column">
        <div class="main-title">
          <p>歡迎使用自助繳費機</p>
          <p class="subtitle">請先點選服務項目按鈕</p>
        </div>
        <div class="button-stack">
          <div class="button color1" @click="emit('go-home')">
            <div class="button-content">
              <div class="button-title">慢箋領藥</div>
              <div class="button-subtitle">Refilling a Prescription</div>
            </div>
            <div class="button-icon-wrapper">
              <img src="https://img.88icon.com/download/jpg/20200821/b19eca3bcf7ef82cf953d17723f377d1_512_512.jpg!bg" alt="慢箋領藥" />
            </div>
          </div>
          <div class="button color2" @click="emit('go-home')">
            <div class="button-content">
              <div class="button-title">收據補印</div>
              <div class="button-subtitle">Reissue receipt</div>
            </div>
            <div class="button-icon-wrapper">
              <img src="https://cdn-icons-png.freepik.com/512/4587/4587583.png" alt="收據補印" />
            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="button-stack">
          <div class="button color3" @click="startPayment">
            <div class="button-content">
              <div class="button-title">批價繳費</div>
              <div class="button-subtitle">Pay Medical expenses</div>
            </div>
            <div class="button-icon-wrapper">
              <img src="https://media.istockphoto.com/id/1042581782/zh/%E5%90%91%E9%87%8F/%E4%BB%98%E6%AC%BE%E5%96%AE%E6%93%9A%E9%A0%81%E7%9A%84%E7%99%BC%E7%A5%A8%E6%88%96%E5%B8%B3%E5%96%AE%E5%90%91%E9%87%8F%E5%9C%96%E7%A4%BA.jpg?s=612x612&w=0&k=20&c=j20I-YxMpVs5uVfWgzNfm1rrTg0Dz864TbrZcHsI4MA=" alt="批價繳費" />
            </div>
          </div>
          <div class="button color4" @click="emit('go-home')">
            <div class="button-content">
              <div class="button-title">復健同療</div>
              <div class="button-subtitle">Pay therapy sessionfee</div>
            </div>
            <div class="button-icon-wrapper">
              <img src="https://www.shutterstock.com/image-vector/back-pain-treatment-logo-design-260nw-2056533320.jpg" alt="復健同療" />
            </div>
          </div>
          <div class="button color5" @click="emit('go-home')">
            <div class="button-content">
              <div class="button-title">預約掛號</div>
              <div class="button-subtitle">Make an appointment</div>
            </div>
            <div class="button-icon-wrapper">
              <img src="https://img.88icon.com/download/jpg/20201201/57c49dbff67a63bb490263d91a36b82e_512_512.jpg!bg" alt="預約掛號" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(['start-payment', 'go-home']);

const currentTime = ref("");

const startPayment = () => {
  emit('start-payment');
};

const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

let intervalId;
onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.kiosk-container {
  width: 100vw;
  height: 100vh;
  font-family: "Microsoft JhengHei", sans-serif;
  background-image: url('https://i.ibb.co/Kc1mq3ZK/a901b86c-34ce-4727-8160-2149c5611b5c-processed-lightpdf-com.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

.header {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
}

.logo {
  display: flex;
  align-items: center;
  margin-left: 1cm;
}

.logo img {
  height: 72px;
}

.date-time {
  font-size: 1.6em;
  font-weight: bold;
  color: #333;
}

.main-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  padding: 2vh 40px;
  height: calc(100vh - 90px);
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 45%;
  max-width: 600px;
}

.main-title {
  text-align: left;
  padding: 20px;
}

.main-title p {
  margin: 0;
  font-size: 2.8em;
  font-weight: 900;
  color: #2c3e50;
}

.main-title .subtitle {
  font-size: 1.8em;
  color: #d35400;
  margin-top: 10px;
}

.button-stack {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 130px;
}

.button:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.button.color1 { background-color: #e9f5ff; }
.button.color2 { background-color: #e0f8f0; }
.button.color3 { background-color: #fff8e1; }
.button.color4 { background-color: #f3e5f5; }
.button.color5 { background-color: #ffebee; }

.button-content {
  text-align: left;
}

.button-title {
  font-size: 2em;
  font-weight: bold;
  color: #333;
}

.button-subtitle {
  font-size: 1.2em;
  color: #777;
  margin-top: 8px;
}

.button .button-icon-wrapper {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.button img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
</style>
