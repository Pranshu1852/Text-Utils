class TextUtils {
    constructor(inputfield) {
        this.inputField=inputfield;
        this.initialEventListner()
    }

    initialEventListner() {
        document.querySelectorAll('.btn--textstyling').forEach((element)=>{
            element.addEventListener('click',(event)=>{
                this.handleButtonClick(element);
            })
        });

        this.inputField.addEventListener('input',(event)=>{
            document.querySelectorAll('.btn--textstyling').forEach((element)=>{
                if(this.inputField.value===''){
                    element.disabled=true;
                }
                else{
                    element.disabled=false;
                }
            });
        });
    }

    handleButtonClick(element){
        const btnValue=element.value;

        try {
            switch(btnValue) {
                case "ToUpperCase":{
                    let result = this.toUpperCase(this.inputField.value);          
                    this.updateInputStr(result);
                    break;
                }
                case "ToLowerCase":{
                    let lowerStr = this.toLowerCase(this.inputField.value);
                    this.updateInputStr(lowerStr);
                    break;
                }
                case "ToTrim":{
                    let trimString = this.trimStr(this.inputField.value);
                    this.updateInputStr(trimString); 
                    break;
                }
                case "clear":{
                    this.updateInputStr('');
                    break;
                }
                case "copy":{
                    this.copyToclipboard(this.inputField);
                    break;
                }
                default:{
                    break;    
                }
            }
        } catch (error) {
            throw new Error('Error while handling button click.');
        }
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
        
        
        return newInputStr;
    }

    updateInputStr(value) {
        this.inputField.value = value;
    }   
}


document.addEventListener("DOMContentLoaded", () => {
    const inputField=document.getElementById("mainsection__input");
    new TextUtils(inputField)
})