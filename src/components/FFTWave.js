import { React, useState } from 'react';
import AudioDisplay from '../components/AudioDisplay';


function FFTWave(props) {
	const [waveAmount, setWaveAmount] = useState(50);

	const changeWaveAmount = (e) => {
		setWaveAmount(parseInt(e.target.value));
	};
	
	return (
		<div className="FFTWave">
			<AudioDisplay stats={{"waves": waveAmount, "amp": "2"}} downloadable />
			<div className="range-outer-wrapper center-row">
				<p className="range-label">Amount of waves:</p>
				<div className="range-inner-wrapper center-row">
					<p className="range-min">10</p>
					<input type="range" className="wave-range" onChange={changeWaveAmount} min="10" max="1000" step="1" />
					<p className="range-max">1000</p>
				</div>
			</div>
		</div>
	);
}

export default FFTWave;
