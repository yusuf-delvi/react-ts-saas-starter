import Button from '../elements/Button';
import NotFoundIcon from '../../assets/Icons/NotFoundIcon.svg';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex justify-between items-center px-[90px] py-[192px] mobile:justify-normal tablet:justify-normal '>
      <div className=' w-1/2 mobile:w-full tablet:w-full pr-8 '>
        <h1 className=' text-primary font-semibold mb-6'>404</h1>
        <h1 className=' text-[42px] font-bold  leading-[54.6px] mb-9 mobile:text-3xl'>
          Whoops! This is not what you were looking for
        </h1>
        <h1 className=' text-xl mb-9 text-gray-600 w-[80%] '>
          But you just found the page we had lost, thanks. Try your luck by
          going back
        </h1>
        <Button text='Back to Home' onClick={() => navigate('/')} />
      </div>
      <div className=' w-1/2 mobile:hidden tablet:hidden'>
        <img src={NotFoundIcon} alt='NotFoundIcon' />
      </div>
    </div>
  );
};

export default NotFound;
