var xmlHttp = createXmlHttpRequestObject();

//var symbol;
var arr;

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

function process() {
	if(xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
		var symbol = document.getElementById("stock_symbol").value;
		//console.log(symbol);
		var url = "/searchJson?symbol=" + symbol;
		xmlHttp.open("GET",url,true);
		xmlHttp.onreadystatechange = handleServerResponse;
		xmlHttp.send(null);
	}
}

function autoComplete(e) {
	document.getElementById("stock_symbol").value = e.childNodes[0].innerHTML;
	document.getElementById("stock_search_but").click();
	$('.dropdown').removeClass('open');
}

function handleServerResponse() {
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		arr = JSON.parse(xmlHttp.responseText);
		//console.log(arr.length);
		if(arr.length == 0) {
			$('.dropdown').removeClass('open');
		}
		document.getElementById("suggestList").innerHTML = "";
		for(i=0;i<Math.min(10,arr.length);i++) {
			$('.dropdown').addClass('open');
			document.getElementById("suggestList").innerHTML += '<li><a href="#" onclick="autoComplete(this)"><span>' + arr[i].Symbol + '</span>' + ' &nbsp;&nbsp;&nbsp;&nbsp; ' + '<span class="pull-right">' + arr[i].Name + '</span></a></li>';
		}
	} else {
		//console.log("Either xmlHttp.readyState != 4 || xmlHttp.status != 200 || both :p");
	}
}

function checkInput(inp) {
    var re = /^([\w-])/;
    return re.test(inp);
}


document.getElementById("stock_symbol").oninput = function() {
	if(!checkInput(document.getElementById("stock_symbol").value)) {
		//console.log("Don't Request Server");
	} else {
		//console.log("Request Server");
		process();
	}
};

document.getElementById("stock_symbol").onkeyup = function() {
	if(!checkInput(document.getElementById("stock_symbol").value)) {
		document.getElementById("suggestList").innerHTML = "";
		$('.dropdown').removeClass('open');
	}
};
var d = 0;
document.getElementById("stock_symbol").onkeydown = function(e) {
	//console.log("Code= " + e.keyCode);
	if(e.keyCode == 40) {
		$('.dropdown').addClass('open');
		try {
			if(d > arr.length) {
				d=0;
			}
			if(d != 0){
				document.getElementById("suggestList").childNodes[d-1].childNodes[0].style.backgroundColor = "white";
			}
			document.getElementById("suggestList").childNodes[d].childNodes[0].style.backgroundColor="#d9edf7";
			document.getElementById("stock_symbol").value = document.getElementById("suggestList").childNodes[d].childNodes[0].childNodes[0].innerHTML;
		} catch(error) {
			
		}
		d++;
	}
	if(e.keyCode == 38) {
		try {
			if(d < 0) {
				d = arr.length;
			}
			document.getElementById("suggestList").childNodes[d].childNodes[0].style.backgroundColor="white";
		} catch(error) {
			
		}
		if( d!=0 ) {
			document.getElementById("suggestList").childNodes[d-1].childNodes[0].style.backgroundColor="#d9edf7";
			document.getElementById("stock_symbol").value = document.getElementById("suggestList").childNodes[d-1].childNodes[0].childNodes[0].innerHTML;
		}
		d--;
	}
	if(e.keyCode == 13) {
		document.getElementById("stock_search_but").click();
		e.preventDefault();
		return false;
	}
	if(e.keyCode == 8) {
		d=0;
	}
	if(e.keyCode == 27) {
		$('.dropdown').removeClass('open');
	}
};