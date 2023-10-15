import Input from '@/components/Core/Input';
import withRouting from '@/utils/routing';
import { LoginSchema } from '@/utils/validators/auth.validator';
import { useForm } from 'react-hook-form';

function LoginPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>();

    const onSubmit = async (values: LoginSchema) => {
        console.log(values);
    };

    return (
        <div className='flex-grow'>
            <div className='flex flex-col flex-1 justify-center items-center py-16'>
                <Input control={control} name='email' required label='Email' error={errors.email?.message} />
                <Input control={control} name='password' required label='Password' error={errors.password?.message} />

                <button className='btn w-full max-w-xs mt-5' type='submit' onClick={handleSubmit(onSubmit)}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default withRouting(LoginPage, {
    authenticated: 'no-auth',
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...locale,
    },
});
