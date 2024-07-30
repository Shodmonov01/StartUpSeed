import { Link } from 'react-router-dom';
import { FaVk, FaInstagram, FaTelegram } from 'react-icons/fa';
import projectCardImage from '../../assets/61.png';

const Footer = () => {

  return (
    <div className='w-full bg-black'>
      <footer className='container mx-auto text-white py-5 pb-10 lg:pb-2 relative z-50'>
        <div className='px-4'>
          <div className='lg:grid lg:grid-cols-3 gap-8 flex flex-col justify-center text-center lg:text-left'>
            <div className='flex flex-1 lg:text-start sm:text-center text-center flex-col mb-4 lg:col-span-1'>
              <span className='text-2xl text-text-main_green font-bold mb-2'>
                STARTUP SEED
              </span>
              <span className='text-md font-gilroy text-gray-400'>
                Следи за нами в соц. сетях:
              </span>
              <div className='flex lg:justify-start sm:justify-center justify-center gap-2 mt-2'>
                <span className='text-white text-3xl mr-2 cursor-pointer'>
                  <FaTelegram />
                </span>
                <span className='text-white text-3xl mr-2 cursor-pointer'>
                  <FaVk />
                </span>
                <span className='text-white text-3xl cursor-pointer'>
                  <FaInstagram />
                </span>
              </div>
            </div>
            <div className='flex flex-col gap-2 mb-4 md:mb-0 lg:col-span-1'>
              <span className='font-semibold lg:font-gunterz mb-1 text-[13px] lg:text-[15px]'>
                МЕНЮ САЙТА
              </span>
              <a href="#main"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                Главная
              </a>
              <a href="#about"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                О нас
              </a>
              <a href="#contact"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                Контакты
              </a>
              <a href="#forwho"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white cursor-pointer'
              >
                Вопросы
              </a>
            </div>
            <div className='flex flex-col lg:col-span-1 gap-2'>
              <span className='font-semibold lg:font-gunterz mb-1 text-[13px] lg:text-[15px]'>О ПРОЕКТЕ</span>
              <Link to="/terms-of-use"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                Пользовательское соглашение
              </Link>
              <Link to="/rules"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                Правила
              </Link>
              <Link to="/help"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                Помощь
              </Link>
              <Link to="/project_sevices"
                className='text-gray-400 font-gilroy text-[14px] lg:text-[15px] hover:text-white mb-1 cursor-pointer'
              >
                Услуги проекта
              </Link>
            </div>
          </div>
          <div className='text-center font-gilroy font-medium mt-8 text-[14px] lg:text-[15px] pt-4'>
            ©Startup Seed 2024.
          </div>
        </div>

      </footer>

      <div className='w-full h-[160px] lg:h-auto absolute bottom-0 left-0 z-0'>
        <img src={projectCardImage} alt="" className='w-full h-full' />
      </div>
    </div>
  );
};

export default Footer;
