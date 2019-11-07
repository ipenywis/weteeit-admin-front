export function readFileAsBase64(file: File | null): Promise<string> {
  return new Promise((rs, rj) => {
    if (!file)
      return rj(new DOMException('Invalid File to read!', 'invalidNullData'));

    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      rs(fileReader.result as string);
    });

    const errorHandler = () => {
      rj(fileReader.error);
    };

    fileReader.addEventListener('error', errorHandler);
    fileReader.addEventListener('abort', errorHandler);
    //Read File as Base64URL
    fileReader.readAsDataURL(file);
  });
}

export function base64URLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime: string = arr[0].match(/:(.*?);/)[1];
  const extension = '.' + mime.substring(mime.indexOf('/') + 1);
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  const randDate = 'FN' + Date.now();
  return new File([u8arr], filename + randDate + extension, { type: mime });
}
