var table = document.getElementById("portfoliotable");
var symbol = table.getElementsByClassName("symbol");
var changeArrow = document.getElementsByClassName("changeArrow");
var overallGainArrow = document.getElementsByClassName("overallGainArrow");
var overallGainPerArrow = document.getElementsByClassName("overallGain%Arrow");
var remove = document.getElementById("remove");
var netWorth = 0;
var netGain = 0;
var netGainPer = 0;

var xmlHttp = createXmlHttpRequestObject();
var xmlHttpRemoval = createXmlHttpRequestObject();
var j=0;

function createXmlHttpRequestObject() {
	var xmlHttp;
	if(window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(error) {
			xmlHttp = false;
		}
	} else {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch(error) {
			xmlHttp = false;
		}
	}
	if(!xmlHttp) {
		alert("Can't create XmlRequestObject!");
	} else {
		return xmlHttp;
	}
}

function handleServerResponse() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		var arr = JSON.parse(xmlHttp.responseText);
		var quote = arr.query.results.quote;
		table = document.getElementById("portfoliotable");
		company = table.getElementsByClassName("company");
		symbol = table.getElementsByClassName("symbol");
		price = table.getElementsByClassName("price");
		change = table.getElementsByClassName("change");
		quantity = table.getElementsByClassName("quantity");
		invPrice = table.getElementsByClassName("invPrice");
		daysGain = table.getElementsByClassName("daysGain");
		daysGainPer = table.getElementsByClassName("daysGain%");
		overallGain = table.getElementsByClassName("overallGain");
		overallGainPer = table.getElementsByClassName("overallGainPer");
		latestValue = table.getElementsByClassName("latestValue");
		for(i=0;i<symbol.length;i++) {
			if(symbol[i].innerHTML == quote.Symbol.toUpperCase()) {
				company[i].innerHTML = quote.Name;
				price[i].innerHTML = Number(quote.LastTradePriceOnly).toFixed(2);
				if(quote.Change == null) {
					document.getElementById("errorMessage").className = "alert alert-warning";
					document.getElementById("marketCritical").innerHTML = "Market about to open. Complete data is currently not available. Gain information is not updated. Be Cautious !!!";
				}
				try {
					var charCheck = quote.Change.charAt(0);
				} catch(error) {
					
				}
				if(charCheck == '-') {
					change[i].style.color = "red";
					change[i].innerHTML = '<img class="changeArrow"></img>';
					changeArrow[i].src = "/images/down_r.gif";
				} else if(quote.Change == '+0.00') {
					change[i].style.color = "black";
					change[i].innerHTML = '<img class="changeArrow"></img>';
					changeArrow[i].src = "";
					changeArrow[i].style.visibility = "hidden";
				} else if(charCheck == '+') {
					change[i].style.color = "green";
					change[i].innerHTML = '<img class="changeArrow"></img>';
					changeArrow[i].src = "/images/up_g.gif";
				}
				try{
					change[i].innerHTML += quote.Change.substring(1);
				} catch(error) {
					
				}
				latValue = Number(quote.LastTradePriceOnly) * Number(quantity[i].innerHTML);
				invValue = Number(invPrice[i].innerHTML) * Number(quantity[i].innerHTML);
				overGain = latValue - invValue;
				if(overGain < 0) {
					overallGain[i].style.color = "red";
					overallGainPer[i].style.color = "red";
					overallGain[i].innerHTML = '<img class="overallGainArrow"></img>';
					overallGainPer[i].innerHTML = '<img class="overallGain%Arrow"></img>';
					overallGainArrow[i].src = "images/down_r.gif";
					overallGainPerArrow[i].src = "images/down_r.gif";
				} else {
					overallGain[i].style.color = "green";
					overallGainPer[i].style.color = "green";
					overallGain[i].innerHTML = '<img class="overallGainArrow"></img>';
					overallGainPer[i].innerHTML = '<img class="overallGain%Arrow"></img>';
					overallGainArrow[i].src = "images/up_g.gif";
					overallGainPerArrow[i].src = "images/up_g.gif";
				}
				netGain += overGain;
				netGainPer += (overGain * 100)/invValue;
				console.log(netGainPer);
				overGain = Math.abs(overGain);
				overallGain[i].innerHTML += overGain.toFixed(2);
				overallGainPer[i].innerHTML += ((overGain * 100)/invValue).toFixed(2) + "%";
				latestValue[i].innerHTML = latValue.toFixed(2);
				netWorth += latValue;
			}
		}
		if(j < symbol.length-1) {
			j++;
		} else {
			j=0;
			document.getElementById("index0").innerHTML = "PORTFOLIO NETWORTH";
			document.getElementById("index1").innerHTML = netWorth + ' ';
			if(netGain < 0) {
				document.getElementById("arrowNetworth").src = "images/down_r.gif";
				document.getElementById("index2").style.color = "red";
				document.getElementById("index3").style.color = "red";
			} else {
				document.getElementById("arrowNetworth").src = "images/up_g.gif";
				document.getElementById("index2").style.color = "green";
				document.getElementById("index3").style.color = "green";
			}
			document.getElementById("index2").innerHTML = Math.abs(netGain) + ' ';
			document.getElementById("index3").innerHTML = '(' + Math.abs(netGainPer.toFixed(2)) + '%)';
			console.log(netWorth);
			netWorth = 0;
			netGain = 0;
			netGainPer = 0;
		}
		loadResults(symbol[j].innerHTML);
	} else {
		//console.log("Either readyState != 4 or status != 200");
	}
}

function loadResults(symbol) {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%27" + symbol + "%27)&format=json&diagnostics=true&env=http://datatables.org/alltables.env";
		xmlHttp.open("GET",url,true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	} else {
		//console.log("Either readyState != 0 or 4");
	}
}

window.onload = function() {
	try {
		loadResults(symbol[j].innerHTML);
	} catch(error) {
		
	}
};

function handleServerResponseForRemoval() {
	if(xmlHttpRemoval.readyState == 4 && xmlHttpRemoval.status == 200) {
		var arr = JSON.parse(xmlHttpRemoval.responseText);
		document.getElementById("errorMessage").className = "alert alert-success";
		document.getElementById("removalMessage").innerHTML = arr.removal;
	} else {
		//console.log("Either readyState != 4 or status != 200");
	}
}

function removalProcess(url) {
	if(xmlHttpRemoval.readyState == 0 || xmlHttpRemoval.readyState == 4) {
		xmlHttpRemoval.open("GET",url,true);
		xmlHttpRemoval.onreadystatechange = handleServerResponseForRemoval;
		xmlHttpRemoval.send(null);
	} else {
		//console.log("Either readyState != 0 or 4");
	}
}

function handle(url) {
	removalProcess(url.parentNode.nextSibling.innerHTML);
	url.parentNode.parentNode.innerHTML = "";
	return false;
};