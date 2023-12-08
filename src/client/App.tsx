import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './views/Root';
import Home, { homeLoader } from './views/Home';
import Details, { detailsLoader } from './views/Details';
import User, { userLoader } from './views/User';
import Compose, { composeLoader } from './views/Compose';
import Admin from './views/Admin';

interface AppProps {}

const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
				loader: homeLoader
			},
			{
				path: '/chirps/:chirpid',
				element: <Details />,
				loader: detailsLoader
			},
			{
				path: '/users/:userid',
				element: <User />,
				loader: userLoader
			},
			{
				path: 'compose',
				element: <Compose />,
				loader: composeLoader
			},
			{
				path: '/admin',
				element: <Admin />
			}
		]
	}
]);

const App = (props: AppProps) => {
	return <RouterProvider router={router} />;
};

export default App;
