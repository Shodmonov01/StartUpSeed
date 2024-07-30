import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoStarSharp } from 'react-icons/io5';
import { getToastWarn } from '../../../../utils/options';

function Details({ data, deleteItem }) {
    const navigate = useNavigate();

    // add favorite
    const deleteFavorite = async value => {
        if (value)
            deleteItem(value);
        else getToastWarn("Вы не можете удалить это.");
    }

    // navigate handler
    const navigateHandler = item => {
        navigate('/admin/specializations/specialization-detail', { state: item });
    }

    return (
        <>
            {data?.length > 0 ? data.map(item => {
                const { project } = item;
                return (
                    <div key={item.id} className='flex items-center justify-between relative mb-2 lg:mb-6'>
                        <div className='flex flex-1 items-center'>
                            <div onClick={() => navigateHandler(item)}
                                className='bg-white p-4 lg:p-8 w-full shadow rounded-lg mb-4 flex flex-col md:flex-row justify-between '
                            >
                                <div className='flex items-center justify-center h-16 w-16 rounded-full text-white mr-4 border'>
                                    {project ? (
                                        <img src={project.project_image} alt='no image' />
                                    ) : (
                                        <img src="" alt='no image' />
                                    )}
                                </div>
                                <div className='flex-1'>
                                    <h3 className='lg:text-lg text-md font-bold text-custom-gray'>
                                        {project ? project.name : ""}
                                    </h3>
                                    <p className='text-gray-600 text-sm'>
                                        {project ? project.description : ""}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='absolute top-[30%] right-4' onClick={() => deleteFavorite(project)}>
                            <IoStarSharp className='text-3xl text-text-main_green' />
                        </div>
                    </div>
                )
            }) : (
                <div className='flex justify-center mt-4'>
                    <span className='text-gray-500'>Избранное не найдено.</span>
                </div>
            )}
        </>
    )
}

export default memo(Details);