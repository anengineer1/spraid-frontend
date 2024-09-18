interface Raid {
	id: number;
	name: string;
	execution_at_time: Date;
	finished_at_time: Date;
	lead: string;
	objective: Objective;
}
