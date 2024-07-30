// components
import { ProjectBanner } from '../../../components';
// mock data
import { bannerData } from '../../../mock';

const Pages = () => {
  return (
    <div className='max-w-5xl mx-auto my-10 lg:my-20'>
      <h1 className='font-gunterz text-custom-gray text-xl lg:text-2xl text-center lg:text-left'>
        Для кого этот проект?
      </h1>

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-10'>
        {bannerData.map((item, index) => {
          return (
            <ProjectBanner
              key={item.id}
              number={index + 1}
              title={item.title}
              subtitle={item.subtitle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pages;
