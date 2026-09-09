import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductCard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);

            } catch (err) {
                console.log(err);
            }
        }

        fetchProducts()
    }, [])

    console.log(products)

    return (
        <div className="products-wrapper flex flex-wrap gap-[20px] justify-center pt-[60px]">
            {products.map((product) => {
                return (
                    <div className="product w-[400px] h-[730px] bg-[#FDFEFE] p-[20px] rounded-2xl flex flex-col gap-[70px]" key={product.id}>
                        <img src={product.images} alt={product.title} />
                        <div className="flex flex-col gap-[36px] flex-1">
                            <h3>{product.title}</h3>
                            <p>{product.description}</p> 
                            <div className="price-btn-wrapper flex justify-between items-center gap-[30px] mt-auto">
                                <h4>{product.price} $</h4>
                                <Link
                                    to={`/product/${product.id}`}
                                    className="w-[126px] h-[40px] bg-[#0E6FFA] rounded-2xl cursor-pointer flex justify-center items-center text-[#FFFFFF]">Buy Now
                                </Link>
                            </div>
                        </div>
                        

                    </div>);
            })}
        </div>
    );
}

export default ProductCard;