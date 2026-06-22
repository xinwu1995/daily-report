// ==================== 常量 ====================

var STAFF_NAMES = ['张伟', '李明', '王磊', '刘洋', '陈晨', '赵鹏', '黄强', '周杰'];

var BASE = {
  revenue: 38456, revenueChange: 3.2,
  storedRevenue: 8230, storedRevenueChange: 1.8,
  adRevenue: 2680, adRevenueChange: -0.5,
  orderCount: 5312, orderCountChange: 2.1,

  availableVehicles: 4021,
  unavailableVehicles: 1265,
  noOrderVehicles: 1830,

  swapComplete: 2156,
  dispatchVehicles: 1265,
  dispatchRate: 82.5,
  repairOrders: 347,
  repairComplete: 298,
  lowBatteryVehicles: 756,

  avgPrice: 7.24,
  avgDuration: 86,
  lostOutOfRange: 256,
  lostLowBattery: 138,
  lostFault: 82,
  lostOther: 51,

  staffSwapCounts:  [52, 48, 45, 42, 39, 36, 33, 30],
  staffSwapSuccess: [50, 46, 43, 40, 37, 34, 31, 28],
  staffScores:      [364.5, 335.2, 312.8, 291.6, 268.4, 247.2, 225.8, 204.6],
  extraSwapCount: 87,
  extraSwapSuccess: 80,
  extraScore: 606.2
};

// ==================== 工具函数 ====================

function seededRandom(seed) {
  var x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function vary(base, dayIndex, fieldIndex) {
  var factor = 0.85 + seededRandom(dayIndex * 1000 + fieldIndex) * 0.30;
  return Math.round(base * factor);
}

function varyDecimal(base, dayIndex, fieldIndex, decimals) {
  var factor = 0.85 + seededRandom(dayIndex * 1000 + fieldIndex) * 0.30;
  return +(base * factor).toFixed(decimals);
}

function varyChange(base, dayIndex, fieldIndex) {
  var offset = (seededRandom(dayIndex * 2000 + fieldIndex) - 0.5) * 6;
  return +(base + offset).toFixed(1);
}

function formatNumber(num) {
  if (num == null) return '-';
  var parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

// ==================== 日期 ====================

function getWeekDates() {
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  var dow = yesterday.getDay();
  var diffToMon = dow === 0 ? 6 : dow - 1;
  var monday = new Date(yesterday);
  monday.setDate(yesterday.getDate() - diffToMon);

  var labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var days = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date(monday);
    d.setDate(monday.getDate() + i);
    var isYesterday = d.toDateString() === yesterday.toDateString();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    days.push({
      label: isYesterday ? '昨日' : labels[i],
      date: mm + '.' + dd,
      isYesterday: isYesterday
    });
  }
  return days;
}

// ==================== Mock数据生成 ====================

function generateDayData(dayIndex) {
  var fi = 0;

  var availableVehicles = vary(BASE.availableVehicles, dayIndex, fi++);
  var unavailableVehicles = vary(BASE.unavailableVehicles, dayIndex, fi++);
  var totalVehicles = availableVehicles + unavailableVehicles;
  var noOrderVehicles = vary(BASE.noOrderVehicles, dayIndex, fi++);

  var repairOrders = vary(BASE.repairOrders, dayIndex, fi++);
  var repairComplete = Math.min(repairOrders, vary(BASE.repairComplete, dayIndex, fi++));

  var lostOutOfRange = vary(BASE.lostOutOfRange, dayIndex, fi++);
  var lostLowBattery = vary(BASE.lostLowBattery, dayIndex, fi++);
  var lostFault = vary(BASE.lostFault, dayIndex, fi++);
  var lostOther = vary(BASE.lostOther, dayIndex, fi++);
  var lostOrders = lostOutOfRange + lostLowBattery + lostFault + lostOther;

  var staff = [];
  for (var i = 0; i < STAFF_NAMES.length; i++) {
    var swapCount = vary(BASE.staffSwapCounts[i], dayIndex, fi++);
    var swapSuccess = Math.min(swapCount, vary(BASE.staffSwapSuccess[i], dayIndex, fi++));
    var score = varyDecimal(BASE.staffScores[i], dayIndex, fi++, 1);
    staff.push({ name: STAFF_NAMES[i], swapCount: swapCount, swapSuccess: swapSuccess, score: score });
  }

  var visibleSwapCount = 0, visibleSwapSuccess = 0, visibleScore = 0;
  for (var j = 0; j < staff.length; j++) {
    visibleSwapCount += staff[j].swapCount;
    visibleSwapSuccess += staff[j].swapSuccess;
    visibleScore += staff[j].score;
  }

  var cfi = 0;
  return {
    revenue: vary(BASE.revenue, dayIndex, fi++),
    revenueChange: varyChange(BASE.revenueChange, dayIndex, cfi++),
    storedRevenue: vary(BASE.storedRevenue, dayIndex, fi++),
    storedRevenueChange: varyChange(BASE.storedRevenueChange, dayIndex, cfi++),
    adRevenue: vary(BASE.adRevenue, dayIndex, fi++),
    adRevenueChange: varyChange(BASE.adRevenueChange, dayIndex, cfi++),
    orderCount: vary(BASE.orderCount, dayIndex, fi++),
    orderCountChange: varyChange(BASE.orderCountChange, dayIndex, cfi++),

    totalVehicles: totalVehicles,
    availableVehicles: availableVehicles,
    unavailableVehicles: unavailableVehicles,
    noOrderVehicles: noOrderVehicles,

    swapComplete: vary(BASE.swapComplete, dayIndex, fi++),
    dispatchVehicles: vary(BASE.dispatchVehicles, dayIndex, fi++),
    dispatchRate: varyDecimal(BASE.dispatchRate, dayIndex, fi++, 2),
    repairOrders: repairOrders,
    repairComplete: repairComplete,
    lowBatteryVehicles: vary(BASE.lowBatteryVehicles, dayIndex, fi++),

    avgPrice: varyDecimal(BASE.avgPrice, dayIndex, fi++, 2),
    avgDuration: vary(BASE.avgDuration, dayIndex, fi++),
    lostOrders: lostOrders,
    lostOutOfRange: lostOutOfRange,
    lostLowBattery: lostLowBattery,
    lostFault: lostFault,
    lostOther: lostOther,

    staff: staff,
    staffTotals: {
      swapCount: visibleSwapCount + vary(BASE.extraSwapCount, dayIndex, fi++),
      swapSuccess: visibleSwapSuccess + vary(BASE.extraSwapSuccess, dayIndex, fi++),
      score: +(visibleScore + varyDecimal(BASE.extraScore, dayIndex, fi++, 1)).toFixed(1)
    }
  };
}

function generateWeekData() {
  var week = [];
  for (var i = 0; i < 7; i++) {
    week.push(generateDayData(i));
  }
  return week;
}

// ==================== 初始化（临时验证） ====================

document.addEventListener('DOMContentLoaded', function () {
  var weekData = generateWeekData();
  console.log('Day 0 data:', weekData[0]);
  console.log('Day 0 totalVehicles:', weekData[0].totalVehicles,
    '= available', weekData[0].availableVehicles, '+ unavailable', weekData[0].unavailableVehicles);
  console.log('Day 0 lostOrders:', weekData[0].lostOrders,
    '= outOfRange', weekData[0].lostOutOfRange, '+ lowBattery', weekData[0].lostLowBattery,
    '+ fault', weekData[0].lostFault, '+ other', weekData[0].lostOther);
  console.log('Day 0 staff[0] success <= count:',
    weekData[0].staff[0].swapSuccess <= weekData[0].staff[0].swapCount);
  console.log('Day 0 repairComplete <= repairOrders:',
    weekData[0].repairComplete <= weekData[0].repairOrders);
  console.log('Week dates:', getWeekDates());
});
