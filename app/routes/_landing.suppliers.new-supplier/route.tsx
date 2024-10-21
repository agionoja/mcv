import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { UserIcon } from "~/components/icons";
import { ROUTE_CONFIG } from "~/route.config";
import { Modal } from "~/components/Modal";

enum SUPPLIER {
  NAME = "name",
  PRODUCT = "product",
  CATEGORY = "category",
  BUYING_PRICE = "buyingPrice",
  CONTACT_NUMBER = "contactNumber",
  TAKING_RETURNS = "takingReturnsTurns",
  NOT_TAKING_RETURNS = "notTakingReTurns",
  PHOTO = "photo",
}

export const meta: MetaFunction = () => {
  return [
    { title: "Add Suppliers | MCV" },
    { name: "description", content: "MCV account: Add Suppliers" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const supplierData = Object.fromEntries(formData);

  return json({ supplierData });
};

export default function AddSuppliers() {
  return (
    <Modal>
      <AddForm
        label={[
          {
            label: "Supplier Name",
            inputProps: {
              type: "text",
              name: SUPPLIER.NAME,
              placeholder: "Enter supplier name",
            },
          },
          {
            label: "Product ID",
            inputProps: {
              type: "text",
              name: SUPPLIER.PRODUCT,
              placeholder: "Select product category", // TODO: Implement select here
            },
          },
          {
            label: "Category",
            inputProps: {
              type: "text",
              name: SUPPLIER.CATEGORY,
              placeholder: "Enter product category",
            },
          },
          {
            label: "Buying Price",
            inputProps: {
              type: "number",
              name: SUPPLIER.BUYING_PRICE,
              placeholder: "Enter buying price",
            },
          },
          {
            label: "Contact Number",
            inputProps: {
              type: "tel",
              name: SUPPLIER.CONTACT_NUMBER,
              placeholder: "Enter supplier contact number",
            },
          },
          {
            label: "Type",
            inputProps: {
              type: "text",
              name: SUPPLIER.TAKING_RETURNS,
              placeholder: "Not taking return",
            },
          },
          {
            label: "",
            inputProps: {
              type: "text",
              name: SUPPLIER.NOT_TAKING_RETURNS,
              placeholder: "Taking return",
            },
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
        formProps={{ method: "POST", encType: "multipart/form-data" }}
        addBtnLabel={{
          submitting: "Adding Supplier...",
          default: "Add Supplier",
        }}
        formLabel={"New Supplier"}
        cancelRoute={ROUTE_CONFIG.INVENTORY}
      ></AddForm>
    </Modal>
  );
}
