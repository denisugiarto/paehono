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

const ctxOximeter = document.getElementById("oximeter-chart");
const oximeterChartArea = [
  {
    label: "Acceptable",
    data: [100, 100, 100, 100, 100], //max area
    backgroundColor: "rgba(205, 98, 118, 0)",
    borderColor: "rgba(205, 98, 118, 0)",
    fill: { above: "rgba(14, 218, 249, .75)", target: { value: 95 } }, // min area
  },
  {
    label: "Get Advice from healthcare team",
    data: [95, 95, 95, 95, 95],
    backgroundColor: "rgba(77, 157, 46, 0)",
    borderColor: "rgba(77, 157, 46, 0)",
    fill: { above: "rgba(63, 204, 91, .75)", target: { value: 92 } },
  },
  {
    label: "Urgent, Call 111",
    data: [92, 92, 92, 92, 92],
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

const labelsOxigenRateToday = ["Morning", "Afternoon", "Night"];
const labelsOxigenRateMaramataka = [
  "Ōuenuku",
  "Ōkoro",
  "Tamatea-Āio",
  "Tamatea-ā-ngana",
  "Tamatea-Kai-ariki",
  "Tamatea Tūhāhā",
  "Ariroa",
];

function createChartDataSpace() {
  data.labels.unshift("");
  data.labels.push("");
  data.datasets[0].data.unshift(null);
  data.datasets[0].data.push(null);
}

const chartOption = {
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

if (ctxOximeter != null) {
  let datasets = [...oxigenRateToday, ...oximeterChartArea];
  const data = {
    labels: labelsOxigenRateToday,
    datasets,
  };

  createChartDataSpace();

  new Chart(ctxOximeter, {
    type: "line",
    data,
    options: chartOption,
  });
}

const ctxPulseRate = document.getElementById("pulse-rate-chart");

if (ctxPulseRate != null) {
  const data = {
    labels: ["Morning", "Afternoon", "Night"],
    datasets: [
      {
        label: "Pulse Rate",
        data: [125, 85, 110],
        borderWidth: 2,
        backgroundColor: "rgb(15, 25, 40)",
        borderColor: "rgb(15, 25, 40)",
        fill: false,
      },
      {
        label: "Acceptable",
        data: [100, 100, 100, 100, 100], //max area
        backgroundColor: "rgba(205, 98, 118, 0)",
        borderColor: "rgba(205, 98, 118, 0)",
        fill: { above: "rgba(14, 218, 249, .75)", target: { value: 0 } }, // min area
      },
      {
        label: "Get Advice from healthcare team",
        data: [120, 120, 120, 120, 120],
        backgroundColor: "rgba(77, 157, 46, 0)",
        borderColor: "rgba(77, 157, 46, 0)",
        fill: { above: "rgba(63, 204, 91, .75)", target: { value: 100 } },
      },
      {
        label: "Urgent, Call 111",
        data: [150, 150, 150, 150, 150],
        backgroundColor: "rgba(89, 162, 201, 0)",
        borderColor: "rgba(89, 162, 201, 0)",
        fill: { above: "rgba(252, 116, 42, .75)", target: { value: 120 } },
      },
    ],
  };

  data.labels.unshift("");
  data.labels.push("");
  data.datasets[0].data.unshift(null);
  data.datasets[0].data.push(null);

  new Chart(ctxPulseRate, {
    type: "line",
    data,
    options: {
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
            color: (ctxPulseRate) => {
              const lastTickIndex =
                ctxPulseRate.chart.scales.x.ticks.length - 1;
              if (ctxPulseRate.index !== 1 && ctxPulseRate.index !== 4) {
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
    },
  });
}

function changeChartMaramataka() {
  alert("change maramataka");
}

//LitePicker Config
const datePickerElements = document.querySelectorAll(".date-litepicker");
const datePicker = [...datePickerElements].map(
  (element) => new Litepicker({ element: element, format: "MMM D YYYY" })
);

//Alert Bootstrap
const alertList = document.querySelectorAll(".alert");
const alerts = [...alertList].map((element) => new bootstrap.Alert(element));
