class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        
        
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        
    }
 

    delete(){
        //get the very last varible from number on calculator(string) and delete it or "chop it off the end" with the slice method
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    //allows to add numbers to end of string/ only allow one period
    appendNumber(num){
        //stop calculator from using multiple periods................
        if(num === '.' && this.currentOperand.includes('.')) return
        //adds a number onto the end of a number creating a string
        this.currentOperand = this.currentOperand.toString()  + num.toString()
       
        
    }
    //create abilty to set all values inside of calculator
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute(){
        //reslut of compute function
        let computation 
        //create a number version of previousOperand to a string
        const prev = parseFloat(this.previousOperand)
        //create number version of currentOperand 
        const current = parseFloat(this.currentOperand)
        //check if previous input IS NOT A NUMBER or current input IS NOT A NUMBER return nothing
        if(isNaN(prev) || isNaN(current)) return
        //Switch statement for clicable operation values(what does this.operation equal +, -, ect) 
        switch(this.operation){
        case '+': 
            computation = prev + current
            break
        case '-': 
            computation = prev - current
            break
        case '*': 
            computation = prev * current
            break
        case '÷': 
            computation = prev / current
            break
        default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(num) {
        const stringNumber = num.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(intergerDigits)) {
            intergerDisplay = ''
        }else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        }else {
            return intergerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
        //show which operation is beign used and place it in calculator display
        if(this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        }else {
            this.previousOperandTextElement.innerText = ''
        }

    }

  

}









const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
// numbers buttons made clickabable and functional
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
//operation buttons (plus minus ect) become clickable and functional
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})