// package ValuesAndVariables
package main

import "fmt"
// import "os"
import "math"

const Pi = 3.14159
func main() {
	// //all  fmt functions are used to format and print output to the console.
	// fmt.Println("Hello, world")			
	// fmt.Printf("Hello, %s!\n", "world") // formatted output
	// fmt.Printf("The value of pi is approximately %.2f\n", 3.14159) // formatted float
	// fmt.Printf("The value of pi is approximately %f\n", 3.14159)
	// fmt.Printf("The value of pi is approximately %g\n", 3.14159) // scientific notation
	// fmt.Printf("The value of pi is approximately %e\n", 3.14159) // scientific notation with 'e'
	// fmt.Printf("The value of pi is approximately %v\n", 3.14159) // default format
	// fmt.Printf("The value of pi is approximately %q\n", "3.14159") // quoted string

	// // fmt.Sprintf is used to format a string and return it without printing it.
	// formattedString := fmt.Sprintf("Hello, %s!", "world")
	// fmt.Println(formattedString) // prints: Hello, world!
	// // fmt.Errorf is used to create an error with a formatted message.
	// err := fmt.Errorf("an error occurred: %s", "something went wrong")
	// fmt.Println(err) // prints: an error occurred: something went wrong		
	// // fmt.Fprint is used to write formatted output to a writer (like os.Stdout).
	// fmt.Fprint(os.Stdout, "Hello, world!\n") // prints: Hello, world!
	// // fmt.Fprintln is used to write formatted output to a writer with a newline.
	// fmt.Fprintln(os.Stdout, "Hello, world!") // prints: Hello, world!		
	// // fmt.Fprintf is used to write formatted output to a writer with a format string.
	// fmt.Fprintf(os.Stdout, "Hello, %s!\n", "world") // prints: Hello, world!
	// // fmt.Fscanf is used to read formatted input from a reader (like os.Stdin).
	// var name string
	// fmt.Print("Enter your name: ") // prompts user for input
	// fmt.Fscanf(os.Stdin, "%s", &name) // reads a string from standard input
	// fmt.Printf("Hello, %s!\n", name) // prints: Hello, <name>!				
	// // fmt.Scanf is used to read formatted input from standard input.
	// var age int
	// fmt.Print("Enter your age: ") // prompts user for input
	// fmt.Scanf("%d", &age) // reads an integer from standard input
	// fmt.Printf("You are %d years old!\n", age) // prints: You are <age> years old!
	// // fmt.Scanln is used to read a line of input from standard input.
	// var line string
	// fmt.Scanln(&line) // reads a line of input from standard input
	// fmt.Printf("You entered: %s\n", line) // prints: You entered: <line>

	// var a int
	// var b float64
	// var c string
	// var d bool

	// fmt.Printf("%v %v %q %v\n", a, b, c, d)
	// // 0 0 "" false
	// // fmt.Println("%v %v %q %v\n", a, b, c, d)

	// a = 42
	// b = 3.14
	// c = "Hello"
	// d = true

	// fmt.Printf("%v %v %q %v\n", a, b, c, d)
	// // 42 3.14 "Hello" true

	

	r := foo()   // ok, declare a new variable r
	fmt.Println("r:", r) // prints: r: <value>
 	r, m := bar()   // ok, declare a new variable m and assign r a new value
	fmt.Printf("r: %d, m: %d\n", r, m) // prints: r: <value>, m: <value>

	r, m , z := bar2()  //compile error: no new variables
	fmt.Printf("r: %d, m: %d, z: %d\n", r, m, z) //\n", r, m) // prints: r: <value>, m: <value>


	const n = 500000000
	const p = 3e20 / n
	fmt.Println(p)
	fmt.Println(int64(p)) // prints: <value>
	fmt.Println(math.Sin(p)) // prints: <value>
	fmt.Println(math.Cos(p)) // prints: <value>


}



func foo() int {
	return 1
}			

func bar() (int, int) {
	return 3, 2
}

func bar2() (int, int, int) {
	return 5, 6	, 7		
}
