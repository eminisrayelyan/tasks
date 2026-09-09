import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const respone = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await respone.json();
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchProduct();
    }, [id])


    if (!product) {
        return <p className="flex justify-center">Loading...</p>;
    }

    return (
        <div className="flex h-[100vh] justify-center  w-[100%] mt-[150px]">
            <div className="flex w-[60%] bg-[#FFFFFF] rounded-2xl h-[60%] items-center justify-between">
               <div className="h-[100%] w-[60%] flex items-center justify-center">
                    <img src={product.images} alt={product.title} className="h-[274px] w-[274px] " />
               </div>
               <div className="flex flex-col gap-[14px] items-center">
                    <h2>{product.title}</h2>
                    <p className="w-[78%]">{product.description}</p>
                    <h3>{product.price} $</h3>
                    <button  className="w-[80%] h-[40px] bg-[#0E6FFA] rounded-2xl cursor-pointer flex justify-center items-center text-[#FFFFFF]">Buy Now</button>
                    <button  className="w-[80%] h-[40px] text-[#0E6FFA] rounded-2xl cursor-pointer flex justify-center items-center border-2">Add to Cart</button>
               </div>
            </div>
        </div>
    )

}

export default ProductPage;