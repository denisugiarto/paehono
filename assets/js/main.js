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

if (ctxOximeter != null) {
  const data = {
    labels: ["Morning", "Afternoon", "Night"],
    datasets: [
      {
        label: "Oxigen Rate",
        data: [85, 93, 98],
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
        fill: { above: "rgba(14, 218, 249, 1)", target: { value: 95 } }, // min area
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
    ],
  };

  data.labels.unshift("");
  data.labels.push("");
  data.datasets[0].data.unshift(null);
  data.datasets[0].data.push(null);

  new Chart(ctxOximeter, {
    type: "line",
    data,
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          offset: false,
          grid: {
            color: (ctxOximeter) => {
              const lastTickIndex = ctxOximeter.chart.scales.x.ticks.length - 1;
              if (ctxOximeter.index !== 1 && ctxOximeter.index !== 4) {
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

const ctxPulseRate = document.getElementById("pulse-rate-chart");

if (ctxPulseRate != null) {
  const data = {
    labels: ["Morning", "Afternoon", "Night"],
    datasets: [
      {
        label: "Pulse Rate",
        data: [125, 105, 110],
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
        fill: { above: "rgba(14, 218, 249, 1)", target: { value: 0 } }, // min area
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

const picker = new Litepicker({
  element: document.getElementById("date-litepicker"),
  singleMode: false,
  format: "MMM D YYYY",
});
