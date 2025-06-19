import { ElbyClass, ElbyId, ElbyTag, ElbyQry, ElbyQryAll } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
    // ID Selection Demo
    const goBtn = ElbyId.get("goBtn");
    const idResult = ElbyId.get("idResult");

    if (goBtn && idResult) {
        goBtn.addEventListener("click", () => {
            const results = [];
            results.push(`First 'a' element text: ${ElbyId.textContent("a")}`);
            results.push(`Element 'b' text: ${ElbyId.textContent("b")}`);
            
           idResult.textContent = results.join('\n');
            idResult.classList.add('visible');
        });
    }

    // Class Selection Demo
    const classBtn = ElbyId.get("classBtn");
    const classResult = ElbyId.get("classResult");

    if (classBtn && classResult) {
        classBtn.addEventListener("click", () => {
            const results = [];
            ElbyClass.forEach("color", (element, index) => {
                results.push(`Paragraph ${index + 1}: ${element.textContent}`);
            });
            
            classResult.textContent = results.join('\n');
            classResult.classList.add('visible');
        });
    }

    // Tag Selection Demo
    const drinkBtn = ElbyId.get("drinkBtn");
    const tagResult = ElbyId.get("tagResult");

    if (drinkBtn && tagResult) {
        drinkBtn.addEventListener("click", () => {
            const results = [];
            ElbyTag.forEach("li", (element, index) => {
                results.push(`Drink ${index + 1}: ${element.textContent}`);
            });
            
            tagResult.textContent = results.join('\n');
            tagResult.classList.add('visible');
        });
    }

    // Query Selector Demo
    const queryBtn = ElbyId.get("queryBtn");
    const queryResult = ElbyId.get("queryResult");

    if (queryBtn && queryResult) {
        queryBtn.addEventListener("click", () => {
            const results = [];
            
            // querySelector example
            const firstQueryTest = ElbyQry.textContent(".query-test");
            results.push(`First query-test element: ${firstQueryTest}`);
            
            // querySelectorAll example
            results.push('\nAll query-test elements:');
            ElbyQryAll.forEach(".query-test", (element, index) => {
                results.push(`${index + 1}: ${element.textContent}`);
            });
            
            queryResult.textContent = results.join('\n');
            queryResult.classList.add('visible');
        });
    }

    // Add error handling demonstration
    try {
        // This will log a warning but not throw an error
        const nonExistentElement = ElbyId.get("nonexistent");
        console.log("After getting non-existent element");
        
        // This will safely return an empty string
        const nonExistentText = ElbyId.textContent("nonexistent");
        console.log("Non-existent element text:", nonExistentText);
    } catch (error) {
        console.error("Error in error handling demo:", error);
    }
});
