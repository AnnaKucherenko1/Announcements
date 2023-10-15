
import { useNavigate } from 'react-router-dom';
import './sidebar.css'
import { GoMegaphone } from 'react-icons/go';
import { ROUTE_ANNOUNCEMENTS } from '../../common/constants';

const Sidebar = () => {
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate(ROUTE_ANNOUNCEMENTS)
  }
  return (
    <div className="sidebar">
      <div className='test-city'>
        <img src="/logo.webp" alt="Logo" />
        Test city
      </div>
      <div className='link-div'>
        <GoMegaphone />
        <div onClick={handleNavigation} className='link'>
          Announcements
        </div>
      </div>
    </div>
  )
}

export default Sidebar