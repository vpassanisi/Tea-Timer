const elements = {
  secondsTens: document.getElementById("seconds-tens"),
  secondsHundreds: document.getElementById("seconds-hundreds"),
  minutesTens: document.getElementById("minutes-tens"),
  minutesHundreds: document.getElementById("minutes-hundreds"),
};

document
  .getElementById("set__10")
  .addEventListener("click", () => setTenMin(elements));

const start = document.timeline.currentTime;

function frame(time) {
  const elapsed = time - start;
  const seconds = Math.round(elapsed / 1000);

  countDown(elements)();

  const targetNext = (seconds + 1) * 1000 + start;
  setTimeout(
    () => requestAnimationFrame(frame),
    targetNext - performance.now()
  );
}

function setTenMin(elements) {
  setMinutesTens(elements, 1);
  setMinutesHundreds(elements, 0);
  setSecondsTens(elements, 0);
  setSecondsHundreds(elements, 0);

  frame(start);
}

function setMinutesTens(elements, number = 0) {
  const arr = window
    .getComputedStyle(elements.minutesTens)
    .transform.match(/matrix.*\((.+)\)/)[1]
    .split(",");

  const current = arr[arr.length - 1].trim();

  elements.minutesTens
    .querySelector(`#minutes-tens__${current}`)
    .classList.remove("active");

  const update = 150 - 60 * number;
  elements.minutesTens.style.transform = `translateY(${update}px)`;

  elements.minutesTens
    .querySelector(`#minutes-tens__${update}`)
    .classList.add("active");
}

function setMinutesHundreds(elements, number = 0) {
  const arr = window
    .getComputedStyle(elements.minutesHundreds)
    .transform.match(/matrix.*\((.+)\)/)[1]
    .split(",");

  const current = arr[arr.length - 1].trim();

  elements.minutesHundreds
    .querySelector(`#minutes-hundreds__${current}`)
    .classList.remove("active");

  const update = 270 - 60 * number;
  elements.minutesHundreds.style.transform = `translateY(${update}px)`;

  elements.minutesHundreds
    .querySelector(`#minutes-hundreds__${update}`)
    .classList.add("active");
}

function setSecondsTens(elements, number = 0) {
  const arr = window
    .getComputedStyle(elements.secondsTens)
    .transform.match(/matrix.*\((.+)\)/)[1]
    .split(",");

  const current = arr[arr.length - 1].trim();

  elements.secondsTens
    .querySelector(`#seconds-tens__${current}`)
    .classList.remove("active");

  const update = 150 - 60 * number;
  elements.secondsTens.style.transform = `translateY(${update}px)`;

  elements.secondsTens
    .querySelector(`#seconds-tens__${update}`)
    .classList.add("active");
}

function setSecondsHundreds(elements, number = 0) {
  const arr = window
    .getComputedStyle(elements.secondsHundreds)
    .transform.match(/matrix.*\((.+)\)/)[1]
    .split(",");

  const current = arr[arr.length - 1].trim();

  elements.secondsHundreds
    .querySelector(`#seconds-hundreds__${current}`)
    .classList.remove("active");

  const update = 270 - 60 * number;
  elements.secondsHundreds.style.transform = `translateY(${update}px)`;

  elements.secondsHundreds
    .querySelector(`#seconds-hundreds__${update}`)
    .classList.add("active");
}

const countDown = (elements) => {
  return function () {
    let arr = window
      .getComputedStyle(elements.secondsHundreds)
      .transform.match(/matrix.*\((.+)\)/)[1]
      .split(",");

    let current = parseInt(arr[arr.length - 1]);

    let updated = current >= 270 ? -270 : current + 60;

    elements.secondsHundreds.style.transform = `translateY(${updated}px)`;
    elements.secondsHundreds
      .querySelector(`#seconds-hundreds__${current}`)
      .classList.remove("active");
    elements.secondsHundreds
      .querySelector(`#seconds-hundreds__${updated}`)
      .classList.add("active");
  };

  function countUp(first, second) {
    const secondTranslate = window
      .getComputedStyle(second)
      .transform.match(/matrix.*\((.+)\)/)[1]
      .split(",");

    let current = parseInt(secondTranslate[secondTranslate.length - 1]);

    let updated = current <= -270 ? 270 : current - 60;

    second.style.transform = `translateY(${updated}px)`;
    second
      .querySelector(`#seconds-hundreds__${current}`)
      .classList.remove("active");
    second
      .querySelector(`#seconds-hundreds__${updated}`)
      .classList.add("active");

    if (current === -270) {
      const firstTranslate = window
        .getComputedStyle(first)
        .transform.match(/matrix.*\((.+)\)/)[1]
        .split(",");

      current = parseInt(firstTranslate[firstTranslate.length - 1]);

      updated = current <= -150 ? 150 : current - 60;

      first.style.transform = `translateY(${updated}px)`;
      first
        .querySelector(`#seconds-tens__${current}`)
        .classList.remove("active");
      first.querySelector(`#seconds-tens__${updated}`).classList.add("active");
    }
  }
};
