import { useRouter } from 'next/router';
import '../styles/globals.css';
import GlobalContext, { GlobalContextState, GlobalContextStateOptional, initialGlobalContextState } from '@/utils/context';
import { useEffect, useState } from 'react';
import { SWRConfig, mutate } from 'swr';
import { useGetUserMy } from '@/api/user';
import { fetcher } from '@/utils';
import Router from '@/utils/context/router';
import SplashScreen from '@/components/layouts/SplashScreen';

function App({ Component, pageProps }: { Component: any; pageProps: any }) {
    const [globalContext, setGlobalContext] = useState<GlobalContextState>({ ...initialGlobalContextState });

    const { user } = useGetUserMy(!!globalContext.authenticated);

    function updateGlobalContext(newState: GlobalContextStateOptional) {
        setGlobalContext(oldState => ({ ...oldState, ...newState }));
    }

    useEffect(() => {
        if (!globalContext.authenticated) {
            void mutate('/user/my', undefined, true);
        }
    }, [globalContext.authenticated]);

    useEffect(() => {
        if (user) {
            updateGlobalContext(user);
        }
    }, [user]);

    const { locale } = useRouter();

    return (
        <GlobalContext.Provider value={{ ...globalContext, updateGlobalContext }}>
            <SWRConfig value={{ fetcher }}>
                <Layout>
                    {globalContext.authenticated === null && <SplashScreen />}
                    {globalContext.authenticated !== null && (
                        <Router>
                            <Component {...pageProps} />
                        </Router>
                    )}
                </Layout>
            </SWRConfig>
        </GlobalContext.Provider>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export default App;
