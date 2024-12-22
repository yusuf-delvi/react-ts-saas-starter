import {
  FC,
  ReactElement,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  MouseEvent,
  ChangeEvent,
  KeyboardEventHandler,
} from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const inputStyles = cva('w-full pl-12 pr-10', {
  variants: {
    intent: {
      normal:
        'bg-white border border-gray-200 text-gray-800 placeholder:text-gray-300 focus:placeholder-gray-400 placeholder:text-base text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
      success:
        'bg-green-50 border border-green-500 text-green-800 placeholder:text-base placeholder-green-700  text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block dark:placeholder-green-500 dark:text-green-400  dark:bg-gray-700 dark:border-green-500',
      failure:
        'bg-red-50 border border-red-500 text-red-800 placeholder:text-base placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block dark:text-red-500 dark:bg-gray-700 dark:placeholder-red-500 dark:border-red-50',
    },

    disabled: {
      true: 'cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'normal',
  },
});

interface Props extends VariantProps<typeof inputStyles> {
  type?: string;
  labelText: string;
  id?: string;
  className?: string;
  boxWidth?: string;
  placeholderText?: string;
  disabled?: boolean;
  icon?: ReactElement;
  onFocus?: () => void;
  onBlur?: () => void;
  clearButtonIcon?: ReactElement;
  onClickOfClearButton?: () => void;
  value?: string;
  inputValue?: string;
  setInputValue?: Dispatch<SetStateAction<string>>;
  paragraphText?: ReactElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClearFun?: () => void;
  name?: string;
  register?: any;
}

const Input: FC<Props> = ({
  type = 'text',
  labelText,
  id = 'input-id',
  className = '',
  boxWidth = 'w-1/2',
  placeholderText,
  intent = 'normal',
  disabled,
  icon,
  onFocus,
  onBlur,
  clearButtonIcon,
  onClickOfClearButton,
  value,
  setInputValue,
  paragraphText,
  onChange,
  onKeyDown,
  onClearFun,
  name,
  register,
}) => {
  const generatedClassName = inputStyles({ intent, disabled });

  if (!icon && !clearButtonIcon) {
    className = `${className} px-4 py-3`;
  } else if (!icon) {
    className = `${className} pl-2.5 py-3`;
  } else if (!clearButtonIcon) {
    className = `${className} pr-2.5 py-3`;
  }
  const finalClassName = cn(generatedClassName, className);
  let paragraphJsx = null;
  const intentStyles = {
    normal: {
      textClass: 'text-gray-500 dark:text-gray-300',
    },
    success: {
      textClass: 'text-green-600 dark:text-green-500',
    },
    failure: {
      textClass: 'text-red-600 dark:text-red-500',
    },
  };

  const intentStyle = intentStyles[intent!] || intentStyles.normal;

  paragraphJsx = (
    <div className={`mt-2 text-sm text ${intentStyle.textClass}`}>
      {paragraphText}
    </div>
  );

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (setInputValue) {
      setInputValue('');
    } else if (onClearFun) {
      onClearFun();
    }
  };

  return (
    <>
      {labelText && (
        <label
          htmlFor={id}
          className='block mb-[6px] text-sm font-normal text-gray-900 dark:text-white'
        >
          {labelText}
        </label>
      )}
      <div className={` w-full inline-block relative mb-0 ${boxWidth} `}>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
          {icon}
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange || ((e) => setInputValue?.(e.target.value))}
          {...(register && name
            ? register(name, {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  if (onChange) {
                    onChange(e);
                  }
                  if (setInputValue) {
                    setInputValue(e.target.value);
                  }
                },
              })
            : {})}
          onKeyDown={onKeyDown}
          className={finalClassName}
          placeholder={placeholderText}
          disabled={disabled}
          name={name || id}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {clearButtonIcon && (
          <button
            className='absolute focus:outline-none focus:font-bold inset-y-0 right-0 flex items-center pl-3.5 mr-5'
            onClick={onClickOfClearButton || handleClear}
            disabled={disabled}
          >
            {clearButtonIcon}
          </button>
        )}
      </div>
      {paragraphJsx}
    </>
  );
};

export default Input;
