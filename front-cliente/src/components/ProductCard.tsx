import { Link } from "react-router-dom";
import { Product } from "../types/product";
import "./ProductCard.css";

interface ProductCardProps {
    producto: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
    console.log(producto.imageUrl);
    return (
        <tr
            className="align-middle border-bottom pointer"
            onClick={() => (window.location.href = `/producto/${producto._id}`)}
            style={{ cursor: "pointer" }}
        >
            <td className="text-center">
                <img
                    className="img-fluid"
                    // src={producto.imageUrl}
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                    }}
                />
            </td>
            <td>
                <div>
                    <p className="m-0 fw-bold">{producto.nombre}</p>
                    <p className="m-0 text-muted w-50">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Amet mollitia nulla consequuntur, corporis esse
                        quod rem.
                    </p>
                </div>
            </td>

            <td className="fw-bold">${producto.precio.toFixed(2)}</td>
        </tr>
    );
};

export default ProductCard;
