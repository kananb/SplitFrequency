import React from 'react';

import {ReactComponent as Title} from '../icons/title.svg';
import {ReactComponent as BurgerIcon} from '../icons/hamburger.svg';


function Navbar(props) {
	return (
		<div className="Navbar center-row">
			<div className="outer">
				<div className="author">
					<p><span className="thick-underline">built by</span>: <span className="boxed">kanan boubion</span></p>
				</div>
				<div className="menu center-row">
					<BurgerIcon />
				</div>
			</div>
			<div className="inner center-row">
				<Title className="title" />
			</div>
		</div>
	);
}

export default Navbar;
