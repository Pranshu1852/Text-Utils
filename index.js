class TextUtils {
    constructor(inputfield) {
        this.inputField=inputfield;
        this.speechSynth=window.speechSynthesis;
        this.speechSynth.cancel();
        this.initialEventListner();
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

        document.querySelector('.btn--extradropdown').addEventListener('click',(event)=>{
            console.log('clicking');
            
            const dropdownElement=document.querySelector('.extraopration--dropdown');
            if(dropdownElement.style.display==='none'){
                dropdownElement.style.display='flex';
                console.log();
                
                event.target.querySelector('img').style.transform='rotate(-180deg)';
            }else{
                dropdownElement.style.display='none';

                event.target.querySelector('img').style.transform='rotate(0deg)';
            };
        })
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
                case "bold":{
                    this.toBold(this.inputField);
                    break;
                }
                case "startSpeech":{
                    this.convertToSpeech(this.inputField.value);
                    break;
                }
                case "stopSpeech":{
                    this.speechSynth.cancel();
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

    toBold(inputField){
        return inputField.style.fontWeight='bold';
    }

    convertToSpeech(enteredText) {
        if (!this.speechSynth.speaking && enteredText.trim().length) {
            const newUtter = new SpeechSynthesisUtterance(enteredText);
            this.speechSynth.speak(newUtter);
        }
        else{
            console.log("No Content provided for operation");
        }
    }

    updateInputStr(value) {
        this.inputField.value = value;
    }   
}


document.addEventListener("DOMContentLoaded", () => {
    const inputField=document.getElementById("mainsection__input");
    new TextUtils(inputField)
})