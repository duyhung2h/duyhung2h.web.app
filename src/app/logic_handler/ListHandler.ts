
export function sortList(list: any[], sortName: string, asc: string = "asc") {
  if (asc == "asc") {
    list.sort((a: any, b: any) => (a[sortName] > b[sortName] ? 1 : -1));
  } else {
    list.sort((a: any, b: any) => (a[sortName] > b[sortName] ? -1 : 1));
  }
}
