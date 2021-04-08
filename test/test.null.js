describe("The JSONPath function", () => {
    it("allows the search to scan entries with a null value", () => {
        expect(
            jsonpath({
                json: {content: null}, path: "$..[?(@ && @.value)]", wrap: false
            })
        ).to.equal(undefined);
    });
});
