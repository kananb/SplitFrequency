import React, { useEffect } from 'react';
import AudioDisplay from '../components/AudioDisplay';
import FFTWave from '../components/FFTWave';

import {ReactComponent as Chevron} from '../icons/chevron.svg';
import {ReactComponent as Microphone} from '../icons/microphone.svg';
import {ReactComponent as Reset} from '../icons/reset.svg';


async function blobToArrayBuffer(blob) {
    if ('arrayBuffer' in blob) return await blob.arrayBuffer();
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject;
        reader.readAsArrayBuffer(blob);
    });
}

function Home(props) {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	let analyser = audioContext.createAnalyser();
	let dest = audioContext.createMediaStreamDestination();
	
	let bufferedAudio = undefined;
	let playbackSource = audioContext.createBufferSource();

	let recorder = undefined;
	let chunks = [];
	let finished = false;

	const makeBuffer = () => {
		new Blob(chunks, { "type": "audio/ogg" }).arrayBuffer()
		.then(audioData => {
			audioContext.decodeAudioData(audioData)
			.then(buffer => {
				bufferedAudio = buffer;
			})
			.catch(err => {
				console.log(err);
			});

			chunks = [];
		})
		.catch(err => {
			console.log(err);
		});
	};
	useEffect(() => {
		navigator.mediaDevices.getUserMedia({"audio": true})
		.then(stream => {
			let source = audioContext.createMediaStreamSource(stream);
			source.connect(analyser);
			analyser.connect(dest);

			recorder = new MediaRecorder(dest.stream);
			recorder.ondataavailable = e => {
				chunks.push(e.data);

				if (finished) {
					makeBuffer();
					finished = false;
				}
			};
		})
		.catch(err => {

		});
	});

	const onRecord = () => {
		if (recorder.state !== "recording") recorder.start();
		else {
			finished = true;
			recorder.stop();
		}
	};
	const playRecording = () => {
		if (!bufferedAudio) return;

		try { playbackSource.stop(); } catch {}
		playbackSource = audioContext.createBufferSource();
		playbackSource.buffer = bufferedAudio;
		playbackSource.connect(audioContext.destination);
		playbackSource.start();
	};

	return (
		<div className="Home center-row">
			<div className="content center-row">
				<div className="toggle-text center-row">
					<p><span className="toggle-replace">hide</span> text</p>
					<Chevron className="chevron" />
				</div>

				<div className="intro text-section">
					<p>See what the <span className="bright">frequency components</span> of your voice look like.</p>
					<p>Using the <span className="bright">Fast Fourier Transform</span>, your raw audio sample can be approximated as a sum of sine waves with different frequencies and amplitudes.</p>
					<p><span className="bright">Play</span> around with some of the pure tones that make up the approximation and listen to how the sound changes!</p>

					<div className="tagline center-row">
						<p>Make a <span className="bright">recording</span> to get started</p>
						<Microphone />
					</div>
				</div>

				<div className="raw-sample wave-section center-col">
					<p className="label">Raw sample:</p>
					<AudioDisplay stats={{"samples": "32,768", "amp": "2"}} downloadable play={playRecording} />
					<div className="record-button boxed center-row" onClick={onRecord}>
						<Microphone />
						<p>start recording</p>
					</div>
				</div>

				<div className="text-section">
					<p>Stop the recording to <span className="bright">freeze</span> thee sample andd see what its Fourier Transform looks like!</p>
				</div>

				<div className="approximation wave-section">
					<p className="label">Approximate waveform:</p>
					<FFTWave />
				</div>

				<div className="text-section">
					<p>Check out the sine waves that sum up to your recording.</p>
					<p>You can use your mouse and <span className="bright">drag</span> the waves to change their frequency.</p>
				</div>

				<div className="waves wave-section center-col">
					<div className="label-wrapper">
						<p className="label">Frequency components:</p>
						<div className="reset-button center-row">
							<Reset />
							<p>reset</p>
						</div>
					</div>
					<div className="waves-wrapper">
						<AudioDisplay id="1" stats={{"freq": "350Hz", "amp": "1.8"}} mini adjustable />
						<AudioDisplay id="2" stats={{"freq": "450Hz", "amp": "1.5"}} mini adjustable />
						<AudioDisplay id="3" stats={{"freq": "550Hz", "amp": "1.2"}} mini adjustable />
						<AudioDisplay id="4" stats={{"freq": "650Hz", "amp": "0.9"}} mini adjustable />
						<AudioDisplay id="5" stats={{"freq": "750Hz", "amp": "0.6"}} mini adjustable />
						<AudioDisplay id="6" stats={{"freq": "850Hz", "amp": "0.3"}} mini adjustable />
						<AudioDisplay id="7" stats={{"freq": "950Hz", "amp": "0.1"}} mini adjustable />
						<AudioDisplay id="8" stats={{"freq": "1050Hz", "amp": "0.1"}} mini adjustable />
						<AudioDisplay id="9" stats={{"freq": "1150Hz", "amp": "0.1"}} mini adjustable />
						<AudioDisplay id="10" stats={{"freq": "1250Hz", "amp": "0.1"}} mini adjustable />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
