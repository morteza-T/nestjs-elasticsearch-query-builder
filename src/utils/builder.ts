export interface Builder<T> {
  build(): T | Promise<T>;
}
