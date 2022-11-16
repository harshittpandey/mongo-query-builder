export function CopyTextToClipboard(text: string): void {
  if (!navigator.clipboard) {
    console.error("Async: Could not copy text.");
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => console.log("Async: Copying to clipboard was successful!"),
    (err) => console.error("Async: Could not copy text: ", err)
  );
}
