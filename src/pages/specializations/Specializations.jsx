import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import { SpecializationCard } from '../../components';
import { levels } from '../../utils/options';
import { getAllSpecialists } from '../../redux/reducers/specialistsReducer';
import { Typography } from '@material-tailwind/react';

const Specializations = (props) => {
  const [selected, setSelected] = useState(0);
  const [level, setLevel] = useState(-1);
  const position_ref = useRef("");

  // get all projects
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // props.onLoading(true);
    props.onGetAllSpecialists({ signal, selectedId: selected + 1, limit: 15, information: "", level: "" }); // get profile

    return () => controller.abort();
  }, []);

  // for pagination
  const handlePageClick = async (e) => {
    setSelected(e.selected);

    // props.onLoading(true);
    props.onGetAllSpecialists({ selectedId: e.selected + 1, limit: 15, information: position_ref.current?.value, level: level == -1 ? "" : level }); //get all data
  }

  // search elements
  const searchElementsHandler = () => {
    if (position_ref.current?.value || level) {
      props.onGetAllSpecialists({ selectedId: selected + 1, limit: 15, information: position_ref.current?.value, level: level == -1 ? "" : level }); //get all data
    } else getToastWarn("Заполните поля и повторите попытку.");
  }

  return (
    <div className='max-w-5xl mx-auto my-10'>
      <h1 className='text-custom-gray mt-7 font-gunterz lg:text-2xl text-xl text-center lg:text-left'>
        Специалисты
      </h1>

      <div className='flex lg:flex-row flex-col lg:gap-0 gap-2 lg:items-center space-x-4 py-8'>
        <div className='gap-3 grid grid-cols-1 lg:grid-cols-8'>
          <div className='flex items bg-blue-300 shadow rounded overflow-hidden h-[47.97px] col-span-1 lg:col-span-3'>
            <input
              className='px-4 flex-1 py-2 outline-0'
              type='text'
              placeholder='Должность'
              ref={position_ref}
            />
            <button className='bg-white px-4 text-xl text-gray-600'>
              <CiSearch />
            </button>
          </div>

          <div className='h-[47.97px] selectMaterial col-span-1 lg:col-span-2'>
            <select
              name='level'
              id='level'
              className='text-gray-600 w-full text-sm shadow rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block px-2 h-[47.97px]'
              onChange={event => setLevel(event.target.value)}
            >
              <option value={-1}>Все</option>
              {levels.map(elem => (
                <option key={elem.value} value={elem.value}>{elem.name}</option>
              ))}
            </select>
          </div>
          <div className='flex gap-2 col-span-1 lg:col-span-2'>
            <button className='p-3 px-10 bg-text-main_green text-white rounded-md w-full' onClick={searchElementsHandler}>
              Найти
            </button>
          </div>
        </div>
      </div>

      <main>
        {props.loading ? (
          <div className="max-w-full animate-pulse">
            <Typography
              as="div"
              variant="h1"
              className="mb-6 h-[127px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-[127px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-[127px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        ) : (
          <div>
            {props.allSpecialists && props.allSpecialists.results?.length === 0 ? (
              <div className='flex justify-center mt-4'>
                <span className='text-gray-500'>Экспертов не найдено.</span>
              </div>
            ) : (
              <div>
                <SpecializationCard
                  data={props.allSpecialists}
                  handlePageClick={handlePageClick}
                  limit={15}
                  selected={selected}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.specialistsReducer.loading,
    allSpecialists: state.specialistsReducer.allSpecialists,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoading: value => dispatch(isLoading(value)),
    onGetAllSpecialists: value => dispatch(getAllSpecialists(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Specializations);
