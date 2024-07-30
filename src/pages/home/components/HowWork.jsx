import React, { memo } from 'react';
import { howWork } from '../../../mock';
import { HowWorkCard } from '../../../components';
import lightImg from '../../../assets/light.png';
import planeImg from '../../../assets/plane.png';

function HowWork() {
    return (
        //    {/* how its work section */}
        <div className='bg-black p-2 lg:p-8 text-white relative'>
            <div className='container mx-auto px-4 py-12 pt-4 relative'>
                <h1 className='text-gray-50 text-[18px] lg:text-[30px] p-0 font-gunterz block clone-text font-bold text-center mb-0'>
                    КАК ЭТО РАБОТАЕТ?
                </h1>
                <h1 className='text-[20px] lg:text-[30px] p-0 mt-[-15px] lg:mt-[-25px] text-white block font-bold text-center'>
                    КАК ЭТО РАБОТАЕТ?
                </h1>
                <div className='flex justify-center'>
                    <span>Если вы владелец стартапа </span>
                </div>

                <div className='grid mt-12 lg:grid-cols-4 grid-cols-1 gap-2 lg:gap-4'>
                    {howWork.map((work, index) => (
                        <HowWorkCard
                            image={work.imageSrc}
                            content={work.textContent}
                            key={index}
                            isTrue={false}
                        />
                    ))}
                </div>
                <div className='hidden lg:block'>
                    <img src={lightImg} className='absolute -top-6 right-[250px]' alt="" />
                </div>

                <div className='text-center mt-8 w-full'>
                    <button className='w-full lg:w-auto px-14 py-5 bg-text-main_green hover:bg-main-green text-white rounded text-[15px]'>
                        Присоединиться
                    </button>
                </div>
            </div>

            <div className='hidden lg:block'>
                <img src={planeImg} className='absolute top-14 left-0' alt="" />
            </div>
        </div>
    )
}

export default memo(HowWork);