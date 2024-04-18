$(document).ready(function () {
  Chart.defaults.backgroundColor = "#003459";
  Chart.defaults.borderColor = "#003459";
  Chart.defaults.color = "#8d99ae";
  Chart.defaults.font.family = "Source Code Pro";
  load();
  email_game();
});

var backgroundColor = ["#89CE94", "#FFCB77", "#FFA686"];

function load() {
  $.ajax({
    url: "phishing-sorted.json",
    dataType: "json",
    success: function (data) {
      var dates = [];
      var sites = [];
      var emails = [];
      var targets = [];
      data.forEach(function (entry) {
        dates.push(entry.date);
        sites.push(entry.websites);
        emails.push(entry.emails);
        targets.push(entry.target_amount);
      });
      site_chart(dates, sites);
      email_chart(dates, emails);
      target_chart(dates, targets);
    },
    error: function (xhr, status, error) {
      console.error(status, error);
    },
  });
}

function email_game() {
  var correct_points = [false, false, false, false, false];
  const title = $(".phish-title");
  const header = $(".header");
  const generic = $(".generic");
  const payment = $(".payment");
  const button = $(".phish-btn");
  const counter = $(".phish-email-points");
  const max = 5;

  $(title).on("click", function () {
    $(".title_popup").fadeIn(1000);
    increment_points(counter, max, correct_points[0]);
    correct_points[0] = true;
    setTimeout(function() {
        $(".title_popup").fadeOut(1000);
      }, 5000);
  });
  $(header).on("click", function(){
    $(".header-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[1]);
    correct_points[1] = true;
    setTimeout(function() {
        $(".header-popup").fadeOut(1000);
      }, 5000);
  });
  $(generic).on("click", function(){
    $(".generic-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[2]);
    correct_points[2] = true;
    setTimeout(function() {
        $(".generic-popup").fadeOut(1000);
      }, 5000);
  });
  $(payment).on("click", function(){
    $(".payment-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[3]);
    correct_points[3] = true;
    setTimeout(function() {
        $(".payment-popup").fadeOut(1000);
      }, 5000);
  });
  $(button).on("click", function(){
    $(".button-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[4]);
    correct_points[4] = true;
    setTimeout(function() {
        $(".button-popup").fadeOut(1000);
      }, 5000);
  })
}

function increment_points(counter, max, clicked) {
  var points = parseInt(counter.text());
  if (points < max && !clicked) {
    counter.text(points + 1);
  }
}

function site_chart(dates, sites) {
  var config = {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Website Amount",
          data: sites,
          backgroundColor: backgroundColor[0],
        },
      ],
    },
    options: {},
  };
  console.log(config);
  var canvas = document.getElementById("sites");
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  var ctx = document.getElementById("sites").getContext("2d");
  canvas.chart = new Chart(ctx, config);
}

function email_chart(dates, emails) {
  var config = {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Email Amount",
          data: emails,
          backgroundColor: backgroundColor[1],
        },
      ],
    },
    options: {},
  };
  console.log(config);
  var canvas = document.getElementById("emails");
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  var ctx = document.getElementById("emails").getContext("2d");
  canvas.chart = new Chart(ctx, config);
}

function target_chart(dates, targets) {
  var config = {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Target Amount",
          data: targets,
          backgroundColor: backgroundColor[2],
        },
      ],
    },
    options: {},
  };
  console.log(config);
  var canvas = document.getElementById("targets");
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  var ctx = document.getElementById("targets").getContext("2d");
  canvas.chart = new Chart(ctx, config);
}
