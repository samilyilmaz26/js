import { ElbyId } from "./util.js";

function plus(): void {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (resultEl) resultEl.value = (s1 + s2).toString();
}

function minus(): void {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (resultEl) resultEl.value = (s1 - s2).toString();
}

function divide(): void {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    
    if (!resultEl) return;

    if (s2 === 0) {
        resultEl.value = "Error: Division by zero";
        return;
    }
    resultEl.value = (s1 / s2).toString();
}

function multiply(): void {
    const s1 = cnv("s1");
    const s2 = cnv("s2");
    const resultEl = ElbyId.getInput("result");
    if (resultEl) resultEl.value = (s1 * s2).toString();
}

function cnv(inputId: string): number {
    const element = ElbyId.getInput(inputId);
    const value = element ? element.value : "0";
    return parseFloat(value) || 0;
}

// Make functions globally available for HTML inline events (if needed)
(window as any).plus = plus;
(window as any).minus = minus;
(window as any).divide = divide;
(window as any).multiply = multiply;

document.addEventListener('DOMContentLoaded', () => {
    ElbyId.get("pls")?.addEventListener("click", plus);
    ElbyId.get("min")?.addEventListener("click", minus);
    ElbyId.get("div")?.addEventListener("click", divide);
    ElbyId.get("mul")?.addEventListener("click", multiply);
});