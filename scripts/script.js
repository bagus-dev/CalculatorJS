const res = document.getElementById("result");

function calculate(value) {
  const calculatedValue = eval(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Can't divide 0 with 0";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    resultFixed = math.format(math.evaluate(calculatedValue.toString()), 14);
    resultFixed = parseFloat(resultFixed);

    res.value = resultFixed;
  }
}

// Displays entered value on screen.
function liveScreen(enteredValue) {
  if (!res.value) {
    res.value = "";
  }

  if(enteredValue === "+" || enteredValue === "/" || enteredValue === "*" || enteredValue === "-") {
    let plusCount = operatorCount("+")
    let minCount = operatorCount("-")
    let multiplyCount = operatorCount("*")
    let divideCount = operatorCount("/")
    let totalOperatorCount = plusCount + minCount + multiplyCount + divideCount

    if(totalOperatorCount <= 39) {
      if(res.value.length === 0) {
        return
      } else {
        if(res.value[res.value.length - 1] === "+" || res.value[res.value.length - 1] === "/" || res.value[res.value.length - 1] === "*" || res.value[res.value.length - 1] === "-" ) {
          let newValue = res.value.replace(/.$/, enteredValue)
          res.value = newValue
        } else {
          res.value += enteredValue
        }
      }
    } else {
      Swal.fire({
        title: "WARNING!",
        text: "Cannot enter more than 40 operators",
        icon: 'error',
        timer: 3000,
        showConfirmButton: true,
        showCancelButton: false
      })
    }
  }

  if(enteredValue === ".") {
    if(res.value.length !== 0) {
      if(res.value[res.value.length - 1] === "+" || res.value[res.value.length - 1] === "/" || res.value[res.value.length - 1] === "*" || res.value[res.value.length - 1] === "-" ) {
        res.value += "0";
      } else if(res.value[res.value.length - 1] === ".") {
        return
      }
    } else {
      res.value += "0";
    }
  }

  if(enteredValue !== "+" && enteredValue !== "/" && enteredValue !== "*" && enteredValue !== "-") {
    res.value += enteredValue;
  }
}

function operatorCount(searchStr) {
  let count = 0
  let startIndex = 0, index

  while((index = res.value.indexOf(searchStr, startIndex)) > -1) {
    count++
    startIndex = index + searchStr.length
  }

  return count
}

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
  // to fix the default behavior of browser,
  // enter and backspace were causing undesired behavior when some key was already in focus.
  e.preventDefault();
  //grabbing the liveScreen

  //numbers
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  //operators
  if(e.key === "+" || e.key === "/" || e.key === "*" || e.key === "-") {
    let plusCount = operatorCount("+")
    let minCount = operatorCount("-")
    let multiplyCount = operatorCount("*")
    let divideCount = operatorCount("/")
    let totalOperatorCount = plusCount + minCount + multiplyCount + divideCount

    if(totalOperatorCount <= 39) {
      if(res.value.length === 0) {
        return
      } else {
        if(res.value[res.value.length - 1] === "+" || res.value[res.value.length - 1] === "/" || res.value[res.value.length - 1] === "*" || res.value[res.value.length - 1] === "-" ) {
          let newValue = res.value.replace(/.$/, e.key)
          res.value = newValue
        } else {
          res.value += e.key
        }
      }
    } else {
      Swal.fire({
        title: "WARNING!",
        text: "Cannot enter more than 40 operators",
        icon: 'error',
        timer: 3000,
        showConfirmButton: true,
        showCancelButton: false
      })
    }
  }

  //decimal key
  if (e.key === ".") {
    if(res.value.length !== 0) {
      if(res.value[res.value.length - 1] === "+" || res.value[res.value.length - 1] === "/" || res.value[res.value.length - 1] === "*" || res.value[res.value.length - 1] === "-" ) {
        res.value += "0";
      } else if(res.value[res.value.length - 1] === ".") {
        return
      }
    } else {
      res.value += "0";
    }

    res.value += ".";
  }

  //press enter to see result
  if (e.key === "Enter") {
    calculate(result.value);
  }

  //backspace for removing the last input
  if (e.key === "Backspace") {
    const resultInput = res.value;
    //remove the last element in the string
    res.value = resultInput.substring(0, res.value.length - 1);
  }
}
