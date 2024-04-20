import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SideNav from './components/SideNav.jsx';
import Allroutes from './components/Allroutes.jsx';
import './css/style.css';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div className="App">
      <Header/>
      <SideNav/>
      <Allroutes/>
      <Footer isDashboardPage={isDashboardPage} />
    </div>
  );
}

export default App;
