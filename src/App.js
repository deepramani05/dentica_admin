import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SideNav from './components/SideNav.jsx';
import Allroutes from './components/Allroutes.jsx';
import './css/style.css';

function App() {

  return (
    <div className="App">
      <Header/>
      <SideNav/>
      <Allroutes/>
      <Footer/>
    </div>
  );
}

export default App;
