import { Product } from "../types/product";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
    producto: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
    const navigate = useNavigate();
    return (
        <tr
            className="align-middle border-bottom pointer"
            onClick={() => navigate(`/producto/${producto._id}`)}
            style={{
                cursor: "pointer",
            }}
        >
            <td
                className="text-center"
                style={{ padding: "5px 10px", width: "90px" }}
            >
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
                    <p className="m-0 text-muted w-50 ">
                        {producto.descripcion}
                    </p>
                </div>
            </td>

            <td
                style={{
                    padding: "5px 10px",
                    fontSize: "16px",
                    textAlign: "right",
                    width: "100px",
                }}
                className="fw-bold"
            >
                ${producto.precio.toFixed(2)}
            </td>
        </tr>
    );
};

export default ProductCard;
