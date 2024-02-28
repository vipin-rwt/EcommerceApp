
import Filter from '../../Components/filter/Filter.jsx';
import Layout from '../../Components/Layout/Layout.jsx';
import Herosection from '../../Components/herosection/Herosection.jsx';
import Productcard from '../../Components/ProductCard/Productcard.jsx';
import Testimonial from '../../Components/Testimonial/Testimonial.jsx';
import Track from '../../Components/track/Track.jsx';
import { Link } from 'react-router-dom';


export default function Home() {
 

 

  return (
   <Layout>
    
    <Herosection />
    <Filter/>
    <Productcard />
    <div className='flex justify-center -mt-10 mb-4'>
      <Link to={'/allproducts'}>
        <button className='bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
      </Link>

    </div>
    <Track/>
    <Testimonial/>
   </Layout>
  )
}
