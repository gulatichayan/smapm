var button = document.getElementById("stock_search_but");
var addPort = document.getElementById("add_to_portfolio");
var addButton = document.getElementById("add");
var invPrice = document.getElementById("invPrice");
var quant = document.getElementById("quant");
var img_cross = document.getElementById("img_cross");
var symbol;
var url;
var arr;
var source = [];
var result;
var quote;
var k=0;
var charts;
var set =1;

var arrow = document.getElementById("arrow");
var logo = document.getElementById("logo");

var param = location.pathname.split("/");
param.pop();
param = param.join("/");

if(param == "/portfolio/edit") {
	logo.src = "../../images/logo.png";
}

function add() {
	var i;
	var j;
	for(i=0;i<source.length;i++) {
		j=i;
		//console.log(source[i]);
		if(i == 1 || i == 5) {
			document.getElementById("span" + i).innerHTML = '(' + source[i] + ') ';
		} else if (i == 4) {
			try{
				var charCheck = source[4].charAt(0);
			} catch(error) {
				
			}
			//var charCheck = source[4].charAt(0);
			if(charCheck == '-') {
				if(param == "/portfolio/edit") {
					arrow.src = "../../images/down_r.gif";
				} else {
					arrow.src = "images/down_r.gif";
				}
				document.getElementById("span" + i).style.color = "red";
				j=i+1;
				document.getElementById("span" + j).style.color = "red";
			} else if(source[4] == '+0.00') {
				arrow.src = "";
				arrow.style.visibility = "hidden";
				document.getElementById("span" + i).style.color = "black";
				j=j+1;
				document.getElementById("span" + j).style.color = "black";
			} else if(charCheck == '+') {
				if(param == "/portfolio/edit") {
					arrow.src = "../../images/up_g.gif";
				} else {
					arrow.src = "images/up_g.gif";
				}
				document.getElementById("span" + i).style.color = "green";
				j=j+1;
				document.getElementById("span" + j).style.color = "green";
			}
			try{
				source[4] = source[4].substring(1);
			} catch(error) {
				
			}
			//source[4] = source[4].substring(1);
			document.getElementById("span" + i).innerHTML = source[i] + ' ';
		} else {
			document.getElementById("span" + i).innerHTML = source[i] + ' ';
		}
	}
	document.getElementById("stock_result").style.visibility = "visible";
	document.getElementById("chart").style.visibility = "visible";
}

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display;

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .01) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

addPort.onclick = function() {
	$('.dropdown').removeClass('open');
	addPort.className = "invisible";
	invPrice.className = "visible";
	quant.className = "visible";
	addButton.className = "btn btn-success visible";
	img_cross.className = "visible";
	ele = document.getElementsByClassName("visible");
	for(k=0;k<ele.length;k++) {
		fadeIn(ele[k]);
	}
}

img_cross.onclick = function() {
	invPrice.className = "invisible";
	quant.className = "invisible";
	addButton.className = "invisible";
	img_cross.className = "invisible";
	addPort.className = "btn visible";
	return false;
}

addButton.onclick = function() {
	if(document.getElementById("stock_symbol_shadow").value == "") {
		alert("Enter Stock Symbol");
		return false;
	} else if(invPrice.value == "") {
		alert("Enter Investment Price");
		return false;
	} else if(quant.value == "") {
		alert("Enter Quantity");
		return false;
	} else {
		return true;
	}
}

var xmlHttp = createXmlHttpRequestObject();
var timeout;

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

function loadResults() {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		console.log(symbol);
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%27" + symbol + "%27)&format=json&diagnostics=true&env=http://datatables.org/alltables.env";
		xmlHttp.open("GET",url,true);
		xmlHttp.onreadystatechange = handleServerResponseForLoading;
		xmlHttp.send(null);
	} else {
		timeout = setTimeout('loadResults()', 1000);
	}
}

function handleServerResponseForLoading() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		arr = JSON.parse(xmlHttp.responseText);
		quote = arr.query.results.quote;
		//console.log(quote);
		source[0]  = quote.Name;
		if(source[0] === null) {
			alert("Enter Valid Stock Symbol");
			//document.getElementById("stock_result").style.visibility = "hidden";
			//document.getElementById("imgchart").style.visibility = "hidden";
			symbol = "";
			clearTimeout(timeout);
		} else {
			charts = "https://chart.finance.yahoo.com/t?s="+symbol+"&lang=en-IN&region=IN&width=300&height=180";
			document.getElementById("imgchart").src = charts;
			document.getElementById("imgchart").style.visibility = "visible";
			source[1]  = quote.Symbol.toUpperCase();
			source[2]  = "- " + quote.StockExchange;
			source[3]  = quote.LastTradePriceOnly;
			source[4]  = quote.Change;
			source[5]  = quote.ChangeinPercent;
			try{
				source[5]  = quote.ChangeinPercent.substring(1);
			} catch(error) {
				
			}
			//source[5]  = quote.ChangeinPercent.substring(1);
			source[6]  = quote.LastTradeDate;
			source[7]  = quote.LastTradeTime;
			source[8]  = Object.keys(quote)[56]  + ": ";
			source[9]  = quote.PreviousClose;
			source[10] = Object.keys(quote)[45]  + ": ";
			source[11] = quote.DaysRange;
			source[12] = Object.keys(quote)[55] + ": ";
			source[13] = quote.Open;
			if(source[13] == null) {
				document.getElementById("errorMessage").className = "alert alert-warning";
				document.getElementById("marketCritical").innerHTML = "Market about to open. Complete data is currently not available";
			}
			source[14] = Object.keys(quote)[77] + ": ";
			source[15] = quote.YearRange;
			source[16] = Object.keys(quote)[3]  + ": ";
			source[17] = quote.Bid;
			source[18] = Object.keys(quote)[74] + ": ";
			source[19] = quote.Volume;
			source[20] = Object.keys(quote)[1]  + ": ";
			source[21] = quote.Ask;
			source[22] = Object.keys(quote)[2]  + ": ";
			source[23] = quote.AverageDailyVolume;
			source[24] = Object.keys(quote)[73] + ": ";
			source[25] = quote.OneyrTargetPrice;
			source[26] = Object.keys(quote)[32] + ": ";
			source[27] = quote.MarketCapitalization;
			source[28] = Object.keys(quote)[62] + ": ";
			source[29] = quote.PERatio;
			source[30] = Object.keys(quote)[16] + ": ";
			source[31] = quote.EarningsShare;
			source[32] = Object.keys(quote)[13] + ": ";
			source[33] = quote.DividendShare;
			source[34] = Object.keys(quote)[81] + ": ";
			source[35] = quote.DividendYield;
			for(var j in quote) {
				//console.log(k + "-" + j);
				k++;
			}
			add();
			timeout = setTimeout('loadResults()', 1000);
		}
	} else {
		//console.log("Either readyState != 4 or status != 200");
	}
}

button.onclick = function() {
	document.getElementById("suggestList").innerHTML = "";
	$('.dropdown').removeClass('open');
	document.getElementById("stock_symbol_shadow").value = document.getElementById("stock_symbol").value;
	symbol = document.getElementById("stock_symbol_shadow").value;
	if(symbol == "") {
		alert("Enter Stock Symbol");
		document.getElementById("stock_result").style.visibility = "hidden";
		document.getElementById("imgchart").style.visibility = "hidden";
	} else {
		loadResults();
		document.getElementById("stock_symbol").value = "";
	}
};