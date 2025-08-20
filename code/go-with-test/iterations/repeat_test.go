package iterations

import "testing"

func TestRepeat(t *testing.T) {
	got := Repeat("a", 5)
	want := "aaaaa"

	if got != want {
		t.Errorf("got %q want %q", got, want)
	}

	t.Run("repeat a string multiple times", func(t *testing.T) {
		repeated := Repeat("b", 3)
		expected := "bbb"
		if repeated != expected {
			t.Errorf("expected %q but got %q", expected, repeated)
		}
	})
}