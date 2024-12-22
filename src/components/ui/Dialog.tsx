import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface StyleObject {
  [key: string]: string | number | undefined;
  transform?: string;
}

interface DialogProps {
  position?: 'center' | 'left' | 'right';
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  height?: number;
  isPx?: boolean;
  hasClose?: boolean;
  customClasses?: StyleObject[];
  mobileHeight?: number;
  mobileWidth?: number;
}

const defaultStyles = {
  content: {
    backgroundColor: 'white',
    padding: '0px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    transform: undefined,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
};

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <svg
    className='w-4 h-4 text-gray-800 dark:text-white cursor-pointer'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 14 14'
    onClick={onClick}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
    />
  </svg>
);

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  width,
  height,
  hasClose,
  isPx,
  position = 'center',
  customClasses,
  mobileHeight,
  mobileWidth,
}) => {
  const [customStyles, setCustomStyles] = useState<{
    content: StyleObject;
    overlay: StyleObject;
  }>({
    content: {
      ...defaultStyles.content,
    },
    overlay: {
      ...defaultStyles.overlay,
    },
  });

  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth <= 768;
      const updatedStyles = { ...customStyles };

      if (isMobile) {
        updatedStyles.content.width = mobileWidth ? `${mobileWidth}%` : 'auto';
        updatedStyles.content.height = mobileHeight
          ? `${mobileHeight}%`
          : 'auto';
        updatedStyles.content.transform = 'translate(-50%, -50%)';
      } else {
        updatedStyles.content.width = width
          ? isPx
            ? `${width}px`
            : `${width}%`
          : 'auto';
        updatedStyles.content.height = height
          ? isPx
            ? `${height}px`
            : `${height}%`
          : 'auto';
        updatedStyles.content.transform =
          position === 'right'
            ? 'translate(-17%, -50%)'
            : position === 'left'
            ? 'translate(-100%, -40%)'
            : 'translate(-50%, -50%)';
      }

      if (customClasses && customClasses.length > 0) {
        customClasses.forEach((styleObject) => {
          updatedStyles.content = { ...updatedStyles.content, ...styleObject };
        });
      }

      setCustomStyles(updatedStyles);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [width, height, isPx, position, customClasses]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel='Dialog Modal'
    >
      {hasClose && (
        <div className='w-full flex justify-end'>
          <CloseIcon onClick={onClose} />
        </div>
      )}
      {children}
    </Modal>
  );
};

export default Dialog;
