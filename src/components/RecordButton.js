import {React, useState} from 'react';

import {ReactComponent as Microphone} from '../icons/microphone.svg';


function RecordButtton(props) {
	const [recording, setRecording] = useState(false);

	const onRecord = () => {
		if (props.onRecord) props.onRecord(!recording);
		setRecording(!recording);
	};

	return (
		<div className="RecordButton boxed center-row" onClick={onRecord}>
			<Microphone />
			<p>{!recording ? "start" : "stop"} recording</p>
		</div>
	);
}

export default RecordButtton;
