package integers

import "testing"

func TestAdder(t *testing.T) {
    t.Run("add positive numbers", func(t *testing.T) {
        sum := Add(2, 2)
        expected := 4
        if sum != expected {
            t.Errorf("expected %d but got %d", expected, sum)
        }
    })

    t.Run("add negative numbers", func(t *testing.T) {
        sum := Add(-1, -1)
        expected := -2
        if sum != expected {
            t.Errorf("expected %d but got %d", expected, sum)
        }
    })

    t.Run("add zero", func(t *testing.T) {
        sum := Add(5, 0)
        expected := 5
        if sum != expected {
            t.Errorf("expected %d but got %d", expected, sum)
        }
    })
}