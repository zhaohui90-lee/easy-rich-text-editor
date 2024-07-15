const observablePropsSymbol = Symbol('observableProps')

class MyObservable {

  constructor() {
    this[observablePropsSymbol] = new Set()
  }
  
  addObservableProp(prop) {
    this[observablePropsSymbol].add(prop)
  }

  isObservableProp(prop) {
    return this[observablePropsSymbol].has(prop)
  }
}

const myInstance = new MyObservable()
myInstance.addObservableProp('name')
console.log(myInstance.isObservableProp('name'));
console.log(Object.keys(myInstance));
console.log(observablePropsSymbol);