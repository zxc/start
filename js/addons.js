
//
// Object functions
//

// Call a function on each item in an iterable Object
// Added to Object instead of Array for things like 'arguments'
// Arguments to the function: fn(item, index)
Object.prototype.each = function(fn) {
    for (var i = 0; i < this.length; i++) {
        // try the add .get method first
        // mainly so .each can be used on user defined classes
        // that can't use the [] syntax
        if ("get" in this) fn(this.get(i), i);
        else fn(this[i], i);
    }
}

// See Object.each, except returns a list of the return values
Object.prototype.collect = function(fn) {
    var ret = [];
    for (var i = 0; i < this.length; i++) {
        // try the .get method first (see .each for reason)
        if ("get" in this) ret.push(fn(this.get(i), i));
        else ret.push(fn(this[i], i));
    }
    return ret;
}

//
// String functions
//

// Trim whitespace from both ends of the string
String.prototype.trim = function() { 
    return this.replace(/^\s+|\s+$/g, "");
}

// Trim whitespace from the left end of the string
String.prototype.ltrim = function() { 
    return this.replace(/^\s+/, "");
}

// Trim whitespace from the right end of the string
String.prototype.rtrim = function() { 
    return this.replace(/\s+$/, "");
}

// Return true if string matches any argument
String.prototype.matchAny = function() {
    arguments = handle_array(arguments);
    if (arguments.length != 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (this == arguments[i]) return true;
        }
        return false;
    }
}

// Return true if string matches any argument, regardless of case
String.prototype.imatchAny = function() {
    arguments = handle_array(arguments);
    for (var i = 0; i < arguments.length; i++) {
        arguments[i] = arguments[i].toLowerCase();
    }
    return this.toLowerCase().matchAny(arguments);
}

// Multiply a string
String.prototype.multiply = function(ct) {
    var ret = "";
    for (var i = 0; i < ct; i++) { ret += this; }
    return ret;
}

//
// Array functions
//

// Return a value or range of values from an Array
Array.prototype.get = function(index) {
    // Handle getting on index (positive or negative)
    if (arguments.length == 1) {
        if (index > -1) return this[index];               // positive
        else            return this[this.length + index]; // negative
    // Handle getting a range
    } else if (arguments.length == 2) {
        // Get the second index
        var index_b = arguments[1];
        // Normalize both indices to positive integers
        if (index < 0) index = this.length + index;
        if (index_b < 0) index_b = this.length + index_b;
        // Check that the first index comes first
        // TODO: Handle cases such as array.get(3, 1)
        if (index > index_b) return null;
        var ret = []
        for (; index <= index_b; index++) {
            ret.push(this[index]);
        }
        return ret;
    }
    // Too many arguments
    return null;
}

//
// Helpers
//

// Called in functions that want a variable length list of arguments
// If these arguments are passed in one list instead of sequentially
// Makes foo([1,2,3]) look like foo(1,2,3)
// In either case, the 'arguments' object becomes a standard Array
function handle_array(args) {
    if (args.length == 1 && args[0] instanceof Array) return args[0]
    return Array.prototype.slice.call(args);
}
