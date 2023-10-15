
import './App.css'
import Root from './root'
import Sidebar from './components/sidebar/Sidebar'
import { AnnouncementProvider } from './context/AnnouncementProvider'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/apollo'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AnnouncementProvider>
        <div className='wrapper'>
          <Sidebar />
          <div className='main-dashboard'>
            <div className='header'></div>
            <Root />
          </div>
        </div>
      </AnnouncementProvider>
    </ApolloProvider>
  )
}

export default App
