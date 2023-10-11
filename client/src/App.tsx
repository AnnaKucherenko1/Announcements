
import './App.css'
import Root from './root'
import Sidebar from './components/sidebar/Sidebar'
function App() {
  return (
    <div className='wrapper'>
      <Sidebar />
      <div className='main-dashboard'>
        <div className='header'></div>
        <Root />
      </div>
    </div>
  )
}

export default App
