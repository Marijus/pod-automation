const daysLeft = document.querySelector(".timer .days");
const hrsLeft = document.querySelector(".timer .hours");
const minsLeft = document.querySelector(".timer .minutes");
const secsLeft = document.querySelector(".timer .seconds");

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_HOUR = 1000 * 60 * 60;
const ONE_MIN = 1000 * 60;
const ONE_SEC = 1000;

const date = new Date(document.querySelector(".timer")?.dataset?.date ?? null);
let timeDiff = date.getTime() - new Date().getTime();

if (timeDiff >= 1) {
  let days = Math.floor(timeDiff / ONE_DAY);
  let hrs = Math.floor((timeDiff -= days * ONE_DAY) / ONE_HOUR);
  let mins = Math.floor((timeDiff -= hrs * ONE_HOUR) / ONE_MIN);
  let secs = Math.floor((timeDiff - mins * ONE_MIN) / ONE_SEC);
  let intervalId;

  const padNumber = (number, maxLength) => {
    return number.toString().padStart(maxLength, "0");
  };

  const updateTimer = () => {
    daysLeft.innerText = padNumber(days, 2);
    hrsLeft.innerText = padNumber(hrs, 2);
    minsLeft.innerText = padNumber(mins, 2);
    secsLeft.innerText = padNumber(secs, 2);
  };

  intervalId = setInterval(() => {
    if (secs === 0 && mins === 0 && hrs === 0 && days === 0) {
      return clearInterval(intervalId);
    }

    if (hrs === 0 && mins === 0 && secs === 0) days = --days;

    if (mins === 0 && secs === 0) {
      hrs = hrs === 0 ? 23 : --hrs;
    }

    if (secs === 0) {
      mins = mins === 0 ? 59 : --mins;
    }

    secs = secs <= 0 ? 59 : --secs;

    updateTimer();
  }, 1000);
}
