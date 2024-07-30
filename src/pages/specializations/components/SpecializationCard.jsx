import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import { Button } from '@material-tailwind/react';
// import { axiosInstances } from '../../config/config';
// import { errorHandler, getToast, getToastWarn } from '../../utils/options';

const SpecializationCard = (props) => {
  const navigate = useNavigate();
  const { data } = props;

  // console.log(data);

  // navigate handler
  const navigateHandler = item => {
    navigate("/admin/specializations/specialization-detail", { state: item });
  }

  return (
    <>
      {data && data?.results && Array.isArray(data.results) && data.results?.length > 0 ? data.results.map(item => (
        <div key={Math.random().toString()} className='flex items-center p-6 bg-white shadow-lg rounded-lg cursor-pointer' onClick={() => navigateHandler(item)}>
          <div className='flex-shrink-0'>
            <img
              className='h-16 w-16 rounded-full'
              src={item?.avatar ? item.avatar : ""}
              alt='no image'
            />
          </div>
          <div className='ml-4'>
            <div className='text-lg leading-6 font-medium text-custom-gray font-gilroy-bold'>
              {item.first_name}
            </div>
            <div className='text-sm leading-5 text-main-green font-gilroy-bold'>
              {item.last_name}
            </div>
            <div className='mt-2 flex gap-2 flex-wrap'>
              {item.information?.length > 0 && item.information.map(elem => (
                elem.skills && elem.skills?.length > 0 && elem.skills.split(",").map(el => (
                  <Button
                    key={Math.random().toString()}
                    placeholder={<div />}
                    variant='filled'
                    className={`uppercase p-1 lg:p-3 rounded-md bg-custom-gray text-[10px] lg:text-[12px]`}
                  >
                    {el}
                  </Button>
                ))
              ))}
            </div>
          </div>
        </div>
      )) : (
        <div className='flex justify-center mt-4'>
          <span className='text-gray-500'>Экспертов не найдено.</span>
        </div>
      )}

      {/* pagination */}
      {(data && data?.results?.length > 0) && (
        <div className='mt-4'>
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
};

export default memo(SpecializationCard);
