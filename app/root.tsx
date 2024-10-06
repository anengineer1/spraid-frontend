import {
	json,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";

import fs from 'fs';
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async () => {
	const names = await getObjects('./app/interfaces');
	return json(names);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

async function getObjects(directoryPath: string): Promise<string[]> {


	const filesNames: string[] = await fs.promises.readdir(directoryPath);

	return filesNames.map((fileName) => fileName.split('.').slice(0, -1).join('.')); // Removing the file extension
}

const SideBar = () => {
	const names = useLoaderData<typeof loader>();
	return (
		<div className="fixed top-16 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
			{names.map((result) => <NavLink className="bg-green-800" to={`${result}`}>{result}</NavLink>)}
		</div>
	)
}

const TopBar = () => {
	return (
		<div className="fixed w-screen h-16 flex bg-blue-800 text-white shadow-lg sticky">
			<p>this is a test</p>
		</div>
	);
}

export default function App() {
	return (// flex
		<div className="flex">
			<TopBar />

			<SideBar />

			<div className="fixed left-16 top-16 h-screen m-0 flex flex-col bg-white-900 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}
