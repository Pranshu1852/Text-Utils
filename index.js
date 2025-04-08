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
                if(this.inputField.textContent===''){
                    element.disabled=true;
                }
                else{
                    element.disabled=false;
                }
            });
        });

        this.inputField.addEventListener('select',(event)=>{
            console.log(event);
            console.log(this.inputField.selectionStart);
            console.log(this.inputField.selectionEnd);
            const str=this.inputField.textContent.substring(this.inputField.selectionStart,this.inputField.selectionEnd+1);
            setTimeout(()=>{
                this.inputField.textContent=this.inputField.textContent.substring(0,this.inputField.selectionStart)+`&lt;b&gt;${str}&lt;b/&gt;`+this.inputField.textContent.substring(this.inputField.selectionEnd+1,this.inputField.textContent.length);
            },3000)
        })

        document.querySelector('.btn--extradropdown').addEventListener('click',(event)=>{
            console.log('clicking');
            
            const dropdownElement=document.querySelector('.extraopration--dropdown');
            if(dropdownElement.style.display==='none'){
                dropdownElement.style.display='flex';
                event.target.querySelector('img').style.transform='rotate(-180deg)';
            }else{
                dropdownElement.style.display='none';
                event.target.querySelector('img').style.transform='rotate(0deg)';
            };
        })

        const editor = document.querySelector('#mainsection__input')
        editor.addEventListener("paste", (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, text);
        });
    }

    handleButtonClick(element){
        const btnValue=element.value;

        try {
            switch(btnValue) {
                case "ToUpperCase":{
                    let result = this.toUpperCase(this.inputField.textContent);          
                    this.updateInputStr(result);
                    break;
                }
                case "ToLowerCase":{
                    let lowerStr = this.toLowerCase(this.inputField.textContent);
                    this.updateInputStr(lowerStr);
                    break;
                }
                case "ToTrim":{
                    let trimString = this.trimStr(this.inputField.textContent);
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
                    console.log(document.getSelection());
                    console.log(document.getSelection().toString());
                    
                    this.toBold(this.inputField);
                    break;
                }
                case "startSpeech":{
                    this.convertToSpeech(this.inputField.textContent);
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
            if (str !== " ") {
                strArray.push(str)
            }
        }

        newInputStr = strArray.join(" ");

        return newInputStr;
    }

    toBold(inputField){
        return inputField.style.fontWeight='bold';
    }

    increaseFontSize(inputField){
        console.log(inputField);
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
        this.inputField.textContent = value;
    }   
}


document.addEventListener("DOMContentLoaded", () => {
    const inputField=document.getElementById("mainsection__input");
    new TextUtils(inputField)
})