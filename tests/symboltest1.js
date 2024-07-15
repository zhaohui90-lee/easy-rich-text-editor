var _a;
var observablePropertiesSymbol = Symbol('observableProperties');
var MyObservable = /** @class */ (function () {
    function MyObservable() {
        this[_a] = new Set();
    }
    MyObservable.prototype.addObservableProperty = function (property) {
        this[observablePropertiesSymbol].add(property);
    };
    MyObservable.prototype.isObservableProperty = function (property) {
        return this[observablePropertiesSymbol].has(property);
    };
    return MyObservable;
}());
_a = observablePropertiesSymbol;
var myInstance = new MyObservable();
myInstance.addObservableProperty('name');
console.log(myInstance.isObservableProperty('name')); // true
console.log(Object.keys(myInstance)); // 不会包含 observablePropertiesSymbol 属性
