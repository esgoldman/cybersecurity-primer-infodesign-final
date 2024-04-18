$(document).ready(function () {
  password_check();
  identify_game();
  generate_password();
});

function password_check() {
  $("#password-enter").keyup(function () {
    var passcode = $(this).val();
    var length = passcode.length;
    check_strength(passcode, length);
  });
}
function check_strength(passcode, length) {
  var percent = 0;
  if (length <= 5) {
    percent = length;
  } else {
    if (passcode.match(/0|1|2|3|4|5|6|7|8|9/) != null) {
      if (length <= 10) {
        percent = 0;
      } else {
        percent = length + 25;
      }
    }
    if (passcode.match(/[a-z]/) != null) {
      if (length <= 7) {
        percent = 0;
      } else {
        percent += length + 25;
      }
    }
    if (passcode.match(/[A-Z]/) != null) {
      percent += length + 25;
    }
    if (passcode.match(/\W/) != null && passcode.match(/\D/) != null) {
      percent += length + 25;
    }
  }
  console.log(percent);
  var colors = ["#8d50a0", "#db1e34", "#f58521", "#feb415", "#1cad50"];
  var color;
  if (percent <= 20) {
    color = colors[0];
  } else if (percent <= 40) {
    color = colors[1];
  } else if (percent <= 60) {
    color = colors[2];
  } else if (percent <= 80) {
    color = colors[3];
  } else {
    color = colors[4];
  }
  $(".progress-bar").css("width", percent + "%");
  $(".progress-bar").css("backgroundColor", color);
}

var level = 0;
const passes = [
  [
    {
      text: '<h5 class="card-title">2731</h5>',
      stronger: false,
    },
    {
      text: '<h5 class="card-title">hye05t</h5>',
      stronger: true,
    },
  ],
  [
    {
      text: '<h5 class="card-title">cyb3rCh4mp!</h5>',
      stronger: true,
    },
    {
      text: '<h5 class="card-title">rockyou</h5>',
      stronger: false,
    },
  ],
  [
    {
      text: '<h5 class="card-title">hE11o</h5>',
      stronger: false,
    },
    {
      text: '<h5 class="card-title">information_design</h5>',
      stronger: true,
    },
  ],
  [
    {
      text: '<h5 class="card-title">abcdefghijklmnopqrstuvwxyz</h5>',
      stronger: true,
    },
    {
      text: '<h5 class="card-title">Hey!Th3re</h5>',
      stronger: false,
    },
  ],
];
var gameOver = false;
function identify_game() {
  identify_load_passwords();
  const counter = $(".pass-identify-points");
  $(".pass-1").on("click", function () {
    if ($(this).attr("stronger") === "true") {
      increment_points(counter, passes.length, gameOver);
    }
    if (level < passes.length) {
      identify_next_level(level, passes);
    } else {
      gameOver = true;
    }
  });
  $(".pass-2").on("click", function () {
    if ($(this).attr("stronger") === "true") {
      increment_points(counter, passes.length, gameOver);
    }
    if (level < passes.length) {
      identify_next_level(level, passes);
    } else {
      gameOver = true;
    }
  });
}
function identify_load_passwords() {
  if (level < passes.length) {
    $(".pass-1").html(passes[level][0].text);
    $(".pass-1").attr("stronger", passes[level][0].stronger);
    $(".pass-2").html(passes[level][1].text);
    $(".pass-2").attr("stronger", passes[level][1].stronger);
  }
}

function identify_next_level() {
  level++;
  identify_load_passwords();
}

function increment_points(counter, max, clicked) {
  var points = parseInt(counter.text());
  if (points <= max && !clicked) {
    points++;
    counter.text(points);
  }
}

function generate_password() {
  var length = $("#randompass-length").val();
  $(".length").text(length);
  $("#randompass-length").on("input", function () {
    length = $(this).val();
    $(".length").text(length);
  });
  $(".pass-btn").on("click", function(){
    var pass="";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for(var i = 0; i < length; i++){
        let char = Math.floor(Math.random()*characters.length+1);
        pass+=characters.charAt(char);
    }
    $(".random-pass").text(pass);
  })
}
