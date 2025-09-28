function ProductHover(props){
    return(
        <>
        <div className="relative flex-1 group cursor-pointer overflow-hidden">
                <img
                  src={props.img}
                  alt="cover"
                   className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${props.animationClass}`}
                />
                <div className="absolute bottom-0 left-0 w-full h-0 bg-black/60 overflow-hidden group-hover:h-24 transition-all duration-500 flex flex-col items-center justify-center text-white">
                  <h3 className="text-lg font-bold">{props.title}</h3>
                  <p className="text-sm">{props.desc}</p>
                </div>
              </div>
        </>
    )
}

export default ProductHover