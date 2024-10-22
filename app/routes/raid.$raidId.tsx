import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { base_url } from "~/fetch_settings"
import Select from 'react-select';
import { useState } from 'react';
import DatePicker from 'react-date-picker';

export const raidUpdateURL = base_url + "raid/";

type RaidInputElementProps = {
	identifier: string;
	labelName: string;
}

type RaidInputDateProps = {
	identifier: string;
	value: string;
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

export const action = async ({ params, request }: ActionFunctionArgs) => {
	console.log("Handling Raid Form");
	invariant(params.raidId, "Missing raidId parameter");

	const raidId = params.raidId;

	const formData: FormData = await request.formData();
	const raidName = formData.get("name");
	const executionAtTime = formData.get("executionAtTime");
	const finishedAtTime = formData.get("lead");
	const objective = formData.get("lead");

	const response = await fetch(raidUpdateURL + raidId, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: raidName,
			executionAtTime: executionAtTime,
			finishedAtTime: finishedAtTime,
			objective: objective
		}),
	});

	console.log(raidName + " Sent");
	console.log(executionAtTime + " Sent");
	console.log(finishedAtTime + " Sent");
	console.log(objective + " Sent");

	if (!response.ok) {
		throw new Response("Failed to updated the raid", { status: response.status });
	}

	return redirect("/raid");
};

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

function RaidInputDate({ identifier, value }: RaidInputDateProps) {
	return (
		<div className="relative">
			<DatePicker
				className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" name={identifier} value={value}
			/>

		</div>

	)
}

export default function editRaid() {
	const { raid, objetives } = useLoaderData<typeof loader>();
	return (
		<Form className="flex w-72 flex-col gap-6" method="post" key={raid.id}>
			<input type="hidden" name="_method" value="put" />
			<div className="w-full max-w-sm min-w-[200px]">
				<RaidInputElement labelName="Name" identifier="name" />
				<RaidInputDate identifier="executionAtTime" value={raid.executionAtTime} />
				<RaidInputDate identifier="finishedAtTime" value={raid.finishedAtTime} />
				<RaidInputElement labelName="Time at which the raid ended" identifier="finishedAtTime" />
				<RaidInputElement labelName="Leader's name" identifier="lead" />
				<Select options={objetives.map((objective) => ({ value: objective, label: objective.name }))} />
			</div>
			<button type="submit">Save</button>
		</Form>
	)
}
