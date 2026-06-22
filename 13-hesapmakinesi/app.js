import { ElbyClass, ElbyId, ElbyTag, ElbyQry, ElbyQryAll } from "./util.js";

function plus() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const result = s1 + s2;
    ElbyId.get("result").value = result;
    
}

function minus() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const result = s1 - s2;
   
    ElbyId.get("result").value = result;
}

function divide() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    if (s2 === 0) {
        ElbyId.get("result").value = "Error: Division by zero";
        return;
    }
    const result = s1 / s2;
    ElbyId.get("result").value = result;
}

function multiply() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const result = s1 * s2;
    ElbyId.get("result").value = result;
}

function cnv(inputId) {
    const element = ElbyId.get(inputId);
    const value = element ? element.value : "0";
    return parseFloat(value) || 0;
}

// Make functions globally available
window.plus = plus;
window.minus = minus;
window.divide = divide;
window.multiply = multiply;

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ElbyId.get("pls").addEventListener("click", plus);
    ElbyId.get("min").addEventListener("click", minus);
    ElbyId.get("div").addEventListener("click", divide);
    ElbyId.get("mul").addEventListener("click", multiply);
});