import { base_url } from "~/fetch_settings";
import invariant from "tiny-invariant"
import { json } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.objectiveId, "Missing objectiveId parameter")
	const objectiveId: string = params.objectiveId;

	const response = await fetch(base_url + "objective" + "/" + objectiveId);

	if (!response) {
		throw new Response("Not Found", { status: 404 });
	}

	const objective: Objective = await response.json();

	return json({ objective });
};

export default function ObjectiveScreen() {
	return (
		<h1>Hello world</h1>
	);
}
