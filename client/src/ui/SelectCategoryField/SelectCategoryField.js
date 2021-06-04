import { SelectField } from "evergreen-ui";
import expenseCategories from "data/expense-categories.json";

const SelectCategoryField = (props) => {
	return (
		<SelectField
			width="100%"
			label={props.label}
			description={props.description}
			name={props.name}
			value={props.expenseCategory}
			onChange={props.onChange}
			// defaultValue={"DEFAULT"}
			required
		>
			<option value="DEFAULT" disabled>
				{" "}
				-- select an option --{" "}
			</option>
			{expenseCategories.map((e) => (
				<optgroup key={e.categorySection} label={e.categorySection}>
					{e.categories.map((c) => (
						<option
							key={c.id}
							value={c.name}
							selected={props.value === c.name}
						>
							{c.name}
						</option>
					))}
				</optgroup>
			))}
		</SelectField>
	);
};

export default SelectCategoryField;
