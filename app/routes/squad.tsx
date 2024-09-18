import { json, useLoaderData } from "@remix-run/react";
import { base_url } from "~/fetch_settings"

export const loader = async () => {
	const response = await fetch(base_url + "squad");

	if (!response) {
		throw new Response("Not Found", { status: 404 });
	}

	const squads: Squad[] = await response.json();

	return json({ squads });
}

export default function SelectSquad() {
	const { squads } = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>Squad List</h1>
			{squads.map((squad) => <h2>{squad.name}</h2>)}
		</div>
	);
}
