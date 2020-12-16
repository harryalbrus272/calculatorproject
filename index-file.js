/*Calculator project javascript file*/
var h = document.getElementById("history");
var r = document.getElementById("results");
var operators = document.getElementsByClassName('operator');
var numbers = document.getElementsByClassName("numbers");

function getHistory() {
  return h.innerText;
}

function printHistory(num) {
  h.innerText = num;
}

function getResults() {
  return r.innerText;
}

function printResults(num) {
  if (num == "") {
    r.innerText = num;
  } else {
    r.innerText = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
  if(num=="-"){
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}
for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function() {
    if (this.id == "all-clear") {
      printHistory("");
      printResults("");
    } else if (this.id == "clear") {
      var output = reverseNumberFormat(getResults()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printResults(output);
      }
    } else {
      var output = getResults();
      var history = getHistory();
      if (output=="" && history!=""){
        if (isNaN(history[history.length-1])){
          history=history.substr(0, history.length-1);
        }
      }
      if(output!="" || history!=""){
        //conditional statement
          output = output==""?output:reverseNumberFormat(output);
          history = history + output;
          if (this.id == "=") {
            var res = eval(history);
            printResults(res);
            printHistory("");
          } else {
            history = history + this.id;
            printHistory(history);
            printResults("");
          }
      }
    }
  });
}
for (var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function() {
    var output = reverseNumberFormat(getResults());
    if (output != NaN) { //if output is a number
      output = output + this.id;
      printResults(output);
    }
  });
}
