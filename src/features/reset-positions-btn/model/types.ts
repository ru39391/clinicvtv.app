export interface IResetPositionsBtn<T> {
  fetchItems: (data: T | null) => Promise<void>;
  isLoading: boolean;
}
