import { json, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { base_url } from "~/fetch_settings"

export const loader = async () => {
	const response = await fetch(base_url + "objective");

	if (!response) {
		throw new Response("Not Found", { status: 404 });
	}

	const objectives: Objective[] = await response.json();

	return json({ objectives });
}

function ObjectiveBubble(objective: Objective) {
	return (
		<NavLink className="relative m-8" to={`/objective/${objective.id}`} >
			<div className="absolute -inset-1">
				<div
					className="w-full h-full rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600">
				</div>
			</div>
			<div className="relative overflow-hidden bg-white shadow-md rounded-xl h-full">
				<div className="p-9"><svg className="w-12 h-12 mx-auto text-gray-400 sm:mx-0" viewBox="0 0 24 24"
					fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 8L20 8" stroke="#111827" stroke-width="2" stroke-linecap="round"></path>
					<path d="M4 16L14 16" stroke="#111827" stroke-width="2" stroke-linecap="round"></path>
					<ellipse cx="7" cy="8" rx="3" ry="3" transform="rotate(90 7 8)" stroke="#111827"
						stroke-width="2" stroke-linecap="round"></ellipse>
					<ellipse cx="17" cy="16" rx="3" ry="3" transform="rotate(90 17 16)" stroke="#111827"
						stroke-width="2" stroke-linecap="round"></ellipse>
				</svg>
					<h3 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-10">{objective.id}</h3>
					<p className="mt-6 text-base text-gray-600">{objective.name}</p>
				</div>
			</div>
		</NavLink>
	)
}

export default function SelectObjective() {
	const { objectives } = useLoaderData<typeof loader>();
	return (
		<div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
			{objectives.map((objective) => <ObjectiveBubble id={objective.id} name={objective.name} />)}
			<Outlet />
		</div>
	)
}
