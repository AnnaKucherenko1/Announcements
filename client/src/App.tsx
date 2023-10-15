
import './App.css'
import AppRoots from './appRoots'
import Sidebar from './components/sidebar/Sidebar'
import { AnnouncementProvider } from './context/AnnouncementProvider'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/apollo'
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AnnouncementProvider>
        <Router>
          <div className='wrapper'>
            <Sidebar />
            <div className='main-dashboard'>
              <div className='header'></div>
              <AppRoots />
            </div>
          </div>
        </Router>
      </AnnouncementProvider>
    </ApolloProvider>
  )
}

export default App
