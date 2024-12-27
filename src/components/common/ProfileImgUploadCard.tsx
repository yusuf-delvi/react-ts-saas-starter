import React, { useEffect, useRef, useState } from 'react';
import PersonIcon from '../../assets/Icons/User.svg';
import UploadIcon from '../../assets/Icons/UploadIcon.svg';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useUploadQuery } from '@/api/upload.api';
import { RootState } from '@/store/store';
import { updateAccountFormData } from '@/store/slices/accountFormSlice';

interface QueryParams {
	name?: string;
	type?: string;
	extension?: string;
	profilePicUrl?: string;
}

interface ProfileImgUploadCardProps {
	profilePicUrl?: string;
}

const ProfileImgUploadCard: React.FC<ProfileImgUploadCardProps> = ({
	profilePicUrl,
}) => {
	const [queryArgs, setQueryArgs] = useState<QueryParams>({});
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [uploadedURL, setUploadedURL] = useState<string>('');
	const { data: url } = useUploadQuery(queryArgs, { skip: !uploadedImage });
	const fileInputRef = useRef<HTMLInputElement>(null);

	const loginType = useSelector(
		(state: RootState) => state.auth.user?.authType
	);

	const dispatch = useDispatch();
	const accountFormData = useSelector(
		(state: RootState) => state.accountForm.accountFormData
	);

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
		if (uploadedURL != '') {
			dispatch(
				updateAccountFormData({
					...accountFormData,
					profilePicUrl: uploadedURL,
				})
			);
		}
	}, [uploadedURL]);

	return (
		<div
			className={`bg-white w-[192px] h-[245px] rounded-[10px] border-2 border-text-icon-[15%] group ${
				loginType === 'GOOGLE' ? 'pointer-events-none opacity-50' : ''
			}`}
		>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleImageUpload}
				className='hidden'
			/>
			<div
				className=' cursor-pointer flex justify-center items-center relative border-b  '
				onClick={triggerFileInput}
			>
				<img
					src={profilePicUrl ? profilePicUrl : PersonIcon}
					alt='profile image'
					className='w-[190px] h-[190px] rounded-t-md object-cover'
				/>
				<div className=' w-[192px] h-[30px] bg-black bg-opacity-50 absolute -left-0.5 bottom-0  group-hover:opacity-100  opacity-0  flex items-center justify-center gap-1'>
					<img
						src={UploadIcon}
						alt='upload icon'
						className='w-4 h-4  inline-block text-white'
					/>
					<span className=' text-white text-[10px]'>Upload Photo</span>
				</div>
			</div>
			<div className='flex p-3 py-3 w-[190px] justify-center items-center '>
				<p className=' text-[10px]  text-center text-text-icon-secondary3'>
					Image size should be under 1MB and image ration needs to be 1:1
				</p>
			</div>
		</div>
	);
};

export default ProfileImgUploadCard;
