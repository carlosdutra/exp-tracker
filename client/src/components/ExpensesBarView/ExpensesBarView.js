import { Bar } from "react-chartjs-2";

const ExpensesBarView = (props) => {
	const months = Array.from({ length: 12 }, (e, i) => {
		return new Date(null, i + 1, null).toLocaleDateString("en", {
			month: "short",
		});
	});

	let data = new Array(12).fill(0);
	props.months.map((m, i) => data.splice(m - 1, 1, props.data[i]));

	// console.log("Chart was rendered");

	const dataBar = {
		labels: months,
		datasets: [
			{
				label: "Monthly total",
				data: data,
				backgroundColor: Array(12).fill("#5f9578"),
				borderWidth: 0,
				categoryPercentage: 1,
				barPercentage: 0.5,
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return <Bar data={dataBar} options={options} />;
};

export default ExpensesBarView;
