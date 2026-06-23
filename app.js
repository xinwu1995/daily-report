// ==================== 常量 ====================

var CITY_DATA = {
  name: '武汉市',
  districts: [
    {
      name: '武昌区',
      children: [
        { name: '片区组1', children: ['中南路片区', '水果湖片区', '徐东片区', '积玉桥片区', '杨园片区'] },
        { name: '片区组2', children: ['白沙洲片区', '南湖片区', '首义片区'] }
      ]
    },
    {
      name: '汉阳区',
      children: [
        { name: '片区组1', children: ['钟家村片区', '王家湾片区', '四新片区'] },
        { name: '片区组2', children: ['鹦鹉洲片区', '琴台片区'] }
      ]
    },
    {
      name: '江夏区',
      children: ['纸坊片区', '庙山片区', '藏龙岛片区', '流芳片区']
    },
    {
      name: '蔡甸区',
      children: ['蔡甸城区', '常福片区', '中法生态城']
    }
  ]
};

var STAFF_NAMES = ['张伟', '李明', '王磊', '刘洋', '陈晨', '赵鹏', '黄强', '周杰'];

var UNAVAILABLE_LABELS = [
  '下架车辆数', '超区车辆数', '离线车辆数',
  '故障/拖回车辆数', '电瓶移除车辆数', '头盔丢失车辆数',
  '头盔/头盔锁故障车辆数', '城管扣押仓库车辆数', '仓库/维修点车辆数'
];

var BASE = {
  revenue: 38456, revenueChange: 3.2,
  storedRevenue: 8230, storedRevenueChange: 1.8,
  adRevenue: 2680, adRevenueChange: -0.5,
  orderCount: 5312, orderCountChange: 2.1,

  availableVehicles: 4021,
  unavailableBreakdown: [245, 198, 176, 152, 134, 112, 98, 85, 65],
  noOrderVehicles: 1830,
  noOrder5: 1230,
  noOrder15: 680,
  static3: 1420,
  static5: 890,
  static15: 450,

  swapComplete: 2156,
  dispatchVehicles: 1265,
  dispatchRate: 82.5,
  repairOrders: 347,
  repairComplete: 298,
  batteryBelow10: 156,
  battery10to20: 243,
  battery20to30: 357,
  lostByLowBattery: 313,
  dispatchRates: [72, 82.5, 87, 90, 91.5, 92],
  dispatchCounts: [180, 350, 520, 720, 900, 1077],

  avgPrice: 7.24,
  avgPriceWithFine: 8.12,
  avgPriceWithoutFine: 6.58,
  avgDuration: 86,
  lostOutOfRange: 256,
  lostLowBattery: 138,
  lostFault: 82,
  lostOther: 51,

  availableRate: 76.8,
  availableRateChange: 1.2,
  ridingRate: 42.5,
  ridingRateChange: -0.6,
  outOfRangeCount: 384,
  outOfRangeCountChange: -2.1,
  lowBatteryCount: 756,
  lowBatteryCountChange: 1.8,

  inactiveUsers: 2136,
  inactiveUsersChange: -1.3,
  frequentUsers: 1847,
  frequentUsersChange: 2.8,
  totalRideUsers: 18432,
  totalRideUsersChange: 0.9,
  newBindUsers: 326,
  newBindUsersChange: 5.2,
  newUserRetention: 34.6,
  newUserRetentionChange: 1.1,

  staffSwapCounts:  [52, 48, 45, 42, 39, 36, 33, 30],
  staffSwapSuccess: [50, 46, 43, 40, 37, 34, 31, 28],
  staffScores:      [364.5, 335.2, 312.8, 291.6, 268.4, 247.2, 225.8, 204.6],
  extraSwapCount: 87,
  extraSwapSuccess: 80,
  extraScore: 606.2,

  receivableOrderCount: 5860,
  receivableOrderCountChange: 2.5,
  receivableAmount: 42130,
  receivableAmountChange: 3.8,

  fineOrderCount: 426,
  fineOrderCountChange: -1.2,
  fineOrderAmount: 3184,
  fineOrderAmountChange: -0.8,
  disputeCount: 89,
  disputeCountChange: 1.5,
  disputeRefund: 1247,
  disputeRefundChange: 2.3,
  rideCardDeduct: 1532,
  rideCardDeductChange: 4.1,
  couponDeduct: 876,
  couponDeductChange: 3.6
};

var CARD_FIELDS = {
  revenue: [
    { key: 'revenue', label: '实收订单金额', defaultChecked: true },
    { key: 'storedRevenue', label: '储值营收', defaultChecked: true },
    { key: 'adRevenue', label: '广告营收', defaultChecked: true },
    { key: 'orderCount', label: '实收订单量', defaultChecked: true },
    { key: 'receivableOrderCount', label: '应收订单量', defaultChecked: false },
    { key: 'receivableAmount', label: '应收订单金额', defaultChecked: false }
  ],
  vehicle: [
    { key: 'totalVehicles', label: '运营车辆数', defaultChecked: true },
    { key: 'unavailableVehicles', label: '不可用车辆数', defaultChecked: true },
    { key: 'noOrderVehicles', label: '未产生订单车辆(3天)', defaultChecked: true },
    { key: 'availableRate', label: '车辆可用率', defaultChecked: false },
    { key: 'ridingRate', label: '车辆被骑行率', defaultChecked: false },
    { key: 'outOfRangeCount', label: '车辆超区次数', defaultChecked: false },
    { key: 'lowBatteryCount', label: '低电车辆次数', defaultChecked: false }
  ],
  ops: [
    { key: 'swapComplete', label: '换电任务完成数', defaultChecked: true },
    { key: 'dispatchVehicles', label: '调度车辆数量', defaultChecked: true },
    { key: 'dispatchRate', label: '12小时调度成单率', defaultChecked: true },
    { key: 'repairOrders', label: '报修单数', defaultChecked: true },
    { key: 'lowBatteryVehicles', label: '低电车辆数', defaultChecked: true },
    { key: 'repairComplete', label: '报修完成数', defaultChecked: true }
  ],
  user: [
    { key: 'inactiveUsers', label: '>3天未骑行用户数', defaultChecked: true },
    { key: 'frequentUsers', label: '近7天骑行≧4次用户数', defaultChecked: true },
    { key: 'totalRideUsers', label: '累计骑行用户数', defaultChecked: true },
    { key: 'newBindUsers', label: '新增绑定用户数', defaultChecked: true },
    { key: 'newUserRetention', label: '新用户7日留存率', defaultChecked: true }
  ],
  order: [
    { key: 'avgPrice', label: '均单价', defaultChecked: true },
    { key: 'avgDuration', label: '均单时长', defaultChecked: true },
    { key: 'lostOrders', label: '丢单次数', defaultChecked: true },
    { key: 'fineOrderCount', label: '调度费/罚金订单数', defaultChecked: false },
    { key: 'fineOrderAmount', label: '调度费/罚金订单金额', defaultChecked: false },
    { key: 'disputeCount', label: '异议工单数', defaultChecked: false },
    { key: 'disputeRefund', label: '异议工单退款金额', defaultChecked: false },
    { key: 'rideCardDeduct', label: '骑行卡抵扣次数', defaultChecked: false },
    { key: 'couponDeduct', label: '优惠卡抵扣次数', defaultChecked: false }
  ]
};

var CARD_NAMES = {
  revenue: '营收数据',
  vehicle: '车辆数据',
  ops: '运维数据',
  order: '订单数据',
  user: '用户数据'
};

var MODULE_LIST = [
  { key: 'revenue', name: '营收数据', desc: '查看每日订单金额、储值营收、订单量等数据' },
  { key: 'ops', name: '运维数据', desc: '换电、挪车、维修等数据' },
  { key: 'vehicle', name: '车辆数据', desc: '车辆状态、未产生订单车辆等数据' },
  { key: 'order', name: '订单数据', desc: '骑行明细、丢单分布等数据' },
  { key: 'user', name: '用户数据', desc: '用户留存、累计用户数等数据' }
];

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

function setVal(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHTML(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

// ==================== 日期 ====================

function getWeekDates() {
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  var DAY_COUNT = 14;
  var labels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  var days = [];
  for (var i = DAY_COUNT - 1; i >= 0; i--) {
    var d = new Date(yesterday);
    d.setDate(yesterday.getDate() - i);
    var isYesterday = d.toDateString() === yesterday.toDateString();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    days.push({
      label: isYesterday ? '昨日' : labels[d.getDay()],
      date: mm + '.' + dd,
      isYesterday: isYesterday,
      fullDate: new Date(d)
    });
  }
  return days;
}

// ==================== Mock数据生成 ====================

function generateDayData(dayIndex) {
  var fi = 0;

  var availableVehicles = vary(BASE.availableVehicles, dayIndex, fi++);
  var unavailableBreakdown = [];
  for (var b = 0; b < BASE.unavailableBreakdown.length; b++) {
    unavailableBreakdown.push(vary(BASE.unavailableBreakdown[b], dayIndex, fi++));
  }
  var unavailableVehicles = unavailableBreakdown.reduce(function(s, v) { return s + v; }, 0);
  var totalVehicles = availableVehicles + unavailableVehicles;
  var noOrder3 = vary(BASE.noOrderVehicles, dayIndex, fi++);
  var noOrder5 = Math.min(noOrder3 - 1, vary(BASE.noOrder5, dayIndex, fi++));
  var noOrder15 = Math.min(noOrder5 - 1, vary(BASE.noOrder15, dayIndex, fi++));
  var static3 = Math.min(noOrder3 - 1, vary(BASE.static3, dayIndex, fi++));
  var static5 = Math.min(Math.min(noOrder5, static3) - 1, vary(BASE.static5, dayIndex, fi++));
  var static15 = Math.min(Math.min(noOrder15, static5) - 1, vary(BASE.static15, dayIndex, fi++));
  var noOrderVehicles = noOrder3;

  var availableRate = +((availableVehicles / totalVehicles) * 100).toFixed(2);
  var availableRateChange = varyChange(BASE.availableRateChange, dayIndex, fi++);
  var ridingRate = varyDecimal(BASE.ridingRate, dayIndex, fi++, 2);
  var ridingRateChange = varyChange(BASE.ridingRateChange, dayIndex, fi++);
  var outOfRangeCount = vary(BASE.outOfRangeCount, dayIndex, fi++);
  var outOfRangeCountChange = varyChange(BASE.outOfRangeCountChange, dayIndex, fi++);
  var lowBatteryCount = vary(BASE.lowBatteryCount, dayIndex, fi++);
  var lowBatteryCountChange = varyChange(BASE.lowBatteryCountChange, dayIndex, fi++);

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

  var batteryBelow10 = vary(BASE.batteryBelow10, dayIndex, fi++);
  var battery10to20 = vary(BASE.battery10to20, dayIndex, fi++);
  var battery20to30 = vary(BASE.battery20to30, dayIndex, fi++);
  var lowBatteryVehicles = batteryBelow10 + battery10to20 + battery20to30;
  var batteryAbove30 = Math.max(0, availableVehicles - lowBatteryVehicles);
  var lostByLowBattery = vary(BASE.lostByLowBattery, dayIndex, fi++);

  var dispatchRates = [];
  var prevRate = 0;
  for (var dr = 0; dr < BASE.dispatchRates.length; dr++) {
    var rate = varyDecimal(BASE.dispatchRates[dr], dayIndex, fi++, 1);
    rate = Math.max(prevRate + 0.5, Math.min(100, rate));
    dispatchRates.push(rate);
    prevRate = rate;
  }

  var dispatchCounts = [];
  var prevCount = 0;
  for (var dc = 0; dc < BASE.dispatchCounts.length; dc++) {
    var cnt = vary(BASE.dispatchCounts[dc], dayIndex, fi++);
    cnt = Math.max(prevCount + 10, cnt);
    dispatchCounts.push(cnt);
    prevCount = cnt;
  }

  var avgPrice = varyDecimal(BASE.avgPrice, dayIndex, fi++, 2);
  var avgPriceWithFine = Math.max(avgPrice + 0.1, varyDecimal(BASE.avgPriceWithFine, dayIndex, fi++, 2));
  var avgPriceWithoutFine = Math.min(avgPrice - 0.1, varyDecimal(BASE.avgPriceWithoutFine, dayIndex, fi++, 2));
  var avgDuration = vary(BASE.avgDuration, dayIndex, fi++);

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
    receivableOrderCount: vary(BASE.receivableOrderCount, dayIndex, fi++),
    receivableOrderCountChange: varyChange(BASE.receivableOrderCountChange, dayIndex, cfi++),
    receivableAmount: vary(BASE.receivableAmount, dayIndex, fi++),
    receivableAmountChange: varyChange(BASE.receivableAmountChange, dayIndex, cfi++),

    totalVehicles: totalVehicles,
    availableVehicles: availableVehicles,
    unavailableVehicles: unavailableVehicles,
    unavailableBreakdown: unavailableBreakdown,
    noOrderVehicles: noOrderVehicles,
    noOrder5: noOrder5,
    noOrder15: noOrder15,
    static3: static3,
    static5: static5,
    static15: static15,
    availableRate: availableRate,
    availableRateChange: availableRateChange,
    ridingRate: ridingRate,
    ridingRateChange: ridingRateChange,
    outOfRangeCount: outOfRangeCount,
    outOfRangeCountChange: outOfRangeCountChange,
    lowBatteryCount: lowBatteryCount,
    lowBatteryCountChange: lowBatteryCountChange,

    swapComplete: vary(BASE.swapComplete, dayIndex, fi++),
    dispatchVehicles: vary(BASE.dispatchVehicles, dayIndex, fi++),
    dispatchRate: varyDecimal(BASE.dispatchRate, dayIndex, fi++, 2),
    repairOrders: repairOrders,
    repairComplete: repairComplete,
    lowBatteryVehicles: lowBatteryVehicles,
    batteryBelow10: batteryBelow10,
    battery10to20: battery10to20,
    battery20to30: battery20to30,
    batteryAbove30: batteryAbove30,
    lostByLowBattery: lostByLowBattery,
    dispatchRates: dispatchRates,
    dispatchCounts: dispatchCounts,

    avgPrice: avgPrice,
    avgPriceWithFine: avgPriceWithFine,
    avgPriceWithoutFine: avgPriceWithoutFine,
    avgDuration: avgDuration,
    lostOrders: lostOrders,
    lostOutOfRange: lostOutOfRange,
    lostLowBattery: lostLowBattery,
    lostFault: lostFault,
    lostOther: lostOther,

    fineOrderCount: vary(BASE.fineOrderCount, dayIndex, fi++),
    fineOrderCountChange: varyChange(BASE.fineOrderCountChange, dayIndex, cfi++),
    fineOrderAmount: vary(BASE.fineOrderAmount, dayIndex, fi++),
    fineOrderAmountChange: varyChange(BASE.fineOrderAmountChange, dayIndex, cfi++),
    disputeCount: vary(BASE.disputeCount, dayIndex, fi++),
    disputeCountChange: varyChange(BASE.disputeCountChange, dayIndex, cfi++),
    disputeRefund: vary(BASE.disputeRefund, dayIndex, fi++),
    disputeRefundChange: varyChange(BASE.disputeRefundChange, dayIndex, cfi++),
    rideCardDeduct: vary(BASE.rideCardDeduct, dayIndex, fi++),
    rideCardDeductChange: varyChange(BASE.rideCardDeductChange, dayIndex, cfi++),
    couponDeduct: vary(BASE.couponDeduct, dayIndex, fi++),
    couponDeductChange: varyChange(BASE.couponDeductChange, dayIndex, cfi++),

    inactiveUsers: vary(BASE.inactiveUsers, dayIndex, fi++),
    inactiveUsersChange: varyChange(BASE.inactiveUsersChange, dayIndex, cfi++),
    frequentUsers: vary(BASE.frequentUsers, dayIndex, fi++),
    frequentUsersChange: varyChange(BASE.frequentUsersChange, dayIndex, cfi++),
    totalRideUsers: vary(BASE.totalRideUsers, dayIndex, fi++),
    totalRideUsersChange: varyChange(BASE.totalRideUsersChange, dayIndex, cfi++),
    newBindUsers: vary(BASE.newBindUsers, dayIndex, fi++),
    newBindUsersChange: varyChange(BASE.newBindUsersChange, dayIndex, cfi++),
    newUserRetention: varyDecimal(BASE.newUserRetention, dayIndex, fi++, 1),
    newUserRetentionChange: varyChange(BASE.newUserRetentionChange, dayIndex, cfi++),

    staff: staff,
    staffTotals: {
      swapCount: visibleSwapCount + vary(BASE.extraSwapCount, dayIndex, fi++),
      swapSuccess: visibleSwapSuccess + vary(BASE.extraSwapSuccess, dayIndex, fi++),
      score: +(visibleScore + varyDecimal(BASE.extraScore, dayIndex, fi++, 1)).toFixed(1)
    }
  };
}

function generateWeekData() {
  var data = [];
  for (var i = 0; i < weekDates.length; i++) {
    data.push(generateDayData(i));
  }
  return data;
}

// ==================== 状态 ====================

var state = {
  currentDay: 6,
  selectedMetrics: {
    vehicle: 'totalVehicles',
    ops: 'swapComplete',
    order: 'lostOrders'
  },
  noOrderTab: 'noOrder'
};

var areaState = {
  open: false,
  selectedDistrict: null,
  selectedGroup: null,
  selectedArea: null
};

var weekData = [];
var weekDates = [];
var vehicleChart = null;
var vehicleBarChart = null;
var orderChart = null;
var opsChart = null;

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
  html += '<div class="calendar-btn" id="calendarBtn">日历</div>';
  container.innerHTML = html;
  var active = container.querySelector('.day-tab.active');
  if (active) {
    setTimeout(function() {
      active.scrollIntoView({ inline: 'center', block: 'nearest' });
    }, 0);
  }
}

// ==================== 渲染：营收数据 ====================

function renderChangeText(value) {
  if (value > 0) return '<span class="metric-change positive">环比 +' + value + ' %</span>';
  if (value < 0) return '<span class="metric-change negative">环比 ' + value + ' %</span>';
  return '<span class="metric-change">环比 0 %</span>';
}

function renderRevenue(data) {
  setVal('val-revenue', formatNumber(data.revenue));
  setVal('val-storedRevenue', formatNumber(data.storedRevenue));
  setVal('val-adRevenue', formatNumber(data.adRevenue));
  setVal('val-orderCount', formatNumber(data.orderCount));
  setVal('val-receivableOrderCount', formatNumber(data.receivableOrderCount));
  setVal('val-receivableAmount', formatNumber(data.receivableAmount));
  setHTML('change-revenue', renderChangeText(data.revenueChange));
  setHTML('change-storedRevenue', renderChangeText(data.storedRevenueChange));
  setHTML('change-adRevenue', renderChangeText(data.adRevenueChange));
  setHTML('change-orderCount', renderChangeText(data.orderCountChange));
  setHTML('change-receivableOrderCount', renderChangeText(data.receivableOrderCountChange));
  setHTML('change-receivableAmount', renderChangeText(data.receivableAmountChange));
}

// ==================== 渲染：车辆数据 ====================

function renderVehicleMetrics(data) {
  setVal('val-totalVehicles', formatNumber(data.totalVehicles));
  setVal('val-unavailableVehicles', formatNumber(data.unavailableVehicles));
  setVal('val-noOrderVehicles', formatNumber(data.noOrderVehicles));
  setHTML('val-availableRate', data.availableRate.toFixed(2) + '<span class="unit">%</span>');
  setHTML('val-ridingRate', data.ridingRate.toFixed(2) + '<span class="unit">%</span>');
  setVal('val-outOfRangeCount', formatNumber(data.outOfRangeCount));
  setVal('val-lowBatteryCount', formatNumber(data.lowBatteryCount));
  setHTML('change-availableRate', renderChangeText(data.availableRateChange));
  setHTML('change-ridingRate', renderChangeText(data.ridingRateChange));
  setHTML('change-outOfRangeCount', renderChangeText(data.outOfRangeCountChange));
  setHTML('change-lowBatteryCount', renderChangeText(data.lowBatteryCountChange));
}

// ==================== 渲染：运维数据 ====================

function renderOpsMetrics(data) {
  setVal('val-swapComplete', formatNumber(data.swapComplete));
  setVal('val-dispatchVehicles', formatNumber(data.dispatchVehicles));
  setHTML('val-dispatchRate', data.dispatchRate.toFixed(2) + '<span class="unit">%</span>');
  setVal('val-repairOrders', formatNumber(data.repairOrders));
  setVal('val-repairComplete', formatNumber(data.repairComplete));
  setVal('val-lowBatteryVehicles', formatNumber(data.lowBatteryVehicles));
}

// ==================== 渲染：订单数据 ====================

function renderOrderMetrics(data) {
  setVal('val-avgPrice', data.avgPrice.toFixed(2));
  setVal('val-avgDuration', String(data.avgDuration));
  setVal('val-lostOrders', formatNumber(data.lostOrders));
  setVal('val-fineOrderCount', formatNumber(data.fineOrderCount));
  setVal('val-fineOrderAmount', formatNumber(data.fineOrderAmount));
  setVal('val-disputeCount', formatNumber(data.disputeCount));
  setVal('val-disputeRefund', formatNumber(data.disputeRefund));
  setVal('val-rideCardDeduct', formatNumber(data.rideCardDeduct));
  setVal('val-couponDeduct', formatNumber(data.couponDeduct));
  setHTML('change-fineOrderCount', renderChangeText(data.fineOrderCountChange));
  setHTML('change-fineOrderAmount', renderChangeText(data.fineOrderAmountChange));
  setHTML('change-disputeCount', renderChangeText(data.disputeCountChange));
  setHTML('change-disputeRefund', renderChangeText(data.disputeRefundChange));
  setHTML('change-rideCardDeduct', renderChangeText(data.rideCardDeductChange));
  setHTML('change-couponDeduct', renderChangeText(data.couponDeductChange));
}

// ==================== 渲染：用户数据 ====================

function renderUserMetrics(data) {
  setVal('val-inactiveUsers', formatNumber(data.inactiveUsers));
  setVal('val-frequentUsers', formatNumber(data.frequentUsers));
  setVal('val-totalRideUsers', formatNumber(data.totalRideUsers));
  setVal('val-newBindUsers', formatNumber(data.newBindUsers));
  setHTML('val-newUserRetention', data.newUserRetention.toFixed(1) + '<span class="unit">%</span>');
}

// ==================== 渲染：明细区域 ====================

function renderPlaceholder() {
  return '<div class="detail-placeholder">明细开发中</div>';
}

function renderVehicleChartHTML(data) {
  return '<div class="donut-labeled" style="height:200px">'
    + '<canvas id="vehicleCanvas"></canvas>'
    + '</div>';
}

function renderUnavailableBarHTML() {
  return '<div class="chart-container" style="height:260px"><canvas id="unavailableBarCanvas"></canvas></div>';
}

function createBarChartConfig(labels, values) {
  return {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: '#2989FF',
        borderRadius: 3,
        barPercentage: 0.65,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f3f4f6' },
          ticks: { font: { size: 10 }, color: '#9ca3af' },
          border: { display: false }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 9 }, color: '#9ca3af', maxRotation: 45, autoSkip: false },
          border: { display: false }
        }
      }
    }
  };
}

function initUnavailableBarChart(data) {
  var canvas = document.getElementById('unavailableBarCanvas');
  if (!canvas) return;
  vehicleBarChart = new Chart(canvas, createBarChartConfig(UNAVAILABLE_LABELS, data.unavailableBreakdown));
}

function renderNoOrderDetailHTML() {
  var isNoOrder = state.noOrderTab === 'noOrder';
  return '<div class="chart-container" style="height:200px"><canvas id="noOrderBarCanvas"></canvas></div>'
    + '<div class="detail-tabs">'
    + '<div class="detail-tab' + (isNoOrder ? ' active' : '') + '" data-no-order-tab="noOrder">无单车辆</div>'
    + '<div class="detail-tab' + (!isNoOrder ? ' active' : '') + '" data-no-order-tab="static">静止车辆</div>'
    + '</div>';
}

function initNoOrderBarChart(data) {
  var canvas = document.getElementById('noOrderBarCanvas');
  if (!canvas) return;
  var isNoOrder = state.noOrderTab === 'noOrder';
  var values, labels;
  if (isNoOrder) {
    values = [data.noOrderVehicles, data.noOrder5, data.noOrder15];
    labels = ['3天内无单', '5天内无单', '15天内无单'];
  } else {
    values = [data.static3, data.static5, data.static15];
    labels = ['3天内静止', '5天内静止', '15天内静止'];
  }
  vehicleBarChart = new Chart(canvas, createBarChartConfig(labels, values));
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

function renderDispatchDetailHTML() {
  return '<div class="chart-container" style="height:240px"><canvas id="dispatchBarCanvas"></canvas></div>';
}

function initDispatchChart(data) {
  var canvas = document.getElementById('dispatchBarCanvas');
  if (!canvas) return;
  opsChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['6h', '12h', '18h', '24h', '30h', '36h'],
      datasets: [{
        data: data.dispatchRates,
        backgroundColor: '#7EB1FB',
        borderRadius: 3,
        barPercentage: 0.65,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        barValue: { display: true, suffix: '%' }
      },
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: '#f3f4f6' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } },
        x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } }
      }
    },
    plugins: [barValuePlugin]
  });
}

function initDispatchCountChart(data) {
  var canvas = document.getElementById('dispatchCountCanvas');
  if (!canvas) return;
  opsChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['6h', '12h', '18h', '24h', '30h', '36h'],
      datasets: [{
        data: data.dispatchCounts,
        backgroundColor: '#7EB1FB',
        borderRadius: 3,
        barPercentage: 0.65,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        barValue: { display: true, suffix: '' }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } },
        x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } }
      }
    },
    plugins: [barValuePlugin]
  });
}

function renderRepairDetailHTML() {
  return '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">'
    + '<div class="chart-container" style="height:260px;min-width:520px"><canvas id="repairBarCanvas"></canvas></div>'
    + '</div>';
}

function initRepairChart() {
  var canvas = document.getElementById('repairBarCanvas');
  if (!canvas) return;
  var labels = [];
  var ordersData = [];
  var completeData = [];
  for (var i = 0; i < 7; i++) {
    labels.push(weekDates[i].label === '昨日' ? '昨天' : weekDates[i].date);
    ordersData.push(weekData[i].repairOrders);
    completeData.push(weekData[i].repairComplete);
  }
  opsChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: '报修单数', data: ordersData, backgroundColor: '#7EB1FB', borderRadius: 3, barPercentage: 0.65, categoryPercentage: 0.8 },
        { label: '报修完成数', data: completeData, backgroundColor: '#0076F6', borderRadius: 3, barPercentage: 0.65, categoryPercentage: 0.8 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 12, boxHeight: 12, font: { size: 11 }, color: '#9ca3af', padding: 16 } },
        tooltip: { enabled: false },
        barValue: { display: true }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } },
        x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#9ca3af' }, border: { display: false } }
      }
    },
    plugins: [barValuePlugin]
  });
}

function renderLowBatteryDetailHTML(data) {
  return '<div class="donut-labeled" style="height:230px">'
    + '<canvas id="lowBatteryCanvas"></canvas>'
    + '</div>'
    + '<div class="detail-footer">低电量丢单:' + formatNumber(data.lostByLowBattery) + '</div>';
}

function initLowBatteryChart(data) {
  var canvas = document.getElementById('lowBatteryCanvas');
  if (!canvas) return;
  opsChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: [
        '低于10%电量 ' + formatNumber(data.batteryBelow10),
        '10%~20%电量 ' + formatNumber(data.battery10to20),
        '20%~30%电量 ' + formatNumber(data.battery20to30),
        '30%以上电量 ' + formatNumber(data.batteryAbove30)
      ],
      datasets: [{
        data: [data.batteryBelow10, data.battery10to20, data.battery20to30, data.batteryAbove30],
        backgroundColor: ['#dc2626', '#d97706', '#f59e0b', '#059669'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '55%',
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 28, bottom: 28, left: 80, right: 80 } },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        outerLabels: {
          centerLabel: '有电量车辆',
          centerValue: formatNumber(data.batteryBelow10 + data.battery10to20 + data.battery20to30 + data.batteryAbove30)
        }
      },
      animation: { duration: 400 }
    },
    plugins: [outerLabelsPlugin]
  });
}

function renderAvgPriceDetailHTML() {
  return '<div class="chart-container" style="height:240px"><canvas id="avgPriceCanvas"></canvas></div>';
}

function initAvgPriceChart() {
  var canvas = document.getElementById('avgPriceCanvas');
  if (!canvas) return;
  var labels = [], prices = [], withFine = [], withoutFine = [];
  for (var i = 0; i < 7; i++) {
    labels.push(weekDates[i].label === '昨日' ? '昨天' : weekDates[i].date);
    prices.push(weekData[i].avgPrice);
    withFine.push(weekData[i].avgPriceWithFine);
    withoutFine.push(weekData[i].avgPriceWithoutFine);
  }
  var lineBase = { fill: false, borderWidth: 1.5, pointRadius: 2, tension: 0 };
  orderChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        Object.assign({ label: '均单价', data: prices, borderColor: '#f87171', pointBackgroundColor: '#f87171' }, lineBase),
        Object.assign({ label: '均单价（含罚金）', data: withFine, borderColor: '#34d399', pointBackgroundColor: '#34d399' }, lineBase),
        Object.assign({ label: '均单价（不含罚金）', data: withoutFine, borderColor: '#60a5fa', pointBackgroundColor: '#60a5fa' }, lineBase)
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 10, boxHeight: 10, font: { size: 11 }, color: '#9ca3af', padding: 14, usePointStyle: false } },
        tooltip: { enabled: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f3f4f6' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } },
        x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#9ca3af' }, border: { display: false } }
      }
    }
  });
}

function renderAvgDurationDetailHTML() {
  return '<div class="chart-container" style="height:220px"><canvas id="avgDurationCanvas"></canvas></div>';
}

function initAvgDurationChart() {
  var canvas = document.getElementById('avgDurationCanvas');
  if (!canvas) return;
  var labels = [], durations = [];
  for (var i = 0; i < 7; i++) {
    labels.push(weekDates[i].label === '昨日' ? '昨天' : weekDates[i].date);
    durations.push(weekData[i].avgDuration);
  }
  orderChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '均单时长(分钟)',
        data: durations,
        borderColor: '#0076F6',
        pointBackgroundColor: '#0076F6',
        fill: false,
        borderWidth: 1.5,
        pointRadius: 2,
        tension: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        y: { beginAtZero: false, grid: { color: '#f3f4f6' }, ticks: { font: { size: 10 }, color: '#9ca3af' }, border: { display: false } },
        x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#9ca3af' }, border: { display: false } }
      }
    }
  });
}

function renderOrderChartHTML(data) {
  return '<div class="donut-labeled" style="height:230px">'
    + '<canvas id="orderCanvas"></canvas>'
    + '</div>';
}

function renderDetails(data) {
  var vehicleEl = document.getElementById('vehicleDetail');
  var opsEl = document.getElementById('opsDetail');
  var orderEl = document.getElementById('orderDetail');

  if (vehicleChart) { vehicleChart.destroy(); vehicleChart = null; }
  if (vehicleBarChart) { vehicleBarChart.destroy(); vehicleBarChart = null; }
  if (opsChart) { opsChart.destroy(); opsChart = null; }
  if (orderChart) { orderChart.destroy(); orderChart = null; }

  if (state.selectedMetrics.vehicle === 'totalVehicles') {
    vehicleEl.innerHTML = renderVehicleChartHTML(data);
    initVehicleChart(data);
  } else if (state.selectedMetrics.vehicle === 'unavailableVehicles') {
    vehicleEl.innerHTML = renderUnavailableBarHTML();
    initUnavailableBarChart(data);
  } else if (state.selectedMetrics.vehicle === 'noOrderVehicles') {
    vehicleEl.innerHTML = renderNoOrderDetailHTML();
    initNoOrderBarChart(data);
  } else {
    vehicleEl.innerHTML = renderPlaceholder();
  }

  if (state.selectedMetrics.ops === 'swapComplete') {
    opsEl.innerHTML = renderStaffTableHTML(data);
  } else if (state.selectedMetrics.ops === 'dispatchVehicles') {
    opsEl.innerHTML = '<div class="chart-container" style="height:240px"><canvas id="dispatchCountCanvas"></canvas></div>';
    initDispatchCountChart(data);
  } else if (state.selectedMetrics.ops === 'dispatchRate') {
    opsEl.innerHTML = renderDispatchDetailHTML();
    initDispatchChart(data);
  } else if (state.selectedMetrics.ops === 'repairOrders' || state.selectedMetrics.ops === 'repairComplete') {
    opsEl.innerHTML = renderRepairDetailHTML();
    initRepairChart();
  } else if (state.selectedMetrics.ops === 'lowBatteryVehicles') {
    opsEl.innerHTML = renderLowBatteryDetailHTML(data);
    initLowBatteryChart(data);
  } else {
    opsEl.innerHTML = renderPlaceholder();
  }

  if (state.selectedMetrics.order === 'avgPrice') {
    orderEl.innerHTML = renderAvgPriceDetailHTML();
    initAvgPriceChart();
  } else if (state.selectedMetrics.order === 'avgDuration') {
    orderEl.innerHTML = renderAvgDurationDetailHTML();
    initAvgDurationChart();
  } else if (state.selectedMetrics.order === 'lostOrders') {
    orderEl.innerHTML = renderOrderChartHTML(data);
    initOrderChart(data);
  } else {
    orderEl.innerHTML = renderPlaceholder();
  }
}

// ==================== Chart.js 柱状图值标签插件 ====================

var barValuePlugin = {
  id: 'barValue',
  afterDatasetsDraw: function(chart) {
    var opts = (chart.options.plugins && chart.options.plugins.barValue) || {};
    if (!opts.display) return;
    var ctx = chart.ctx;
    ctx.save();
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    chart.data.datasets.forEach(function(dataset, di) {
      var meta = chart.getDatasetMeta(di);
      meta.data.forEach(function(bar, i) {
        var value = dataset.data[i];
        var text = opts.suffix ? value.toFixed(1) + opts.suffix : String(value);
        ctx.fillText(text, bar.x, bar.y - 4);
      });
    });
    ctx.restore();
  }
};

// ==================== Chart.js 外部标签插件 ====================

var outerLabelsPlugin = {
  id: 'outerLabels',
  afterDraw: function(chart) {
    var ctx = chart.ctx;
    var meta = chart.getDatasetMeta(0);
    if (!meta.data.length) return;

    var labels = chart.data.labels || [];
    var colors = chart.data.datasets[0].backgroundColor;
    var opts = (chart.options.plugins && chart.options.plugins.outerLabels) || {};
    var firstArc = meta.data[0];
    var cx = firstArc.x;
    var cy = firstArc.y;

    if (opts.centerLabel) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(opts.centerLabel, cx, cy - 9);
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(opts.centerValue || '', cx, cy + 9);
      ctx.restore();
    }

    ctx.save();
    var positions = [];
    meta.data.forEach(function(arc, i) {
      if (!labels[i]) return;
      var midAngle = (arc.startAngle + arc.endAngle) / 2;
      var r = arc.outerRadius;
      var edgeX = cx + Math.cos(midAngle) * (r + 2);
      var edgeY = cy + Math.sin(midAngle) * (r + 2);
      var elbowX = cx + Math.cos(midAngle) * (r + 12);
      var elbowY = cy + Math.sin(midAngle) * (r + 12);
      positions.push({ i: i, midAngle: midAngle, edgeX: edgeX, edgeY: edgeY, elbowX: elbowX, elbowY: elbowY });
    });

    var minGap = 14;
    positions.sort(function(a, b) { return a.elbowY - b.elbowY; });
    for (var k = 1; k < positions.length; k++) {
      var prev = positions[k - 1];
      var curr = positions[k];
      var sameHalf = (prev.elbowX >= cx) === (curr.elbowX >= cx);
      if (sameHalf && curr.elbowY - prev.elbowY < minGap) {
        curr.elbowY = prev.elbowY + minGap;
      }
    }

    var canvasW = chart.width;
    positions.forEach(function(p) {
      var i = p.i;
      var isRight = p.elbowX >= cx;
      var endX = p.elbowX + (isRight ? 10 : -10);

      ctx.beginPath();
      ctx.moveTo(p.edgeX, p.edgeY);
      ctx.lineTo(p.elbowX, p.elbowY);
      ctx.lineTo(endX, p.elbowY);
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(p.edgeX, p.edgeY, 2, 0, Math.PI * 2);
      ctx.fillStyle = colors[i] || '#9ca3af';
      ctx.fill();

      ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = '#9ca3af';
      ctx.textAlign = isRight ? 'left' : 'right';
      ctx.textBaseline = 'middle';
      var textX = endX + (isRight ? 3 : -3);
      if (isRight && textX + ctx.measureText(labels[i]).width > canvasW - 2) {
        textX = canvasW - ctx.measureText(labels[i]).width - 2;
      } else if (!isRight && textX - ctx.measureText(labels[i]).width < 2) {
        textX = ctx.measureText(labels[i]).width + 2;
      }
      ctx.fillText(labels[i], textX, p.elbowY);
    });
    ctx.restore();
  }
};

// ==================== 图表初始化 ====================

function initVehicleChart(data) {
  var canvas = document.getElementById('vehicleCanvas');
  if (!canvas) return;
  vehicleChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: [
        '可用车辆数 ' + formatNumber(data.availableVehicles),
        '不可用车辆 ' + formatNumber(data.unavailableVehicles)
      ],
      datasets: [{
        data: [data.availableVehicles, data.unavailableVehicles],
        backgroundColor: ['#ff6b35', '#e5e7eb'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '62%',
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 24, bottom: 24, left: 90, right: 90 } },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        outerLabels: {
          centerLabel: '运营车辆数',
          centerValue: formatNumber(data.totalVehicles)
        }
      },
      animation: { duration: 400 }
    },
    plugins: [outerLabelsPlugin]
  });
}

function initOrderChart(data) {
  var canvas = document.getElementById('orderCanvas');
  if (!canvas) return;
  orderChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: [
        '超区丢单 ' + formatNumber(data.lostOutOfRange),
        '低电丢单 ' + formatNumber(data.lostLowBattery),
        '故障丢单 ' + formatNumber(data.lostFault),
        '其他原因丢单 ' + formatNumber(data.lostOther)
      ],
      datasets: [{
        data: [data.lostOutOfRange, data.lostLowBattery, data.lostFault, data.lostOther],
        backgroundColor: ['#ff6b35', '#f59e0b', '#9ca3af', '#059669'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '55%',
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 28, bottom: 28, left: 80, right: 80 } },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        outerLabels: {
          centerLabel: '丢单次数',
          centerValue: formatNumber(data.lostOrders)
        }
      },
      animation: { duration: 400 }
    },
    plugins: [outerLabelsPlugin]
  });
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
  renderUserMetrics(data);
  renderDetails(data);
  updateSelectionUI();
}

// ==================== 字段动态渲染 ====================

function getCardSettings(cardKey) {
  var saved = localStorage.getItem('card_settings_' + cardKey);
  if (saved) {
    try { return JSON.parse(saved); } catch(e) {}
  }
  return CARD_FIELDS[cardKey].map(function(f) {
    return { key: f.key, label: f.label, checked: f.defaultChecked !== false };
  });
}

function saveCardSettings(cardKey, settings) {
  localStorage.setItem('card_settings_' + cardKey, JSON.stringify(settings));
}

var DETAIL_METRICS = {
  vehicle: { totalVehicles: 1, unavailableVehicles: 1, noOrderVehicles: 1 },
  ops: { swapComplete: 1, dispatchVehicles: 1, dispatchRate: 1, repairOrders: 1, repairComplete: 1, lowBatteryVehicles: 1 },
  order: { avgPrice: 1, avgDuration: 1, lostOrders: 1 }
};

function renderCardFields(cardKey) {
  var settings = getCardSettings(cardKey);
  var visible = settings.filter(function(f) { return f.checked; });
  var container = document.getElementById(cardKey + 'Metrics');
  if (!container) return;

  if (visible.length === 0) {
    container.innerHTML = '';
    return;
  }

  var detailMap = DETAIL_METRICS[cardKey] || {};
  var html = '<div class="metrics-grid cols-3">';
  for (var i = 0; i < visible.length; i++) {
    var f = visible[i];
    var hasDetail = cardKey !== 'revenue' && detailMap[f.key];

    if (hasDetail) {
      var isLarge = cardKey === 'order' ? ' large' : '';
      var isSelected = state.selectedMetrics[cardKey] === f.key ? ' selected' : '';
      html += '<div class="metric-item selectable' + isSelected + '" data-card="' + cardKey + '" data-metric="' + f.key + '">'
        + '<div class="metric-label">' + f.label + '</div>'
        + '<div class="metric-value' + isLarge + '" id="val-' + f.key + '">-</div>'
        + '</div>';
    } else if (cardKey === 'user') {
      html += '<div class="metric-item">'
        + '<div class="metric-label">' + f.label + '</div>'
        + '<div class="metric-value large" id="val-' + f.key + '">-</div>'
        + '</div>';
    } else {
      html += '<div class="metric-item">'
        + '<div class="metric-label">' + f.label + '</div>'
        + '<div class="metric-value large" id="val-' + f.key + '">-</div>'
        + '<div class="metric-change" id="change-' + f.key + '"></div>'
        + '</div>';
    }
  }
  html += '</div>';
  container.innerHTML = html;

  if (cardKey !== 'revenue') {
    var selectableVisible = visible.filter(function(f) { return detailMap[f.key]; });
    if (selectableVisible.length > 0) {
      var selectedExists = selectableVisible.some(function(f) { return f.key === state.selectedMetrics[cardKey]; });
      if (!selectedExists) {
        state.selectedMetrics[cardKey] = selectableVisible[0].key;
      }
    }
  }
}

function renderAllCardFields() {
  ['revenue', 'vehicle', 'ops', 'order', 'user'].forEach(function(key) {
    renderCardFields(key);
  });
}

// ==================== 字段编辑器 ====================

var editorState = {
  open: false,
  cardKey: null,
  items: []
};

function openFieldEditor(cardKey) {
  editorState.open = true;
  editorState.cardKey = cardKey;
  editorState.items = getCardSettings(cardKey).map(function(f) {
    return { key: f.key, label: f.label, checked: f.checked };
  });
  document.getElementById('editorTitle').textContent = CARD_NAMES[cardKey];
  renderEditorList();
  document.querySelector('.header').style.display = 'none';
  document.getElementById('weekSelector').style.display = 'none';
  document.querySelector('.content').style.display = 'none';
  document.getElementById('fieldEditor').classList.add('open');
  window.scrollTo(0, 0);
}

function closeFieldEditor() {
  editorState.open = false;
  document.getElementById('fieldEditor').classList.remove('open');
  document.querySelector('.header').style.display = '';
  document.getElementById('weekSelector').style.display = '';
  document.querySelector('.content').style.display = '';
}

function saveFieldSettings() {
  saveCardSettings(editorState.cardKey, editorState.items);
  renderCardFields(editorState.cardKey);
  renderPage(weekData[state.currentDay]);
  closeFieldEditor();
}

function getCheckboxSVG(checked) {
  if (checked) {
    return '<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#ff6b35"/><path d="M7 11l3 3 5-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  return '<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="none" stroke="#d1d5db" stroke-width="1.5"/><path d="M7 11l3 3 5-6" stroke="#d1d5db" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function renderEditorList() {
  var html = '';
  for (var i = 0; i < editorState.items.length; i++) {
    var item = editorState.items[i];
    html += '<div class="editor-item' + (item.checked ? '' : ' unchecked') + '" data-idx="' + i + '">'
      + '<div class="editor-checkbox" data-idx="' + i + '">' + getCheckboxSVG(item.checked) + '</div>'
      + '<span class="editor-item-label">' + item.label + '</span>'
      + '<div class="drag-handle" data-idx="' + i + '">'
      + '<svg width="18" height="14" viewBox="0 0 18 14"><line x1="1" y1="1" x2="17" y2="1" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="7" x2="17" y2="7" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="13" x2="17" y2="13" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/></svg>'
      + '</div>'
      + '</div>';
  }
  document.getElementById('editorList').innerHTML = html;
}

// ==================== 拖拽排序 ====================

var dragState = {
  active: false,
  dragIdx: -1,
  clone: null,
  offsetY: 0,
  itemPositions: [],
  isTouch: false
};

function onDragStart(e) {
  var handle = e.target.closest('.drag-handle');
  if (!handle) return;
  e.preventDefault();

  var item = handle.closest('.editor-item');
  var idx = parseInt(item.getAttribute('data-idx'));
  var list = document.getElementById('editorList');
  var allItems = list.querySelectorAll('.editor-item');
  var rect = item.getBoundingClientRect();

  var isTouch = e.type === 'touchstart';
  var clientY = isTouch ? e.touches[0].clientY : e.clientY;

  dragState.active = true;
  dragState.dragIdx = idx;
  dragState.offsetY = clientY - rect.top;
  dragState.isTouch = isTouch;
  dragState.itemPositions = [];
  allItems.forEach(function(el) {
    dragState.itemPositions.push(el.getBoundingClientRect());
  });

  var clone = item.cloneNode(true);
  clone.classList.add('dragging');
  clone.style.position = 'fixed';
  clone.style.left = rect.left + 'px';
  clone.style.top = rect.top + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.zIndex = '1000';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);
  dragState.clone = clone;

  item.style.opacity = '0.2';

  if (isTouch) {
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
  } else {
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }
}

function onDragMove(e) {
  if (!dragState.active) return;
  e.preventDefault();

  var clientY = dragState.isTouch ? e.touches[0].clientY : e.clientY;
  var newTop = clientY - dragState.offsetY;
  dragState.clone.style.top = newTop + 'px';

  var itemH = dragState.itemPositions[0].height;
  var centerY = newTop + itemH / 2;

  var targetIdx = dragState.dragIdx;
  for (var i = 0; i < dragState.itemPositions.length; i++) {
    var midY = dragState.itemPositions[i].top + dragState.itemPositions[i].height / 2;
    if (centerY < midY) {
      targetIdx = i;
      break;
    }
    if (i === dragState.itemPositions.length - 1) targetIdx = i;
  }

  if (targetIdx !== dragState.dragIdx) {
    var moved = editorState.items.splice(dragState.dragIdx, 1)[0];
    editorState.items.splice(targetIdx, 0, moved);
    dragState.dragIdx = targetIdx;
    renderEditorList();

    var list = document.getElementById('editorList');
    var allItems = list.querySelectorAll('.editor-item');
    dragState.itemPositions = [];
    allItems.forEach(function(el) {
      dragState.itemPositions.push(el.getBoundingClientRect());
    });
    allItems[targetIdx].style.opacity = '0.2';
  }
}

function onDragEnd() {
  if (!dragState.active) return;
  dragState.active = false;

  if (dragState.clone) {
    dragState.clone.remove();
    dragState.clone = null;
  }

  if (dragState.isTouch) {
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
  } else {
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
  }

  renderEditorList();
}

// ==================== 日历弹窗 ====================

function openCalendar() {
  renderCalendar();
  document.getElementById('calendarOverlay').classList.add('open');
  var sel = document.querySelector('.calendar-day.selected');
  if (sel) {
    setTimeout(function() { sel.scrollIntoView({ block: 'center' }); }, 0);
  }
}

function closeCalendar() {
  document.getElementById('calendarOverlay').classList.remove('open');
}

function renderCalendar() {
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  var selectedDate = weekDates[state.currentDay] ? weekDates[state.currentDay].fullDate : yesterday;

  var startMonth = new Date(yesterday.getFullYear(), yesterday.getMonth() - 2, 1);
  var endMonth = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);

  var html = '';
  var cur = new Date(startMonth);
  while (cur <= endMonth) {
    var year = cur.getFullYear();
    var month = cur.getMonth();
    html += '<div class="calendar-month-title">' + year + ' 年 ' + (month + 1) + ' 月</div>';
    html += '<div class="calendar-grid">';

    var firstDay = new Date(year, month, 1).getDay();
    for (var e = 0; e < firstDay; e++) {
      html += '<div class="calendar-day empty"></div>';
    }

    var daysInMonth = new Date(year, month + 1, 0).getDate();
    for (var d = 1; d <= daysInMonth; d++) {
      var date = new Date(year, month, d);
      var isFuture = date > yesterday;
      var isYesterday = date.toDateString() === yesterday.toDateString();
      var isSelected = date.toDateString() === selectedDate.toDateString();
      var dayOfWeek = date.getDay();
      var isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      var cls = 'calendar-day';
      if (isFuture) cls += ' future';
      if (isYesterday && isSelected) cls += ' today';
      else if (isSelected) cls += ' selected';
      else if (isYesterday) cls += ' today';
      if (isWeekend && !isSelected) cls += ' weekend';

      var dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      html += '<div class="' + cls + '" data-cal-date="' + dateStr + '">' + d + '</div>';
    }

    html += '</div>';
    cur.setMonth(cur.getMonth() + 1);
  }
  document.getElementById('calendarBody').innerHTML = html;
}

function selectCalendarDate(dateStr) {
  var parts = dateStr.split('-');
  var selected = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

  var found = -1;
  for (var i = 0; i < weekDates.length; i++) {
    if (weekDates[i].fullDate.toDateString() === selected.toDateString()) {
      found = i;
      break;
    }
  }

  if (found >= 0) {
    state.currentDay = found;
  } else {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var diff = Math.round((yesterday - selected) / 86400000);
    var DAY_COUNT = Math.max(14, diff + 1);
    var labels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    weekDates = [];
    for (var i = DAY_COUNT - 1; i >= 0; i--) {
      var d = new Date(yesterday);
      d.setDate(yesterday.getDate() - i);
      var isY = d.toDateString() === yesterday.toDateString();
      var mm = String(d.getMonth() + 1).padStart(2, '0');
      var dd = String(d.getDate()).padStart(2, '0');
      weekDates.push({
        label: isY ? '昨日' : labels[d.getDay()],
        date: mm + '.' + dd,
        isYesterday: isY,
        fullDate: new Date(d)
      });
    }
    weekData = generateWeekData();
    for (var j = 0; j < weekDates.length; j++) {
      if (weekDates[j].fullDate.toDateString() === selected.toDateString()) {
        state.currentDay = j;
        break;
      }
    }
  }

  renderWeekSelector();
  renderPage(weekData[state.currentDay]);
  closeCalendar();
}

// ==================== 模块选择弹窗 ====================

var modulePickerState = [];

var moduleDragState = {
  active: false,
  dragIdx: -1,
  offsetY: 0,
  clone: null,
  isTouch: false,
  itemPositions: []
};

function getModuleSettings() {
  var saved = localStorage.getItem('module_settings');
  if (saved) {
    try {
      var parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch(e) {}
  }
  return null;
}

function renderModulePicker() {
  var saved = getModuleSettings();
  if (modulePickerState.length === 0) {
    if (saved) {
      modulePickerState = saved.map(function(s) {
        var m = MODULE_LIST.find(function(x) { return x.key === s.key; });
        return { key: s.key, name: m ? m.name : s.key, desc: m ? m.desc : '', checked: s.checked };
      });
    } else {
      modulePickerState = MODULE_LIST.map(function(m) {
        return { key: m.key, name: m.name, desc: m.desc, checked: true };
      });
    }
  }
  var list = document.getElementById('modulePickerList');
  var html = '';
  modulePickerState.forEach(function(m, i) {
    html += '<div class="module-picker-item' + (m.checked ? ' checked' : '') + '" data-mi="' + i + '">'
      + '<div class="module-picker-check">'
      + (m.checked
        ? '<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#ff6b35" stroke="none"/><path d="M6 11l3.5 3.5L16 8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="none" stroke="#d1d5db" stroke-width="1.5"/></svg>')
      + '</div>'
      + '<div class="module-picker-info">'
      + '<div class="module-picker-name">' + m.name + '</div>'
      + '<div class="module-picker-desc">' + m.desc + '</div>'
      + '</div>'
      + '<div class="module-picker-drag">'
      + '<svg width="18" height="14" viewBox="0 0 18 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="1" y1="1" x2="17" y2="1"/><line x1="1" y1="7" x2="17" y2="7"/><line x1="1" y1="13" x2="17" y2="13"/></svg>'
      + '</div>'
      + '</div>';
  });
  list.innerHTML = html;
}

function toggleModuleItem(index) {
  modulePickerState[index].checked = !modulePickerState[index].checked;
  renderModulePicker();
}

function saveModuleSettings() {
  var arr = modulePickerState.map(function(m) {
    return { key: m.key, checked: m.checked };
  });
  localStorage.setItem('module_settings', JSON.stringify(arr));
  applyModuleSettings();
}

function applyModuleSettings() {
  var saved = getModuleSettings();
  if (!saved) return;
  var content = document.querySelector('.content');
  saved.forEach(function(s) {
    var section = document.querySelector('[data-card-section="' + s.key + '"]');
    if (section) {
      section.style.display = s.checked ? '' : 'none';
      content.appendChild(section);
    }
  });
}

function showModulePicker() {
  modulePickerState = [];
  renderModulePicker();
  document.getElementById('modulePickerOverlay').classList.add('open');
}

function hideModulePicker() {
  document.getElementById('modulePickerOverlay').classList.remove('open');
}

function onModuleDragStart(e) {
  var handle = e.target.closest('.module-picker-drag');
  if (!handle) return;
  e.preventDefault();

  var item = handle.closest('.module-picker-item');
  var idx = parseInt(item.getAttribute('data-mi'));
  var list = document.getElementById('modulePickerList');
  var allItems = list.querySelectorAll('.module-picker-item');
  var rect = item.getBoundingClientRect();

  var isTouch = e.type === 'touchstart';
  var clientY = isTouch ? e.touches[0].clientY : e.clientY;

  moduleDragState.active = true;
  moduleDragState.dragIdx = idx;
  moduleDragState.offsetY = clientY - rect.top;
  moduleDragState.isTouch = isTouch;
  moduleDragState.itemPositions = [];
  allItems.forEach(function(el) {
    moduleDragState.itemPositions.push(el.getBoundingClientRect());
  });

  var clone = item.cloneNode(true);
  clone.classList.add('dragging');
  clone.style.position = 'fixed';
  clone.style.left = rect.left + 'px';
  clone.style.top = rect.top + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.zIndex = '1000';
  clone.style.pointerEvents = 'none';
  clone.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
  document.body.appendChild(clone);
  moduleDragState.clone = clone;

  item.style.opacity = '0.2';

  if (isTouch) {
    document.addEventListener('touchmove', onModuleDragMove, { passive: false });
    document.addEventListener('touchend', onModuleDragEnd);
  } else {
    document.addEventListener('mousemove', onModuleDragMove);
    document.addEventListener('mouseup', onModuleDragEnd);
  }
}

function onModuleDragMove(e) {
  if (!moduleDragState.active) return;
  e.preventDefault();

  var clientY = moduleDragState.isTouch ? e.touches[0].clientY : e.clientY;
  var newTop = clientY - moduleDragState.offsetY;
  moduleDragState.clone.style.top = newTop + 'px';

  var itemH = moduleDragState.itemPositions[0].height;
  var centerY = newTop + itemH / 2;

  var targetIdx = moduleDragState.dragIdx;
  for (var i = 0; i < moduleDragState.itemPositions.length; i++) {
    var midY = moduleDragState.itemPositions[i].top + moduleDragState.itemPositions[i].height / 2;
    if (centerY < midY) {
      targetIdx = i;
      break;
    }
    if (i === moduleDragState.itemPositions.length - 1) targetIdx = i;
  }

  if (targetIdx !== moduleDragState.dragIdx) {
    var moved = modulePickerState.splice(moduleDragState.dragIdx, 1)[0];
    modulePickerState.splice(targetIdx, 0, moved);
    moduleDragState.dragIdx = targetIdx;
    renderModulePicker();

    var list = document.getElementById('modulePickerList');
    var allItems = list.querySelectorAll('.module-picker-item');
    moduleDragState.itemPositions = [];
    allItems.forEach(function(el) {
      moduleDragState.itemPositions.push(el.getBoundingClientRect());
    });
    allItems[targetIdx].style.opacity = '0.2';
  }
}

function onModuleDragEnd() {
  if (!moduleDragState.active) return;
  moduleDragState.active = false;

  if (moduleDragState.clone) {
    moduleDragState.clone.remove();
    moduleDragState.clone = null;
  }

  if (moduleDragState.isTouch) {
    document.removeEventListener('touchmove', onModuleDragMove);
    document.removeEventListener('touchend', onModuleDragEnd);
  } else {
    document.removeEventListener('mousemove', onModuleDragMove);
    document.removeEventListener('mouseup', onModuleDragEnd);
  }

  renderModulePicker();
}

// ==================== 事件绑定 ====================

// ==================== 区域选择器 ====================

function getHeaderTitle() {
  if (areaState.selectedDistrict === null) return '全部';
  var district = CITY_DATA.districts[areaState.selectedDistrict];
  if (areaState.selectedGroup === null) return district.name;
  var group = district.children[areaState.selectedGroup];
  if (typeof group === 'string') return group;
  if (areaState.selectedArea === null) return group.name;
  return group.children[areaState.selectedArea];
}

function updateHeaderTitle() {
  document.querySelector('.city-name').textContent = getHeaderTitle();
}

function toggleAreaPicker() {
  areaState.open = !areaState.open;
  var picker = document.getElementById('areaPicker');
  document.getElementById('areaOverlay').classList.toggle('open', areaState.open);
  picker.classList.toggle('open', areaState.open);
  if (areaState.open) {
    var headerH = document.querySelector('.header').offsetHeight;
    picker.style.top = headerH + 'px';
    renderAreaPicker();
  }
}

function closeAreaPicker() {
  areaState.open = false;
  document.getElementById('areaOverlay').classList.remove('open');
  document.getElementById('areaPicker').classList.remove('open');
}

function renderAreaPicker() {
  var col1 = '<div class="area-item' + (areaState.selectedDistrict === null ? ' active' : '') + '" data-ac="1" data-ai="all">全部</div>';
  for (var i = 0; i < CITY_DATA.districts.length; i++) {
    col1 += '<div class="area-item' + (areaState.selectedDistrict === i ? ' active' : '') + '" data-ac="1" data-ai="' + i + '">' + CITY_DATA.districts[i].name + '</div>';
  }

  var col2 = '', col3 = '', showCol2 = false, showCol3 = false;

  if (areaState.selectedDistrict !== null) {
    showCol2 = true;
    var district = CITY_DATA.districts[areaState.selectedDistrict];
    col2 = '<div class="area-item' + (areaState.selectedGroup === null ? ' active' : '') + '" data-ac="2" data-ai="all">全部</div>';
    for (var j = 0; j < district.children.length; j++) {
      var child = district.children[j];
      var name = typeof child === 'string' ? child : child.name;
      col2 += '<div class="area-item' + (areaState.selectedGroup === j ? ' active' : '') + '" data-ac="2" data-ai="' + j + '">' + name + '</div>';
    }

    if (areaState.selectedGroup !== null) {
      var group = district.children[areaState.selectedGroup];
      if (typeof group === 'object') {
        showCol3 = true;
        col3 = '<div class="area-item' + (areaState.selectedArea === null ? ' active' : '') + '" data-ac="3" data-ai="all">全部</div>';
        for (var k = 0; k < group.children.length; k++) {
          col3 += '<div class="area-item' + (areaState.selectedArea === k ? ' active' : '') + '" data-ac="3" data-ai="' + k + '">' + group.children[k] + '</div>';
        }
      }
    }
  }

  document.getElementById('areaPicker').innerHTML =
    '<div class="area-col">' + col1 + '</div>'
    + '<div class="area-col">' + col2 + '</div>'
    + '<div class="area-col">' + col3 + '</div>';
}

function handleAreaClick(e) {
  var item = e.target.closest('.area-item');
  if (!item) return;
  var col = item.getAttribute('data-ac');
  var idx = item.getAttribute('data-ai');

  if (col === '1') {
    if (idx === 'all') {
      areaState.selectedDistrict = null;
      areaState.selectedGroup = null;
      areaState.selectedArea = null;
      updateHeaderTitle();
      closeAreaPicker();
    } else {
      areaState.selectedDistrict = parseInt(idx);
      areaState.selectedGroup = null;
      areaState.selectedArea = null;
      renderAreaPicker();
    }
  } else if (col === '2') {
    if (idx === 'all') {
      areaState.selectedGroup = null;
      areaState.selectedArea = null;
      updateHeaderTitle();
      closeAreaPicker();
    } else {
      var gi = parseInt(idx);
      var district = CITY_DATA.districts[areaState.selectedDistrict];
      var group = district.children[gi];
      areaState.selectedGroup = gi;
      areaState.selectedArea = null;
      if (typeof group === 'string') {
        updateHeaderTitle();
        closeAreaPicker();
      } else {
        renderAreaPicker();
      }
    }
  } else if (col === '3') {
    areaState.selectedArea = idx === 'all' ? null : parseInt(idx);
    updateHeaderTitle();
    closeAreaPicker();
  }
}

function setupEvents() {
  document.querySelector('.city-selector').addEventListener('click', function () {
    toggleAreaPicker();
  });

  document.getElementById('areaOverlay').addEventListener('click', function () {
    closeAreaPicker();
  });

  document.getElementById('areaPicker').addEventListener('click', handleAreaClick);

  document.querySelector('.settings-btn').addEventListener('click', function() {
    showModulePicker();
  });

  document.getElementById('weekSelector').addEventListener('click', function (e) {
    if (e.target.closest('.calendar-btn')) {
      openCalendar();
      return;
    }
    var tab = e.target.closest('.day-tab');
    if (!tab) return;
    var dayIndex = parseInt(tab.getAttribute('data-day'), 10);
    if (isNaN(dayIndex)) return;
    state.currentDay = dayIndex;
    renderWeekSelector();
    renderPage(weekData[state.currentDay]);
  });

  document.getElementById('calendarClose').addEventListener('click', closeCalendar);
  document.querySelector('.calendar-mask').addEventListener('click', closeCalendar);
  document.getElementById('calendarBody').addEventListener('click', function(e) {
    var day = e.target.closest('.calendar-day');
    if (!day || day.classList.contains('empty') || day.classList.contains('future')) return;
    var dateStr = day.getAttribute('data-cal-date');
    if (dateStr) selectCalendarDate(dateStr);
  });

  document.getElementById('editorBack').addEventListener('click', closeFieldEditor);
  document.getElementById('editorDone').addEventListener('click', saveFieldSettings);

  var moduleListEl = document.getElementById('modulePickerList');
  moduleListEl.addEventListener('click', function(e) {
    if (moduleDragState.active) return;
    if (e.target.closest('.module-picker-drag')) return;
    var item = e.target.closest('.module-picker-item');
    if (!item) return;
    var idx = parseInt(item.getAttribute('data-mi'));
    if (!isNaN(idx)) toggleModuleItem(idx);
  });
  moduleListEl.addEventListener('touchstart', onModuleDragStart, { passive: false });
  moduleListEl.addEventListener('mousedown', function(e) {
    if (e.target.closest('.module-picker-drag')) onModuleDragStart(e);
  });
  document.getElementById('modulePickerBtn').addEventListener('click', function() {
    saveModuleSettings();
    hideModulePicker();
  });
  document.getElementById('modulePickerClose').addEventListener('click', function() {
    saveDefaultModuleSettings();
    hideModulePicker();
  });
  document.querySelector('.module-picker-bg').addEventListener('click', function() {
    saveDefaultModuleSettings();
    hideModulePicker();
  });

  var editorListEl = document.getElementById('editorList');
  editorListEl.addEventListener('click', function(e) {
    if (dragState.active) return;
    var cb = e.target.closest('.editor-checkbox');
    if (cb) {
      var idx = parseInt(cb.getAttribute('data-idx'));
      editorState.items[idx].checked = !editorState.items[idx].checked;
      renderEditorList();
    }
  });
  editorListEl.addEventListener('touchstart', onDragStart, { passive: false });
  editorListEl.addEventListener('mousedown', function(e) {
    if (e.target.closest('.drag-handle')) onDragStart(e);
  });

  document.addEventListener('click', function (e) {
    var editTarget = e.target.closest('[data-edit]');
    if (editTarget) {
      openFieldEditor(editTarget.getAttribute('data-edit'));
      return;
    }

    var tab = e.target.closest('[data-no-order-tab]');
    if (tab) {
      state.noOrderTab = tab.getAttribute('data-no-order-tab');
      if (vehicleBarChart) { vehicleBarChart.destroy(); vehicleBarChart = null; }
      document.getElementById('vehicleDetail').innerHTML = renderNoOrderDetailHTML();
      initNoOrderBarChart(weekData[state.currentDay]);
      return;
    }

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

function enterDashboard() {
  document.getElementById('landingPage').style.display = 'none';
  document.getElementById('dashboardPage').style.display = '';
}

function saveDefaultModuleSettings() {
  var arr = MODULE_LIST.map(function(m) {
    return { key: m.key, checked: true };
  });
  localStorage.setItem('module_settings', JSON.stringify(arr));
  applyModuleSettings();
}

document.addEventListener('DOMContentLoaded', function () {
  weekDates = getWeekDates();
  weekData = generateWeekData();

  var yesterdayIndex = weekDates.findIndex(function (d) { return d.isYesterday; });
  if (yesterdayIndex >= 0) state.currentDay = yesterdayIndex;

  renderWeekSelector();
  renderAllCardFields();
  renderPage(weekData[state.currentDay]);
  setupEvents();

  document.getElementById('landingDailyReport').addEventListener('click', function() {
    enterDashboard();
    showModulePicker();
  });
});
