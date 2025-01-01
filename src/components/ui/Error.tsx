import ErrorImage from '@assets/Icons/Error.svg';
import Button from '@components/common/Button';

const Error = () => {
	return (
		<div className='w-full h-screen flex justify-between items-center px-[90px] py-[192px] mobile:justify-normal tablet:justify-normal '>
			<div className=' w-1/2 mobile:w-full tablet:w-full pr-8 '>
				<h1 className=' text-primary font-semibold mb-6'>404</h1>
				<h1 className=' text-[42px] font-bold  leading-[54.6px] mb-9 mobile:text-3xl'>
					Oops! Something has went wrong here...
				</h1>
				<h1 className=' text-xl mb-9 text-gray-600 w-[80%] '>
					Brace yourself till we get the error fixed.Try your luck by going back
				</h1>
				<Button
					text='Go Back'
					onClick={() => {
						window.history.back();
						window.location.reload();
					}}
				/>
			</div>
			<div className=' w-1/2 mobile:hidden tablet:hidden'>
				<img src={ErrorImage} alt='ErrorImage' />
			</div>
		</div>
	);
};

export default Error;
