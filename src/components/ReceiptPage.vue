<template>
  <div class="receipt-container">
    <div class="toolbar">
        <button @click="goBack" class="back-button">返回</button>
        <button @click="printPage" class="print-button">列印</button>
    </div>
    <div class="receipt-content">
      <div class="header">
        <div class="hospital-name">臺安醫院</div>
        <div class="receipt-title">住院醫療費用明細收據</div>
        <div class="receipt-subtitle">INPATIENT BILLING STATEMENT AND RECEIPT</div>
      </div>

      <div class="patient-info">
        <div class="info-row">
            <span>日期 Statement Date: 2025/09/10</span>
            <span>費用期間 Period Covered: 2025/09/10</span>
            <span>收據單號 Recpt. No.: IPD00039</span>
        </div>
        <div class="info-row">
            <span>病歷號碼 Chart No.: 984751</span>
            <span>姓名 Name: 王曉明</span>
            <span>繳款方式 Payment Option: 現金</span>
        </div>
        <div class="info-row">
            <span>主治醫師 Doctor: -</span>
            <span>看診身份 Status: 健保</span>
            <span>床號 Bed No.: -</span>
        </div>
        <div class="info-row">
            <span>科別 Service: 家醫科</span>
            <span>收費人員 Cashier: ER46</span>
            <span>就醫序號: 0013</span>
            <span>印表時間: 2025/09/10-20:08:43</span>
        </div>
      </div>

      <div class="billing-details">
        <table>
          <thead>
            <tr>
              <th>費用項目 Service</th>
              <th>健保 NHI(NTS)</th>
              <th>自費 Self Pay(NTS)</th>
              <th>費用項目 Service</th>
              <th>健保 NHI(NTS)</th>
              <th>自費 Self Pay(NTS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>家醫科</td>
              <td>0</td>
              <td>340</td>
              <td>放射科</td>
              <td>0</td>
              <td>750</td>
            </tr>
            <tr>
              <td>外科</td>
              <td>0</td>
              <td>540</td>
              <td>藥劑科</td>
              <td>0</td>
              <td>620</td>
            </tr>
             <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
             <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="stamp-overlay">
          <div class="stamp">
            臺安醫院<br>
            醫療費用<br>
            專用章
          </div>
        </div>
      </div>

      <div class="summary">
        <div class="summary-row">
            <span>部份負擔金額:</span>
            <span>5%: 0</span>
            <span>10%: 0</span>
            <span>20%: 0</span>
            <span>30%: 0</span>
            <span>合計 Total: 0</span>
        </div>
        <div class="summary-row main-total">
            <span>總金額 Total Billed: 2,250</span>
            <span>(1)自費金額 Self-Pay Charges: 2,250</span>
            <span>+ (2)部份負擔 NHI Copayment: 0</span>
            <span>- (3)折扣補助 Discount: 0</span>
        </div>
        <div class="summary-row final-amount">
            <span>實繳金額 Billed Net: 2,250</span>
            <span>(本次付款 Amount Payable: 2,250)</span>
            <span>- (已繳金額 Patient Payment/Deposit: 0)</span>
        </div>
         <div class="summary-row balance">
            <span>尚欠金額 Balance: 0</span>
        </div>
      </div>

      <div class="footer">
        ※注意事項請參看背面 - Please turn over for English translation -
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const printPage = () => {
  window.print();
};

const goBack = () => {
    // Go back to the previous page if it exists in the history, otherwise go to home
    if (router.options.history.state.back) {
        router.go(-1);
    } else {
        router.push({ name: 'WelcomePage' });
    }
}
</script>

<style scoped>
.receipt-container {
  background-color: #fff;
  padding: 20px;
}

.toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.back-button, .print-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 10px;
}

.print-button {
    background-color: #28a745;
}

.back-button:hover {
    background-color: #0056b3;
}

.print-button:hover {
    background-color: #218838;
}

.receipt-content {
  border: 2px solid #000;
  padding: 20px;
  font-family: 'KaiTi', 'SimSun', serif;
  color: #000;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.hospital-name {
  font-size: 2rem;
  font-weight: bold;
}

.receipt-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.receipt-subtitle {
  font-size: 1.2rem;
}

.patient-info {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 10px 0;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.info-row span {
    flex: 1;
}

.billing-details {
    position: relative;
}

.billing-details table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
  background-color: transparent;
}

.billing-details th, .billing-details td {
  border: 1px solid #000;
  padding: 5px;
  text-align: left;
}

.billing-details th {
  background-color: #f2f2f2;
}

.stamp-overlay {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) rotate(-15deg);
    opacity: 0.15;
    pointer-events: none;
    z-index: 1;
}

.stamp {
    border: 4px solid red;
    color: red;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 50%;
    padding: 15px;
    text-align: center;
    line-height: 1.2;
    width: 128px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.summary {
  border-top: 1px solid #000;
  padding-top: 10px;
  font-size: 0.9rem;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.main-total, .final-amount {
    font-weight: bold;
}

.balance {
    margin-top: 15px;
}

.footer {
  border-top: 1px solid #000;
  padding-top: 10px;
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}

@media print {
  @page {
    size: A5 portrait;
    margin: 5mm;
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .toolbar {
    display: none;
  }

  .receipt-container {
    padding: 0;
  }

  .receipt-content {
    border: 1px solid #000;
    padding: 10px;
    font-size: 8pt;
    color: #000;
  }

  .header {
    margin-bottom: 10px;
  }
  .hospital-name {
    font-size: 14pt;
  }
  .receipt-title {
    font-size: 11pt;
  }
  .receipt-subtitle {
    font-size: 9pt;
  }

  .patient-info {
    border-width: 1px;
    padding: 5px 0;
    margin-bottom: 10px;
    font-size: 8pt;
  }
  .info-row {
      margin-bottom: 2px;
  }

  .billing-details table {
    font-size: 8pt;
    margin-bottom: 10px;
  }
  .billing-details th, .billing-details td {
    padding: 2px;
    border: 1px solid #000;
  }

  .stamp-overlay {
      bottom: 10px;
      opacity: 0.1;
  }
  .stamp {
      font-size: 9pt;
      padding: 8px;
      width: 90px;
      height: 90px;
      border-width: 2px;
  }

  .summary {
    padding-top: 5px;
    font-size: 8pt;
  }
  
  .summary-row {
      margin-bottom: 4px;
  }

  .footer {
    padding-top: 5px;
    margin-top: 10px;
    font-size: 7pt;
  }
}

/* Hide toolbar when this page is loaded in an iframe for printing */
html.iframe-print .toolbar {
    display: none;
}
</style>
