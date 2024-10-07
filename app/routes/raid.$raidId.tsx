import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { base_url } from "~/fetch_settings"

export const raidUpdateURL = base_url + "raid/";

type RaidInputElementProps = {
	identifier: string;
	labelName: string;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.raidId, `Missing raidId parameter`);
	const raidId: string = params.raidId;

	const response = await fetch(raidUpdateURL + raidId);

	const availableObjectives = await fetch(base_url + "objective");
	console.log(base_url + "objective");

	console.log(response.ok);
	console.log(availableObjectives.ok);


	if (!response.ok) {
		throw new Response("Not Found", { status: 404 });
	}

	if (!availableObjectives.ok) { // Provisional, substitude for a simple output like console.log
		throw new Response("Not Found", { status: 404, statusText: "No objectives listed" });
	}

	const raid: Raid = await response.json();
	const objetives: Objective[] = await availableObjectives.json();

	return json({ raid, objetives });
}

function RaidInputElement({ labelName, identifier }: RaidInputElementProps) {
	return (
		<div className="relative">
			<input
				className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" name={identifier}
			/>
			<label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
				{labelName}
			</label>

		</div>

	)
}

export default function editRaid() {
	const { raid, objetives } = useLoaderData<typeof loader>();
	return (
		<form className="flex w-72 flex-col gap-6">
			<input type="hidden" name="_method" value="put" />
			<div className="w-full max-w-sm min-w-[200px]">
				<RaidInputElement labelName="Name" identifier="name" />
				<RaidInputElement labelName="Starting date and time" identifier="name" />
				<RaidInputElement labelName="Time at which the raid ended" identifier="name" />
				<RaidInputElement labelName="Leader's name" identifier="name" />
				<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{objetives.map((objective) => <option value={objective.id}>{objective.name}</option>)}
				</select>
			</div>
		</form>
	)
}
