$(document).ready(function () {
  Chart.defaults.backgroundColor = "#003459";
  Chart.defaults.borderColor = "#003459";
  Chart.defaults.color = "#8d99ae";
  Chart.defaults.font.family = "Source Code Pro";
  load();
  email_game();
  identify_game();
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
    setTimeout(function () {
      $(".title_popup").fadeOut(1000);
    }, 5000);
  });
  $(header).on("click", function () {
    $(".header-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[1]);
    correct_points[1] = true;
    setTimeout(function () {
      $(".header-popup").fadeOut(1000);
    }, 5000);
  });
  $(generic).on("click", function () {
    $(".generic-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[2]);
    correct_points[2] = true;
    setTimeout(function () {
      $(".generic-popup").fadeOut(1000);
    }, 5000);
  });
  $(payment).on("click", function () {
    $(".payment-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[3]);
    correct_points[3] = true;
    setTimeout(function () {
      $(".payment-popup").fadeOut(1000);
    }, 5000);
  });
  $(button).on("click", function () {
    $(".button-popup").fadeIn(1000);
    increment_points(counter, max, correct_points[4]);
    correct_points[4] = true;
    setTimeout(function () {
      $(".button-popup").fadeOut(1000);
    }, 5000);
  });
}

var level = 0;
const phishes = [
  [
    {
      text:
        '<h5 class="card-title">You\'ve won!</h5>' +
        '<h6 class="card-text"><strong>Raffles</strong> raffle@example.com</h6>' +
        '<p class="card-text">You\'ve won a free vacation to Hawaii! Click <a href="#phish-email" style="color: #0000EE">here</a> to claim your prize!</p>',
      phishing: true,
      clicked: false,
    },
    {
      text:
        '<h5 class="card-title">[GitHub] Please verify your device</h5>' +
        '<h6 class="card-text"<strong>GitHub</strong> noreply@github.com</h6>' +
        '<p class="card-text">Hey cyberexpert!</p><p class="card-text">A sign in attempt requires further verification because we did not recognize your device.' +
        " To complete the sign in, enter the verification code on the unrecognized device.</p>" +
        '<p class="card-text">Device: Firefox on Windows<br>Verification code: 123456</p><br><p class="card-text">Thanks,<br>The GitHub Team</p>',
      phishing: false,
    },
  ],
  [
    {
      text:
        '<h5 class="card-title">Re: Homework 05</h5>' +
        '<h6 class="card-text"<strong>Professor Smith</smith> smith@university.edu' +
        '<p class="card-text">Hi Charlie,</p><p class="card-text">Unfortunately, I cannot give you an extension on the homework. I understand that classes are difficult, but you will have to learn how to manage your time.</p>' +
        '<p class="card-text">As you know, my office hours are today from 2 to 5. You may come then if you still need help.</p><br><p class="card-text">~Prof. Smith</p>',
      phishing: false,
      clicked: false,
    },
    {
      text:
        '<h5 class="card-title">Thank you for your recent purchase!</h5>' +
        '<h6 class="card-text"><strong>Amazon</strong> support@amazon.com</h6>' +
        '<p class="card-text">Dear Customer,</p><p class="card-text">Thank you for your recent purchase of a Kindle e-reader. Unfortunately, we had trouble verifying your address.</p>' +
        '<p class="card-text">Please click <a href="#phish-email" style="color: #0000EE">here</a> to re-enter your address.</p><br><p class="card-text">Best regards,<br>The Amazon Team</p>',
      phishing: true,
    },
  ],
  [
    {
      text:
        '<h5 class="card-title">Update your account information</h5>' +
        '<h6 class="card-text"><strong>Bank of America</strong> security@bankofamerica.com</h6>' +
        '<p class="card-text">Dear valued customer,</p><p class="card-text">We are updating our security measures and require you to verify your account information. Click <a href="#identify-game" style="color: #0000EE">here</a> to update your information.</p>' +
        '<p class="card-text">Thank you for your cooperation.</p><br><p class="card-text">Bank of America</p>',
      phishing: true,
      clicked: false,
    },
    {
      text:
        '<h5 class="card-title">Complete your 2024-25 FAFSA form today!</h5>' +
        '<h6 class="card-text"><strong>U.S. Department of Education</strong> noreply@studentaid.gov</h6>' +
        '<p class="card-text">CyberWiz,</p><p class="card-text">Planning to attend college, career school, or trade school between July 1, 2024, and June 30, 2025? The 2024-25<em>Free Application for Federal Student Aid</em> form is <strong>available now</strong> at fafsa.gov.</p>' +
        "<p class=\"card-text\">Don't delay! Check your state's deadline for the 2024-25 school year and complete your FAFSA form before that date to be eligible for as much aid as possible. Remember, you must submit a FAFSA form every year you're enrolled in a school to be eligible to receive federal student aid.</p>" +
        '<p class="card-text">This email was sent by: Office of Federal Student Aid<br>U.S. Department of Education</p>',
      phishing: false,
    },
  ],
  [
    {
      text:
        '<h5 class="card-title">Urgent Action Required</h5>' +
        '<h6 class="card-text"><strong>PayPal</strong> service@paypal.com</h6>' +
        '<p class="card-text">Dear PayPal Customer,</p><p class="card-text">We have noticed unauthorized access attempts on your account. To protect your account, please verify your identity by clicking <a href="#identify-game" style="color: #0000EE">here</a>.</p>' +
        '<p class="card-text">Thank you for using PayPal.</p><br><p class="card-text">PayPal Security Team</p>',
      phishing: true,
      clicked: false,
    },
    {
      text:
        '<h5 class="card-title">Monthly Newsletter</h5>' +
        '<h6 class="card-text"><strong>Apple</strong> newsletter@apple.com</h6>' +
        '<p class="card-text">Dear Apple User,</p><p class="card-text">Stay up to date with the latest news, tips, and offers from Apple. In this month\'s newsletter, we\'re excited to introduce new features and updates to our products.</p>' +
        '<p class="card-text">Thank you for being a part of the Apple community.</p><br><p class="card-text">Apple Newsletter Team</p>',
      phishing: false,
    },
  ],
];
function identify_game() {
  identify_load_emails();
  const counter = $(".phish-identify-points");
  $(".phish-1").on("click", function () {
    if (level < phishes.length) {
      if ($(this).attr("phishing") === "true") {
        setTimeout(function () {
          increment_points(counter, phishes.length, phishes[level][0].clicked);
        }, 500);
      }
      phishes[level][0].clicked = true;
      identify_next_level(level, phishes);
    }
  });
  $(".phish-2").on("click", function () {
    if (level < phishes.length) {
      if ($(this).attr("phishing") === "true") {
        setTimeout(function () {
          increment_points(counter, phishes.length, phishes[level][0].clicked);
        }, 500);
      }
      phishes[level][0].clicked = true;
      identify_next_level();
    }
  });
}
function identify_load_emails() {
  $(".phish-1").html(phishes[level][0].text);
  $(".phish-1").attr("phishing", phishes[level][0].phishing);
  $(".phish-2").html(phishes[level][1].text);
  $(".phish-2").attr("phishing", phishes[level][1].phishing);
}

function identify_next_level() {
  console.log(level);
  level++;
  identify_load_emails();
}

function increment_points(counter, max, clicked) {
  var points = parseInt(counter.text());
  if (points < max && !clicked) {
    points++;
    counter.text(points);
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
