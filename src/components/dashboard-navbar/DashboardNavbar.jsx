import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoSettings, IoNotificationsSharp } from 'react-icons/io5';
import ImageIcon from '../../assets/images/image-icon.svg';
import { getProfile } from '../../redux/reducers/profileReducer';

const DashboardNavbar = (props) => {

  // get user
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal }); // get profile

    return () => controller.abort();
  }, []);

  return (
    <nav className='flex justify-between items-center mx-auto rounded-full p-4 px-10 bg-white shadow-md lg:mt-2'>
      <div className='flex gap-4'>
        <Link
          to='all-projects'
          className='hover:text-gray-500 font-gilroy-bold text-custom-gray transition-all'
        >
          Проекты
        </Link>
        <Link
          to='specializations'
          className='hover:text-gray-500 font-gilroy-bold text-custom-gray transition-all'
        >
          Специалисты
        </Link>
      </div>
      <div className='hidden lg:flex items-center gap-4'>
        <Link to={'settings'}>
          <IoSettings className='hover:text-gray-300 text-2xl text-custom-gray cursor-pointer' />
        </Link>
        <IoNotificationsSharp className='hover:text-gray-300 text-2xl text-custom-gray cursor-pointer' />
        <Link to="/admin/profile" className={`flex items-center justify-center h-10 w-10 rounded-full ${props.profileData && props.profileData?.avatar ? 'p-0' : 'p-2'} bg-custom-gray text-white`} >
          <img className={`${props.profileData && props.profileData?.avatar ? 'w-full h-full' : 'w-100 h-100'} rounded-full`} src={props.profileData && props.profileData?.avatar ? props.profileData?.avatar : ImageIcon} alt='error image' />
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    profileData: state.profileReducer.profileData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: value => dispatch(getProfile(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);
