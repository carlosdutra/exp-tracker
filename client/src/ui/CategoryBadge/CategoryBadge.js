// import { useState } from "react";
import { Badge } from "evergreen-ui";
import _ from "lodash";
import expenseCategories from "data/expense-categories.json";

const CategoryBadge = ({ children }) => {
	return <Badge color="green">{children}</Badge>;
};

export default CategoryBadge;
