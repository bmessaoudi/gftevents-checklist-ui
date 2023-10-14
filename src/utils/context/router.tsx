import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useGetStatus } from '@/api/authentication';
import { useGetUserMy } from '@/api/user';

import SplashScreen from '@/components/layouts/SplashScreen';

import Routes from '@/utils/constants/routes';
import { PageOptions } from '@/utils/routing';
import { useGlobalContext } from '.';

export interface RouterProps {
    children: any;
}

function clearUrlParam(path: string) {
    if (!path || !path.startsWith('/')) return '';
    const index = path.indexOf('?');

    if (index > -1) {
        return path.slice(0, index);
    }

    return path;
}

export default function Router({ children }: RouterProps) {
    useGetStatus();
    const { authenticated, logout } = useGlobalContext();
    const { user } = useGetUserMy(!!authenticated);

    const [hasLoaded, setHasLoaded] = useState(false);

    const [hasAccessToPage, setHasAccessToPage] = useState<boolean | null>(null);

    const router = useRouter();
    const pageOptions: PageOptions = children?.type;

    const redirectURI = clearUrlParam(router.query.url as string);
    const isLoggingOut = logout;

    const isLoading = !router.isReady || authenticated === null || (authenticated === true && user === undefined);

    useEffect(() => {
        if (pageOptions.authenticated === 'any' || !pageOptions.authenticated) {
            return setHasAccessToPage(true);
        }

        if (pageOptions.authenticated === 'no-auth' && !authenticated) {
            return setHasAccessToPage(true);
        }

        return setHasAccessToPage(false);
    }, [pageOptions, authenticated, user]);

    function loadPage() {
        setHasLoaded(true);
    }

    useEffect(() => {
        if (hasAccessToPage === null) return;
        if (isLoggingOut) return;

        // Function to redirect the user to the page he was trying to access
        if (authenticated && redirectURI) {
            void router.replace(redirectURI).then(loadPage);

            return;
        }

        if (!hasAccessToPage) {
            if (authenticated) {
                void router.replace(Routes.Home()).then(loadPage);
            } else {
                void router.replace(`${Routes.Login()}?url=${router.asPath}`).then(loadPage);
            }

            return;
        }

        setHasLoaded(true);
    }, [hasAccessToPage, authenticated, isLoggingOut, redirectURI, router]);

    if (!hasAccessToPage || !hasLoaded) {
        return <SplashScreen />;
    }

    return children;
}
