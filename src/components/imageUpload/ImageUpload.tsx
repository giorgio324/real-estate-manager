import { useField } from 'formik';
import { useId, useState } from 'react';
import HelperText from '../helperText/HelperText';
import plusIcon from '../../assets/images/ImagePlaceholder.svg';
import deleteIcon from '../../assets/images/DeleteIcon.svg';

type Props = {
  name: string;
  label: string;
  defaultImage: string | null;
};

const ImageUpload = ({ name, label, defaultImage }: Props) => {
  const id = useId();
  const [_field, meta, helpers] = useField(name);
  const [previewImage, setPreviewImage] = useState<string | null>(defaultImage);

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      helpers.setValue(reader.result);
      setPreviewImage(reader.result as string);
      localStorage.setItem(name, reader.result as string);
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;
    if (imageFileList) {
      const image = imageFileList[0];
      const type = image.type.split('/')[0];
      if (type !== 'image') {
        helpers.setError('ფაილი უნდა იყოს სურათი');
        helpers.setTouched(true, false);
        e.target.value = '';
        return;
      }
      // 1MB
      if (image.size > 1 * 1024 * 1024) {
        helpers.setError('ფაილის ზომა აღემატება 1MB-ს');
        helpers.setTouched(true, false);
        e.target.value = '';
        return;
      }
      convertToBase64(image);
      e.target.value = '';
    }
  };

  const deleteImage = () => {
    setPreviewImage(null);
    helpers.setValue(null);
    localStorage.removeItem(name);
  };

  const touched = meta.touched;
  const error = meta.error;

  return (
    <>
      <label htmlFor={id} className='font-firago font-medium text-text'>
        <span>{label}</span>
        <div className='py-5 w-full border-2 border-filterText border-dashed rounded-lg flex justify-center items-center mt-[5px] cursor-pointer'>
          <input
            onChange={handleImageChange}
            type='file'
            id={id}
            style={{ display: 'none' }}
          />
          {previewImage ? (
            <div
              className='relative w-[92px] h-[82px] flex justify-center items-center cursor-auto'
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={previewImage}
                alt='uploaded image'
                className='rounded-[4px]'
              />
              <img
                src={deleteIcon}
                alt='delete icon'
                className='absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 cursor-pointer'
                onClick={deleteImage}
              />
            </div>
          ) : (
            <div className='w-[92px] h-[82px] flex justify-center items-center'>
              <img src={plusIcon} alt='add icon' />
            </div>
          )}
        </div>
      </label>
      <HelperText
        state={touched ? (error ? 'error' : 'valid') : 'info'}
        errorText={meta.error}
      />
    </>
  );
};

export default ImageUpload;
