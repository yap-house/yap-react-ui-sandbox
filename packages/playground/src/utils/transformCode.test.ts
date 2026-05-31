import { transformCode } from "./transformCode";

describe("transformCode", () => {
  describe("successful transformation", () => {
    it("transforms JSX to React.createElement calls", () => {
      const input: string = "<div>Hello</div>";
      const result: string = transformCode(input);
      expect(result).toContain("React.createElement");
    });

    it("strips TypeScript type annotations", () => {
      const input: string =
        "function greet(name: string): string { return name; }";
      const result: string = transformCode(input);
      expect(result).not.toContain(": string");
      expect(result).toContain("function greet");
    });

    it("transforms a render() call with JSX (noInline pattern)", () => {
      const input: string = "render(<div>Hello</div>);";
      const result: string = transformCode(input);
      expect(result).toContain("render(");
      expect(result).toContain("React.createElement");
    });

    it("returns an empty string for empty input", () => {
      const result: string = transformCode("");
      expect(result).toBe("");
    });
  });

  describe("when transformation fails", () => {
    it("returns the original code on syntax error instead of throwing", () => {
      const input: string = "<div unclosed";
      const result: string = transformCode(input);
      expect(result).toBe(input);
    });

    it("does not throw on invalid syntax", () => {
      expect(() => transformCode("const =")).not.toThrow();
    });
  });
});
