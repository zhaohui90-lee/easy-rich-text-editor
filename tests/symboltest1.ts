const observablePropertiesSymbol = Symbol('observableProperties');

class MyObservable {
    private [observablePropertiesSymbol]: Set<string> = new Set();

    addObservableProperty(property: string): void {
        this[observablePropertiesSymbol].add(property);
    }

    isObservableProperty(property: string): boolean {
        return this[observablePropertiesSymbol].has(property);
    }
}

const myInstance = new MyObservable();
myInstance.addObservableProperty('name');
console.log(myInstance.isObservableProperty('name')); // true
console.log(Object.keys(myInstance)); // 不会包含 observablePropertiesSymbol 属性