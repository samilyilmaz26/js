import { ElbyId } from "./util.js";
function plus() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (resultEl)
        resultEl.value = (s1 + s2).toString();
}
function minus() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (resultEl)
        resultEl.value = (s1 - s2).toString();
}
function divide() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (!resultEl)
        return;
    if (s2 === 0) {
        resultEl.value = "Error: Division by zero";
        return;
    }
    resultEl.value = (s1 / s2).toString();
}
function multiply() {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (resultEl)
        resultEl.value = (s1 * s2).toString();
}
function cnv(inputId) {
    const element = ElbyId.getInput(inputId);
    const value = element ? element.value : "0";
    return parseFloat(value) || 0;
}
window.plus = plus;
window.minus = minus;
window.divide = divide;
window.multiply = multiply;
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d;
    (_a = ElbyId.get("pls")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", plus);
    (_b = ElbyId.get("min")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", minus);
    (_c = ElbyId.get("div")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", divide);
    (_d = ElbyId.get("mul")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", multiply);
});
