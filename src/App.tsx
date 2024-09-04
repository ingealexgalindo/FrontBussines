import { useState } from "react";
import useSuppliers from "./hooks/querySuppliers";
import useCreateSuppliers from "./hooks/useCreateSupplier";
import { Supplier } from "./types/supplier";

export default function App() {
  const [supplierId, setSupplierId] = useState<number | undefined>(undefined);

  const { data, error, isLoading } = useSuppliers(supplierId);
  const {
    mutate,
    isPending,
    error: createSupplierError,
  } = useCreateSuppliers(() => {});

  const handleClick = () => {
    const newSupplier: Supplier = {
      supplierName: "MAZDA ",
      contactName: "Steve",
      contactEmail: "Apple@Apple.com",
      contactPhone: "54564564",
      address: "Japon",
      createdBy: "ADMIN",
    };

    mutate(newSupplier);
  };

  if (error) return <h2>{error.message} </h2>;
  if (isPending) return <h2>Cargando ...</h2>;

  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Supplier"}
        </button>
        {error && <div className="alert alert-danger mt-2">Error: {error}</div>}
      </div>

      <select
        value={supplierId}
        onChange={(e) => {
          if (e.target.value !== "") {
            setSupplierId(Number(e.target.value));
          } else {
            setSupplierId(undefined);
          }
        }}
      >
        <option value="">Todos</option>
        {data?.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.supplierName}
          </option>
        ))}
      </select>

      <h2>Suppliers</h2>
      <ul>
        {data?.map((supplier) => (
          <li key={supplier.id}>{supplier.supplierName}</li>
        ))}
      </ul>
    </>
  );
}
