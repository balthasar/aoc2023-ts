export default (inputFilePath: string) => {
  return inputFilePath.split('\n').filter((item) => item);
};
