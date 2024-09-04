export type Supplier = {
  id?: number;
  supplierName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  createdBy?: string;
  creationTime?: string;
  modifiedBy?: string | null;
  modificationTime?: string | null;
};
