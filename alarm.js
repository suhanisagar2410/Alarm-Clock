let data = [];

function displayTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var time = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("current_time").innerHTML = time;
}

setInterval(function () {
  displayTime();
  play();
}, 1000);

function setAlarm() {
  let btn = document.getElementById("btn");

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    let hrs = parseInt(document.getElementById("hour").value);
    let mins = parseInt(document.getElementById("minute").value);
    let secs = parseInt(document.getElementById("second").value);
    let zone = document.getElementById("zone").value;

    let object = {
      hrs: hrs,
      mins: mins,
      secs: secs,
      zone: zone,
      audio: new Audio(
        "/alarm_clock_old.mp3"
      ),
    };

    if (isNaN(hrs) || isNaN(mins) || isNaN(secs)) {
      alert("Please enter valid input!");
    } else {
      data.push(object);
    }

    update();
  });
}

function update() {
  let List_of_alarms = document.getElementById("alarms");
  List_of_alarms.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    // let buttonText = data[i].audio.paused ? "Play" : "Pause";
    let row = `
      <p style="font-size: 20px;">
        <b>${data[i].hrs}:${data[i].mins}:${data[i].secs} ${data[i].zone}</b>
        <button onclick="deleteFun(${i})" style="margin: 0 20px; padding: 0 45px; border: 2px solid white; background: #68587f; color: white; border-radius: 10px;">Delete</button>
        <button onclick="pauseAlarm(${i})" style="padding: 0 45px; border: 2px solid white; background: #68587f; color: white; border-radius: 10px;">Pause</button>
      </p>
    `;
    List_of_alarms.insertAdjacentHTML("beforeend", row);
  }
}

function play() {
  let now = new Date();

  for (let i = 0; i < data.length; i++) {
    let alarmTime = new Date();
    let hours = alarmTime.getHours();
    let minutes = alarmTime.getMinutes();
    let seconds = alarmTime.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var time1 = `${hours}:${minutes}:${seconds} ${ampm}`;

    if (
      time1 === `${data[i].hrs}:${data[i].mins}:${data[i].secs} ${data[i].zone}`
    ) {
      console.log("Playing audio...");
      data[i].audio.play();
    } else {
      console.log("Condition not met. Audio not played.");
    }
  }
}

function getAmPm(time) {
  return time.getHours() >= 12 ? "PM" : "AM";
}

function deleteFun(index) {
  data[index].audio.pause();
  data.splice(index, 1);
  update();
}

function pauseAlarm(index) {
  if (data[index].audio.paused) {
    data[index].audio.pause();
  } else {
    data[index].audio.pause();
  }
}

setAlarm();
