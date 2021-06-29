import { useState } from "react";
import ExpensesBarView from "components/ExpensesBarView";
import { Pane, Heading, Paragraph, Strong } from "evergreen-ui";
import {
	format,
	isThisYear,
	isThisMonth,
	isThisWeek,
	isToday,
	startOfWeek,
	endOfWeek,
} from "date-fns";
import currency from "currency.js";
import _ from "lodash";

const ListExpensePeriods = ({ entries }) => {
	const expenses = entries;
	const CUR = (value) => currency(value, { symbol: "CA$" });

	// console.log("ListExpensePeriods was rendered");

	// Feed Overview Monthly Chart of Current Year
	let groupExpensesByMonthOfCurrentYear = _.groupBy(
		expenses.filter((e) => isThisYear(new Date(e.expenseDate))),
		(result) => format(new Date(result.expenseDate), "M")
	);
	const expenseTotalByMonthOfCurrentYear = Object.keys(
		groupExpensesByMonthOfCurrentYear
	).map((k) => {
		return groupExpensesByMonthOfCurrentYear[k]
			.map((r) => parseFloat(r.expenseValue))
			.reduce((acc, cur) => acc + cur, 0);
	});
	const monthsIndexes = Object.keys(groupExpensesByMonthOfCurrentYear).map(
		(n) => parseInt(n)
	);

	// Sum Expenses by current year, month, week and day
	const getYearTotal = () =>
		CUR(
			expenses
				.filter((e) => isThisYear(new Date(e.expenseDate)))
				.reduce((a, b) => a + (currency(b["expenseValue"]).value || 0), 0)
		).format();

	const getMonthTotal = () =>
		CUR(
			expenses
				.filter((e) => isThisMonth(new Date(e.expenseDate)))
				.reduce((a, b) => a + (currency(b["expenseValue"]).value || 0), 0)
		).format();

	const getWeekTotal = () =>
		CUR(
			expenses
				.filter((e) => isThisWeek(new Date(e.expenseDate)))
				.reduce((a, b) => a + (currency(b["expenseValue"]).value || 0), 0)
		).format();

	const getTodaysTotal = () =>
		CUR(
			expenses
				.filter((e) => isToday(new Date(e.expenseDate)))
				.reduce((a, b) => a + (currency(b["expenseValue"]).value || 0), 0)
		).format();

	return (
		<Pane className="flex mb-6 gap-6">
			<Pane className="w-auto">
				<Pane className="mb-3">
					<Strong>Total Expenses</Strong>
					<Paragraph size={300}>
						This is how much you have spent this year
					</Paragraph>
					<Heading size={900}>{getYearTotal()}</Heading>
				</Pane>

				<Pane className="mb-3">
					<Strong>{format(new Date(), "MMM yyyy")}</Strong>
					<Paragraph size={300}>Your total for this month</Paragraph>
					<Heading size={800}>{getMonthTotal()}</Heading>
				</Pane>

				<Pane className="mb-3">
					<Strong>
						{format(startOfWeek(new Date()), "MMM do")} -{" "}
						{format(endOfWeek(new Date()), "MMM do")}
					</Strong>
					<Paragraph size={300}>Your total for this week</Paragraph>
					<Heading size={800}>{getWeekTotal()}</Heading>
				</Pane>

				<Pane className="mb-3">
					<Strong>{format(new Date(), "EEEE, MMM do yyyy")}</Strong>
					<Paragraph size={300}>Your total today</Paragraph>
					<Heading size={800}>{getTodaysTotal()}</Heading>
				</Pane>
			</Pane>

			<Pane className="w-full">
				<ExpensesBarView
					data={expenseTotalByMonthOfCurrentYear}
					months={monthsIndexes}
				/>
			</Pane>
		</Pane>
	);
};

export default ListExpensePeriods;
