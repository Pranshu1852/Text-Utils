class TextUtils {
    constructor() {
        this.initialEventListner()
    }

    initialEventListner() {
        let textUtilsContainer = document.getElementById("text-utils-container");
        console.log(textUtilsContainer);
        
        let inputStr = document.getElementById("input-text");
        console.log(inputStr);

        textUtilsContainer.addEventListener("click", (e) => {
            let target = e.target.closest("button").value;
            switch(target) {
                case "ToUpperCase":
                    let result = this.toUpperCase(inputStr.value);
                    // inputStr.value = result
                    this.updateInputStr(inputStr, result);
                    // console.log(target);
                    // console.log(inputStr.value);
                    // inputStr.value = toUpperCase(inputStr.value)
                    // console.log(inputStr);
                    break;

                case "ToLowerCase": 
                    let lowerStr = this.toLowerCase(inputStr.value);
                    this.updateInputStr(inputStr, lowerStr);
                    // inputStr.value = lowerStr;
                    break;

                case "ToTrim":
                    let trimString = this.trimStr(inputStr.value);
                    this.updateInputStr(inputStr, trimString); 
                break;

                case "clear":
                    // let clearStr = this.clearInput(inputStr.value);
                    this.updateInputStr(inputStr, '');  
                break;

                case "copy":
                    this.copyToclipboard(inputStr);
                break;

                default: 
                break    
            }
        })
    }

    copyToclipboard(inputStr) {
        inputStr.select();
        navigator.clipboard.writeText(inputStr.value);
        alert("copied the text" + inputStr.value);
    }

    toUpperCase(inputStr) {
        inputStr = inputStr.toUpperCase();
        console.log(inputStr);
        return inputStr
    }

    toLowerCase(inputStr) {
        inputStr = inputStr.toLowerCase();
        return inputStr;
    }

    trimStr(inputStr) {
        inputStr = inputStr.trim();
        let newInputStr = inputStr.split(" ");
        let strArray = [];
        for(let str of newInputStr) {
            if (str != "") {
                // inputStr += str;
                strArray.push(str)
            }

            console.log(newInputStr);
        }

        newInputStr = strArray.join(" ");

        console.log(newInputStr);
        
        
        return newInputStr
    }

    updateInputStr(inputStr, result) {
        console.log(inputStr);
        inputStr.value = result
        
    }

   
}


document.addEventListener("DOMContentLoaded", () => {
    new TextUtils()
})