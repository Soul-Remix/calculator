const numberBtn = Array.from(document.querySelectorAll(".number"));
const operatorBtn = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const resultBtn = document.querySelector(".result");
const currentOutputText = document.querySelector(".current");
const previousOutputText = document.querySelector(".previous");

class Calculator {
  constructor(currentOutputText, previousOutputText) {
    this.currentOutputText = currentOutputText;
    this.previousOutputText = previousOutputText;
    this.clear();
  }

  clear() {
    this.currentOutput = "";
    this.previousOutput = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  addNumber(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  operator(operation) {
    if (this.currentOutput === "") return;
    if (this.previousOutput !== "") {
      this.calc();
    }
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = "";
  }

  calc() {
    let compute;
    let prev = parseFloat(this.previousOutput);
    let current = parseFloat(this.currentOutput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        compute = prev + current;
        break;
      case "-":
        compute = prev - current;
        break;
      case "*":
        compute = prev * current;
        break;
      case "÷":
        compute = prev / current;
        break;
      case "%":
        compute = prev % current;
        break;
      default:
        return;
    }
    this.currentOutput = compute.toPrecision(3);
    this.operation = undefined;
    this.previousOutput = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOutputText.innerText = this.getDisplayNumber(
      this.currentOutput
    );
    if (this.operation != null) {
      this.previousOutputText.innerText = `${this.getDisplayNumber(
        this.previousOutput
      )} ${this.operation}`;
    } else {
      this.previousOutputText.innerText = "";
    }
  }
}
const calc = new Calculator(currentOutputText, previousOutputText);

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calc.addNumber(btn.innerText);
    calc.updateDisplay();
  });
});

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calc.operator(btn.innerText);
    calc.updateDisplay();
  });
});

resultBtn.addEventListener("click", () => {
  calc.calc();
  calc.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calc.delete();
  calc.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});
