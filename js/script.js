'use strict'

const currentOutputField = document.querySelector(
  '[data-type="current-output"]'
)
const keys = document.querySelector('.calculator__buttons')

let currentOperand
let prevOperand
let operator
let keyLastType

let operations = {
	
}

clear()

keys.addEventListener('click', (e) => {
  if (e.target.matches('button[data-key-type]')) {
    const key = e.target
		const type = key.dataset.keyType
		const keyValue = key.value
		makeAction(type, keyValue)
		keyLastType = type
    updateOutputField()
  }
})

function makeAction(type, keyValue) {
	if (type === 'operand') appendText(keyValue)
	if (type === 'del') del()
	if (type === 'reset') clear()
  if (type === 'operator') chooseOperation(keyValue)
  if (type === 'equals') compute()
}

function appendText(value) {
	if (currentOperand.includes('.') && value === '.') return
	if (keyLastType === 'operator' || keyLastType === 'equals')
    currentOperand = ''
	if (currentOperand === '' && value === '.') currentOperand = '0.'
	else currentOperand += value
}

function chooseOperation(operation) {
	if (currentOperand === '') return
	if (prevOperand !== '' && keyLastType !== 'operator' && keyLastType !== 'equals') compute()
	prevOperand = currentOperand
	operator = operation
}

function compute() {
	let result = 0;
	let prevValue = parseFloat(prevOperand)
	let currValue = parseFloat(currentOperand)
	if (isNaN(prevValue) || isNaN(currValue)) return
	switch (operator) {
		case '+':
			result = prevValue + currValue
      break
    case '-':
      result = prevValue - currValue
      break
    case 'x':
      result = prevValue * currValue
      break
    case '/':
			result = prevValue / currValue
      break
		}
		currentOperand = result.toString();
		
}

function del() {
	currentOperand = currentOperand.slice(0, -1)
}

function clear() {
  currentOperand = ''
  prevOperand = ''
	operator = ''
	keyLastType = ''
	updateOutputField()
}

function updateOutputField() {
  currentOutputField.value = currentOperand
}
