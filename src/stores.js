import { useLocalObservable } from "mobx-react";
import { createContext, useContext } from "react";

const StoreContext = createContext(null);
const storeValues = () => {
  return {
    isLogged: false,
    number: 1,
    secret: 'myBarear',
    setNumberIncrement (){ (this.number = this.number + 1)}
  };
};

export const Store = function ({ children }) {
  const store = useLocalObservable(storeValues);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
