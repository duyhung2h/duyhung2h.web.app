import { Article } from "../model/Article";

export function sortList(
  sortName: string,
  asc: string = "asc",
  tag: string = "all",
  list: Article[]
) {
  try {
    if (tag !== "all") {
      const backupList: Article[] = Object.assign([], list);
      list = []
      backupList.forEach((item: Article, index) => {
        try{
          console.log(item.articleTag);
          if (item.articleTag[0] == tag) {
            list.push(item)
          }
        }catch{}
      });
    }
    if (asc === "asc") {
      list?.sort((a: any, b: any) => (a[sortName] > b[sortName] ? 1 : -1));
    } else {
      list?.sort((a: any, b: any) => (a[sortName] > b[sortName] ? -1 : 1));
    }
  } catch (error) {
    console.log(error);
    console.log("list is empty to sort!");
  }
  return list;
}
