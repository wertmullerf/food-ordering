import { ModalContent } from "./ModalContent";

export const SearchForm = () => {
    return (
        <>
            <div
                className="alert alert-success"
                role="alert"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <strong>Buscar Pedido</strong>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <ModalContent />
            </div>
        </>
    );
};
