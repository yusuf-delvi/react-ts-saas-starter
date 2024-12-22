import React, { useEffect, useRef, useState } from 'react';
import ActivePerson from '../../assets/Icons/ActivePerson.svg';
import axios from 'axios';
import UploadIcon from '../../assets/Icons/UploadIcon.svg';
import IconButton from './IconButton';
import { useUploadQuery } from '@/api/uploadApiSlice';
import { useUpdateProjectProfilePicMutation } from '@/api/projectApiSlics';
import { ProjectDataTypes } from '@/features/ProjectDetail/ProjectDetail';
import { cn } from '@/utils/cn';
interface Props {
  projectId: string;
  onClick?: () => void;
  imageUrl?: string;
  setProjectDataState?: any;
}
interface QueryParams {
  name?: string;
  type?: string;
  extension?: string;
}

const UploadCard: React.FC<Props> = ({
  projectId,
  imageUrl,
  setProjectDataState,
}) => {
  const [queryArgs, setQueryArgs] = useState<QueryParams>({});
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedURL, setUploadedURL] = useState<string>('');
  const { data: url } = useUploadQuery(queryArgs, { skip: !uploadedImage });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProjectProfilePic, { data, isSuccess }] =
    useUpdateProjectProfilePicMutation();

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setQueryArgs({
        name: file.name,
        extension: file.name.split('.').pop() || '',
      });
    }
  };

  const uploadFile = async (file: File, presignedUrl: string) => {
    try {
      await axios.put(presignedUrl, file).then((response) => {
        if (response.status == 200) {
          setUploadedURL(presignedUrl.split('?')[0]);
          updateProjectProfilePic({
            projectId: projectId,
            imageUrl: presignedUrl.split('?')[0],
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!uploadedImage || !url) return;
    const presignedUrl = url.data.presignedUrl;
    uploadFile(uploadedImage, presignedUrl);
  }, [uploadedImage, url]);

  useEffect(() => {
    if (data && isSuccess) {
      setProjectDataState((prevState: ProjectDataTypes) => {
        return {
          ...prevState,
          imageUrl: uploadedURL,
        };
      });
    }
  }, [data]);

  return (
    <div className=' w-full relative   border border-text-icon border-opacity-[15%] rounded-lg bg-neutral-illustration-bg flex flex-col justify-between  '>
      <div className='  absolute right-2 z-20 '>
        <input
          type='file'
          onChange={handleImageUpload}
          ref={fileInputRef}
          accept='.jpeg, .jpg, .png'
          className='hidden'
        />
        <IconButton
          Icon={<img src={UploadIcon} alt='active person' />}
          className=' bg-primary-light focus:ring-0 m-2 hover:scale-105 transform transition-all ease-in-out'
          onClick={triggerFileInput}
        />
      </div>
      <div
        className={cn(
          'w-full min-h-[258px] mobile:max-h-[196px] tablet:max-h-[280px] flex justify-center mobile:min-h-fit'
        )}
      >
        <img
          src={imageUrl ? imageUrl : ActivePerson}
          alt='active person'
          className={`${
            imageUrl
              ? 'rounded-lg w-full mobile:max-h-[196px] tablet:max-h-[280px] laptop:h-full laptop:absolute laptop:top-0 desktop:h-full desktop:absolute desktop:top-0  object-cover'
              : 'w-[292px] h-[196px] laptop:absolute laptop:bottom-0 desktop:absolute desktop:bottom-0'
          }`}
        />
      </div>
    </div>
  );
};

export default UploadCard;
