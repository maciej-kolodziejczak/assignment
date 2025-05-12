import { describe, test ,expect } from "vitest";
import { render } from "../../testUtils";
import { SearchResults } from "./SearchResults";

const items = [
  { id: 1, avatar_url: "", html_url: "", login: "Result 1" },
  { id: 2, avatar_url: "", html_url: "", login: "Result 2" },
  { id: 3, avatar_url: "", html_url: "", login: "Result 3" },
];

describe("SearchResults", () => {
  test('renders search results if any', () => {
    const { getByText } = render(<SearchResults items={items} />);
    expect(getByText("Result 1")).toBeInTheDocument();
    expect(getByText("Result 2")).toBeInTheDocument();
    expect(getByText("Result 3")).toBeInTheDocument();
  });

  test('renders no results message if no items', () => {
    const { getByText } = render(<SearchResults items={[]} />);
    expect(getByText("No results found")).toBeInTheDocument();
  });
});