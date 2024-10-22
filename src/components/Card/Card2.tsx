import { ProductView } from "../CategoryProducts/CategoryProducts";

interface CardProps {
    product: ProductView;
}

const Card2 = ({ product }: CardProps) => {
    return (
        <div className="max-w-xs h-full flex flex-col justify-between mx-auto bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-fit rounded-t-lg"
            />
            <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                    <div className="text-base font-medium text-gray-900">
                        {product.price.toFixed(2)} €
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card2;