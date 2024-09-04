import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Supplier } from "../types/supplier";
import axios from "axios";

//mutation for create new object supplier
export default function useCreateSuppliers(onCreate: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplier: Supplier) =>
      axios
        .post<Supplier>("http://localhost:8080/api/supplier", supplier)
        .then((response) => response.data),
    onMutate: (newPost) => {
      //optimistic UI
      const oldPost = queryClient.getQueryData<Supplier[]>(["suppliers"]); //saves status previos to doing post method

      queryClient.setQueryData<Supplier[]>(["suppliers"], (supplier = []) => [
        newPost,
        ...supplier,
      ]);
      return oldPost;
    },
    onSuccess: (savedObj, newObject) => {
      queryClient.setQueryData<Supplier[]>(["suppliers"], (suppliers = []) =>
        suppliers.map((supplier) =>
          supplier.id === newObject.id ? savedObj : supplier
        )
      );
    },
    onError: (errr, newObject, context) => {
      // return to state previos
      queryClient.setQueryData<Supplier[]>(["suppliers"], context);
    },
  });
}
