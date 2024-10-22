import { base_url } from "~/fetch_settings";
import invariant from "tiny-invariant"
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export const objectiveUpdateURL = base_url + "objective/";


export const action = async ({ params, request }: ActionFunctionArgs) => {
	console.log("Handling Objective Form");
	invariant(params.objectiveId, "Missing objectiveId parameter");
	const objectiveId = params.objectiveId;

	const formData: FormData = await request.formData();
	const objectiveName = formData.get("name");

	const response = await fetch(objectiveUpdateURL + objectiveId, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: objectiveName }),
	});
	console.log(objectiveName + " Sent");

	if (!response.ok) {
		throw new Response("Failed to update objective", { status: response.status });
	}

	return redirect("/objective");
};


export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.objectiveId, "Missing objectiveId parameter")
	const objectiveId: string = params.objectiveId;

	const response = await fetch(objectiveUpdateURL + objectiveId);

	if (!response) {
		throw new Response("Not Found", { status: 404 });
	}

	const objective: Objective = await response.json();

	return json({ objective });
};

export default function ObjectiveScreen() {
	const { objective } = useLoaderData<typeof loader>();
	console.log("Objective screen rendered")
	return (
		<div>
			<Form key={objective.id} id="objective-form" method="post">
				<input type="hidden" name="_method" value="put" />
				<div className="w-full max-w-sm min-w-[200px]">
					<div className="relative">
						<input
							className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" defaultValue={objective.name} name="name"
						/>
						<label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
							{objective.name}
						</label>
					</div>
				</div>
				<button type="submit">Save</button>
			</Form>
		</div>
	);
}
