package helloworld

const spanish = "Spanish"
const french = "French"
const englishHelloPrefix = "Hello, "
const spanishHelloPrefix = "Hola, "
const frenchHelloPrefix = "Bonjour, "

func Hello(name string, language string) string {
    // if name == "" {
    //     name = "World"
    // }

    switch language {
    case spanish:
        return spanishHelloPrefix + name
    case french:
        return frenchHelloPrefix + name
    default:
        return englishHelloPrefix + name
    }
}