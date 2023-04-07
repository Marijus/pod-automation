const slide = document.querySelector(".slide");

let value1 = slide?.dataset?.["value1"];
let value2 = slide?.dataset?.["value2"];

const maxLength = Math.max(value1.length, value2.length);

console.log("lengths:", value1.length, value2.length);
if (value1.length < maxLength) {
  value1 = "0".repeat(maxLength - value1.length) + value1;
}
if (value2.length < maxLength) {
  value2 = "0".repeat(maxLength - value2.length) + value2;

}

const digitsContainer = document.querySelector('.digits');
for (let i = 0; i < maxLength; i++) {
  const digitBlock = document.createElement('div');
  digitBlock.classList.add('digits-block');
  digitsContainer.appendChild(digitBlock);

  if (maxLength > 3 && i === maxLength - 4) {
    const span = document.createElement('span');
    span.textContent = ',';
    digitsContainer.appendChild(span);
  }
}

const digits = [
  (value1 ?? "000000").split("").map((v) => +v),
  (value2 ?? "000000").split("").map((v) => +v),
];
let index = 0;

for (let i = 0; i < maxLength; i++) {
  const block = document.querySelector(`.digits-block:nth-of-type(${i + 1})`);

  let list = document.createElement("div");
  list.classList.add("slick-list");

  block.appendChild(list);

  const initial = digits[index][i];
  list.style.transform = `translate3d(0px, -${initial * 30}px, 0px)`;

  list.style.transition = `transform 1750ms cubic-bezier(0.645, 0.045, 0.355, 1) 0s`;

  new Array(i === 0 ? 10 : 30)
    .fill(null)
    .map(
      (_, i) =>
        (list.innerHTML += `<span>${i >= 10 ? i.toString()[1] : i}</span>`)
    );
}

setInterval(() => {
  // digits
  index = index === 0 ? ++index : --index;

  for (let i = 0; i < 6; i++) {
    const list = document.querySelector(
      `.digits-block:nth-of-type(${i + 1}) .slick-list`
    );

    const destination =
      index === 1 && i !== 0 ? digits[index][i] + 20 : digits[index][i];

    list.style.transform = `translate3d(0px, ${-30 * destination}px, 0px)`;
  }

  // texts
  document.querySelector(
    ".texts .slick-list"
  ).style.transform = `translate3d(0px, ${-40 * index}px, 0px)`;

  // icons
  document.querySelector(
    ".icons .slick-list"
  ).style.transform = `translate3d(0px, ${-40 * index}px, 0px)`;
}, 3250);
