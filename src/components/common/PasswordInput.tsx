import { VariantProps, cva } from 'class-variance-authority';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { cn } from '@utils/cn';

const passwordInputStyles = cva('', {
	variants: {
		intent: {
			primary:
				'w-full h-12 pl-4 text-text-icon py-6 pr-11 text-base border border-gray-300 rounded-lg focus:ring-primary focus:border-blue-500 placeholder:text-text-icon placeholder:text-opacity-40',
		},
	},
	defaultVariants: {
		intent: 'primary',
	},
});

interface Props extends VariantProps<typeof passwordInputStyles> {
	id?: string;
	value?: string;
	name?: string;
	labelText?: string;
	placeholderText?: string;
	className?: string;
	disabled?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	togglePasswordVisibility?: () => void;
	register?: (
		name: string,
		options?: { onChange?: (e: ChangeEvent<HTMLInputElement>) => void }
	) => { onChange: (e: ChangeEvent<HTMLInputElement>) => void };
}

const PasswordInput: React.FC<Props> = ({
	id,
	value,
	name,
	labelText,
	placeholderText,
	className,
	disabled,
	onChange,
	register,
	intent,
}) => {
	const generatedClassName = passwordInputStyles({ intent });
	const [showPassword, setShowPassword] = useState(false);
	const finalClassName = cn(generatedClassName, className);
	return (
		<div>
			<div className=' mb-1'>
				<label
					htmlFor='password'
					className=' text-sm font-normal text-gray-900 '
				>
					{labelText}
				</label>
			</div>
			<div className='relative'>
				<input
					type={showPassword ? 'text' : 'password'}
					id={id}
					value={value}
					{...(register && name
						? register(name, {
								onChange: (e: ChangeEvent<HTMLInputElement>) => {
									if (onChange) {
										onChange(e);
									}
								},
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: {})}
					className={finalClassName}
					placeholder={!showPassword ? '•••••••••' : placeholderText}
					disabled={disabled}
				/>
				<div className='absolute inset-y-0 right-0 flex items-center mr-1.5'>
					<button
						type='button'
						className='flex items-center justify-center w-10 h-10 text-gray-400 rounded-md focus:outline-none '
						onClick={() => setShowPassword(!showPassword)}
						disabled={disabled}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6'
						>
							{showPassword ? (
								<>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-6 h-6 text-gray-900'
									>
										<path d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
										<path d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
									</svg>
								</>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6 text-gray-900'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
									/>
								</svg>
							)}
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default PasswordInput;
