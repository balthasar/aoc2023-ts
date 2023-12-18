declare global {
  interface String {
    replaceArray(find: string[], replace: string[]): string;
  }
}

export default String;
