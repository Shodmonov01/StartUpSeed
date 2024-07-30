import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoStarSharp, IoStarOutline } from 'react-icons/io5';
import { errorHandler, getToast, getToastWarn } from '../../../../utils/options';
import { axiosInstances } from '../../../../config/config';

const ProjectDetails = ({ data }) => {
  const [inData, setInData] = useState(data || {});

  // console.log(data);

  // add favorite
  const addFavorite = async d => {
    try {
      const res = await axiosInstances.post("/favourite/", {
        project: d.id,
      });
      if (res.status === 200 || res.status === 201) {
        getToast("Успешно добавлено в избранное.");
        let d = {
          ...inData,
          favorite: !inData.favorite
        }
        setInData(d);
      } else getToastWarn(res.data?.message || "Попробуйте еще раз.");
    } catch (error) {
      // console.log(error);
      errorHandler(error);
    }
  }

  // delete item in favorite
  const deleteFavorite = async d => {
    try {
      const res = await axiosInstances.delete(`/favourite/${d.id}`);
      if (res.status === 200 || res.status === 201) {
        getToast("Успешно удалено в избранное.");
        let d = {
          ...inData,
          favorite: !inData.favorite
        }
        setInData(d);
      } else getToastWarn(res.data?.message || "Попробуйте еще раз.");
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className='flex items-center justify-between relative'>
      <div className='flex flex-1 items-center'>
        <Link to={'/admin/projects'}
          className='bg-white p-4 py-6 w-full shadow rounded-lg mb-4 min-h-[100px] flex items-center' >
          <div className='flex items-center justify-center h-[80px] w-[80px] rounded-full text-white mr-4 border'>
            <img src={inData.project_image} alt='no image' className='w-hull h-full rounded-full' />
          </div>
          <div className='flex-1'>
            <h3 className='lg:text-lg text-md font-bold text-custom-gray'>
              {inData.name}
            </h3>
            <p className='text-gray-600 text-sm'>
              {inData.description}
            </p>
          </div>
        </Link >
      </div>

      <div className='absolute top-[30%] right-4'>
        {inData.favorite ? (
          <IoStarSharp className='text-3xl text-main-green' onClick={() => deleteFavorite(inData)} />
        ) : (
          <IoStarOutline className='text-3xl text-gray-500' onClick={() => addFavorite(inData)} />
        )}
      </div>
    </div>
  );
};

export default memo(ProjectDetails);
