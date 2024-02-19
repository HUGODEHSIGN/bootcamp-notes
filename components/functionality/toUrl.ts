export default function toUrl(title: string) {
  return title
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+$/g, "")
    .replace(/\s+/g, "-");
}
