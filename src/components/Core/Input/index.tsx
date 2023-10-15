import { Control, Controller } from 'react-hook-form';
import cn from 'classnames';

export type InputType = 'email' | 'password' | 'text' | 'phone';

export interface InputProps {
    control: Control<any>;
    name: string;
    required?: boolean;
    className?: string;
    label?: string;
    error?: string;
    type?: InputType;
    disabled?: boolean;
}

export default function Input({ control, name, required = false, className, label, error, type = 'text', disabled = false }: InputProps) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({ field: { onChange } }) => (
                <div className={cn('w-full max-w-xs', className)}>
                    <label className='label'>
                        <span className='label-text'>{label}</span>
                    </label>
                    <input type={type} className={cn('input input-bordered w-full max-w-xs', { 'input-error': error })} onChange={onChange} disabled={disabled} />
                    <label className='label'>
                        <span className='label-text-alt text-error'>{error}</span>
                    </label>
                </div>
            )}
        />
    );
}
