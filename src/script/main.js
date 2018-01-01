// Stop outlines for non-keyboarding users
// https://hackernoon.com/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
function handleFirstTab (e) {
  if (e.keyCode === 9) { // the 'I am a keyboard user' key
    document.body.classList.add('user-is-tabbing')
    window.removeEventListener('keydown', handleFirstTab)
  }
}
window.addEventListener('keydown', handleFirstTab)

// Button ripple
var addRippleEffect = function (e) {
  var target = e.target
  if (target.tagName.toLowerCase() !== 'button') return false
  var rect = target.getBoundingClientRect()
  var ripple = target.querySelector('.ripple')
  if (!ripple) {
    ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
    target.appendChild(ripple)
  }
  ripple.classList.remove('show')
  var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
  var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
  ripple.style.top = top + 'px'
  ripple.style.left = left + 'px'
  ripple.classList.add('show')
  return false
}

document.addEventListener('click', addRippleEffect, false)
