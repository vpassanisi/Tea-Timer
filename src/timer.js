const clock = {
  secondsLeft: document.getElementById("seconds-left"),
  currentSL() {
    return parseInt(this.secondsLeft.dataset.currentnum);
  },
  secondsRight: document.getElementById("seconds-right"),
  currentSR() {
    return parseInt(this.secondsRight.dataset.currentnum);
  },
  minutesLeft: document.getElementById("minutes-left"),
  currentML() {
    return parseInt(this.minutesLeft.dataset.currentnum);
  },
  minutesRight: document.getElementById("minutes-right"),
  currentMR() {
    return parseInt(this.minutesRight.dataset.currentnum);
  },
  stop: false,
  setMinutesLeft(number = 0) {
    const numHeight = this.secondsRight.firstElementChild.offsetHeight;

    this.minutesLeft
      .querySelector(`#minutes-left__${this.currentML()}`)
      .classList.remove("active");

    const update = (numHeight * 5) / 2 - numHeight * number;
    this.minutesLeft.style.transform = `translateY(${update}px)`;
    this.minutesLeft.dataset.currentnum = number;

    this.minutesLeft
      .querySelector(`#minutes-left__${number}`)
      .classList.add("active");
  },
  setMinutesRight(number = 0) {
    const numHeight = this.secondsRight.firstElementChild.offsetHeight;

    this.minutesRight
      .querySelector(`#minutes-right__${this.currentMR()}`)
      .classList.remove("active");

    const update = (numHeight * 9) / 2 - numHeight * number;
    this.minutesRight.style.transform = `translateY(${update}px)`;
    this.minutesRight.dataset.currentnum = number;

    this.minutesRight
      .querySelector(`#minutes-right__${number}`)
      .classList.add("active");
  },
  setSecondsLeft(number = 0) {
    const numHeight = this.secondsRight.firstElementChild.offsetHeight;

    this.secondsLeft
      .querySelector(`#seconds-left__${this.currentSL()}`)
      .classList.remove("active");

    const update = (numHeight * 5) / 2 - numHeight * number;
    this.secondsLeft.style.transform = `translateY(${update}px)`;
    this.secondsLeft.dataset.currentnum = number;

    this.secondsLeft
      .querySelector(`#seconds-left__${number}`)
      .classList.add("active");
  },
  setSecondsRight(number = 0) {
    const numHeight = this.secondsRight.firstElementChild.offsetHeight;

    this.secondsRight
      .querySelector(`#seconds-right__${this.currentSR()}`)
      .classList.remove("active");

    const update = (numHeight * 9) / 2 - numHeight * number;
    this.secondsRight.style.transform = `translateY(${update}px)`;
    this.secondsRight.dataset.currentnum = number;

    this.secondsRight
      .querySelector(`#seconds-right__${number}`)
      .classList.add("active");
  },
  setTime(ML, MR, SL, SR) {
    this.setMinutesLeft(ML);
    this.setMinutesRight(MR);
    this.setSecondsLeft(SL);
    this.setSecondsRight(SR);
  },
  countDown() {
    const total =
      this.currentSR() + this.currentSL() + this.currentMR() + this.currentML();

    if (total === 0) {
      new Audio("./beep.wav").play();
      return true;
    }

    const updatedSR = this.currentSR() ? this.currentSR() - 1 : 9;
    this.setSecondsRight(updatedSR);

    if (updatedSR === 9) {
      const updatedSL = this.currentSL() ? this.currentSL() - 1 : 5;
      this.setSecondsLeft(updatedSL);

      if (updatedSL === 5) {
        const updatedMR = this.currentMR() ? this.currentMR() - 1 : 9;
        this.setMinutesRight(updatedMR);

        if (updatedMR === 9) {
          const updatedML = this.currentML() ? this.currentML() - 1 : 5;
          this.setMinutesLeft(updatedML);
        }
      }
    }
    return false;
  },
  addOneMinute() {
    const total = this.currentMR() + this.currentML();

    if (total === 14) return;

    const updatedMR = this.currentMR() >= 9 ? 0 : this.currentMR() + 1;
    this.setMinutesRight(updatedMR);

    if (updatedMR === 0) {
      const updatedML = this.currentML() >= 5 ? 0 : this.currentML() + 1;
      this.setMinutesLeft(updatedML);
    }
  },
  subtractOneMinute() {
    const total = this.currentMR() + this.currentML();

    if (total === 0) return;

    const updatedMR = this.currentMR() ? this.currentMR() - 1 : 9;
    this.setMinutesRight(updatedMR);

    if (updatedMR === 9) {
      const updatedML = this.currentML() ? this.currentML() - 1 : 5;
      this.setMinutesLeft(updatedML);
    }
  },
};

const startTime = document.timeline.currentTime;

window.onresize = function () {
  clock.setTime(
    clock.currentML(),
    clock.currentMR(),
    clock.currentSL(),
    clock.currentSR()
  );
};

window.onload = () => clock.setTime(0, 0, 0, 0);

document
  .getElementById("set__10")
  .addEventListener("click", () => clock.setTime(1, 0, 0, 0));

document.getElementById("start").addEventListener("click", () => {
  clock.stop = false;
  frame(startTime);
});

document
  .getElementById("plus-1")
  .addEventListener("click", () => clock.addOneMinute());

document
  .getElementById("minus-1")
  .addEventListener("click", () => clock.subtractOneMinute());

document
  .getElementById("stop")
  .addEventListener("click", () => (clock.stop = true));

document.getElementById("reset").addEventListener("click", () => {
  clock.stop = true;
  clock.setTime(0, 0, 0, 0);
});

function frame(time) {
  const elapsed = time - startTime;
  const seconds = Math.round(elapsed / 1000);

  if (clock.stop) return;

  if (time && elapsed) {
    const stop = clock.countDown();
    if (stop) return;
  }

  const targetNext = (seconds + 1) * 1000 + startTime;
  setTimeout(
    () => requestAnimationFrame(frame),
    targetNext - performance.now()
  );
}
