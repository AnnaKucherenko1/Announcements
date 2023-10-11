
import './App.css'
import Root from './root'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
function App() {


  return (
    <>
      <div>
        <Sidebar />
        <div className='main-dashboard'>
          <Navbar />
          <Root />
        </div>
      </div>
    </>
  )
}

export default App
