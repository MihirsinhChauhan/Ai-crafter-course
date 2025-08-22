package helloworld

import "testing"

func TestHello(t *testing.T) {
    got := Hello("Chris", "Spanish")
    want := "Hello, Chris"

    if got != want {
        t.Errorf("got %q want %q", got, want)
    }
}