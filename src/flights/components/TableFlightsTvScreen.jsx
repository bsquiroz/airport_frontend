import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFlights, setFlights } from "../../store/slices/flights";
import { useSocket } from "../../common/hooks/useSocket";

export const TableFlightsTvScreen = () => {
	const { socket } = useSocket(import.meta.env.VITE_API_URL);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFlights());
	}, [dispatch]);

	useEffect(() => {
		socket.on("news-flights", (flights) => {
			dispatch(setFlights(flights));
		});
	}, [socket, dispatch]);

	const { flights } = useSelector((state) => state.flights);

	return (
		<table className="table">
			<thead>
				<tr>
					<th>No. Vuelo</th>
					<th>Origen</th>
					<th>Destino</th>
					<th>Hora de Salida</th>
					<th>Avión</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{flights.map((flight) => (
					<tr key={flight.id}>
						<td>{flight.id}</td>
						<td>{flight.flightToCityOrigin.name}</td>
						<td>{flight.flightToCityDestination.name}</td>
						<td>
							{new Date(flight.departure_time).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</td>
						<td className="table-avion">{flight.plane_id}</td>
						<td>{flight.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
