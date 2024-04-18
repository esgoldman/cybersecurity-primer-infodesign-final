$(document).ready(function () {
  $("body").css("background-color", "#8d99ae");
  $("body").css("color", "#003459");
  $("#intro p, #start")
    .hide()
    .each(function (i) {
      $(this)
        .delay(1000 * i)
        .fadeIn(1000);
    });

  $("#start").delay(4000).fadeIn(1000);

  $("#start").click(function () {
    $("#intro").fadeOut(1000);
    $("body").css("background-color", "#003459");
    $("body").css("color", "#8d99ae");
    $("#main").fadeIn(2000);
    load();
  });
});

$(document).ready(function () {
  load();
});

function load() {
  Chart.defaults.backgroundColor = "#003459";
  Chart.defaults.borderColor = "#003459";
  Chart.defaults.color = "#8d99ae";
  Chart.defaults.font.family = "Source Code Pro";
  make_date_chart();
  make_attack_chart();
}

function make_date_chart() {
  var config = {
    type: "scatter",
    data: {
      datasets: [],
      labels: [],
    },
    options: {
      showLine: false,
      scales: {
        x: {
          type: "category",
          labels: [],
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  };

  $.ajax({
    url: "output.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var data_map = {};
      var dates = {};
      data.forEach(function (entry) {
        var date = entry.date;
        var attackTypes = entry["attack_type"];
        dates[date] = true;

        attackTypes.forEach(function (attackType) {
          if (!data_map[attackType]) {
            data_map[attackType] = {};
          }
          if (!data_map[attackType][date]) {
            data_map[attackType][date] = 0;
          }
          data_map[attackType][date]++;
        });
      });

      for (var attackType in data_map) {
        var dataset = {
          label: attackType,
          data: [],
          fill: false,
        };
        Object.keys(data_map[attackType]).forEach(function (date) {
          dataset.data.push({
            x: date,
            y: data_map[attackType][date],
            attackType: attackType,
          });
        });

        config.data.datasets.push(dataset);
      }

      config.data.labels = Object.keys(dates);
      console.log(config);

      var canvas = document.getElementById("attacks-by-year");
      if (canvas.chart) {
        canvas.chart.destroy();
      }
      var ctx = document.getElementById("attacks-by-year").getContext("2d");
      canvas.chart = new Chart(ctx, config);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function make_attack_chart() {
  $.ajax({
    url: "output.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      var attacks = {};
      data.forEach(function (entry) {
        for (var i = 0; i < entry.attack_type.length; i++) {
          attacks[entry.attack_type[i]] =
            (attacks[entry.attack_type[[i]]] || 0) + 1;
        }
      });
      var config = {
        type: "doughnut",
        labels: Object.keys(attacks),
        data: {
          datasets: [{ data: Object.values(attacks) }],
          labels: Object.keys(attacks),
        },
        options: {},
      };
      console.log(config);
      var canvas = document.getElementById("attack-types");
      if (canvas.chart) {
        canvas.chart.destroy();
      }
      var ctx = document.getElementById("attack-types").getContext("2d");
      canvas.chart = new Chart(ctx, config);
    },
    error: function (error) {
      console.error(error);
    },
  });
}
