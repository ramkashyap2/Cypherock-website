document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false
  }

  if (e.altKey && e.cmdKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false
  }
  if (e.altKey && e.cmdKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false
  }

  if (e.cmdKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false
  }
}

let exitPopUp = false
document.addEventListener('mouseout', evt => {
  if (evt.toElement === null && evt.relatedTarget === null) {
    if (!exitPopUp) {
      $('#myModal1').modal('show')
      setCookie_eu('cookieexitPopUp', true, 7)
      exitPopUp = true
    }
  }
})
$(window).on('scroll', function () {
  if (
    $(window).scrollTop() >=
    $('.bottom').offset().top + $('.bottom').outerHeight() - window.innerHeight
  ) {
    if (!exitPopUp) {
      $('#myModal1').modal('show')
      setCookie_eu('cookieexitPopUp', true, 7)
      exitPopUp = true
    }
  }
})

//z
var $zoho = $zoho || {}
$zoho.salesiq = $zoho.salesiq || {
  widgetcode:
    '471ab17840404ea1598c5ffd2643c8e307739ec351a220b086758388918f317fa81d6b547a35c109951d24f6be71d2d0',
  values: {},
  ready: function () {}
}
var d = document
s = d.createElement('script')
s.type = 'text/javascript'
s.id = 'zsiqscript'
s.defer = true
s.src = 'https://salesiq.zoho.in/widget'
t = d.getElementsByTagName('script')[0]
t.parentNode.insertBefore(s, t)
d.write("<div id='zsiqwidget'></div>")

// waiting for chat element to render
var idcount = 0
var id = setInterval(function () {
  var float = d.getElementsByClassName('zsiq_floatmain')[0]
  idcount++
  if (float) {
    pushChatIcon()
    clearInterval(id)
  }
  if (idcount >= 15) clearInterval(id)
}, 500)

checkCookie_eu()
function checkCookie_eu () {
  var consent = getCookie_eu('cookiebanner-accepted')
  var exitPopUpCookie = getCookie_eu('cookieexitPopUp')
  if (
    exitPopUpCookie == null ||
    exitPopUpCookie == '' ||
    exitPopUpCookie == undefined ||
    !exitPopUpCookie
  ) {
    exitPopUp = false
  } else {
    exitPopUp = true
  }
  if (consent == null || consent == '' || consent == undefined) {
    // show notification bar
  } else {
    console.log('else')
    document.getElementById('#cookie_directive_container').style.visibility =
      'hidden'
  }
}
 

$('#banner-close').click(function () {
  setCookie_eu('cookiebanner-accepted', 1, 30)
  document.getElementById('#cookie_directive_container').style.visibility =
    'hidden'
  document.getElementsByClassName('zsiq_floatmain')[0].style.marginBottom =
    '0px'
})

function setCookie_eu (c_name, value, exdays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + exdays)
  var c_value =
    escape(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString())
  document.cookie = c_name + '=' + c_value + '; path=/'
}

function getCookie_eu (c_name) {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(';')
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='))
    y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1)
    x = x.replace(/^\s+|\s+$/g, '')
    if (x == c_name) {
      return unescape(y)
    }
  }
}

function pushChatIcon () {
  var bannerCookie = 'cookiebanner-accepted'
  var x = document.cookie
  var cookieList = x.split(' ')
  var bannerRemoved = false

  for (var i = 0; i < cookieList.length; i++) {
    if (cookieList[i].split('=')[0] == bannerCookie) {
      // console.log('Cookie ', cookieList[i].split('=')[1])
      bannerRemoved = true
      break
    }
  }
  if (!bannerRemoved) {
    // push chat icon
    var offsetHeight = document.getElementById('#cookie_directive_container')
      .offsetHeight
    document.getElementsByClassName(
      'zsiq_floatmain'
    )[0].style.marginBottom = `${offsetHeight}px`
  }
}

function subs () {
  // $('#myModal').modal('toggle')
  var email = document.getElementById('email').value
  //   var data = JSON.stringify({ contacts: [{ email: email }] })
  var data = { email }
  axios
    // .post(`https://api.sendgrid.com/v3/marketing/contacts`, data)
    .post('/subscribe', data)
    .then(async res => {
      //   console.log(res)
      if (res.data == 'OK') {
        localStorage.setItem('subs', false)
        $('#myModal').modal('toggle')
        await new Promise(r => setTimeout(r, 2000))
        $('#myModal').modal('toggle')
      } else console.log('err in subscribing')
    })
    .catch(err => {
      console.log('error in subscribing', err)
    })
}

function myFunction () {
  alert('welcome ')
}

function bannerClosed () {
  console.log('banner closed')
}

var switchButton = document.querySelector('.switch-button')
var switchBtnRight = document.querySelector('.switch-button-case.right')
var switchBtnLeft = document.querySelector('.switch-button-case.left')
var activeSwitch = document.querySelector('.activeSwitch')

function switchLeft () {
  switchBtnRight.classList.remove('active-case')
  switchBtnLeft.classList.add('active-case')
  activeSwitch.style.left = '0%'
  $('#shyam').hide()
  $('#ram').show()
}

function switchRight () {
  switchBtnRight.classList.add('active-case')
  switchBtnLeft.classList.remove('active-case')
  activeSwitch.style.left = '50%'
  $('#ram').hide()
  $('#shyam').show()
}

switchBtnLeft.addEventListener(
  'click',
  function () {
    switchLeft()
  },
  false
)

switchBtnRight.addEventListener(
  'click',
  function () {
    switchRight()
  },
  false
)
wow = new WOW({
  animateClass: 'animated',
  offset: 100,
  callback: function (box) {
    // console.log('WOW: animating <' + box.tagName.toLowerCase() + '>')
  }
})
wow.init()
// document.getElementById('moar').onclick = function() {
//   var section = document.createElement('section');
//   section.className = 'section--purple wow fadeInDown';
//   this.parentNode.insertBefore(section, this);
// };

// var inactivityTime = function () {
// 	var time;
// 	window.onload = resetTimer;
// 	// DOM Events
// 	document.onmousemove = resetTimer;
// 	document.onkeypress = resetTimer;

// 	function logout() {
// 		alert("You are now logged out.")
// 		//location.href = 'logout.html'
// 	}

// 	function resetTimer() {alert('=')
// 		clearTimeout(time);
// 		time = setTimeout(logout, 3000)
// 		// 1000 milliseconds = 1 second
// 	}
// };

// 	$(function() {
// 		console.log( "ready!" );
// 		// alert("You are now logged in.")
// 		// inactivityTime();
// 	});
// 	window.addEventListener('load', resetTimer, true);
// 	var events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
// 	events.forEach(function(name) {
// 	 document.addEventListener(name, resetTimer, true);
// 	});
// 	window.addEventListener('scroll', resetTimer, true)
;(function () {
  setTimeout(function () {
    var re = localStorage.getItem('re')
    // console.log({re})
    if (re == 'true') {
      localStorage.setItem('re', false)
      $('#myModal').modal('show')
    }
  }, 5000)

  const idleDurationSecs = 120 // X number of seconds
  const redirectUrl = '/logout' // Redirect idle users to this URL
  let idleTimeout // variable to hold the timeout, do not modify

  const resetIdleTimeout = function () {
    var subs = localStorage.getItem('subs')
    if (subs == null) {
      // console.log('====0---',subs);
      if (idleTimeout) clearTimeout(idleTimeout)
      idleTimeout = setTimeout(() => {
        //localStorage.setItem('subs',false)
        if (!exitPopUp) {
          $('#myModal1').modal('show')
          setCookie_eu('cookieexitPopUp', true, 7)
          exitPopUp = true
        }
      }, idleDurationSecs * 1000)
    }
  }

  // Init on page load
  resetIdleTimeout()

  // Reset the idle timeout on any of the events listed below
  ;['click', 'touchstart', 'mousemove', 'scroll'].forEach(evt =>
    document.addEventListener(evt, resetIdleTimeout, false)
  )
})()
