// A client that adds an SVG to this folder registers it here.
import arrowLeft from "./arrow-left.svg?raw";
import arrowRight from "./arrow-right.svg?raw";
import check from "./check.svg?raw";
import clock from "./clock.svg?raw";
import close from "./close.svg?raw";
import link from "./link.svg?raw";
import mail from "./mail.svg?raw";
import mapPin from "./map-pin.svg?raw";
import menu from "./menu.svg?raw";
import message from "./message.svg?raw";
import phone from "./phone.svg?raw";
import play from "./play.svg?raw";
import shield from "./shield.svg?raw";
import star from "./star.svg?raw";
import whatsapp from "./whatsapp.svg?raw";

export const icons = {
  "arrow-left": arrowLeft,
  "arrow-right": arrowRight,
  check,
  clock,
  close,
  link,
  mail,
  "map-pin": mapPin,
  menu,
  message,
  phone,
  play,
  shield,
  star,
  whatsapp,
} satisfies Record<string, string>;

export type IconName = keyof typeof icons;
