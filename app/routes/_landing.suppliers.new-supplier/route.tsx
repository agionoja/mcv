import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { UserIcon } from "~/components/icons";
import { ROUTES } from "~/routes";
import { Modal } from "~/components/modal";

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

  // console.log(supplierData);

  return json({ supplierData });
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
        showFilePicker={true}
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
          {
            label: "Product Name",
            type: "input",
            inputProps: {
              type: "text",
              name: SUPPLIER.PRODUCT,
              placeholder: "Enter product name",
            },
          },
          {
            label: "Category",
            type: "select",
            required: true,
            name: SUPPLIER.CATEGORY,
            options: [
              { value: "newOder", label: "New Order" },
              { value: "oldOder", label: "Old Order" },
            ],
          },
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
            type: "input",
            inputProps: {
              type: "text",
              name: SUPPLIER.TAKING_RETURNS,
              placeholder: "Not taking return",
            },
          },
          {
            label: "",
            type: "input",
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
      ></AddForm>
    </Modal>
  );
}
