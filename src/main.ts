const myFunction = function() {
  const myVariable = document.createElement('p')
  myVariable.innerText = 'Hello World'
  document.getElementById('app')?.appendChild(myVariable)
}

myFunction()