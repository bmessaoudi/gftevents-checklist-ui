import withRouting from '@/utils/routing';

function LoginPage() {
    return <div>LOGIN</div>;
}

export default withRouting(LoginPage, {
    authenticated: 'no-auth',
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...locale,
    },
});
