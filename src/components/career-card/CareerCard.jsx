import leafImage from '../../assets/images/gazon.png';

const CareerCard = ({ number, title, description, image }) => {
  return (
    <div className='shadow-shadow-bottom rounded-2xl relative h-[320px] lg:h-[280px] p-6 w-full lg:w-[100%]'>
      <div className='font-montserrat'>
        <h1 className='text-[25px] lg:text-[30px] text-[#B7ED1D] font-bold'>{number}</h1>
        <h2 className='text-[18px] lg:text-[20px] text-custom-gray font-bold'>{title}</h2>
        <p className='text-[12px] lg:text-[14px] text-[#939393] font-semibold pr-6 lg:pr-22 font-gilroy'>{description}</p>
      </div>
      <div
        className='absolute bottom-0 right-0'
        style={{
          backgroundImage: `url(${leafImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <img
          className='lg:w-[220px] lg:h-[150px]'
          src={image}
          alt='error image'
        />
      </div>
    </div>
  );
};

export default CareerCard;
