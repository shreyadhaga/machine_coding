export default function ProductCard({ image, title }) {
  return (
    <div className="product-cart">
      <img  className="product-img" src={image} alt={title} />
      <span>{title}</span>
    </div>
  );
}
