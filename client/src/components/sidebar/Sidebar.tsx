
import './sidebar.css'
import { GoMegaphone } from 'react-icons/go';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href="/announcements">
        <GoMegaphone />
        Announcements
      </a>
    </div>
  )
}

export default Sidebar