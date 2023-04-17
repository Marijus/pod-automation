const counter = document.querySelector(".counter");
const digitsContainer = document.querySelector(".digits");

const startDate = new Date(counter?.dataset?.start_date ?? null).getTime();
const endDate = new Date(counter?.dataset.end_date ?? null).getTime();
const startCount = +counter?.dataset.start_count ?? 1000;
const endCount = +counter?.dataset.end_count ?? 2000;
const frequency = +counter?.dataset.frequency ?? 1000;
const initDiff = endDate - startDate;
const countDiff = endCount - startCount;
let diff = new Date().getTime() - startDate;
let maxCountLength = countDiff < 0 ? startCount.toString().length : 0;
let firstRender = true;

const blockHeight =
  getComputedStyle(document.body)
    .getPropertyValue("--digits-block-height")
    .match(/\d+/)?.[0] ?? 35;
let intervalId;

const renderBlocks = (currentCount) => {
  // update blocks
  const currentCountLength = currentCount.length;

  if (
    (countDiff < 0
      ? currentCountLength < maxCountLength
      : currentCountLength > maxCountLength) ||
    firstRender
  ) {
    for (let i = 0; i < currentCountLength; i++) {
      const shouldUpdate =
        countDiff < 0
          ? maxCountLength - i - 1 >= currentCountLength
          : i >= maxCountLength;

      if (shouldUpdate || firstRender) {
        if (countDiff < 0 && !firstRender) {
          console.log(
            "removing: ",
            document.querySelector(
              `.digits-block:nth-of-type(${maxCountLength - 1 - i})`
            )
          );
          document
            .querySelector(
              `.digits-block:nth-of-type(${maxCountLength - 1 - i})`
            )
            .remove();
        } else {
          const digitBlock = document.createElement("div");
          digitBlock.classList.add("digits-block");
          digitsContainer.appendChild(digitBlock);

          const list = document.createElement("div");
          list.classList.add("slick-list");

          digitBlock.appendChild(list);

          list.style.transform = `translate3d(0px, ${
            -blockHeight * currentCount[i]
          }px, 0px)`;
          list.style.transition = `transform 750ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s`;

          new Array(10)
            .fill(null)
            .forEach((_, i) => (list.innerHTML += `<span>${i}</span>`));
        }
      }

      const nextElement = document.querySelector(
        `.digits-block:nth-of-type(${i + 1})`
      )?.nextSibling;

      if (
        (currentCountLength - (i + 1)) % 3 === 0 &&
        i !== currentCountLength - 1
      ) {
        if (nextElement?.nodeName === "SPAN") return;

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

  firstRender = false;
};

// render on load
const firstRenderCount =
  diff > initDiff
    ? endCount.toString()
    : (countDiff < 0
        ? startCount - (diff / initDiff) * Math.abs(countDiff)
        : startCount + (diff / initDiff) * Math.abs(countDiff)
      ).toFixed();
renderBlocks(diff > initDiff ? endCount.toString() : firstRenderCount);

intervalId = setInterval(() => {
  diff += frequency;

  const currentCount =
    diff > initDiff
      ? endCount.toString()
      : (countDiff < 0
          ? startCount - (diff / initDiff) * Math.abs(countDiff)
          : startCount + (diff / initDiff) * Math.abs(countDiff)
        ).toFixed();

  // rerender
  renderBlocks(currentCount);

  for (let i = 0; i < maxCountLength; i++) {
    document.querySelector(
      `.counter .digits-block:nth-of-type(${i + 1}) .slick-list`
    ).style.transform = `translate3d(0px, ${
      -blockHeight * currentCount[i]
    }px, 0px)`;
  }

  if (diff > initDiff || diff < 0) return clearInterval(intervalId);
}, frequency);
