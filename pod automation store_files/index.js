const slide = document.querySelector(".slide");

const style = getComputedStyle(document.body);
const blockHeight =
  style.getPropertyValue("--digits-block-height").match(/\d+/)?.[0] ?? 30;
const textHeight =
  style.getPropertyValue("--text-height").match(/\d+/)?.[0] ?? 40;
let value1 = slide?.dataset?.["value1"];
let value2 = slide?.dataset?.["value2"];

console.log("values: ", value1, value2);

const maxLength = Math.max(value1?.length ?? 0, value2?.length ?? 0);

if (value1 !== undefined && value1.length < maxLength) {
  value1 = "0".repeat(maxLength - value1.length) + value1;
}
if (value2 !== undefined && value2.length < maxLength) {
  value2 = "0".repeat(maxLength - value2.length) + value2;
}

const digits = [
  // (value1 ?? "000000").split("").map((v) => +v),
  // (value2 ?? "000000").split("").map((v) => +v),
];
if (value1 !== undefined) {
  digits.push((value1 ?? "000000").split("").map((v) => +v));
}
if (value2 !== undefined) {
  digits.push((value2 ?? "000000").split("").map((v) => +v));
}
let index = 0;

const digitsContainer = document.querySelector(".digits");

for (let i = 0; i < maxLength; i++) {
  const digitBlock = document.createElement("div");
  digitBlock.classList.add("digits-block");
  digitsContainer.appendChild(digitBlock);

  if (maxLength > 3 && i === maxLength - 4) {
    const span = document.createElement("span");
    span.textContent = ",";
    digitsContainer.appendChild(span);
  }
}

console.log("max length:", maxLength);

for (let i = 0; i < maxLength; i++) {
  const block = document.querySelector(`.digits-block:nth-of-type(${i + 1})`);

  let list = document.createElement("div");
  list.classList.add("slick-list");

  block.appendChild(list);

  const initial = digits[index][i];
  list.style.transform = `translate3d(0px, -${initial * blockHeight}px, 0px)`;

  list.style.transition = `transform 1750ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s`;

  new Array(i === 0 ? 10 : 30)
    .fill(null)
    .forEach(
      (_, i) =>
        (list.innerHTML += `<span>${i >= 10 ? i.toString()[1] : i}</span>`)
    );
}

setInterval(() => {
  // digits
  index = index === 0 ? ++index : --index;

  for (let i = 0; i < maxLength; i++) {
    const list = document.querySelector(
      `.digits-block:nth-of-type(${i + 1}) .slick-list`
    );

    const destination =
      index === 1 && i !== 0 ? digits[index][i] + 20 : digits[index][i];

    list.style.transform = `translate3d(0px, ${
      -blockHeight * destination
    }px, 0px)`;
  }

  // texts
  document.querySelector(
    ".texts .slick-list"
  ).style.transform = `translate3d(0px, ${-textHeight * index}px, 0px)`;

  // icons
  document.querySelector(
    ".icons .slick-list"
  ).style.transform = `translate3d(0px, ${-textHeight * index}px, 0px)`;
}, 3250);
