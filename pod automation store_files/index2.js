const daysLeft = document.querySelector(".timer .days");
const hrsLeft = document.querySelector(".timer .hours");
const minsLeft = document.querySelector(".timer .minutes");
const secsLeft = document.querySelector(".timer .seconds");

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_HOUR = 1000 * 60 * 60;
const ONE_MIN = 1000 * 60;
const ONE_SEC = 1000;

const date = new Date(document.querySelector(".timer")?.dataset?.date ?? null);
let intervalId;

intervalId = setInterval(() => {
  let timeDiff = date.getTime() - new Date().getTime();

  let days = Math.floor(timeDiff / ONE_DAY);
  let hrs = Math.floor((timeDiff % ONE_DAY) / ONE_HOUR);
  let mins = Math.floor((timeDiff % ONE_HOUR) / ONE_MIN);
  let secs = Math.floor((timeDiff % ONE_MIN) / ONE_SEC);

  if (timeDiff < 0) {
    return clearInterval(intervalId);
  }

  daysLeft.innerText = days.toString().padStart(2, "0");
  hrsLeft.innerText = hrs.toString().padStart(2, "0");
  minsLeft.innerText = mins.toString().padStart(2, "0");
  secsLeft.innerText = secs.toString().padStart(2, "0");
}, 1000);
