# Notes on Go's `fmt` Package

The `fmt` package in Go provides functions for formatting and printing data, as well as scanning input. It is one of the most commonly used packages in the Go standard library, offering a simple and flexible way to handle I/O operations. These notes cover the key functionalities of the `fmt` package, focusing on its formatting and scanning capabilities.

## 1. Overview
- **Package Name**: `fmt` (short for "format")
- **Purpose**: Provides functions for formatted I/O, including printing to the console, formatting strings, and reading input.
- **Import**: `import "fmt"`
- **Key Features**:
  - Printing to standard output (`stdout`) or other outputs.
  - Formatting strings with verbs (e.g., `%v`, `%d`).
  - Scanning input from standard input (`stdin`) or other sources.
  - Support for custom formatting with structs and interfaces.

## 2. Printing Functions
The `fmt` package offers several functions for printing data to `stdout` or other writers.

- **`fmt.Print(a ...interface{})`**: Prints arguments without formatting, with spaces between them.
  ```go
  fmt.Print("Hello", "World") // Output: Hello World
  ```

- **`fmt.Println(a ...interface{})`**: Prints arguments with spaces and adds a newline.
  ```go
  fmt.Println("Hello", "World") // Output: Hello World\n
  ```

- **`fmt.Printf(format string, a ...interface{})`**: Formats arguments according to a format string using verbs.
  ```go
  name := "Alice"
  age := 25
  fmt.Printf("Name: %s, Age: %d\n", name, age) // Output: Name: Alice, Age: 25
  ```

- **File/Writers**:
  - `fmt.Fprint(w io.Writer, a ...interface{})`: Prints to a specified writer (e.g., file).
  - `fmt.Fprintln`, `fmt.Fprintf`: Similar to `Print`, `Println`, `Printf` but write to a specified `io.Writer`.
  ```go
  file, _ := os.Create("output.txt")
  fmt.Fprintf(file, "Data: %v", 42)
  ```

## 3. Formatting Verbs
The `fmt` package uses **verbs** in `Printf`-style functions to format data. Common verbs include:

| Verb | Description | Example |
|------|-------------|---------|
| `%v` | Default format for any type | `fmt.Printf("%v", 42)` → `42` |
| `%T` | Type of the value | `fmt.Printf("%T", 42)` → `int` |
| `%d` | Integer (base-10) | `fmt.Printf("%d", 42)` → `42` |
| `%f` | Floating-point | `fmt.Printf("%f", 3.14)` → `3.140000` |
| `%s` | String | `fmt.Printf("%s", "hello")` → `hello` |
| `%b` | Binary (base-2) | `fmt.Printf("%b", 42)` → `101010` |
| `%x` | Hexadecimal | `fmt.Printf("%x", 42)` → `2a` |
| `%t` | Boolean | `fmt.Printf("%t", true)` → `true` |
| `%p` | Pointer address | `x := 42; fmt.Printf("%p", &x)` → `0xc0000120b8` |
| `%%` | Literal percent sign | `fmt.Printf("%%")` → `%` |

- **Width and Precision**:
  - `%6d`: Pads integer to 6 characters.
  - `%.2f`: Formats float with 2 decimal places.
  ```go
  fmt.Printf("%6d", 42)   // Output: "    42"
  fmt.Printf("%.2f", 3.14159) // Output: "3.14"
  ```

- **Struct Formatting**:
  - `%v`: Default struct format (field values).
  - `%+v`: Includes field names.
  - `%#v`: Detailed Go-syntax representation.
  ```go
  type Person struct {
      Name string
      Age  int
  }
  p := Person{Name: "Alice", Age: 25}
  fmt.Printf("%v\n", p)  // Output: {Alice 25}
  fmt.Printf("%+v\n", p) // Output: {Name:Alice Age:25}
  fmt.Printf("%#v\n", p) // Output: main.Person{Name:"Alice", Age:25}
  ```

## 4. String Formatting
- **`fmt.Sprintf(format string, a ...interface{})`**: Returns a formatted string instead of printing it.
  ```go
  s := fmt.Sprintf("Name: %s, Age: %d", "Bob", 30)
  fmt.Println(s) // Output: Name: Bob, Age: 30
  ```
- **`fmt.Sprint(a ...interface{})`**, **`fmt.Sprintln`**: Non-formatted string versions of `Print` and `Println`.

## 5. Scanning Functions
The `fmt` package also supports reading input from `stdin` or other readers.

- **`fmt.Scan(a ...interface{})`**: Reads space-separated values from `stdin`.
  ```go
  var name string
  var age int
  fmt.Scan(&name, &age) // Input: Alice 25
  fmt.Printf("Name: %s, Age: %d", name, age)
  ```

- **`fmt.Scanf(format string, a ...interface{})`**: Reads input according to a format string.
  ```go
  var name string
  var age int
  fmt.Scanf("%s %d", &name, &age) // Input: Alice 25
  ```

- **`fmt.Scanln(a ...interface{})`**: Reads until a newline.
  ```go
  var input string
  fmt.Scanln(&input) // Input: Hello World
  fmt.Println(input)
  ```

- **File/Readers**:
  - `fmt.Fscan`, `fmt.Fscanf`, `fmt.Fscanln`: Read from a specified `io.Reader`.

## 6. Error Formatting
- **`fmt.Errorf(format string, a ...interface{})`**: Creates an error with a formatted message.
  ```go
  err := fmt.Errorf("failed to process %s: %v", "data", "invalid")
  fmt.Println(err) // Output: failed to process data: invalid
  ```

## 7. Custom Formatting
Types can implement the `fmt.Stringer` interface to define custom string representations.
```go
type Person struct {
    Name string
    Age  int
}

func (p Person) String() string {
    return fmt.Sprintf("%s (%d years)", p.Name, p.Age)
}

func main() {
    p := Person{Name: "Alice", Age: 25}
    fmt.Println(p) // Output: Alice (25 years)
}
```

## 8. Best Practices
- Use `fmt.Println` for quick debugging or simple output.
- Prefer `fmt.Printf` for structured output with specific formatting.
- Use `fmt.Sprintf` when you need to store formatted strings.
- Handle errors from scanning functions (they return the number of items scanned and an error).
- Leverage `%+v` or `%#v` for debugging structs and complex types.
- Implement `Stringer` for custom types to improve readability.

## 9. Example: Comprehensive Usage
```go
package main

import "fmt"

type User struct {
    Name string
    ID   int
}

func (u User) String() string {
    return fmt.Sprintf("User: %s (ID: %d)", u.Name, u.ID)
}

func main() {
    // Printing
    fmt.Println("Hello, Go!") // Simple print
    fmt.Printf("Value: %d, Type: %T\n", 42, 42) // Formatted print

    // Struct formatting
    u := User{Name: "Alice", ID: 101}
    fmt.Printf("Default: %v\n", u)  // {Alice 101}
    fmt.Printf("Detailed: %+v\n", u) // {Name:Alice ID:101}
    fmt.Println(u) // Custom: User: Alice (ID: 101)

    // String formatting
    s := fmt.Sprintf("User %s has ID %d", u.Name, u.ID)
    fmt.Println(s) // User Alice has ID 101

    // Scanning
    var name string
    var age int
    fmt.Print("Enter name and age: ")
    fmt.Scanf("%s %d", &name, &age)
    fmt.Printf("Scanned: %s, %d\n", name, age)

    // Error formatting
    err := fmt.Errorf("invalid input for %s", name)
    fmt.Println(err)
}
```

## 10. Conclusion
The `fmt` package is a cornerstone of Go programming, offering versatile tools for formatting output and reading input. Its simplicity aligns with Go’s philosophy, while its flexibility supports a wide range of use cases. Explore the official [Go documentation](https://pkg.go.dev/fmt) for more details and advanced features.