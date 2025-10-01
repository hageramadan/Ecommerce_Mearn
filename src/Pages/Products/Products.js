import { useState } from "react";
// import axiosInstance from "../../AxiosInstance/axiosConfig";
import axios from "axios";
import ProductCard from "../../Components/Product-card";

function Products() {
  const [products, setProducts] = useState([]);

//   function getProduct() {
//     axiosInstance
//       .get("/products/all")
//       .then((res) => {
//         setProducts(res.data); 
//       })
//       .catch((err) => console.log(err));
//   }
   function getProduct() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data); 
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <button onClick={()=>getProduct()}>Products</button>
        
        <div  className="mx-10 md:mx-30 lg:mx-40 gap-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
            <ProductCard key={p.id} img={p.image} title={p.title} price={p.price} />   
            ))}
       </div>
    </div>
  );
}

export default Products;
