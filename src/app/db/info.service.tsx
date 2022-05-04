import { Info } from "../model/Info";
import youtube from '../../assets/images/icon/youtube.png';
import github from '../../assets/images/icon/github.png';
// import "../../assets/images/icon"

export function getInfoList() {
  let infoList: Info[] = [
    new Info(
      "Main Youtube Channel",
      "My youtube channel where I cover programming, Age of Empires 2 modding tutorials, playing games and other fun skits",
      "Subscribe to not miss any of my interesting videos!",
      youtube,
      "https://www.youtube.com/channel/UCeClBZG-LQWVmxb0rGo2Qbw"
    ),
    new Info(
      "GitHub Page",
      "My github page containing all of my past and current works relating to aoe 2 modding and personal projects",
      "Follow me to be notified about my upcoming and current works!",
      'https://image-control-storage.s3.amazonaws.com/github-512.png',
      "https://github.com/duyhung2h"
    ),
  ];
  return infoList;
}
