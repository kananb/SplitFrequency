import React from 'react';
import AudioDisplay from '../components/AudioDisplay';

import {ReactComponent as Chevron} from '../icons/chevron.svg';
import {ReactComponent as Microphone} from '../icons/microphone.svg';
import {ReactComponent as Reset} from '../icons/reset.svg';


function Home(props) {
	return (
		<div className="Home center-row">
			<div className="content center-row">
				<div className="toggle-text center-row">
					<p><span className="toggle-replace">hide</span> text</p>
					<Chevron className="chevron" />
				</div>

				<div className="intro text-section">
					<p>Turn your voice into a sum of its <span className="bright">harmonics</span>.</p>
					<p>Using the <span className="bright">Fast Fourier Transform</span>, your raw audio sample can be approximated as a sum of sine waves with different frequencies and amplitudes.</p>
					<p><span className="bright">Play</span> around with some of the pure tones that make up the approximation and listen to how the sound changes!</p>

					<div className="tagline center-row">
						<p>Make a <span className="bright">recording</span> to get started</p>
						<Microphone />
					</div>
				</div>

				<div className="raw-sample wave-section center-col">
					<p className="label">Raw sample:</p>
					<AudioDisplay stats={{"samples": "32,768", "amp": "2"}} downloadable />
					<div className="record-button boxed center-row">
						<Microphone />
						<p>start recording</p>
					</div>
				</div>

				<div className="text-section">
					<p>Stop the recording to <span className="bright">freeze</span> thee sample andd see what its Fourier Transform looks like!</p>
				</div>

				<div className="approximation wave-section">
					<p className="label">Approximate waveform:</p>
					<AudioDisplay stats={{"waves": "100", "amp": "2"}} downloadable />
					<div className="range-outer-wrapper center-row">
						<p className="range-label">Amount of waves:</p>
						<div className="range-inner-wrapper center-row">
							<p className="range-min">1</p>
							<input type="range" className="wave-range" min="1" max="1000" step="5" />
							<p className="range-max">1000</p>
						</div>
					</div>
				</div>

				<div className="text-section">
					<p>Check out the harmonics that sum up to your recording.</p>
					<p>You can use your mouse and <span className="bright">drag</span> the sine waves to change their frequency.</p>
				</div>

				<div className="harmonics wave-section center-col">
					<div className="label-wrapper">
						<p className="label">Harmonics:</p>
						<div className="reset-button center-row">
							<Reset />
							<p>reset</p>
						</div>
					</div>
					<div className="harmonics-wrapper">
						<AudioDisplay id="1" stats={{"freq": "350Hz", "amp": "1.8"}} mini />
						<AudioDisplay id="2" stats={{"freq": "350Hz", "amp": "1.5"}} mini />
						<AudioDisplay id="3" stats={{"freq": "350Hz", "amp": "1.2"}} mini />
						<AudioDisplay id="4" stats={{"freq": "350Hz", "amp": "0.9"}} mini />
						<AudioDisplay id="5" stats={{"freq": "350Hz", "amp": "0.6"}} mini />
						<AudioDisplay id="6" stats={{"freq": "350Hz", "amp": "0.3"}} mini />
						<AudioDisplay id="7" stats={{"freq": "350Hz", "amp": "0.1"}} mini />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
