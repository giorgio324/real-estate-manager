export const base64ToFile = (
  base64String: string,
  newFileName: string
): File | undefined => {
  if (!base64String || !newFileName) return;
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const fileExtension = mime?.split('/')[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], `${newFileName}.${fileExtension}`, { type: mime });
};
