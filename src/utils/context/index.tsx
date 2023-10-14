import { createContext, useContext } from 'react';

export type GlobalContextState = {
    authenticated: boolean | null;
    id: string;
    email: string;
    name: string;
    surname: string;
    approved: boolean | null;
    logout: boolean;
};

export type GlobalContextStateOptional = Partial<GlobalContextState>;

export interface GlobalContextStateInterface extends GlobalContextState {
    updateGlobalContext: (state: GlobalContextStateOptional) => void;
}

export const initialGlobalContextState: GlobalContextState = {
    authenticated: null,
    id: '',
    email: '',
    name: '',
    surname: '',
    logout: false,
    approved: null,
};

const GlobalContext = createContext<GlobalContextStateInterface>({
    ...initialGlobalContextState,
    updateGlobalContext: () => {
        return () => {
            /**/
        };
    },
});

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContext;
