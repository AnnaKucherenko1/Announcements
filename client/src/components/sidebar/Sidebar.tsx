
import './sidebar.css'
import { GoMegaphone } from 'react-icons/go';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className='test-city'>
        <img src="/unnamed.webp" alt="Logo" />
        Test city
      </div>
      <div className='link'>
        <GoMegaphone />
        <a href="/announcements" className='a'>
          Announcements
        </a>
      </div>
    </div>
  )
}

export default Sidebar