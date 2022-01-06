import React, { useEffect, useState } from "react";
import Axios from "axios";
import usePrevState from "../hooks/usePrevState";
import { FaSearch } from "react-icons/fa";
const App = () => {
	const [term, setTerm] = useState("");
	const [debounceSearch, setDebounceSearch] = useState(term);
	const [result, setResult] = useState([]);
	const prevTerm = usePrevState(term);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setDebounceSearch(term);
		}, 1200);
		return () => clearTimeout(timeOut);
	}, [term]);

	useEffect(() => {
		const search = async () => {
			const respond = await Axios.get("https://en.wikipedia.org/w/api.php", {
				params: {
					action: "query",
					list: "search",
					origin: "*",
					format: "json",
					srsearch: debounceSearch,
				},
			});
			setResult(respond.data.query.search);
		};
		search();
	}, [debounceSearch]);

	// useEffect(() => {
	// 	const search = async () => {
	// 		const respond = await Axios.get("https://en.wikipedia.org/w/api.php", {
	// 			params: {
	// 				action: "query",
	// 				list: "search",
	// 				origin: "*",
	// 				format: "json",
	// 				srsearch: debounceSearch,
	// 			},
	// 		});
	// 		setResult(respond.data.query.search);
	// 	};
	// 	if (!result.length && term) {
	// 		search();
	// 	} else if (term !== prevTerm) {
	// 		const debounceSearch = setTimeout(() => {
	// 			if (term) search();
	// 		}, 1200);
	// 		return () => clearTimeout(debounceSearch);
	// 	}
	// }, [term, result.length, prevTerm]);

	const fetchResults = result.map((el) => {
		return (
			<tr key={el.pageid}>
				<th scope="row">1</th>
				<td>{el.title}</td>
				<td>
					<span dangerouslySetInnerHTML={{ __html: el.snippet }} />
				</td>
			</tr>
		);
	});
	return (
		<div>
			<div className="input-group rounded">
				<input
					type="search"
					className="form-control rounded"
					placeholder="Search"
					aria-label="Search"
					aria-describedby="search-addon"
					id="search-input"
					value={term}
					onChange={(e) => {
						setTerm(e.target.value);
					}}
				/>
				<span className="input-group-text border-0" id="search-addon">
					<i>
						<FaSearch />
					</i>
				</span>
			</div>
			<table className="table table-hover">
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Title</th>
						<th scope="col">Description</th>
					</tr>
				</thead>
				<tbody>{fetchResults}</tbody>
			</table>
		</div>
	);
};

export default App;
