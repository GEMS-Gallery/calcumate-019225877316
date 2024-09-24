import Func "mo:base/Func";

import Float "mo:base/Float";

actor Calculator {
    // Function to add two numbers
    public func add(x : Float, y : Float) : async Float {
        return x + y;
    };

    // Function to subtract two numbers
    public func subtract(x : Float, y : Float) : async Float {
        return x - y;
    };

    // Function to multiply two numbers
    public func multiply(x : Float, y : Float) : async Float {
        return x * y;
    };

    // Function to divide two numbers
    public func divide(x : Float, y : Float) : async ?Float {
        if (y == 0) {
            return null; // Return null for division by zero
        } else {
            return ?(x / y);
        };
    };
};
