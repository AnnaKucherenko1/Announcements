
import './App.css'
import Root from './root'
import Sidebar from './components/sidebar/Sidebar'
import { AnnouncementProvider } from './context/AnnouncementProvider'
function App() {
  return (
    <AnnouncementProvider>
      <div className='wrapper'>
        <Sidebar />
        <div className='main-dashboard'>
          <div className='header'></div>
          <Root />
        </div>
      </div>
    </AnnouncementProvider>
  )
}

export default App
