import Cleave from "cleave.js/react";

const TextCurrencyField = (props) => {
	return (
		<Cleave
			placeholder="0.00"
			options={{
				prefix: "CA$",
				numeral: true,
				numeralThousandsGroupStyle: "thousand",
			}}
			value={props.value}
			name={props.name}
			onChange={props.onChange}
			className="w-full css-12rdf6g ub-w_280px ub-fnt-fam_b77syt ub-b-btm_1px-solid-transparent ub-b-lft_1px-solid-transparent ub-b-rgt_1px-solid-transparent ub-b-top_1px-solid-transparent ub-otln_iu2jf4 ub-txt-deco_none ub-bblr_4px ub-bbrr_4px ub-btlr_4px ub-btrr_4px ub-ln-ht_16px ub-fnt-sze_12px ub-color_474d66 ub-pl_12px ub-pr_12px ub-tstn_n1akt6 ub-h_32px ub-bg-clr_white ub-b-btm-clr_d8dae5 ub-b-lft-clr_d8dae5 ub-b-rgt-clr_d8dae5 ub-b-top-clr_d8dae5 ub-mb_8 ub-box-szg_border-box"
			required
		/>
	);
};

export default TextCurrencyField;
