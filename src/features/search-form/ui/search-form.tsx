import { SearchIcon } from "@/shared/icons";
import { useSearchForm } from "../hooks/use-search-form";
import { type TSearchForm } from "../model/types";
import styles from './search-form.module.css';

const SearchForm = <T extends { id: number }>({
  fetchItems,
  queryKey
}: TSearchForm<T>) => {
  const { handleChange, searchValue } = useSearchForm({ fetchItems, queryKey });

  return (
    <form className={styles.form}>
      <button className={styles.form__button} type="button"><SearchIcon /></button>
      <input
        className={styles.form__field}
        value={searchValue}
        onChange={handleChange}
        placeholder="Найти"
        type="text"
      />
    </form>
  )
};

export default SearchForm;
