import { json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { base_url } from "~/fetch_settings"

export const raidUpdateURL = base_url + "raid/";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.raidId, `Missing raidId parameter`);
	const raidId: string = params.raidId;

	const response = await fetch(raidUpdateURL + raidId);

	if (!response.ok) {
		throw new Response("Not Found", { status: 404 });
	}

	const raid: Raid = await response.json();

	return json({ raid });
}

export default function editRaid() {
	return (
		<form className="flex w-72 flex-col gap-6">
			<input type="hidden" name="_method" value="put" />
			<div className="w-full max-w-sm min-w-[200px]">
				<div className="relative">
					<input
						className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" name="name"
					/>
					<label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
						Name
					</label>
				</div>
				<div className="relative">
					<input
						className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" name="executionAtTime"
					/>
					<label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
						Starting date and time
					</label>
				</div>
				<div className="relative">
					<input
						className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" name="finishedAtTime"
					/>
					<label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
						Time at which the raid ended
					</label>
				</div>
				<div className="relative">
					<input
						className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" name="lead"
					/>
					<label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
						Leader's name
					</label>

				</div>
			</div>
		</form>
	)
}
