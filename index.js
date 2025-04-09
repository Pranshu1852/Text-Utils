class TextUtils {
    constructor(inputfield) {
        this.inputField=inputfield;
        this.speechSynth=window.speechSynthesis;
        this.speechSynth.cancel();
        this.initialEventListner();
        this.currentFontSize=1.5;
    }

    initialEventListner() {
        const textSummary = document.querySelector(".textsummary__wordschar");
            console.log(textSummary);
            const textPreview = document.querySelector(".preview__text");
            console.log(textPreview);
        
        document.querySelectorAll('.btn--textstyling').forEach((element)=>{
            element.addEventListener('click',(event)=>{
                this.handleButtonClick(element);
            })
        });

        this.inputField.addEventListener('input',(event)=>{
            const textSummary = document.querySelector(".textsummary__wordschar");
            console.log(textSummary);
            const textPreview = document.querySelector(".preview__text");
            console.log(textPreview);
           

            document.querySelectorAll('.btn--textstyling').forEach((element)=>{
                if(this.inputField.textContent===''){
                    element.disabled=true;
                }
                else{
                    element.disabled=false;
                }
            });

            if(this.inputField.textContent === "") {
                textSummary.textContent = "0 Words, 0 Characters";
                textPreview.textContent = "Nothing to Preview!!"
            }
            else {
                this.showTextSummary(textSummary);
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

    }


    showTextPreview(textPreview) {
        console.log(this.inputField.textContent);
        if(this.inputField.textContent == "") {
            textPreview.textContent = "Nothing to Preview!!"
        }
        else {
            textPreview.textContent = this.inputField.textContent;
        }
        
        
    }

    showTextSummary(textSummary) {
        let wordsCount = 0;
        let charCount = 0;

        let inputStr = this.inputField.textContent;
        inputStr = inputStr.trim();
        let newInputStr = inputStr.split(" ");
        console.log(newInputStr, "split");
        
        
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
            textSummary.textContent = "0 Words, 0 Characters";
        } else {
            textSummary.textContent = `${wordsCount} Words, ${charCount} Characters`
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
                    this.toBold();
                    break;
                }
                case "underline":{
                    this.toUnderLine();
                    break;
                }
                case "italic":{
                    this.toItalic();
                    break;
                }
                case "lineThrough":{
                    this.toLineThrough();
                    break;
                }
                case "find":{
                    this.findText();
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
        } catch (error) {
            console.log(error);
            
            throw new Error('Error while handling button click.');
        }
    }

    copyToclipboard(inputStr) {
        navigator.clipboard.writeText(inputStr.textContent);
        alert("copied the text" + inputStr.textContent);
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
            
            if (str !== " " && str!=="") {
                strArray.push(str)
            }
        }  

        newInputStr = strArray.join(" ");

        return newInputStr;
    }

    findText(){
        console.log('running');
        
        const inputText=this.inputField.textContent;
        const findText=document.getElementById('find__text').value;
        console.log(findText);        

        // if(findText.value==''){
        //     return;
        // }
        
        this.inputField.innerHTML=inputText.replaceAll(findText,`<mark>${findText}</mark>`);
    }

    replaceText(){
        const inputText=this.inputField.textContent;
        const findText=document.getElementById('find__text').value;
        const replaceText=document.getElementById('replace__text').value;
        console.log(findText);

        this.inputField.innerHTML=inputText.replaceAll(findText,`<mark>${replaceText}</mark>`);
    }

    toBold(){
        // window.getSelection().removeAllRanges();
        const selection = window.getSelection();
        console.log(selection.anchorNode.parentElement);
        console.log();
        
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if(this.isAlready(selection.anchorNode.parentElement,'B')){
                // const elementText=range.toString();
                const newNode=document.createTextNode(selection.anchorNode.parentElement.textContent);
                console.log(selection.anchorNode.parentElement.parentNode);
                console.log(selection.anchorNode.parentElement);
                
                selection.anchorNode.parentElement.parentNode.replaceChild(newNode,selection.anchorNode.parentElement);
               return; 
            }
            console.log(selection);
            const bold = document.createElement('b');
            range.surroundContents(bold);
            selection.removeAllRanges();
        }

        const textSummary = document.querySelector(".textsummary__wordschar");
            console.log(textSummary);
            const textPreview = document.querySelector(".preview__text");
            console.log(textPreview);
    }

    toItalic(){
        // window.getSelection().removeAllRanges();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const italic = document.createElement('i');
            range.surroundContents(italic);
            selection.removeAllRanges();
        }
    }

    toUnderLine(){
        // window.getSelection().removeAllRanges();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const underline = document.createElement('u');
            range.surroundContents(underline);
            selection.removeAllRanges();
        }
    }

    toLineThrough(){
        // window.getSelection().removeAllRanges();
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const lineThrough = document.createElement('s');
            range.surroundContents(lineThrough);
            selection.removeAllRanges();
        }
    }

    isAlready(element,type){
        console.log('tagname check: ',element.tagName);
        
        return element.tagName===type;
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
        const textSummary = document.querySelector(".textsummary__wordschar");
        
        this.inputField.textContent = value;
        this.showTextPreview(textPreview);
        this.showTextSummary(textSummary);
    }   
}


document.addEventListener("DOMContentLoaded", () => {
    const inputField=document.getElementById("mainsection__input");
    new TextUtils(inputField)
})