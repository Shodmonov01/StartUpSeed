// import { IoStarSharp } from 'react-icons/io5';

const ProfileCard = (props) => {
  const { user } = props;

  return (
    <div className='mx-auto p-4 lg:p-8 bg-white rounded-lg shadow-md overflow-hidden flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4 lg:gap-6'>
          <div>
            <img
              className='block h-[85px] w-[85px] rounded-full object-cover'
              src='https://via.placeholder.com/150'
              alt='Profile'
            />
          </div>
          <div>
            <div>
              <pre className='uppercase font-gunterz text-custom-gray '>
                {user && user.first_name} {user && user.last_name}
              </pre>
              <pre className='text-gray-600'>
                {user?.active ? (
                  <span className="flex items-center gap-2">Не ищу проект <div className="animate-pulse w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-700" ></div></span>
                ) : (
                  <span className="flex items-center gap-2">Ищу проект <div className="animate-pulse w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-700"></div></span>
                )}
              </pre>
            </div>
          </div>
        </div>

        <div>
          {/* {isFavorite && <IoStarSharp className='text-3xl text-main-green' />} */}
        </div>
      </div>
      <div className='flex px-2 items-center mt-4 flex-wrap'>
        <div className='flex lg:flex-row flex-col lg:gap-12 gap-4 justify-between'>
          <div className='text-custom-gray font-gilroy-bold leading-none'>
            <span className='text-gray-400'>Пол: </span> Мужской
          </div>

          <div className='text-custom-gray font-gilroy-bold leading-none'>
            <span className='text-gray-400'>Дата рождения: </span> {user && user.birth_date}
          </div>

          <div className='text-custom-gray font-gilroy-bold leading-none'>
            <span className='text-gray-400'>Страна: </span> {user && user.counrty}
          </div>

          <div className='text-custom-gray font-gilroy-bold leading-none'>
            <span className='text-gray-400'>Город: </span> {user && user.city}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
