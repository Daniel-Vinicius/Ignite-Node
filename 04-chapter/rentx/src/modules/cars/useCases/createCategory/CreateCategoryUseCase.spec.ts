describe("Create category", () => {
  it("sum 2 numbers", async () => {
    const sum = 2 + 2;
    const result = 4;

    expect(sum).toBe(result);
  });

  it("not sum 2 numbers", async () => {
    const sum = 2 + 2;
    const result = 5;

    expect(sum).not.toBe(result);
  });
});
