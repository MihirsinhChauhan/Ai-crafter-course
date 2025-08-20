// main.go
package main

import (
    "fmt"
    "github.com/MihirsinhChauhan/go-with-test/helloworld"
    "github.com/MihirsinhChauhan/go-with-test/integers"
)

func main() {
    fmt.Println(helloworld.Hello("Alice", ""))
    sum := integers.Add(2, 3)
    fmt.Println("Sum:", sum)
}