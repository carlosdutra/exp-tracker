import { Heading, Pane, Strong } from "evergreen-ui";
import EditExpense from "components/EditExpense";
import DeleteExpense from "components/DeleteExpense";
import CategoryBadge from "ui/CategoryBadge";
import { format } from "date-fns";
import currency from "currency.js";

const SingleExpense = ({
	id,
	name,
	value,
	date,
	category,
	backgroundBadge,
}) => {
	// Currency
	const CUR = (value) => currency(value, { symbol: "CA$" });

	return (
		<Pane className="my-2" elevation={1} padding={20}>
			<Pane>
				<CategoryBadge>{category}</CategoryBadge>
				{/* <Badge background={backgroundBadge}>{category}</Badge> */}
			</Pane>

			<Pane className="flex justify-between items-center">
				<Pane className="flex items-center w-1/2 gap-x-6">
					<Strong size={300}>
						{format(new Date(date), "iiii MMMM d")}
					</Strong>
					<Strong>{CUR(value).format()}</Strong>
					<Heading size={700}>{name}</Heading>
				</Pane>

				<Pane className="w-1/2 text-right">
					{/* <IconButton
						icon={EditIcon}
						appearance="minimal"
						onClick={() => alert("Edit item")}
					/> */}
					<EditExpense
						id={id}
						name={name}
						value={value}
						date={date}
						category={category}
					/>
					<DeleteExpense id={id} name={name} />
				</Pane>
			</Pane>
		</Pane>
	);
};

export default SingleExpense;
