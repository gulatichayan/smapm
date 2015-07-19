function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function checkPassword(pass) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(pass);
}	

function checkInput(inp) {
    var re = /^([\w-])/;
    return re.test(inp);
}

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .01) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}


function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .01) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function checkLoginForm(form) {
	var flag = 0;
	var para;
	var text;
	var i;
	form.onsubmit = function() {
		if (!validateEmail(form.email.value)) {
			form.img_error1.style.visibility = "visible";
			form.img_error1.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error1.style.visibility = "hidden";
			form.img_error1.src = "";
			flag = flag + 1;
		}
		if (!checkPassword(form.pass.value)) {
			form.img_error2.style.visibility = "visible";
			form.img_error2.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error2.style.visibility = "hidden";
			form.img_error2.src = "";
			flag = flag + 1;
		}
		if (flag >= 2) {
			return true;
		}
		if (flag < 2) {
			return false;
		}
	};
}

function checkRegForm(form) {
	var flag = 0;
	var para;
	var text;
	var i;
	form.onsubmit = function() {
		if (!checkInput(form.firstName.value)) {
			form.img_error3.style.visibility = "visible";
			form.img_error3.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error3.style.visibility = "hidden";
			form.img_error3.src = "";
			flag = flag + 1;
		}
		if (!checkInput(form.lastName.value)) {
			form.img_error4.style.visibility = "visible";
			form.img_error4.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error4.style.visibility = "hidden";
			form.img_error4.src = "";
			flag = flag + 1;
		}
		if (!validateEmail(form.email.value)) {
			form.img_error5.style.visibility = "visible";
			form.img_error5.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error5.style.visibility = "hidden";
			form.img_error5.src = "";
			flag = flag + 1;
		}
		if (!checkPassword(form.pass.value)) {
			form.img_error6.style.visibility = "visible";
			form.img_error6.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error6.style.visibility = "hidden";
			form.img_error6.src = "";
			flag = flag + 1;
		}
		if (form.confPass.value != form.pass.value) {
			form.img_error7.style.visibility = "visible";
			form.img_error7.src = "images/error.png";
			flag = flag - 1;
		}
		else {
			form.img_error7.style.visibility = "hidden";
			form.img_error7.src = "";
			flag = flag + 1;
		}
		if (flag >= 5) {
			return true;
		}
		if (flag < 5) {
			return false;
		}
	};
}

var image = document.getElementById("simage");
//var imgarr = ["images/pic1.png", "images/pic2.png", "images/pic3.png", "images/pic4.png"];
var imgarr = ["images/gates.jpeg", "images/zuckerberg.jpg", "images/jobs.jpg", "images/buffet.jpg"];
var i=1;

function slider() {	
		image.src = imgarr[i++];
		fadeIn(image);
		if(i>=imgarr.length) {
			i=0;
		}
}

window.onload =  function() {
	checkLoginForm(document.getElementById("logform"));
	checkRegForm(document.getElementById("regform"));
	setInterval(slider, 5000);
};
