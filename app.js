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

// ==================== 状态 ====================

var state = {
  currentDay: 6,
  selectedMetrics: {
    vehicle: 'totalVehicles',
    ops: 'swapComplete',
    order: 'lostOrders'
  }
};

var weekData = [];
var weekDates = [];
var vehicleChart = null;
var orderChart = null;

// ==================== 渲染：周选择器 ====================

function renderWeekSelector() {
  var container = document.getElementById('weekSelector');
  var html = '';
  for (var i = 0; i < weekDates.length; i++) {
    var d = weekDates[i];
    var cls = i === state.currentDay ? 'day-tab active' : 'day-tab';
    html += '<div class="' + cls + '" data-day="' + i + '">'
      + '<span class="day-label">' + d.label + '</span>'
      + '<span class="day-date">' + d.date + '</span>'
      + '</div>';
  }
  html += '<div class="calendar-btn">日历</div>';
  container.innerHTML = html;
}

// ==================== 渲染：营收数据 ====================

function renderChangeText(value) {
  if (value > 0) return '<span class="metric-change positive">环比 +' + value + ' %</span>';
  if (value < 0) return '<span class="metric-change negative">环比 ' + value + ' %</span>';
  return '<span class="metric-change">环比 0 %</span>';
}

function renderRevenue(data) {
  document.getElementById('val-revenue').textContent = formatNumber(data.revenue);
  document.getElementById('val-storedRevenue').textContent = formatNumber(data.storedRevenue);
  document.getElementById('val-adRevenue').textContent = formatNumber(data.adRevenue);
  document.getElementById('val-orderCount').textContent = formatNumber(data.orderCount);

  document.getElementById('change-revenue').innerHTML = renderChangeText(data.revenueChange);
  document.getElementById('change-storedRevenue').innerHTML = renderChangeText(data.storedRevenueChange);
  document.getElementById('change-adRevenue').innerHTML = renderChangeText(data.adRevenueChange);
  document.getElementById('change-orderCount').innerHTML = renderChangeText(data.orderCountChange);
}

// ==================== 渲染：车辆数据 ====================

function renderVehicleMetrics(data) {
  document.getElementById('val-totalVehicles').textContent = formatNumber(data.totalVehicles);
  document.getElementById('val-unavailableVehicles').textContent = formatNumber(data.unavailableVehicles);
  document.getElementById('val-noOrderVehicles').textContent = formatNumber(data.noOrderVehicles);
}

// ==================== 渲染：运维数据 ====================

function renderOpsMetrics(data) {
  document.getElementById('val-swapComplete').textContent = formatNumber(data.swapComplete);
  document.getElementById('val-dispatchVehicles').textContent = formatNumber(data.dispatchVehicles);
  document.getElementById('val-dispatchRate').innerHTML = data.dispatchRate.toFixed(2) + '<span class="unit">%</span>';
  document.getElementById('val-repairOrders').textContent = formatNumber(data.repairOrders);
  document.getElementById('val-repairComplete').textContent = formatNumber(data.repairComplete);
  document.getElementById('val-lowBatteryVehicles').textContent = formatNumber(data.lowBatteryVehicles);
}

// ==================== 渲染：订单数据 ====================

function renderOrderMetrics(data) {
  document.getElementById('val-avgPrice').textContent = data.avgPrice.toFixed(2);
  document.getElementById('val-avgDuration').textContent = data.avgDuration;
  document.getElementById('val-lostOrders').textContent = formatNumber(data.lostOrders);
}

// ==================== 渲染：明细区域 ====================

function renderPlaceholder() {
  return '<div class="detail-placeholder">明细开发中</div>';
}

function renderVehicleChartHTML(data) {
  return '<div class="donut-wrapper">'
    + '<div class="donut-container"><canvas id="vehicleCanvas"></canvas>'
    + '<div class="donut-center"><div class="donut-center-label">运营车辆数</div>'
    + '<div class="donut-center-value">' + formatNumber(data.totalVehicles) + '</div></div></div>'
    + '<div class="donut-legend">'
    + '<div class="legend-item"><span class="legend-dot" style="background:#3478F6"></span>'
    + '<span>可用车辆数</span><span class="legend-num">' + formatNumber(data.availableVehicles) + '</span></div>'
    + '<div class="legend-item"><span class="legend-dot" style="background:#E0E0E0"></span>'
    + '<span>不可用车辆</span><span class="legend-num">' + formatNumber(data.unavailableVehicles) + '</span></div>'
    + '</div></div>';
}

function renderStaffTableHTML(data) {
  var rows = '';
  for (var i = 0; i < data.staff.length; i++) {
    var s = data.staff[i];
    var rankCls = i === 0 ? 'rank rank-1' : 'rank';
    rows += '<div class="table-row">'
      + '<span class="col-rank"><em class="' + rankCls + '">' + (i + 1) + '</em></span>'
      + '<span class="col-name">' + s.name + '</span>'
      + '<span class="col-num">' + s.swapCount + '</span>'
      + '<span class="col-num">' + s.swapSuccess + '</span>'
      + '<span class="col-num">' + s.score + '</span>'
      + '</div>';
  }
  return '<div class="staff-table">'
    + '<div class="table-header">'
    + '<span class="col-rank">姓名</span><span class="col-name"></span>'
    + '<span class="col-num">换电次数</span><span class="col-num">换电成功</span><span class="col-num">绩效</span>'
    + '</div>'
    + rows
    + '<div class="table-footer">'
    + '<span>换电次数:' + formatNumber(data.staffTotals.swapCount) + '</span>'
    + '<span>换电成功:' + formatNumber(data.staffTotals.swapSuccess) + '</span>'
    + '<span>绩效:' + formatNumber(data.staffTotals.score) + '</span>'
    + '</div></div>';
}

function renderOrderChartHTML(data) {
  return '<div class="donut-wrapper vertical">'
    + '<div class="donut-container"><canvas id="orderCanvas"></canvas>'
    + '<div class="donut-center"><div class="donut-center-label">丢单次数</div>'
    + '<div class="donut-center-value">' + formatNumber(data.lostOrders) + '</div></div></div>'
    + '<div class="donut-legend horizontal">'
    + '<div class="legend-item"><span class="legend-dot" style="background:#E8C547"></span>'
    + '<span>超区丢单</span><span class="legend-num">' + formatNumber(data.lostOutOfRange) + '</span></div>'
    + '<div class="legend-item"><span class="legend-dot" style="background:#3D8B8B"></span>'
    + '<span>低电丢单</span><span class="legend-num">' + formatNumber(data.lostLowBattery) + '</span></div>'
    + '<div class="legend-item"><span class="legend-dot" style="background:#BDBDBD"></span>'
    + '<span>故障丢单</span><span class="legend-num">' + formatNumber(data.lostFault) + '</span></div>'
    + '<div class="legend-item"><span class="legend-dot" style="background:#81C784"></span>'
    + '<span>其他原因丢单</span><span class="legend-num">' + formatNumber(data.lostOther) + '</span></div>'
    + '</div></div>';
}

function renderDetails(data) {
  var vehicleEl = document.getElementById('vehicleDetail');
  var opsEl = document.getElementById('opsDetail');
  var orderEl = document.getElementById('orderDetail');

  if (vehicleChart) { vehicleChart.destroy(); vehicleChart = null; }
  if (orderChart) { orderChart.destroy(); orderChart = null; }

  if (state.selectedMetrics.vehicle === 'totalVehicles') {
    vehicleEl.innerHTML = renderVehicleChartHTML(data);
    initVehicleChart(data);
  } else {
    vehicleEl.innerHTML = renderPlaceholder();
  }

  if (state.selectedMetrics.ops === 'swapComplete') {
    opsEl.innerHTML = renderStaffTableHTML(data);
  } else {
    opsEl.innerHTML = renderPlaceholder();
  }

  if (state.selectedMetrics.order === 'lostOrders') {
    orderEl.innerHTML = renderOrderChartHTML(data);
    initOrderChart(data);
  } else {
    orderEl.innerHTML = renderPlaceholder();
  }
}

// ==================== 图表（Task 4 实现） ====================

function initVehicleChart(data) {
  // Chart.js initialization — implemented in Task 4
}

function initOrderChart(data) {
  // Chart.js initialization — implemented in Task 4
}

// ==================== 选中态 ====================

function updateSelectionUI() {
  var selectables = document.querySelectorAll('.metric-item.selectable');
  for (var i = 0; i < selectables.length; i++) {
    var el = selectables[i];
    var card = el.getAttribute('data-card');
    var metric = el.getAttribute('data-metric');
    if (state.selectedMetrics[card] === metric) {
      el.classList.add('selected');
    } else {
      el.classList.remove('selected');
    }
  }
}

// ==================== 整页渲染 ====================

function renderPage(data) {
  renderRevenue(data);
  renderVehicleMetrics(data);
  renderOpsMetrics(data);
  renderOrderMetrics(data);
  renderDetails(data);
  updateSelectionUI();
}

// ==================== 事件绑定 ====================

function setupEvents() {
  document.getElementById('weekSelector').addEventListener('click', function (e) {
    var tab = e.target.closest('.day-tab');
    if (!tab) return;
    var dayIndex = parseInt(tab.getAttribute('data-day'), 10);
    if (isNaN(dayIndex)) return;
    state.currentDay = dayIndex;
    renderWeekSelector();
    renderPage(weekData[state.currentDay]);
  });

  document.addEventListener('click', function (e) {
    var item = e.target.closest('.metric-item.selectable');
    if (!item) return;
    var card = item.getAttribute('data-card');
    var metric = item.getAttribute('data-metric');
    if (!card || !metric) return;
    state.selectedMetrics[card] = metric;
    renderDetails(weekData[state.currentDay]);
    updateSelectionUI();
  });
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', function () {
  weekDates = getWeekDates();
  weekData = generateWeekData();

  var yesterdayIndex = weekDates.findIndex(function (d) { return d.isYesterday; });
  if (yesterdayIndex >= 0) state.currentDay = yesterdayIndex;

  renderWeekSelector();
  renderPage(weekData[state.currentDay]);
  setupEvents();
});
