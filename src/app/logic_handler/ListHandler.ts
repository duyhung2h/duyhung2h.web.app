export function sortList(sortName: string, asc: string = "asc", list?: any[]) {
  try {
    if (asc === "asc") {
      list?.sort((a: any, b: any) => (a[sortName] > b[sortName] ? 1 : -1));
    } else {
      list?.sort((a: any, b: any) => (a[sortName] > b[sortName] ? -1 : 1));
    }
  } catch (error) {
    console.log(error);
    console.log("list is empty to sort!");
  }
}
