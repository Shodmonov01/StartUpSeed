const RegisterCard = () => {
  return (
    <div className="rounded-md w-full bg-gradient-to-b from-[#66686b] via-[#44474a] to-[#26282c] p-[1px] pt-[1.5px]">
      <div className='py-10 rounded-md bg_gradient_how_work_register'>
        <h1 className='font-bold text-[21px] lg:text-[26px] font-montserrat uppercase'>Регистрация</h1>
        <div className='grid mt-4 lg:mt-8 lg:grid-cols-3 grid-cols-1 lg:px-16 px-4 gap-4'>
          <input
            className='bg-transparent rounded-md outline-none border border-[#323334] p-6'
            placeholder='Введите имя'
            type='text'
          />
          <input
            className='bg-transparent rounded-md outline-none border border-[#323334] p-6'
            placeholder='Ваш E-mail'
            type='text'
          />
          <button className='lg:bg-text-main_green lg:border-0 border-2 border-text-main_green bg-transparent text-text-main_green lg:text-white rounded-md p-6 font-gilroy-bold'>
            Зарегистрироваться
          </button>
        </div>
        <p className='text-sm mt-6 w-full font-gilroy text-center px-4'>
          Нажимая на кнопку, вы даете согласие на обработку персональных данных
        </p>
      </div>
    </div>
  );
};

export default RegisterCard;
