const counter = document.querySelector(".counter");
const digitsContainer = document.querySelector(".digits");

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_HOUR = 1000 * 60 * 60;
const ONE_MIN = 1000 * 60;
const ONE_SEC = 1000;

const startDate = new Date(counter?.dataset?.start_date ?? null).getTime();
const endDate = new Date(counter?.dataset.end_date ?? null).getTime();
const startCount = +counter?.dataset.start_count ?? 1000;
const endCount = +counter?.dataset.end_count ?? 2000;
const frequency = +counter?.dataset.frequency ?? 1000;
const initDiff = endDate - startDate;
const maxCountLength = endCount.toFixed(0).length;
let diff = new Date().getTime() - startDate;

const blockHeight =
  getComputedStyle(document.body)
    .getPropertyValue("--digits-block-height")
    .match(/\d+/)?.[0] ?? 35;
let intervalId;
let count = 0;

intervalId = setInterval(() => {
  diff += frequency;

  let currentCount = (
    (diff / initDiff) * (endCount - startCount) +
    startCount
  ).toFixed();

  if (count === 0) {
    for (let i = 0; i < maxCountLength; i++) {
      const digitBlock = document.createElement("div");
      digitBlock.classList.add("digits-block");
      digitsContainer.appendChild(digitBlock);

      if (i % 3 === 0 && i !== maxCountLength - 1) {
        const span = document.createElement("span");
        span.textContent = ",";
        digitsContainer.appendChild(span);
      }
    }

    for (let i = 0; i < maxCountLength; i++) {
      const hasNoDigit = !currentCount?.[maxCountLength - (i + 1)];
      const block = document.querySelector(
        `.digits-block:nth-of-type(${i + 1})`
      );

      let list = document.createElement("div");
      list.classList.add("slick-list");

      block.appendChild(list);

      list.style.transform = `translate3d(0px, -${
        -blockHeight * +(hasNoDigit ? 0 : currentCount[i])
      }px, 0px)`;
      list.style.transition = `transform 750ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s`;

      new Array(10)
        .fill(null)
        .forEach((_, i) => (list.innerHTML += `<span>${i}</span>`));
    }
  }

  if (diff > initDiff) {
    return clearInterval(intervalId);
  }

  for (let i = 0; i < maxCountLength; i++) {
    const hasNoDigit = !currentCount?.[maxCountLength - (i + 1)];

    document.querySelector(
      `.counter .digits-block:nth-of-type(${i + 1}) .slick-list`
    ).style.transform = `translate3d(0px, ${
      -blockHeight * +(hasNoDigit ? 0 : currentCount[i])
    }px, 0px)`;
  }

  ++count;
}, frequency);
