import withRouting from '@/utils/routing';

function HomePage() {
    return <div>HOME</div>;
}

export default withRouting(HomePage, {
    authenticated: 'auth',
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...locale,
    },
});
