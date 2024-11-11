import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { UserIcon } from "~/components/icons";
import { ROUTES } from "~/routes";
import { Modal } from "~/components/modal";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast, redirectWithSuccessToast } from "~/toast";

enum SUPPLIER {
  NAME = "Supplier_name",
  PRODUCT = "Product",
  CATEGORY = "Category",
  BUYING_PRICE = "Buying_Price",
  CONTACT_NUMBER = "Contact_Number",
  TAKING_RETURNS = "TAKING_RETURN",
  NOT_TAKING_RETURNS = "NOT_TAKING_RETURN",
  PHOTO = "Photo",
}

export type Supplier = {
  id: string;
  Supplier_name: string;
  Contact_Number: string;
  productId?: string;
  Photo: string;
  Buying_Price: number;
  Type: string;
  createdAt: Date;
  updatedAt: Date;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Add Suppliers | MCV" },
    { name: "description", content: "MCV account: Add Suppliers" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const { error } = await fetchClient({
    endpoint: END_POINT.SUPPLIER,
    init: {
      method: "POST",
      body: formData,
    },
  });

  if (error) {
    return redirectWithErrorToast({
      redirectTo: ROUTES.NEW_SUPPLIER,
      message: error.message,
    });
  }

  return redirectWithSuccessToast({
    message: "Supplier added successfully",
    redirectTo: ROUTES.SUPPLIERS,
  });
};

export default function AddSuppliers() {
  return (
    <Modal>
      <AddForm
        formProps={{ method: "POST", encType: "multipart/form-data" }}
        addBtnLabel={{
          submitting: "Adding Supplier...",
          default: "Add Supplier",
        }}
        formLabel={"New Supplier"}
        cancelRoute={ROUTES.SUPPLIERS}
        control={[
          {
            label: "Supplier Name",
            type: "input",
            inputProps: {
              type: "text",
              name: SUPPLIER.NAME,
              placeholder: "Enter supplier name",
            },
          },
          // {
          //   label: "Product Name",
          //   type: "input",
          //   inputProps: {
          //     type: "text",
          //     name: SUPPLIER.PRODUCT,
          //     placeholder: "Enter product name",
          //   },
          // },
          // {
          //   label: "Category",
          //   type: "select",
          //   required: true,
          //   name: SUPPLIER.CATEGORY,
          //   options: [
          //     { value: "newOder", label: "New Order" },
          //     { value: "oldOder", label: "Old Order" },
          //   ],
          // },
          {
            label: "Buying Price",
            type: "input",
            inputProps: {
              type: "number",
              name: SUPPLIER.BUYING_PRICE,
              placeholder: "Enter buying price",
            },
          },
          {
            label: "Contact Number",
            type: "input",
            inputProps: {
              type: "tel",
              name: SUPPLIER.CONTACT_NUMBER,
              placeholder: "Enter supplier contact number",
            },
          },
          {
            label: "Type",
            type: "select",
            required: true,
            name: "Type",
            options: [
              { value: SUPPLIER.TAKING_RETURNS, label: "Taking turns" },
              { value: SUPPLIER.NOT_TAKING_RETURNS, label: "Not taking turns" },
            ],
          },
        ]}
        filePickerProps={{
          icon: UserIcon,
          position: "center",
          maxSize: { mb: 1000 },
          fileTypes: ["image/*"],
          inputProps: {
            name: SUPPLIER.PHOTO,
            "aria-label": "supplier image",
            required: true,
          },
        }}
      ></AddForm>
    </Modal>
  );
}
