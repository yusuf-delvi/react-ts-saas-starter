import React, { Dispatch, SetStateAction } from 'react';
import LogoutIcon from '../../assets/Icons/LogoutIcon.svg';
import SettingsIcon from '../../assets/Icons/SettingsIcon.svg';
import { useDispatch } from 'react-redux';
import { updateIsSettingsOpen } from '../settings/settingsSlice';
import { resetSettingsStep } from '../settings/accountFormSlice';

interface AccountActionsProps {
  setSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AccountActions: React.FC<AccountActionsProps> = ({
  setSettingsModalOpen,
}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  return (
    <div className=' z-10 inline-block w-52 py-[6px]  transition-opacity duration-300  bg-primary rounded-lg shadow-sm '>
      <div className=''>
        <div
          className=' cursor-pointer p-5 flex items-center gap-3  hover:bg-blue-600'
          onClick={() => {
            setSettingsModalOpen((prev) => !prev);
            dispatch(resetSettingsStep());
            dispatch(updateIsSettingsOpen({ isSettingsOpen: true }));
          }}
        >
          <img src={SettingsIcon} alt='settings-icon' className='w-5 h-5 ' />
          <h1 className=' text-text-icon-secondary'>Settings</h1>
        </div>
        <div
          className=' cursor-pointer p-5 flex items-center gap-3 hover:bg-blue-600'
          onClick={handleLogout}
        >
          <img src={LogoutIcon} alt='logout-icon' className='w-5 h-5 ' />
          <h1 className=' text-text-icon-secondary'>Log Out</h1>
        </div>
      </div>
      <div
        data-popper-arrow
        className=' bg-primary absolute -bottom-[3px] right-[13px]'
      ></div>
    </div>
  );
};
export default AccountActions;
