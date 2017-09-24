var equation = document.getElementById("equation");
var numDisp = document.querySelector(".numDisp");
var clearE = document.getElementById("ce");
var clear = document.getElementById("c");
var back = document.getElementById("back");
var plusSign = document.getElementById("plus-s");
var minSign = document.querySelector("#min-s");
var timeSign = document.querySelector("#time-s");
var divSign = document.querySelector("#div-s");
var equalSign = document.querySelector("#equal");
var plusMin = document.querySelector("#plusMin");
var dot = document.querySelector("#dot");
var zero = document.querySelector("#zero");
var one =  document.querySelector("#one");
var two = document.querySelector("#two");
var three = document.querySelector("#three");
var four = document.querySelector("#four");
var five = document.querySelector("#five");
var six = document.querySelector("#six");
var seven = document.querySelector("#seven");
var eight = document.querySelector("#eight");
var nine = document.querySelector("#nine");
var tCalc = "";
var operator = "";
var num = "";
var afterEqual = false;

clearE.addEventListener("click", operatorOperation);
clear.addEventListener("click", operatorOperation);

zero.addEventListener("click", digitOperation);
one.addEventListener("click", digitOperation);
two.addEventListener("click", digitOperation);
three.addEventListener("click", digitOperation);
four.addEventListener("click", digitOperation);
five.addEventListener("click", digitOperation);
six.addEventListener("click", digitOperation);
seven.addEventListener("click", digitOperation);
eight.addEventListener("click", digitOperation);
nine.addEventListener("click", digitOperation);

timeSign.addEventListener("click", operatorOperation);
divSign.addEventListener("click", operatorOperation);
minSign.addEventListener("click", operatorOperation);
plusSign.addEventListener("click", operatorOperation);
equalSign.addEventListener("click", equalOperation);
dot.addEventListener("click", operatorOperation);
plusMin.addEventListener("click", operatorOperation);
back.addEventListener("click", operatorOperation);

numDisp.innerText = "0";

function digitOperation(event) {
	var number = event.target.innerText;

	if (tCalc === "" && operator === "" && num === "") {
		if (afterEqual === true) {
			afterEqual = false;
			numDisp.innerText = number;

		} else 
		if (numDisp.innerText === "0") {
			if (number !== "0") {
				numDisp.innerText = number;
			}

		} else {
			numDisp.innerText += number;
		}

	} else if (tCalc !== "" && operator !== "" && num === "") {
		numDisp.innerText = number;
		num = numDisp.innerText;

	} else if (tCalc !== "" && operator !== "" && num !== "") {
		numDisp.innerText += number;
		num = numDisp.innerText;
	}
}

function operatorOperation(event) {
	var symbol = event.target.innerText;
	
	if (symbol === "C") {
		tCalc = "";
		operator = "";
		num = "";
		equation.innerText = "";
		numDisp.innerText = "0";
	} else 
	if (symbol === "CE") {
		numDisp.innerText = "0";
		num = "";
	} else 
	if (event.target.id === "back") { // back sign 
		if (afterEqual === false) {
			if (numDisp.innerText.length === 1) {
				numDisp.innerText = "0";

			} else {
				numDisp.innerText = numDisp.innerText.slice(0, numDisp.innerText.length - 1);
			}

			if (num !== "") {
				num = numDisp.innerText;
			}
		}
		
	} else 
	if (symbol === "\xB1") { // plus minus sign
		if (numDisp.innerText !== "0") {
			if (numDisp.innerText.slice(0, 1) === "-") {
				numDisp.innerText = numDisp.innerText.slice(1);
			} else {
				numDisp.innerText = "-" + numDisp.innerText.slice(0);
			}

			if (num !== "") {
				num = numDisp.innerText;	
			}
		}
	} else 
	if (symbol === ".") {
		if (numDisp.innerText.indexOf(".") === -1) {
			if (tCalc === "" && operator === "" && num === "") {
				if (afterEqual === true) {
					numDisp.innerText = "0.";	
					afterEqual = false;
				} else {
					numDisp.innerText += ".";
				}
				
			} else {
				numDisp.innerText += ".";
			}
		}

	} else 
	if (tCalc === "" && operator === "" && num === "") {
		if (numDisp.innerText.slice(-1) === ".") {
			numDisp.innerText = numDisp.innerText.slice(0, numDisp.innerText.length - 1);
		}

		tCalc = numDisp.innerText;
		operator = symbol;
		equation.innerText = tCalc + " " + operator;

		if (afterEqual === true) 
			afterEqual = false;

	} else if (tCalc !== "" && operator !== "" && num === "") {
		var s = equation.innerText;
		operator = symbol;
		equation.innerText = s.slice(0, s.length - 1) + " " + operator;
	} else if (tCalc !== "" && operator !== "" && num !== "") {
		calc(symbol);
	}
}

function calc(symbol) {
	if (operator === "+") {
		tCalc = (Number(tCalc) + Number(num)).toString();
	} else if (operator === "-") {
		tCalc = (Number(tCalc) - Number(num)).toString();
	} else if (operator === "x") {
		tCalc = (Number(tCalc) * Number(num)).toString();
	} else if (operator === "/") {
		tCalc = (Number(tCalc) / Number(num)).toString();
	}

	numDisp.innerText = tCalc;
	equation.innerText += " " + num + " " + symbol;
	operator = symbol;
	num = "";
}

function equalOperation() {
	if (tCalc !== "" && operator !== "" && num !== "") {
		calc();
		tCalc = "";
		operator = "";
		num = "";
		equation.innerText = "";
		afterEqual = true;
	}
}