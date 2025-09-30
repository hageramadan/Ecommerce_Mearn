function CateCard({ image, name }) {
    return (
        <div className="cate-card">
            <img src={image} alt={name} className="cate-card-img rounded-full cursor-pointer h-32 w-32"/>
            <p>{name}</p>
        </div>
    );
}

export default CateCard;