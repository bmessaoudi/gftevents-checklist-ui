import { useRouter } from 'next/router';

import Routes from '@/utils/constants/routes';
import withRouting from '@/utils/routing';

function Home() {
    const router = useRouter();

    return (
        <div className='flex flex-col md:!flex-row flex-grow'>
            <div className='flex flex-col flex-1 justify-center items-center'>
                <div className='my-16 md:my-32 md:fill center'>LOGO</div>
                <button className='btn' onClick={() => router.push(Routes.Signup())}>
                    Registrati
                </button>
                <button className='btn' onClick={() => router.push(Routes.Login())}>
                    Login
                </button>
            </div>
            <style jsx>{`
                :global(#__next),
                :global(body),
                :global(html) {
                    height: 100% !important;
                    max-height: 100% !important;
                }
            `}</style>
        </div>
    );
}

export default withRouting(Home, {
    authenticated: 'no-auth',
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...locale,
    },
});
