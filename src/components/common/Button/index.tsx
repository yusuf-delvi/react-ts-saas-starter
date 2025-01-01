import { FC, ReactElement, MouseEvent } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonStyles = cva(
  'text-lg font-medium rounded-md px-6 py-3 focus:outline-none focus:ring-4',
  {
    variants: {
      intent: {
        primary:
          'text-white bg-primary hover:bg-primary-hover focus:ring-primary-faded dark:bg-primary dark:hover:bg-primary-hover dark:focus:ring-primary-hover',
        secondary:
          'text-white bg-secondary hover:bg-secondary-hover focus:ring-secondary-faded dark:bg-secondary dark:hover:bg-secondary-hover dark:focus:ring-gray-200',
        outlined:
          'text-primary bg-transparent border-2 border-primary hover:bg-primary-hover hover:text-white focus:ring-primary-faded',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'cursor-not-allowed bg-[#AAAAAA]',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

interface Props extends VariantProps<typeof buttonStyles> {
  text: string;
  Icon?: ReactElement | string;
  iconPosition?: 'before' | 'after';
  iconClassName?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
}

const Button: FC<Props> = ({
  text,
  intent,
  fullWidth,
  disabled,
  Icon,
  iconPosition,
  iconClassName,
  className,
  onClick,
  type = 'button',
  id,
}) => {
  const generatedClassName = buttonStyles({ intent, fullWidth, disabled });
  const finalClassName = cn(generatedClassName, className);

  const renderIcon = (position: 'before' | 'after') => {
    if (Icon && typeof Icon === 'string') {
      return (
        iconPosition === position && (
          <img src={Icon} className={iconClassName} alt='icon' />
        )
      );
    } else {
      return (
        iconPosition === position && (
          <span className='inline-block'>{Icon}</span>
        )
      );
    }
  };

  return (
    <button
      name={id}
      id={id}
      type={type}
      className={`${finalClassName} flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled}
    >
      {renderIcon('before')}
      <span
        className={`${
          iconPosition === 'before'
            ? 'ml-2'
            : `${iconPosition === 'after' && 'mr-2'}`
        }`}
      >
        {text}
      </span>
      {renderIcon('after')}
    </button>
  );
};

export default Button;
