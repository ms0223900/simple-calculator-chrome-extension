import calc from './calc.mjs'

// 取得插件上的元件
const calculateBtnEl = document.getElementById('calculateResultBtn');
const resetResultBtnEl = document.getElementById('resetResultBtn');
const valInputEl = document.getElementById('valueInput');
const resultEl = document.getElementById('result');
const errorMessageEl = document.getElementById('errorMessage');

// 變數
let prevRes;

// 重置結果(歸零
function resetResult() {
  prevRes = undefined;
  resultEl.innerText = '0'
  valInputEl.value = '';
}

// 主功能: 計算並更新畫面
function calculateAndUpdate() {
  const inputVal = valInputEl.value;
  const res = calc(inputVal, prevRes);
  console.log(inputVal, prevRes, res)
  prevRes = res;

  resultEl.innerText = res;
  valInputEl.value = '';
}

// 按下按鈕計算答案
function registerButtonToCalculate() {
  calculateBtnEl.addEventListener('click', () => {
    calculateAndUpdate()
  })
}

// 按下Enter計算答案
function registerEnterToCalculate() {
  valInputEl.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      calculateAndUpdate()
    }
  })
}

// 按下AC按鈕重置結果
function registerResetButtonToReset() {
  resetResultBtnEl.addEventListener('click', () => {
    resetResult()
  })
}

function main() {
  registerButtonToCalculate()
  registerEnterToCalculate()
  registerResetButtonToReset()
}

main();