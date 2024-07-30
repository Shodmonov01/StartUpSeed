import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectDetails } from '../../../components';
import WorkPositionCard from '../../../components/work-position-card/WorkPositionCard';

const ProjectsDetails = () => {
  const { state } = useLocation();

  // console.log(state);

  return (
    <div className='max-w-5xl mx-auto my-10'>
      <ProjectDetails
        data={state}
      />
      <div className='my-14 flex flex-col gap-2'>
        <h2 className='text-2xl text-custom-gray font-gunterz'>
          Открытые позиции
        </h2>
        {state && state.komanda?.length > 0 && state.komanda.map(item => (
          <WorkPositionCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsDetails;
