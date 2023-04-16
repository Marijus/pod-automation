const counter = document.querySelector(".counter");
const digitsContainer = document.querySelector(".digits");

const startDate = new Date(counter?.dataset?.start_date ?? null).getTime();
const endDate = new Date(counter?.dataset.end_date ?? null).getTime();
const startCount = +counter?.dataset.start_count ?? 1000;
const endCount = +counter?.dataset.end_count ?? 2000;
const frequency = +counter?.dataset.frequency ?? 1000;
const initDiff = endDate - startDate;
let diff = new Date().getTime() - startDate;
let maxCountLength = 0;

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
  const currentCountLength = currentCount.length;

  if (currentCountLength > maxCountLength) {
    // update blocks
    for (let i = 0; i < currentCountLength; i++) {
      const isNew = i > maxCountLength - 1;

      if (isNew) {
        const digitBlock = document.createElement("div");
        digitBlock.classList.add("digits-block");
        digitsContainer.appendChild(digitBlock);

        const list = document.createElement("div");
        list.classList.add("slick-list");

        digitBlock.appendChild(list);

        list.style.transform = `translate3d(0px, -${
          -blockHeight * currentCount[i]
        }px, 0px)`;
        list.style.transition = `transform 750ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s`;

        new Array(10)
          .fill(null)
          .forEach((_, i) => (list.innerHTML += `<span>${i}</span>`));
      }

      const nextElement = document.querySelector(
        `.digits-block:nth-of-type(${i + 1})`
      )?.nextSibling;

      if (
        (currentCountLength - (i + 1)) % 3 === 0 &&
        i !== currentCountLength - 1
      ) {
        if (nextElement?.nodeName === "SPAN") continue;

        const span = document.createElement("span");
        span.textContent = ",";

        nextElement
          ? digitsContainer.insertBefore(span, nextElement)
          : digitsContainer.appendChild(span);
      } else {
        nextElement?.nodeName === "SPAN" && nextElement.remove();
      }
    }

    maxCountLength = currentCountLength;
  }

  if (diff > initDiff) return clearInterval(intervalId);

  for (let i = 0; i < maxCountLength; i++) {
    document.querySelector(
      `.counter .digits-block:nth-of-type(${i + 1}) .slick-list`
    ).style.transform = `translate3d(0px, ${
      -blockHeight * currentCount[i]
    }px, 0px)`;
  }

  ++count;
}, frequency);
