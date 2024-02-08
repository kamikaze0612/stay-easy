export function useLocalStorage() {
  function setValue(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function getValue(key: string) {
    const value = localStorage.getItem(key);
    return value;
  }

  return { setValue, getValue };
}
