interface Action<T> {
  type: string;
  value: T;
  error?: boolean;
  meta?: any;
}

export default Action;
