import { FC, ReactElement } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@utils/cn';

const iconStyles = cva('focus:ring-4 p-2.5', {
	variants: {
		intent: {
			primary:
				'text-white bg-primary cursor-pointer hover:bg-primary-hover focus:ring-primary-faded rounded-full dark:border-blue-500 dark:text-blue-500 dark:focus:ring-primary-hover dark:hover:bg-primary-hover',
			secondary:
				'text-gray-400 cursor-pointer bg-transparent border border-gray-400 hover:bg-gray-600 hover:text-white rounded-full focus:text-white focus:ring-white focus:bg-gray-600 dark:border-gray-500 dark:text-gray-500 dark:focus:ring-white-800 dark:hover:bg-gray-500',
			outlined:
				'text-blue-800 cursor-pointer bg-transparent border border-primary hover:text-white hover:bg-primary-hover rounded-full focus:text-white focus:ring-primary-faded focus:bg-primary dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800 dark:hover:bg-blue-500',
		},
		disabled: {
			true: 'cursor-not-allowed',
		},
	},
	defaultVariants: {
		intent: 'primary',
	},
});

interface Props extends VariantProps<typeof iconStyles> {
	Icon: ReactElement | string;
	className?: string;
	disabled?: boolean;
	onClick?:
		| (() => void)
		| ((e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void);
	onBlur?: () => void;
	type?: 'button' | 'submit' | 'reset';
	iconClassName?: string;
}

const IconButton: FC<Props> = ({
	intent,
	disabled,
	Icon,
	className,
	onClick,
	onBlur,
	type = 'button',
	iconClassName,
}) => {
	const generatedClassName = iconStyles({ intent, disabled });
	const finalClassName = cn(generatedClassName, className);

	return (
		<>
			{Icon && typeof Icon === 'string' ? (
				<div onClick={onClick} className={finalClassName}>
					<img src={Icon} alt='icon' className={iconClassName} />
				</div>
			) : (
				<button
					type={type}
					className={`${finalClassName}`}
					onClick={onClick}
					onBlur={onBlur}
					disabled={disabled}
				>
					{Icon}
				</button>
			)}
		</>
	);
};

export default IconButton;
