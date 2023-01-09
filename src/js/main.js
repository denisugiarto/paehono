// Form Validation Bootstrap
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

$(document).ready(function () {
  $(".form-select2").select2({
    placeholder: "Select your suburb",
    allowClear: true,
  });
});

// CHART CONFIG
const ctxOximeter = document.getElementById("oximeter-chart");
const oximeterChartArea = [
  {
    label: "Acceptable",
    data: [100], //max area
    backgroundColor: "rgba(205, 98, 118, 0)",
    borderColor: "rgba(205, 98, 118, 0)",
    fill: { above: "rgba(14, 218, 249, .75)", target: { value: 95 } }, // min area
  },
  {
    label: "Get Advice from healthcare team",
    data: [95],
    backgroundColor: "rgba(77, 157, 46, 0)",
    borderColor: "rgba(77, 157, 46, 0)",
    fill: { above: "rgba(63, 204, 91, .75)", target: { value: 92 } },
  },
  {
    label: "Urgent, Call 111",
    data: [92],
    backgroundColor: "rgba(89, 162, 201, 0)",
    borderColor: "rgba(89, 162, 201, 0)",
    fill: { above: "rgba(252, 116, 42, .75)", target: { value: 0 } },
  },
];

const oxigenRateToday = [
  {
    label: "Oxigen Rate",
    data: [85, 93, 98],
    borderWidth: 2,
    backgroundColor: "rgb(15, 25, 40)",
    borderColor: "rgb(15, 25, 40)",
    fill: false,
  },
];

const oxigenRateWeek = [
  {
    label: "Oxigen Rate",
    data: [85, 93, 98, 90, 91, 90, 95],
    borderWidth: 2,
    backgroundColor: "rgb(15, 25, 40)",
    borderColor: "rgb(15, 25, 40)",
    fill: false,
  },
];

const labelsToday = ["Morning", "Afternoon", "Night"];
const labelsMaramataka = [
  "Ōuenuku",
  "Ōkoro",
  "Tamatea-Āio",
  "Tamatea-ā-ngana",
  "Tamatea-Kai-ariki",
  "Tamatea Tūhāhā",
  "Ariroa",
];

function createSpaceLabels(labels) {
  const newLabels = [...labels];
  newLabels.push("");
  newLabels.unshift("");
  return newLabels;
}

function createSpaceDatas(datas) {
  const newDatas = [Object.assign({}, ...datas)];
  newDatas[0].data = [null, ...newDatas[0].data, null];
  return newDatas;
}

const chartOptions = {
  layout: {
    padding: {
      top: 15,
      left: 10,
      bottom: 10,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      offset: false,
      grid: {
        color: (ctxOximeter) => {
          const lastTickIndex = ctxOximeter.chart.scales.x.ticks.length - 1;
          if (ctxOximeter.index !== 1 && ctxOximeter.index !== lastTickIndex) {
            return "rgba(102,102,102,0.1)";
          }
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(255,255,255, 1)",
      bodyColor: "#101B37",
      titleColor: "#101B37",
    },
  },
};

function updateChartArea(chartArea, length) {
  chartArea.map((data) => {
    const value = data.data[0];
    let newArr = [];
    for (let i = 0; i < length; i++) {
      newArr.push(value);
    }
    return (data.data = newArr);
  });
}
const createChart = (id, labels, datas, chartArea) => {
  const SPACE_LENGTH = 2;
  const DATAS_LENGTH = datas[0].data.length;
  let chartAreaLength = SPACE_LENGTH + DATAS_LENGTH;
  const datasWithSpace = createSpaceDatas(datas);
  const labelsWithSpace = createSpaceLabels(labels);

  let datasets = [...datasWithSpace];
  if (chartArea != null) {
    updateChartArea(chartArea, chartAreaLength);
    datasets = [...datasets, ...chartArea];
  }

  const data = {
    labels: labelsWithSpace,
    datasets,
  };

  const chartConfig = {
    type: "line",
    data,
    options: chartOptions,
  };

  return new Chart(id, chartConfig);
};

let oxiChart;
if (ctxOximeter != null) {
  createOximeterChartToday();
}

function createOximeterChartToday() {
  oxiChart = createChart(
    ctxOximeter,
    labelsToday,
    oxigenRateToday,
    oximeterChartArea
  );
}

function createOximeterChartMaramataka() {
  oxiChart = createChart(
    ctxOximeter,
    labelsMaramataka,
    oxigenRateWeek,
    oximeterChartArea
  );
}

const ctxPulseRate = document.getElementById("pulse-rate-chart");

const pulseRateToday = [
  {
    label: "Pulse Rate",
    data: [125, 85, 110],
    borderWidth: 2,
    backgroundColor: "rgb(15, 25, 40)",
    borderColor: "rgb(15, 25, 40)",
    fill: false,
  },
];

const pulseRateWeek = [
  {
    label: "Pulse Rate",
    data: [125, 85, 110, 105, 110, 120, 120],
    borderWidth: 2,
    backgroundColor: "rgb(15, 25, 40)",
    borderColor: "rgb(15, 25, 40)",
    fill: false,
  },
];

const pulseRateChartArea = [
  {
    label: "Urgent, Call 111",
    data: [150],
    backgroundColor: "rgba(89, 162, 201, 0)",
    borderColor: "rgba(89, 162, 201, 0)",
    fill: { above: "rgba(252, 116, 42, .75)", target: { value: 120 } },
  },
  {
    label: "Get Advice from healthcare team",
    data: [120],
    backgroundColor: "rgba(77, 157, 46, 0)",
    borderColor: "rgba(77, 157, 46, 0)",
    fill: { above: "rgba(63, 204, 91, .75)", target: { value: 100 } },
  },
  {
    label: "Acceptable",
    data: [100], //max area
    backgroundColor: "rgba(205, 98, 118, 0)",
    borderColor: "rgba(205, 98, 118, 0)",
    fill: { above: "rgba(14, 218, 249, .75)", target: { value: 0 } }, // min area
  },
];

let pulseRateChart;
if (ctxPulseRate != null) {
  createPulseRateChartToday();
}

function createPulseRateChartToday() {
  pulseRateChart = createChart(
    ctxPulseRate,
    labelsToday,
    pulseRateToday,
    pulseRateChartArea
  );
}

function createPulseRateChartMaramataka() {
  pulseRateChart = createChart(
    ctxPulseRate,
    labelsMaramataka,
    pulseRateWeek,
    pulseRateChartArea
  );
}

function changeChartMaramataka(checked) {
  oxiChart.destroy();
  pulseRateChart.destroy();

  if (!checked) {
    createOximeterChartToday();
    createPulseRateChartToday();
    return;
  }

  createOximeterChartMaramataka();
  createPulseRateChartMaramataka();
}

//Feeling Chart
const ctxFeelingChart = document.getElementById("feeling-chart");
const feelingToday = [
  {
    label: "Oxigen Rate ",
    data: [5, 4, 3],
    borderWidth: 2,
    backgroundColor: "rgb(15, 25, 40)",
    borderColor: "rgb(15, 25, 40)",
    fill: false,
  },
];

function createFeelingChart() {
  // createChart(ctxFeelingChart, labelsToday, feelingToday);
  new Chart(ctxFeelingChart, {
    type: "line",
    data: {
      xLabels: ["January", "February", "March", "April", "May", "June", "July"],
      yLabels: [
        "Request Added",
        "Request Viewed",
        "Request Accepted",
        "Request Solved",
        "Solving Confirmed",
      ],
      datasets: [
        {
          label: "My First dataset",
          data: ["Request Added", "Request Viewed", "Request Added"],
          fill: false,
          showLine: false,
          borderColor: "#f00",
          backgroundColor: "#f00",
        },
        {
          label: "My First dataset",
          data: [null, "Request Accepted", "Request Accepted"],
          fill: false,
          showLine: false,
          borderColor: "#f00",
          backgroundColor: "#f00",
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Chart.js - Non Numeric X and Y Axis",
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
        ],
        yAxes: [
          {
            type: "category",
            position: "left",
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Request State",
            },
            ticks: {
              reverse: true,
            },
          },
        ],
      },
    },
  });
}

if (ctxFeelingChart != null) {
  createFeelingChart();
}

//LitePicker Config
const datePickerRanges = document.querySelectorAll(".date-litepicker-range");
const datePickerSingle = document.querySelectorAll(".date-litepicker");
const datePickerRange = [...datePickerRanges].map(
  (element) =>
    new Litepicker({
      element: element,
      format: "MMM D YYYY",
      singleMode: false,
    })
);
const datePicker = [...datePickerSingle].map(
  (element) => new Litepicker({ element: element, format: "MMM D YYYY" })
);

//Alert Bootstrap
const alertList = document.querySelectorAll(".alert");
const alerts = [...alertList].map((element) => new bootstrap.Alert(element));
