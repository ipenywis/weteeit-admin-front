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
