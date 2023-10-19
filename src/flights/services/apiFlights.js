import { httpClient } from "../../plugins/http-client.plugin";

export const getAllFlights = async () => {
	try {
		const flights = await httpClient.get(
			`${import.meta.env.VITE_API_URL}/api/v1/flights`
		);

		return flights;
	} catch (error) {
		console.log(error);
	}
};

export const aproveFlight = async (id) => {
	try {
		const result = await httpClient.patch(
			`${
				import.meta.env.VITE_API_URL
			}/api/v1/flights/approve-takeoff/${id}`,
			{}
		);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const deleteFlight = async (id) => {
	try {
		const result = await httpClient.delete(
			`${import.meta.env.VITE_API_URL}/api/v1/flights/${id}`
		);
		return result;
	} catch (error) {
		console.log(error);
	}
};
