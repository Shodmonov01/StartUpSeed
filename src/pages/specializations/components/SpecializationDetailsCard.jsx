import { Button } from '@material-tailwind/react';

const SpecializationDetailsCard = (props) => {
  const { user } = props;

  return (
    user && user.information && Array.isArray(user.information) && user.information?.length > 0 && user.information.map(item => (
      <div key={Math.random().toString()} className='mx-auto p-4 py-6 bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-gilroy-bold text-main-green font-bold'>
            {item.career_objective}
          </h1>

          <ul className='font-gilroy-bold flex lg:flex-row flex-col lg:gap-8 gap-2'>
            <li className='text-custom-gray'>
              <span className='text-gray-500 mr-1'>Должность: </span> {item.level}
            </li>
            <li className='text-custom-gray'>
              <span className='text-gray-500 mr-1'>Иностранный: </span> {item.laguage}
            </li>
            <li className='text-custom-gray'>
              <span className='text-gray-500 mr-1'>Уровень: </span> {item.laguage_level}
            </li>
          </ul>

          <div className='flex gap-2'>
            {item.skills && item.skills?.length > 0 && item.skills.split(",").map(el => (
              <Button
                key={Math.random().toString()}
                placeholder={<div />}
                variant='filled'
                className={`uppercase rounded-md px-3 bg-custom-gray`}
              >
                {el}
              </Button>
            ))}
          </div>
        </div>
      </div>
    ))
  );
};

export default SpecializationDetailsCard;
