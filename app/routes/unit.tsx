import { json, LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import { base_url } from "~/fetch_settings";


export const loader = async ({ params }: LoaderFunctionArgs) => {

	const response = await fetch(base_url + "unit");

	if (!response) {
		throw new Response("Not Found", { status: 404 });
	}

	const units: Unit[] = await response.json();

	return json({ units });
}

export default function SelectUnit() {
	const { units } = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>Hello world</h1>
			{units.map((unit) => <h2>{unit.name}</h2>)}
		</div>)
}
