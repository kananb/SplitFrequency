import React from 'react';

import {ReactComponent as PlayIcon} from '../icons/play.svg';
import {ReactComponent as DownloadIcon} from '../icons/download.svg';


function AudioDisplay(props) {
	const statKeys = ["samples", "waves", "freq", "amp"];

	const stats = [];
	if (props.stats) {
		for (let stat of statKeys) {
			if (props.stats[stat]) {
				stats.push(
					<p className="stat" key={stat}>
						{`${stat}: ${props.stats[stat]}`}
					</p>
				);
			}
		}
	}

	const downloadSound = () => {
		if (props.test) console.log(props.test[0]);
	};

	const downloadIcon = (props.downloadable) ? <DownloadIcon /> : "";
	return (
		<div className="AudioDisplay center-row" style={{
				height: (props.mini) ? "76px" : "124px",
			}}>
			<div className="controls center-col">
				<div className="play-button" onClick={props.play}>
					<PlayIcon />
				</div>
			</div>
			<div className="data">
				<div className="id">
					{props.id || ""}
				</div>
				<div className="waveform">
					<canvas className={"display " + ((props.adjustable) ? "adjustable" : "")} width="0" height="0" />
				</div>
				<div className="info">
					<div className="stats center-row">
						{stats}
					</div>
					<div className="download-button center-row" onClick={downloadSound}>
						{downloadIcon}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AudioDisplay;
