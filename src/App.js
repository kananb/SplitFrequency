import './App.css';
import './components/Navbar.css';
import './components/Home.css';
import './components/AudioDisplay.css';
import './components/Footer.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
		<Navbar	/>
		<Home />
      	<Footer />
    </div>
  );
}

export default App;
