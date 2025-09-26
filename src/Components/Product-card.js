
function ProductCard(props){
    const toggle=()=>{
        console.log("clicked")
    }
     return(
        <>
           <div className="flex flex-col gap-1 p-1 cursor-pointer overflow-hidden border border-gray-200 rounded-md shadow-sm hover:shadow-md transition">
                <div className="overflow-hidden w-full h-48">
                    <img 
                    src={props.img} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                    alt="..." 
                    />
                </div>
                <div className="flex flex-col p-2">
                    <h5 className="font-semibold">{props.title}</h5>
                    <p className="text-gray-700">{props.price ? props.price : "5$"}</p>
                    <p className="text-sm text-gray-500">{props.description}</p>
                    <button onClick={()=>toggle(this)} className="mt-2 bg-orange-app hover:bg-orange-600 text-white text-sm w-fit px-2 py-1 rounded-full">Add to Cart</button>
                </div>
                </div>

        </>
     )
}

export default ProductCard