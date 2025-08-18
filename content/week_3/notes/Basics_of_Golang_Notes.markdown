# Basics of Golang - Notes

This document introduces the fundamental concepts of Go (Golang) programming, designed for beginners. It covers syntax, basic constructs, and key features to help you start coding in Go.

## 1. Setting Up Go
- **Installation**: Download and install Go from [golang.org](https://golang.org/). Verify with `go version`.
- **Workspace**: Go uses a workspace directory (default: `~/go`) with `src`, `pkg`, and `bin` subdirectories.
- **GOPATH**: Set the `GOPATH` environment variable to your workspace (though modules, introduced in Go 1.11, reduce its necessity).
- **Go Modules**: Initialize a project with `go mod init <module-name>` for dependency management.

## 2. Basic Program Structure
A minimal Go program:
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```
- **package main**: Every Go file belongs to a package. `main` is the entry point for executables.
- **import**: Imports packages (e.g., `fmt` for formatting and printing).
- **func main()**: The main function is where execution starts.

Run with: `go run filename.go`  
Build with: `go build filename.go`

## 3. Variables and Data Types
- **Declaring Variables**:
  ```go
  var x int = 10          // Explicit declaration
  y := 20                 // Short-hand (type inferred)
  var name string = "Go"  // String type
  var isActive bool       // Boolean, default false
  var f float64 = 3.14    // Floating-point
  ```
- **Constants**:
  ```go
  const Pi float64 = 3.14159
  ```
- **Basic Types**:
  - Integers: `int`, `int8`, `int16`, `int32`, `int64`, `uint`, etc.
  - Floating-point: `float32`, `float64`
  - String: `string`
  - Boolean: `bool`
  - Complex: `complex64`, `complex128`

- **Zero Values**: Uninitialized variables get default values (e.g., `0` for `int`, `""` for `string`, `false` for `bool`).

## 4. Control Structures
- **If-Else**:
  ```go
  if x > 10 {
      fmt.Println("x is large")
  } else if x == 10 {
      fmt.Println("x is 10")
  } else {
      fmt.Println("x is small")
  }
  ```
  - Supports initialization: `if x := 5; x > 0 { ... }`

- **Loops**: Go has only `for` loops:
  ```go
  // Standard for loop
  for i := 0; i < 5; i++ {
      fmt.Println(i)
  }

  // While-like loop
  i := 0
  for i < 5 {
      fmt.Println(i)
      i++
  }

  // Infinite loop
  for {
      break // Exit loop
  }
  ```

- **Switch**:
  ```go
  day := "Monday"
  switch day {
  case "Monday":
      fmt.Println("Start of week")
  case "Friday":
      fmt.Println("End of week")
  default:
      fmt.Println("Midweek")
  }
  ```
  - No `break` needed; cases don’t fall through unless using `fallthrough`.

## 5. Functions
- **Declaration**:
  ```go
  func add(a int, b int) int {
      return a + b
  }
  ```
- **Multiple Return Values**:
  ```go
  func divide(a, b float64) (float64, error) {
      if b == 0 {
          return 0, fmt.Errorf("division by zero")
      }
      return a / b, nil
  }
  ```
- **Named Return Values**:
  ```go
  func swap(a, b string) (x, y string) {
      x, y = b, a
      return
  }
  ```

## 6. Data Structures
- **Arrays**: Fixed-size, rarely used directly.
  ```go
  var arr [3]int = [3]int{1, 2, 3}
  ```
- **Slices**: Dynamic, flexible arrays.
  ```go
  s := []int{1, 2, 3}
  s = append(s, 4) // Add element
  fmt.Println(s[1:3]) // Slice: [2, 3]
  ```
- **Maps**: Key-value pairs.
  ```go
  m := map[string]int{"Alice": 25, "Bob": 30}
  m["Charlie"] = 35 // Add entry
  delete(m, "Bob")  // Remove entry
  ```
- **Structs**: Custom data types.
  ```go
  type Person struct {
      Name string
      Age  int
  }

  p := Person{Name: "Alice", Age: 25}
  fmt.Println(p.Name) // Access field
  ```

## 7. Pointers
- Go supports pointers for direct memory access.
  ```go
  x := 10
  p := &x // Pointer to x
  *p = 20 // Modify x via pointer
  fmt.Println(x) // Outputs: 20
  ```

## 8. Error Handling
- Errors are values, not exceptions.
  ```go
  result, err := divide(10, 0)
  if err != nil {
      fmt.Println("Error:", err)
  } else {
      fmt.Println("Result:", result)
  }
  ```

## 9. Concurrency
- **Goroutines**: Lightweight threads.
  ```go
  go func() {
      fmt.Println("Running in goroutine")
  }()
  ```
- **Channels**: Synchronize and communicate between goroutines.
  ```go
  ch := make(chan string)
  go func() {
      ch <- "Hello"
  }()
  msg := <-ch
  fmt.Println(msg)
  ```

## 10. Packages and Imports
- Organize code with packages.
  ```go
  package mypackage
  import "fmt"
  ```
- Use external packages:
  ```go
  import "github.com/some/package"
  ```
- Standard library packages: `fmt`, `net/http`, `os`, `time`, etc.

## 11. Basic Tools
- `go run`: Run a Go file.
- `go build`: Compile to an executable.
- `go fmt`: Format code consistently.
- `go test`: Run tests.
- `go get`: Fetch external dependencies.

## 12. Best Practices
- **Keep it Simple**: Avoid overcomplicating code.
- **Explicit Error Handling**: Always check errors.
- **Use `go fmt`**: Maintain consistent formatting.
- **Leverage Concurrency**: Use goroutines for parallel tasks.
- **Modularize**: Organize code into packages for reusability.
- **Test Regularly**: Write tests using the `testing` package.

## Example: Simple Web Server
```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Welcome to Go!")
    })
    http.ListenAndServe(":8080", nil)
}
```
Run with `go run server.go` and visit `http://localhost:8080`.

## Conclusion
Go’s simplicity, performance, and concurrency features make it ideal for modern systems programming. Start with small programs, explore the standard library, and experiment with goroutines to understand Go’s power. For further learning, check the official [Go Tour](https://tour.golang.org/) or [Go documentation](https://golang.org/doc/).