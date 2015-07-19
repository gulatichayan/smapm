var xmlHttp = createXmlHttpRequestObject();

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

function loadIndexNasdaq() {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		var symbol = "^IXIC";
		var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%27" + symbol + "%27)&format=json&diagnostics=true&env=http://datatables.org/alltables.env";
		xmlHttp.open("GET",url,true);
		xmlHttp.onreadystatechange = handleServerResponseForNasdaq;
		xmlHttp.send(null);
	} else {
		setTimeout('loadIndexNasdaq()', 100);
	}
}

function handleServerResponseForNasdaq() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		var arr;
		arr = JSON.parse(xmlHttp.responseText);
		var quote;
		var source = [];
		var arrow = document.getElementById("arrowNasdaq");
		quote = arr.query.results.quote;
		source[0] = "Nasdaq";
		document.getElementById("index0").innerHTML = source[0];
		source[1] = quote.LastTradePriceOnly;
		document.getElementById("index1").innerHTML = source[1] + ' ';
		source[2] = quote.Change;
		if(source[2] == null) {
			document.getElementById("errorMessage").className = "alert alert-warning";
			document.getElementById("marketCritical").innerHTML = "Market about to open. Complete data is currently not available";
		}
		if(source[2].charAt(0) == '-') {
			arrow.src = "images/down_r.gif";
			document.getElementById("index2").style.color = "red";
			document.getElementById("index3").style.color = "red";
		} else {
			arrow.src = "images/up_g.gif";
			document.getElementById("index2").style.color = "green";
			document.getElementById("index3").style.color = "green";
		}
		source[2] = source[2].substring(1);
		document.getElementById("index2").innerHTML = source[2] + ' ';
		source[3] = quote.ChangeinPercent;
		document.getElementById("index3").innerHTML = '(' + source[3] + ')';
		document.getElementById("indexNasdaq").style.visibility = "visible";
		setTimeout('loadIndexNasdaq()', 100);
	} else {
		//console.log("Either readyState != 4 or status != 200");
	}
}

function loadIndexSnp() {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		var symbol = "^GSPC";
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%27" + symbol + "%27)&format=json&diagnostics=true&env=http://datatables.org/alltables.env";
		xmlHttp.open("GET",url,true);
		xmlHttp.onreadystatechange = handleServerResponseForSnp;
		xmlHttp.send(null);
	} else {
		setTimeout('loadIndexSnp()', 100);
	}
}

function handleServerResponseForSnp() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		var arr;
		arr = JSON.parse(xmlHttp.responseText);
		var quote;
		var source = [];
		var arrow = document.getElementById("arrowSnp");
		quote = arr.query.results.quote;
		source[0] = "S&P";
		document.getElementById("index4").innerHTML = source[0];
		source[1] = quote.LastTradePriceOnly;
		document.getElementById("index5").innerHTML = source[1] + ' ';
		source[2] = quote.Change;
		if(source[2].charAt(0) == '-') {
			arrow.src = "images/down_r.gif";
			document.getElementById("index6").style.color = "red";
			document.getElementById("index7").style.color = "red";
		} else {
			arrow.src = "images/up_g.gif";
			document.getElementById("index6").style.color = "green";
			document.getElementById("index7").style.color = "green";
		}
		source[2] = source[2].substring(1);
		document.getElementById("index6").innerHTML = source[2] + ' ';
		source[3] = quote.ChangeinPercent;
		document.getElementById("index7").innerHTML = '(' + source[3] + ')';
		document.getElementById("indexSnp").style.visibility = "visible";
		setTimeout('loadIndexSnp()', 100);
	} else {
		//console.log("Either readyState != 4 or status != 200");
	}
}

window.onload = function() {
	loadIndexNasdaq();
	loadIndexSnp();
};

/* Template AJAX begin
var xmlHttp = createXmlHttpRequestObject();

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

function process(url) {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		food = document.getElementById("input").value;
		xmlHttp.open("GET",url,true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	} else {
		setTimeout(process, 100);
	}
}

function handleServerResponse() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		xmlResponse = xmlHttp.responseXML;
		xmlDocumentElement = xmlResponse.documentElement;
		message = xmlDocumentElement.firstChild.data;
		document.getElementById("output").innerHTML = message;
		setTimeout(process, 100);
	} else {
		alert("Something went wrong!");
	}
}
Template AJAX end*/