const digits = [
  [0, 1, 0, 3, 5, 8],
  [5, 1, 7, 9, 0, 0],
];
let index = 0;

for (let i = 0; i < 6; i++) {
  const block = document.querySelector(`.digits-block:nth-of-type(${i + 1})`);

  new Array(i === 0 ? 10 : 20)
    .fill(null)
    .map(
      (_, i) =>
        (block.innerHTML += `<span>${i >= 10 ? i.toString()[1] : i}</span>`)
    );

  const initial = document.querySelector(
    `.digits-block:nth-of-type(${i + 1}) span:nth-of-type(${
      digits[index][i] + 1
    })`
  );
  initial.style.zIndex = "5";
  initial.style.background = "#000000";
}