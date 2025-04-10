class TextUtils {
    constructor(inputfield) {
        this.inputField=inputfield;
        this.speechSynth=window.speechSynthesis;
        this.speechSynth.cancel();
        this.initialEventListner();
        this.currentFontSize=1.5;
    }

    initialEventListner() {
        document.querySelectorAll('.btn--textstyling').forEach((element)=>{
            element.addEventListener('click',(event)=>{
                this.handleButtonClick(element);
            })
        });

        this.inputField.addEventListener('input',(event)=>{
            const textSummaryWordchar = document.querySelector(".textsummary__wordschar");
            const textSummaryMinutes = document.querySelector(".textsummary__minutes");
            const textPreview = document.querySelector(".preview__text");

            document.querySelectorAll('.btn--textstyling').forEach((element)=>{
                if(this.inputField.textContent===''){
                    element.disabled=true;
                }
                else{
                    element.disabled=false;
                }
            });

            if(this.inputField.textContent === "") {
                textSummaryWordchar.textContent = "0 Words, 0 Characters";
                textSummaryMinutes.textContent = "0 Minutes Read";
                textPreview.textContent = "Nothing to Preview!!"
            }
            else {
                this.showTextSummary(textSummaryWordchar,textSummaryMinutes);
                this.showTextPreview(textPreview);
            }
        });

        document.getElementById('find__text').addEventListener('input',(event)=>{
            const replaceElement=document.getElementById('replace__text');

            if(event.target.value==''){
                replaceElement.disabled=true;
            }
            else{
                replaceElement.disabled=false;
            }
        })

        document.querySelector('.btn--extradropdown').addEventListener('click',(event)=>{          
            const dropdownElement=document.querySelector('.extraopration--dropdown');
            if(dropdownElement.style.display==='none'){
                dropdownElement.style.display='flex';
                event.target.querySelector('img').style.transform='rotate(-180deg)';
            }else{
                dropdownElement.style.display='none';
                event.target.querySelector('img').style.transform='rotate(0deg)';
            };
        })

    }


    showTextPreview(textPreview) {
        if(this.inputField.textContent == "") {
            textPreview.textContent = "Nothing to Preview!!"
        }
        else {
            textPreview.textContent = this.inputField.textContent;
        }
        
        
    }

    showTextSummary(textSummaryWordchar,textSummaryMinutes) {
        let wordsCount = 0;
        let charCount = 0;

        let inputStr = this.inputField.textContent;
        inputStr = inputStr.trim();
        let newInputStr = inputStr.split(" ");
         
        let strArray = [];
        for(let str of newInputStr) {   
            if (str != " ") {
                wordsCount ++;
                for(let char of str) {
                    if(char!==" ") {
                        charCount++;
                    }
                }
                strArray.push(str)
            }
        }

        if(this.inputField.textContent == "") {
            textSummaryWordchar.textContent = "0 Words, 0 Characters";
            textSummaryMinutes.textContent = "0 Minutes Read";
        } else {
            textSummaryWordchar.textContent = `${wordsCount} Words, ${charCount} Characters`
            textSummaryMinutes.textContent = `${(wordsCount/130).toFixed(2)} Minutes Read`;
        }
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
                case "startSpeech":{
                    this.convertToSpeech(this.inputField.textContent);
                    break;
                }
                case "stopSpeech":{
                    this.speechSynth.cancel();
                    break;
                }
                case "increaseFont":{
                    this.increaseFontSize(this.inputField);
                    break;
                }
                case "decreaseFont":{
                    this.decreaseFontSize(this.inputField);
                    break;
                }
                case "bold":{
                    this.toggleStyle('b');
                    break;
                }
                case "underline":{
                    this.toggleStyle('u');
                    break;
                }
                case "italic":{
                    this.toggleStyle('i');
                    break;
                }
                case "lineThrough":{
                    this.toggleStyle('s');
                    break;
                }
                case "find":{
                    if(element.textContent==='Find'){
                        this.findText();
                        element.textContent='X';
                    }
                    else{
                        this.removeHighlight();
                        element.textContent='Find';
                    }
                    break;
                }
                case "replace":{
                    this.replaceText();
                    break;
                }
                default:{
                    break;    
                }
            }

            const textPreview = document.querySelector(".preview__text");
            textPreview.innerHTML=this.inputField.innerHTML;
        } catch (error) {
            throw new Error('Error while handling button click.');
        }
    }

    copyToclipboard(inputStr) {
        navigator.clipboard.writeText(inputStr.textContent);
        alert("copied the text" + inputStr.textContent);
    }

    toUpperCase(inputStr) {
        inputStr = inputStr.toUpperCase();
        return inputStr;
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
            
            if (str !== " " && str!=="") {
                strArray.push(str)
            }
        }  

        newInputStr = strArray.join(" ");

        return newInputStr;
    }

    findText(){
        const inputText=this.inputField.textContent;
        const findText=document.getElementById('find__text').value;

        this.inputField.innerHTML=inputText.replaceAll(findText,`<mark>${findText}</mark>`);
    }

    removeHighlight(){
        document.getElementById('find__text').value='';
        document.querySelector('button[value="find"]').textContent='Find';
        
        document.querySelectorAll('mark').forEach((element)=>{
            const elementText=document.createTextNode(element.textContent);
            document.getElementById('mainsection__input').replaceChild(elementText,element);
        })
    }

    replaceText(){
        const inputText=this.inputField.textContent;
        const findText=document.getElementById('find__text').value;

        if(findText==''){
            return;
        }

        const replaceTextElement=document.getElementById('replace__text');

        this.inputField.innerHTML=inputText.replaceAll(findText,replaceTextElement.value);
        replaceTextElement.value='';
        this.removeHighlight();
    }

    toggleStyle(styleTag){
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            if(this.isAlready(selection.anchorNode.parentElement,styleTag)){
                // const elementText=range.toString();
                const newNode=document.createTextNode(selection.anchorNode.parentElement.textContent);
                // console.log(selection.anchorNode.parentElement.parentNode);
                // console.log(selection.anchorNode.parentElement);
                
                selection.anchorNode.parentElement.parentNode.replaceChild(newNode,selection.anchorNode.parentElement);
               return; 
            }

            const lineThrough = document.createElement(styleTag);
            range.surroundContents(lineThrough);
            selection.removeAllRanges();
        }
    }

    isAlready(element,type){
        // console.log('tagname check: ',element.tagName);
        
        return element.tagName===type.toUpperCase();
    }

    increaseFontSize(inputField){
        inputField.style.fontSize=this.currentFontSize+0.5+'rem';
        this.currentFontSize+=0.5;
    }

    decreaseFontSize(inputField){
        inputField.style.fontSize=this.currentFontSize-0.5+'rem';
        this.currentFontSize-=0.5;
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
        const textPreview = document.querySelector(".preview__text");
        console.log(textPreview);
        const textSummaryWordchar = document.querySelector(".textsummary__wordschar");
        const textSummaryMinutes = document.querySelector(".textsummary__minutes");
        
        this.inputField.textContent = value;
        this.showTextPreview(textPreview);
        this.showTextSummary(textSummaryWordchar,textSummaryMinutes);
    }   
}


document.addEventListener("DOMContentLoaded", () => {
    const inputField=document.getElementById("mainsection__input");
    new TextUtils(inputField)
})