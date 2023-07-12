import React from 'react';
import '../Styles/HomePage.css';
import logo from '../Components/assets/Images/logo.png';
import Footer from '../Components/footer/Footer';

function HomePage() {
  return (
    <div>
        <header>
          <img src={logo} alt='logo' className='Logo'/>
        </header>
        
        <div className='btns'>
            <button className='clientes'><h1 className='clnts'>CLIENTES<img src={arrow} className='arrow'/></h1></button>
            <button className='facturas'><h1 className='facts'>FACTURAS<img src={arrow} className='arrow'/></h1></button>
            <button className='albaranes'><h1 className='albrns'>ALBARANES<img src={arrow} className='arrow'/></h1></button>
            <button className='pedidos'><h1 className='pdds'>PEDIDOS<img src={arrow} className='arrow'/></h1></button>
        </div>
        <Footer />
    </div>
  );
}

export default HomePage