import { add,sub } from './utils.js';

window.add = function () {
  const s1 = parseFloat(document.getElementById('s1').value);
  const s2 = parseFloat(document.getElementById('s2').value);

  if (isNaN(s1) || isNaN(s2)) {
    alert('Please enter valid numbers!');
    return;
  }

  const result = add(s1, s2);
  alert("Result: " + result);
};
window.sub = function () {
  const s1 = parseFloat(document.getElementById('s1').value);
  const s2 = parseFloat(document.getElementById('s2').value);

  if (isNaN(s1) || isNaN(s2)) {
    alert('Please enter valid numbers!');
    return;
  }

  const result = sub(s1, s2);
  alert("Result: " + result);
};
 
 