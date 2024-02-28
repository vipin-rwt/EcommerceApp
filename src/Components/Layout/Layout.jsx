import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';


export default function Layout( {children} ) {

  
  return (
    <div>
      <Navbar />
       <div>
            {children}
       </div>
      <Footer/>
    </div>
  )
}

