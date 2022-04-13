export function limitTextLength(text: string, lengthLimit: number) {
  if (text.length > lengthLimit) {
    text = text.substring(0, lengthLimit);
    return text + "...";
  } else {
    return text;
  }
}
