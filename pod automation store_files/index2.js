const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_HOUR = 1000 * 60 * 60;
const ONE_MIN = 1000 * 60;
const ONE_SEC = 1000;

const date = new Date(document.querySelector(".timer")?.dataset?.date ?? null);
const blockHeight =
  getComputedStyle(document.body)
    .getPropertyValue("--timer-digits-block-height")
    .match(/\d+/)?.[0] ?? 35;
let intervalId;
let count = 0;

intervalId = setInterval(() => {
  let timeDiff = date.getTime() - new Date().getTime();
  let days = Math.floor(timeDiff / ONE_DAY);
  let hrs = Math.floor((timeDiff % ONE_DAY) / ONE_HOUR);
  let mins = Math.floor((timeDiff % ONE_HOUR) / ONE_MIN);
  let secs = Math.floor((timeDiff % ONE_MIN) / ONE_SEC);
  const values = [days, hrs, mins, secs];

  if (count === 0) {
    const maxValues = [++days, 24, 60, 60];

    for (let i = 0; i < maxValues.length; i++) {
      const block = document.querySelector(
        `.timer .digits-block:nth-of-type(${i + 1})`
      );
      const list = document.createElement("list");
      list.classList.add("slick-list");

      block.appendChild(list);

      list.style.transform = `translate3d(0px, -${
        values[i] * blockHeight
      }px, 0px)`;
      list.style.transition = `transform 750ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s`;

      new Array(maxValues[i])
        .fill(null)
        .forEach(
          (_, n) =>
            (list.innerHTML += `<span>${n.toString().padStart(2, "0")}</span>`)
        );
    }
  }

  if (timeDiff < 0) {
    return clearInterval(intervalId);
  }

  values.forEach((v, i) => {
    document.querySelector(
      `.timer .digits-block:nth-of-type(${i + 1}) .slick-list`
    ).style.transform = `translate3d(0px, ${-blockHeight * v}px, 0px)`;
  });

  count++;
}, 1000);
