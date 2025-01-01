import React from 'react';
import Button from '@components/common/Button';

const checkSvg = (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect
			x='0.015625'
			y='0.983887'
			width='15.0136'
			height='15.0136'
			rx='7.50679'
			fill='white'
		/>
		<g clip-path='url(#clip0_3630_85957)'>
			<path
				d='M6.58952 11.963C6.46088 11.9636 6.33715 11.9032 6.24478 11.7946L3.91828 9.05806C3.87191 9.00318 3.83491 8.93777 3.80939 8.86556C3.78388 8.79335 3.77034 8.71575 3.76957 8.6372C3.768 8.47856 3.81848 8.32566 3.90991 8.21214C4.00134 8.09861 4.12623 8.03377 4.2571 8.03187C4.38797 8.02996 4.51411 8.09116 4.60776 8.20199L6.59149 10.5344L10.8131 5.56453C10.9069 5.4537 11.0331 5.39256 11.1641 5.39458C11.295 5.39659 11.42 5.46159 11.5114 5.57527C11.6029 5.68895 11.6533 5.842 11.6516 6.00076C11.65 6.15951 11.5963 6.31096 11.5026 6.42179L6.93426 11.7946C6.8419 11.9032 6.71816 11.9636 6.58952 11.963Z'
				fill='#201E21'
			/>
		</g>
		<defs>
			<clipPath id='clip0_3630_85957'>
				<rect
					width='7.88213'
					height='7.88213'
					fill='white'
					transform='translate(3.76953 4.73779)'
				/>
			</clipPath>
		</defs>
	</svg>
);

const unCheckSvg = (
	<svg
		width='16'
		height='16'
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect
			x='0.253906'
			y='0.710449'
			width='15.0136'
			height='15.0136'
			rx='7.50679'
			fill='#201E21'
		/>
		<g clip-path='url(#clip0_3630_85931)'>
			<path
				d='M6.8278 11.6895C6.69916 11.6901 6.57543 11.6297 6.48306 11.5212L4.15656 8.78462C4.11019 8.72974 4.07319 8.66433 4.04768 8.59212C4.02216 8.51991 4.00863 8.44231 4.00785 8.36376C4.00628 8.20512 4.05676 8.05222 4.14819 7.9387C4.23962 7.82518 4.36451 7.76033 4.49538 7.75843C4.62626 7.75652 4.75239 7.81772 4.84604 7.92855L6.82977 10.261L11.0514 5.29109C11.1451 5.18026 11.2714 5.11913 11.4024 5.12114C11.5333 5.12316 11.6583 5.18815 11.7497 5.30183C11.8411 5.41552 11.8916 5.56857 11.8899 5.72732C11.8882 5.88607 11.8346 6.03752 11.7408 6.14835L7.17254 11.5212C7.08018 11.6297 6.95644 11.6901 6.8278 11.6895Z'
				fill='white'
			/>
		</g>
		<defs>
			<clipPath id='clip0_3630_85931'>
				<rect
					width='7.88213'
					height='7.88213'
					fill='white'
					transform='translate(4.00781 4.46436)'
				/>
			</clipPath>
		</defs>
	</svg>
);

interface Props {
	primary?: boolean;
	price?: number;
	heading?: string;
	description?: string;
	textArray?: string[];
	buttonText?: string;
	isActivePlan?: boolean;
	onClick?: () => void;
	disabled?: boolean;
}
const PricingCardForSettings: React.FC<Props> = ({
	primary = false,
	price,
	heading,
	description,
	textArray,
	buttonText = 'Select Plan',
	isActivePlan,
	onClick,
	disabled,
}) => {
	return (
		<>
			<div
				className={`${
					primary ? 'bg-[#F0EEEE]' : 'bg-black'
				} flex flex-col justify-between p-4 w-[400px] border-[1.25px] ${
					primary ? 'border-gray-300 ' : 'border-black '
				}  shadow-xl rounded-[10.2px] overflow-hidden hover:scale-105 transition-all ease-in-out duration-500`}
			>
				<div className=' relative '>
					{!primary && (
						<div
							className={` h-[9px] ${
								primary ? 'text-black' : 'text-white'
							} mb-3`}
						>
							<h3 className=' text-xs font-medium'>Recommended</h3>
						</div>
					)}
					<div className='  h-[30px] '>
						<h2
							className={`text-xl font-semibold ${
								primary ? 'text-black' : 'text-white'
							}`}
						>
							{heading}
						</h2>
						{isActivePlan && (
							<Button
								text='Active Plan'
								className=' p-[6px] text-[8px] absolute top-0 right-0 bg-[#5BBE79] cursor-default'
								disabled
							/>
						)}
					</div>
					<div className=' '>
						<span
							className={`${
								primary ? 'text-black' : 'text-white'
							} font-medium text-[28px]`}
						>
							${price}
						</span>
						<span className=' text-gray-500 font-semibold text-base'>
							/ month
						</span>
					</div>
					<div className=' h-[66px] mt-[10px] '>
						<p
							className={`${
								primary ? 'text-black' : 'text-white'
							}  text-sm leading-6 `}
						>
							{description}
						</p>
					</div>
					<div className=''>
						<ul className='mt-6 mb-6'>
							{textArray?.map((text, index) => (
								<li
									key={index}
									className={`${
										primary ? 'text-black' : 'text-white'
									} flex mb-4 `}
								>
									{primary ? unCheckSvg : checkSvg}
									<span className=' text-sm -mt-1 ml-2.5'>{text}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className=' '>
					<Button
						disabled={disabled}
						onClick={onClick}
						text={buttonText && buttonText}
						fullWidth
						className={` h-[46px] ${primary ? 'bg-black' : 'bg-white'}  ${
							primary ? 'text-white' : 'text-black'
						} ${
							primary ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
						}  py-[11px] text-base font-semibold rounded-xl focus:ring-0`}
					/>
				</div>
			</div>
		</>
	);
};
export default PricingCardForSettings;
