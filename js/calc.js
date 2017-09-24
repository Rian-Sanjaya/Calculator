var allOp = document.getElementById("allOp");
var currNum = document.getElementById("currNum");
var clearE = document.getElementById("CE");
var clear = document.getElementById("C");
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
var tCalc = 0;
var operator = "";
var num = "";

clearE = addEventListener("click", clearOp);
clear = addEventListener("click", clearOp);

zero.addEventListener("click", digit);
one.addEventListener("click", digit);
two.addEventListener("click", digit);
three.addEventListener("click", digit);
four.addEventListener("click", digit);
five.addEventListener("click", digit);
six.addEventListener("click", digit);
seven.addEventListener("click", digit);
eight.addEventListener("click", digit);
nine.addEventListener("click", digit);

timeSign.addEventListener("click", operate);
divSign.addEventListener("click", operate);
minSign.addEventListener("click", operate);
plusSign.addEventListener("click", operate);
equalSign.addEventListener("click", operate);
dot.addEventListener("click", operate);
plusMin.addEventListener("click", plusM);

currNum.value = tCalc;

function clearOp(event) {
	if (event.target.id === "ce") {
		num = "0";
		currNum.value = num;

	} else if (event.target.id === "c") {
		tCalc = 0;
		num = "";
		operator = "";
		currNum.value = tCalc;
		allOp.innerText = ""

	} else if (event.target.id === "back") {
		console.log(num.length);
		if (num.length === 1) {
			num = "0";
		} else if (num.length > 1) {
			num = num.substr(0, num.length - 1);
		}

		currNum.value = num;
	}
}

function plusM() {
	if (num !== "" && num !== "0") {
		if (num.substr(0, 1) === "-") {
			num = num.substr(1);
		} else {
			num = "-" + num;
		}

		currNum.value = num;
	}
}

// function periodOp() {
// 	if (num.indexOf(".") !== -1) 
// 		return;

// 	if (num === "" || num === "0") {
// 		num = "0" + event.target.innerText;
// 	} else {
// 		num += event.target.innerText;
// 	}

// 	currNum.value = num;
// }

function digit(event) {
	if (event.target.innerText === ".") {
		if (num.indexOf(".") !== -1) 
			return;
	}

	if (num === "" || num === "0") {
		if (event.target.innerText === ".") {
			num = "0" + event.target.innerText;
		} else {
			num = event.target.innerText;
		}

	} else {
		num += event.target.innerText;
	}

	currNum.value = num;
}

function fillOperator(op) {
	if (op === "equal") {
		if (operator !== "" && num !== "") {
			allOp.innerText = "";
			operator = "";
			tCalc = 0
		}
	} else {
		
		if (op === "plus-s") {
			operator = "+";	
		} else if (op === "min-s") {
			operator = "-";
		} else if (op === "time-s") {
			operator = "*";
		} else if (op === "div-s") {
			operator = "/";
		}

		if (operator !== "" && num !== "") {
			allOp.innerText += num + operator;
		} else if (num === "") {
			allOp.innerText = tCalc	+ operator;
		}
	}
}

function operate(event) {
	if (num !== "") {
		if (num.slice(-1) === ".") {
			num = num.slice(0, num.indexOf("."));
			currNum.value = num;
		}
	}

	if (operator !== "" && num !== "") {
		calc();
	
		fillOperator(event.target.id);

	} else {
		fillOperator(event.target.id);
		
		if (tCalc === 0 && num !== "") {
			tCalc = Number(num);
		}
	}

	num = "";
}

function calc() {
	if (operator === "+") {
		tCalc += Number(currNum.value);
	} else if (operator === "-") {
		tCalc -= Number(currNum.value);
	} else if (operator === "*") {
		//console.log("tCalc " + tCalc + "; op " + operator + "; num " + num);
		tCalc *= Number(currNum.value);
	} else if (operator === "/") {
		tCalc /= Number(currNum.value);
	}

	currNum.value = tCalc;
}