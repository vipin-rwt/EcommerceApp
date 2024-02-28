import { useEffect, useState } from 'react'
import MyContext from './MyContext'
import {Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FireDB } from '../../Firebase/FirebaseConfig';

export default function MyState(props) {

  const [mode, setMode] = useState('light');
  const [loading,setLoading]=useState(false);

  const togglemode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = "black";
    } else if (mode === 'dark') {
      setMode('light');
      document.body.style.backgroundColor = "white";
    }
  };

  const [products,setProducts]=useState({
    
    title:null,
    price:null,
    imageUrl:null,
    category:null,
    description:null,
    time:Timestamp.now(),
    date:new Date().toLocaleString(
      "en-US",
      {
        month:"short",
        day:"2-digit",
        year:"numeric",
      }
    )
      
  });

  const addProduct=async ()=>{
    if( products.title==null || products.price==null || products.imageUrl == null ||products.category==null || products.description==null){
      return toast.error("all fields are required");
    }

    try{[]
       const productRef=collection(FireDB,'products')
       await addDoc(productRef,products)  
       toast.success("add product successfully");
       setTimeout(()=>{
        window.location.href='/dashboard';
       },800);
       getProductData();
       setLoading(false);


    }catch(error){
         console.log(error);
         setLoading(false)
    }

    setProducts("");
  }

 

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(FireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);


// delete and update product

const edithandle=(item)=>{
  setProducts(item);
}

const updateProduct=async ()=>{
  try{
      await setDoc(doc(FireDB,'products',products.id),products);
      toast.success("product updated sucessfully");
      setTimeout(() => {
        window.location.href='/dashboard';
      }, 800);
      getProductData();
      setLoading(false)
     
      
      
  }catch(error){
    console.log(error)
    setLoading(false);
  }

}

const deleteProduct=async (item)=>{
  
  try {
      setLoading(true);
      await deleteDoc(doc(FireDB,'products',item.id));
      toast.success("product deleted successfully");
      getProductData();
      setLoading(false)
    
  } catch (error) {
    console.log(error);
    setLoading(false);

  }
}



// ============0rder page
const [order,setOrder] = useState([]);
const getOrderData=async ()=> {
  setLoading(true)
  try{
    const result = await getDocs(collection(FireDB,"order"))
    
    const ordersArray = [];
    result.forEach((doc) => {
      ordersArray.push(doc.data());
      setLoading(false)
    });
    setOrder(ordersArray);
    console.log(ordersArray)
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}





//--- get user data
const [users,setUsers]=useState([]);
const getUserData=async ()=>{
  setLoading(true);
  try {
    const result=await getDocs(collection(FireDB,"users"));
    const usersArray=[];
    result.forEach((doc)=>{
      usersArray.push(doc.data());
      setLoading(false)

    });

    setUsers(usersArray);
    setLoading(false);


  } catch (error) {
    setLoading(false);
  }
}


useEffect(() => {
  getProductData();
  getOrderData();
  getUserData();

}, []);

const [searchkey, setSearchkey] = useState('')
const [filterType, setFilterType] = useState('')
const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider value={{mode,togglemode,loading,setLoading,products,setProducts,addProduct,product,edithandle,updateProduct,deleteProduct,order,users,searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice}} >{props.children}</MyContext.Provider>
  )
}
