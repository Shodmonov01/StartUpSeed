import React, { memo } from 'react';
import { careers } from '../../../mock';
import girlCareerImage from '../../../assets/images/girl-career.png';
import CareerCard from '../../../components/career-card/CareerCard';

function Career() {
    return (
        // {/* career section */ }
        <div className='py-16 bg-blue mt-8' >
            <h2 className='font-gunterz text-custom-gray text-[20px] lg:text-[30px] font-normal text-center flex flex-col gap-1'>
                <p>
                    <span className='text-[#b7ed1d]'>Startup seed</span>&nbsp;
                    - твой быстрый
                </p>
                <span className=''>карьерный эскАлатор</span>
            </h2>
            <div className='flex lg:flex-row flex-col-reverse items-end mt-12 gap-8 lg:gap-8 w-full md:w-[97%]'>
                <div className='w-full h-full'>
                    <img src={girlCareerImage} alt='career' className='w-full h-full' />
                </div>
                <div className='grid mt-0 lg:mt-12 lg:grid-cols-2 grid-cols-1 gap-2 lg:gap-6 p-4 pb-0'>
                    {careers?.length > 0 && careers.map((career, index) => (
                        <CareerCard
                            key={index}
                            number={career.number}
                            title={career.title}
                            description={career.description}
                            image={career.imageSrc}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Career);