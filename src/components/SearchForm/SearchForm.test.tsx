import { describe, test, expect, vi} from "vitest";
import { fireEvent, render } from "../../testUtils";
import { SearchForm } from "./SearchForm";

describe("SearchForm", () => {
  test('submits the form on change after a delay', () => {
    const mockOnSubmit = vi.fn();
    const { getByPlaceholderText } = render(
      <SearchForm onSubmit={mockOnSubmit} />
    );

    const input = getByPlaceholderText("Search a GitHub username...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Simulate the debounce delay
    setTimeout(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({ q: "test" });
    }, 2000);
  });
});