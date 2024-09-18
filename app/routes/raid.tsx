import { json, useLoaderData } from "@remix-run/react";
import { base_url } from "~/fetch_settings";

export const loader = async () => {
	const response = await fetch(base_url + "raid");

	if (!response) {
		throw new Response("Not Found", { status: 404 });
	}

	const raids: Raid[] = await response.json();

	return json({ raids });
}

export default function SelectRaid() {
	const { raids } = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>Select Your Raid</h1>
			{raids.map((raid) => <h2>{raid.name}</h2>)}
		</div>);
}
