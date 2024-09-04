import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Supplier } from "../types/supplier";

//get by Id
const querySuppliersById = (id: number | undefined): Promise<Supplier[]> => {
  const url = id
    ? `http://localhost:8080/api/supplier/${id}`
    : "http://localhost:8080/api/supplier";

  return axios.get(url).then((response) => {
    // if response is object, convert in array
    return Array.isArray(response.data) ? response.data : [response.data];
  });
};

function useSuppliersById(supplierId: number | undefined) {
  return useQuery({
    queryKey: supplierId
      ? ["supplier", supplierId, "suppliers"]
      : ["suppliers"],
    queryFn: () => querySuppliersById(supplierId),
  });
}

//get all data
const querySuppliersGetAll = (): Promise<Supplier[]> => {
  const url = "http://localhost:8080/api/supplier";

  return axios.get(url).then((response) => {
    // Si la respuesta es un objeto, lo convertimos en un array
    return Array.isArray(response.data) ? response.data : [response.data];
  });
};

export function useSuppliersGetAll() {
  return useQuery({
    queryKey: ["suppliers"], //save data
    queryFn: () => querySuppliersGetAll(),
  });
}

/* get by params
const querySuppliers = (id: number | undefined): Promise<Supplier[]> => {
  const url = "http://localhost:8080/api/supplier";

  return axios.get(url, { params: { id } }).then((response) => response.data);
};*/

export default useSuppliersById;
