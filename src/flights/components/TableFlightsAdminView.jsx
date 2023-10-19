import PropTypes from "prop-types";
import { aproveFlight } from "./../services/apiFlights.js";
import { useDispatch } from "react-redux";
import { getFlights } from "./../../store/slices/flights";

export const TableFlightsAdminView = ({ flights }) => {
	const dispatch = useDispatch();

	const startAproveFlight = async (id) => {
		const result = await aproveFlight(id);
		dispatch(getFlights());
		console.log(result);
	};

	const cancelFlight = (id) => {
		console.log(id);
	};

	const completFlight = (id) => {
		console.log(id);
	};

	return (
		<table className="table table-white" style={{ fontSize: "1.5rem" }}>
			<thead className="bg-green">
				<tr>
					<th>No. Vuelo</th>
					<th>Origen</th>
					<th>Destino</th>
					<th>Hora de Salida</th>
					<th>Avión</th>
					<th>Status</th>
					<th>Acción</th>
				</tr>
			</thead>
			<tbody>
				{flights &&
					flights.map((flight) => (
						<tr key={flight.id}>
							<td>{flight.id}</td>
							<td>{flight.flightToCityOrigin.name}</td>
							<td>{flight.flightToCityDestination.name}</td>
							<td>
								{new Date(
									flight.departure_time
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</td>
							<td className="table-avion">{flight.plane_id}</td>
							<td className="table-status__pending">
								{flight.status}
							</td>
							<td>
								<button
									onClick={() => startAproveFlight(flight.id)}
									className="btn btn-primary"
									style={{ margin: "1px", width: "8rem" }}
								>
									Aprobar
								</button>
								<button
									onClick={() => cancelFlight(flight.id)}
									className="btn btn-primary"
									style={{ margin: "1px", width: "8rem" }}
								>
									Cancelar
								</button>
								<button
									onClick={() => completFlight(flight.id)}
									className="btn btn-primary"
									style={{ margin: "1px", width: "8rem" }}
								>
									Completar
								</button>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};

TableFlightsAdminView.propTypes = {
	flights: PropTypes.array,
};
