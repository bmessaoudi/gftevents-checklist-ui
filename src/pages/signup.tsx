import Input from '@/components/Core/Input';
import withRouting from '@/utils/routing';
import { SignupSchema } from '@/utils/validators/auth.validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '@/components/Core/Select';

function SignupPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupSchema>({ resolver: zodResolver(SignupSchema) });

    const onSubmit = async (values: SignupSchema) => {
        console.log(values);
    };

    return (
        <div className='flex-grow'>
            <div className='flex flex-col flex-1 justify-center items-center py-16'>
                <Input control={control} name='email' required label='Email' error={errors.email?.message} />
                <Input control={control} name='name' required label='Nome' error={errors.name?.message} />
                <Input control={control} name='surname' required label='Cognome' error={errors.surname?.message} />
                <Input control={control} name='phone' required label='Numero di telefono' error={errors.phone?.message} />
                <Select control={control} name='tickets' options={['2', '5', '10']} required label='Ticket acquistati' error={errors.tickets?.message} />
                <Input control={control} name='password' required label='Password' error={errors.password?.message} />
                <Input control={control} name='confirmpassword' required label='Conferma password' error={errors.confirmpassword?.message} />

                <button className='btn w-full max-w-xs mt-5' type='submit' onClick={handleSubmit(onSubmit)}>
                    Registrati
                </button>
            </div>
        </div>
    );
}

export default withRouting(SignupPage, {
    authenticated: 'no-auth',
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...locale,
    },
});
