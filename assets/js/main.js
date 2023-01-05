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

function createChartDataSpace(data) {
  const newData = data;
  newData.labels = ["", ...newData.labels, ""];
  newData.datasets[0].data = [null, ...newData.datasets[0].data, null];
  return newData;
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

  updateChartArea(chartArea, chartAreaLength);

  let datasets = [...datas, ...chartArea];

  const data = {
    labels,
    datasets,
  };

  const chartConfig = {
    type: "line",
    data,
    options: chartOptions,
  };

  createChartDataSpace(data);

  return new Chart(id, chartConfig);
};

let oxiChart;
if (ctxOximeter != null) {
  oxiChart = createChart(
    ctxOximeter,
    labelsToday,
    oxigenRateToday,
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
  pulseRateChart = createChart(
    ctxPulseRate,
    labelsToday,
    pulseRateToday,
    pulseRateChartArea
  );
}

function changeChartMaramataka() {
  oxiChart.destroy();
  oxiChart = createChart(
    ctxOximeter,
    labelsMaramataka,
    oxigenRateWeek,
    oximeterChartArea
  );
}

//LitePicker Config
const datePickerElements = document.querySelectorAll(".date-litepicker");
const datePicker = [...datePickerElements].map(
  (element) => new Litepicker({ element: element, format: "MMM D YYYY" })
);

//Alert Bootstrap
const alertList = document.querySelectorAll(".alert");
const alerts = [...alertList].map((element) => new bootstrap.Alert(element));
