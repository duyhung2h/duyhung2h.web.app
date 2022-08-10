import discord from '../../assets/images/icon/discord.png';
import github from '../../assets/images/icon/github.png';
import reddit from '../../assets/images/icon/reddit.png';
import twitter from '../../assets/images/icon/twitter.png';
import youtube from '../../assets/images/icon/youtube.png';
import { Info } from "../model/Info";

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
      github,
      "https://github.com/duyhung2h"
    ),
    new Info(
      "AoE2ScenarioDeisgning Subreddit",
      "Subreddit for all AoE2 scenario designers, you can showcase your aoe 2 modding works or ask any kind of question here relating to aoe 2 modding.",
      "Join now to get in touch with professional aoe 2 designers!",
      reddit,
      "https://www.reddit.com/r/AoE2ScenarioDesigning/"
    ),
    new Info(
      "Personal Twitter",
      "My personal Twitter page, also served as a place where I announce my upcoming plans for the Youtube channel (Youtube wouldn't allow me to use the 'community' feature untill my channel is big enough) ",
      "Follow me to be entertained by my tweets, and be notified about my upcoming and current youtube video/stream!",
      twitter,
      "https://twitter.com/duyhung2h"
    ),
    new Info(
      "Discord Server",
      "A fun place where I show my behind-the-scene works and interract with peoples!",
      "Join to have fun with the community!",
      discord,
      "https://discord.gg/PJycgDkg7x"
    ),
  ];
  return infoList;
}
