import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home, { homeLoader } from './views/Home';

interface AppProps {}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		loader: homeLoader
	}
]);

const App = (props: AppProps) => {
	return <RouterProvider router={router} />;
};

export default App;
