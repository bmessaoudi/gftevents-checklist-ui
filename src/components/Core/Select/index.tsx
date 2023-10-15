import { Control, Controller } from 'react-hook-form';
import cn from 'classnames';

export interface SelectProps {
    control: Control<any>;
    name: string;
    options: string[];
    required?: boolean;
    className?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
}

export default function Select({ control, name, options, required = false, className, label, error, disabled = false }: SelectProps) {
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
                    <select className={cn('select select-bordered w-full max-w-xs', { 'select-error': error })} onChange={onChange} disabled={disabled}>
                        <option disabled selected>
                            Seleziona un pack
                        </option>
                        {options.map(op => (
                            <option key={op}>{op}</option>
                        ))}
                    </select>
                    <label className='label'>
                        <span className='label-text-alt text-error'>{error}</span>
                    </label>
                </div>
            )}
        />
    );
}
