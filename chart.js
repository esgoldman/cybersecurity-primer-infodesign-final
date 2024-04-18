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
  display_data();
}

var backgroundColor = ["#89CE94", "#FFCB77", "#FFA686", "#E76C6B", "#F4F1B2", "#B1E5CF"];

function make_date_chart() {
  var config = {
    type: "bar",
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
      plugins: {},
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
      var i = 0;
      for (var attackType in data_map) {
        var dataset = {
          label: attackType,
          data: [],
          fill: false,
          backgroundColor: backgroundColor[i]
        };
        i++;
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
          datasets: [{ data: Object.values(attacks), borderWidth: 0, backgroundColor: backgroundColor }],
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

function display_data() {
  $.ajax({
    url: "output.json",
    dataType: "json",
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        var entry = data[i];
        var date = entry.date;
        var description = entry.description;
        var attack_type = entry.attack_type;
        var attack_string = "";
        if(attack_type.length!=0){
          attack_string = "- "
        }
        for (var j = 0; j < attack_type.length; j++) {
          attack_string += attack_type[j];
          if (j != attack_type.length - 1) {
            attack_string += ", ";
          }
        }
        var damage_type = entry.damage_type;
        $(".attack-data").append(
          "<div class='accordion-item'>" +
            "<h2 class='accordion-header'>" +
            "<button class='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#" +
            "collapse-" +
            i +
            "' aria-expanded='false' aria-controls='" +
            "collapse-" +
            i +
            "'>" +
            date +
            " " +
            attack_string +
            "</button>" +
            "</h2>" +
            "<div class='accordion-collapse collapse' id='" +
            "collapse-" +
            i +
            "' data-bs-parent='.attack-data'>" +
            "<div class='accordion-body'>" +
            description +
            "</div>" +
            "</div>" +
            "</div>"
        );
      }
    },
    error: function (xhr, status, error) {
      console.error(status, error);
    },
  });
}

$("#search").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $(".accordion-item").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});