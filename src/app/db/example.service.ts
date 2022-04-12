

function getExampleList() {
    let exampleList = [];
    for (let i = 0; i < 10; i++) {
    exampleList.unshift({
        exampleId: i,
        exampleTitle: "Example #" + i,
        exampleShortDesc:
        "description: Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.",
    });
    }
    return exampleList
}

export default getExampleList