const slide = document.querySelector(".slide");

const value1 = slide?.dataset?.["value1"];
const value2 = slide?.dataset?.["value2"];
const digits = [
  (value1 ?? "000000").split("").map((v) => +v),
  (value2 ?? "000000").split("").map((v) => +v),
];
let index = 0;

for (let i = 0; i < 6; i++) {
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

const centerContents = () => {
  const texts = document.querySelectorAll(".texts .text span");

  const windowWidth = window.innerWidth;

  if (windowWidth <= 420) {
    texts.forEach((text) => {
      text.style.width = "auto";

      if (texts[0].clientHeight >= 22) {
        let width = Array.from(texts).reduce(
          (prev, curr) => (prev > curr.clientWidth ? prev : curr.clientWidth),
          -Infinity
        );

        console.log("yard width: ", width);

        for (let w = width; w > 70; w--) {
          let height = text.clientHeight;

          text.style.width = w + "px";

          if (text.clientHeight > height && text.clientHeight > 22) {
            text.style.width = `${w + 2}px`;
            break;
          }
        }
      }
    });
  } else {
    texts.forEach((text) => (text.style.width = "auto"));
  }
};

window.addEventListener("load", centerContents);

window.addEventListener("resize", centerContents);
