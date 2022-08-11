import { message } from "antd";
export const displayAlertInfoPopup = (messageString: string) => {
  message.info(messageString, 6);
};
export const displayAlertErrorPopup = (messageString: string) => {
  message.error(messageString, 10);
};
export const displayAlertSuccessPopup = (messageString: string) => {
  message.success(messageString, 6);
};
