import { useEffect, useState } from 'react';

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('/hello')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	console.log('Data: ', data);
	return (
		<div className='App'>
			<h1 className='text-3xl font-bold underline'>{data}</h1>
		</div>
	);
}

export default App;
