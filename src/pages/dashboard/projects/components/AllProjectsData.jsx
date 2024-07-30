import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { IoStarOutline, IoStarSharp } from 'react-icons/io5';
import { axiosInstances } from '../../../../config/config';
import { errorHandler, getToast, getToastWarn } from '../../../../utils/options';

function AllProjectsData(props) {
    const navigate = useNavigate();
    const { data } = props;

    // add favorite
    const addFavorite = async d => {
        try {
            const res = await axiosInstances.post("/favourite/", {
                project: d.id,
            });
            if (res.status === 200 || res.status === 201) {
                getToast("Успешно добавлено в избранное.");
                props.getData();
            } else getToastWarn(res.data?.message || "Попробуйте еще раз.");
        } catch (error) {
            errorHandler(error);
        }
    }

    // delete item in favorite
    const deleteFavorite = async d => {
        try {
            const res = await axiosInstances.delete(`/favourite/${d.id}`);
            if (res.status === 200 || res.status === 201) {
                getToast("Успешно удалено в избранное.");
                props.getData();
            } else getToastWarn(res.data?.message || "Попробуйте еще раз.");
        } catch (error) {
            errorHandler(error);
        }
    }

    // navigate handler
    const navigateHandler = item => {
        navigate("/admin/all-projects/project-about", { state: item });
    }


    return (
        <>
            {data.results?.length > 0 ? data.results.map(item => {
                let all_number = 0, all_peoples = 0;
                if (Array.isArray(item.employees) && item.employees?.length > 0) {
                    item.employees.forEach(el => {
                        all_number += Number(el.people_needed);
                        all_peoples += Number(el.people_now);
                    })
                }
                return (
                    <div key={item.id} className='flex items-center justify-between relative'>
                        <div className='flex flex-1 items-center'>
                            <div onClick={() => navigateHandler(item)}
                                className='cursor-pointer bg-white p-4 py-6 w-full shadow rounded-lg mb-4 min-h-[100px] flex items-center' >
                                <div className='flex items-center justify-center h-[80px] w-[80px] rounded-full text-white mr-4 border'>
                                    <img src={item.project_image} alt='no image' className='w-hull h-full rounded-full' />
                                </div>
                                <div className='flex-1'>
                                    <h3 className='lg:text-lg text-md font-bold text-custom-gray'>
                                        {item.name}
                                    </h3>
                                    <p className='text-gray-600 text-sm'>
                                        {item.description}
                                    </p>
                                    <div className='flex items-center gap-1 mt-2'>
                                        <div className='text-gray-600 text-sm w-[200px] border border-gray-300 h-[9px] relative'>
                                            <div className={`absolute top-0 left-0 bottom-0 bg-text-main_green h-[9px]`}
                                                style={{
                                                    width: all_peoples ? all_peoples / all_number * 100 + '%' : '0%',
                                                }}
                                            ></div>
                                        </div>
                                        <span className='font-gunterz-bold text-[12px]'>({all_peoples ? all_peoples + ' / ' + all_number : 0 + ' / ' + all_number})</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='absolute top-[30%] right-4'>
                            {item.favorite ? (
                                <IoStarSharp className='text-3xl text-main-green' onClick={() => deleteFavorite(item)} />
                            ) : (
                                <IoStarOutline className='text-3xl text-gray-500' onClick={() => addFavorite(item)} />
                            )}
                        </div>
                    </div>
                )
            }) : (
                <div className='flex justify-center mt-4'>
                    <span className='text-gray-500'>Проекты не найдены.</span>
                </div>
            )}

            {/* pagination */}
            {(data && data?.results?.length > 0) && (
                <div className='mt-1'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={props.handlePageClick}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        pageCount={Math.ceil(data.count / props.limit)}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        className="paginationUL"
                        activeClassName="active"
                        forcePage={props.selected}
                    />
                </div>
            )}
        </>
    )
}

export default memo(AllProjectsData);