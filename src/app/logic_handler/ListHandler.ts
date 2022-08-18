import { Article } from "../model/Article";

export function sortList(
  sortName: string,
  asc: string = "asc",
  tag: string = "all",
  list: Article[]
) {
  try {
    console.log(tag);
    console.log(asc);
    sortName = sortName;
    console.log(sortName);

    // filter by tag
    if (tag !== "all") {
      const backupList: Article[] = Object.assign([], list);
      list = [];
      backupList.forEach((item: Article, index) => {
        try {
          // console.log(item.articleTag);
          console.log(item[sortName]);
          if (item.articleTag[0] == tag) {
            list.push(item);
          }
        } catch {}
      });
    }
    // filter by name, other attributes, etc...
    console.log(list);

    if (asc == "asc") {
      list?.sort((a: Article, b: Article) =>
        a[sortName] < b[sortName] ? -1 : a[sortName] > b[sortName] ? 1 : 0
      );
    } else {
      list?.sort((a: Article, b: Article) =>
        a[sortName] < b[sortName] ? 1 : a[sortName] > b[sortName] ? -1 : 0
      );
    }
    console.log(list);
    return list;
  } catch (error) {
    console.log(error);
    console.log("list is empty to sort!");
    return list;
  }
}
