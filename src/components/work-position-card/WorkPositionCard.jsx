import { memo } from "react";
import { levels } from "../../utils/options";

const WorkPositionCard = ({ item }) => {

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <div className='flex gap-4 items-center mb-4'>
        <span className='text-xl font-gilroy-bold font-bold text-custom-gray'>
          {item?.position}
        </span>
        <span className='text-main-green py-1 px-3 text-sm'>
          {levels.find(el => el.value == item.level)?.name}
        </span>
      </div>
      <div className='grid grid-cols-2 lg:gap-8 gap-2'>
        <div className='col-span-1'>
          <h3 className='font-gilroy-bold text-custom-gray text-sm'>
            <span className="block font-semibold">Задачи и достижения: &nbsp;</span>
            <span className='font-gilroy text-gray-600 '>
              {item.tasks}
            </span>
          </h3>
        </div>
        <div className='col-span-1'>
          <h3 className='font-gilroy-bold text-sm text-custom-gray'>
            <span className="block font-semibold">Навыки: &nbsp;</span>
            <div className="flex items-center flex-wrap gap-1">
              {item.tags?.length > 0 && item.tags.map(el => (
                <span key={el.id} className='font-thin text-white bg-gray-800 p-0.5 px-2 rounded-md'>{el.name}</span>
              ))}
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default memo(WorkPositionCard);
