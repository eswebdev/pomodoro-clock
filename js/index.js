var $workTime = $('#work-time');
var $breakTime = $('#break-time');
var $timer = $('#timer');
var $status = $('#status');

$('#plus-work').on('click', function() {
  $workTime.text(+$workTime.text() + 1);
});

$('#minus-work').on('click', function() {
  if (+$workTime.text() > 1) {
    $workTime.text(+$workTime.text() - 1);
  }
});

$('#plus-break').on('click', function() {
  $breakTime.text(+$breakTime.text() + 1);
});

$('#minus-break').on('click', function() {
  if (+$breakTime.text() > 1) {
    $breakTime.text(+$breakTime.text() - 1);
  }
});

var interval;
var isPaused = true; // for pause button
var start = false // for mouse click

function countdown() {
  clearInterval(interval);
  var c = $workTime.text() * 60;
  var self = $breakTime.text() * 60
  var _self = $workTime.text() * 60;
  start = true;
  isPaused = false;
  interval = setInterval(function() {
    if (!isPaused) {
      var minutes = parseInt(c / 60, 10);
      var seconds = parseInt(c % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      $timer.text(minutes + ":" + seconds);
      c--;

      if (c < 0) {
        if ($status.text() === 'Work Time!') {
          $status.text('Break!');
          c = self;
        } else {
          $status.text('Work Time!');
          c = _self;
        };

      };
    };

  }, 1000);
};

$('#start-btn').on('click', countdown);

$('#reset-btn').on('click', function() {
  clearInterval(interval);
  $workTime.text(25);
  $breakTime.text(5);
  $timer.text($workTime.text());
  $status.text('Work Time!');
  // $('#start-btn').attr('disabled', false);
  start = false;
});

$('#pause-btn').on('click', function() {
  if (!isPaused) {
    isPaused = true;
  } else {
    isPaused = false;
  }
});

$('.timer-container').on('click', function() {
  if (!start) {
    countdown();
  } else if (!isPaused) {
    isPaused = true;
  } else {
    isPaused = false;
  }
});