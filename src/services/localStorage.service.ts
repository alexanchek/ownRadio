export const localStorageService = {
  getItem: () => {
    return localStorage.getItem('radio');
  },
  setItem: (name: string) => {
    return localStorage.setItem('radio', name);
  },
}