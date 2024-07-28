import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import About from './pages/About.jsx'
import Team from './pages/Team.jsx'
import Events from './pages/Events.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import Error from './pages/Error.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import CreateEvent from './pages/CreateEvent.jsx'
import Tasks from './pages/Tasks.jsx'
import Main from './pages/Main.jsx'

library.add(fab);

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children: [
      {
        path : '',
        element: <Home/>
      },
      {
        path : 'about',
        element : <About/>
      },
      {
        path : 'team',
        element : <Team/>
      },
      {
        path : 'events',
        element : <Events />
      },
      {
        path : '*',
        element : <Error />
      },
      {
        path : 'tasks',
        element : <Tasks />
      },
      {
        path : 'main',
        element : <Main />
      }
    ]
  },
  {
    path : '/admin',
    element : <App />,
    children :[
      {
        path : '',
        element: <Error/>
      },
      {
        path : 'login',
        element : <Login />
      },
      {
        path : 'register',
        element : <Signup/>
      },
      {
        path : '*',
        element : <Error />
      },
      {
        path : 'logout',
        element : <Logout />
      },
      {
        path : 'createEvent',
        element : <CreateEvent />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <FirebaseProvider>
    <RouterProvider router={router} />
    </FirebaseProvider>
)
