import withRouting from '@/utils/routing';

function SignupPage() {
    return <div>SIGNUP</div>;
}

export default withRouting(SignupPage, {
    authenticated: 'no-auth',
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...locale,
    },
});
