import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { GalleryIcon } from "~/components/icons";
import { ROUTE_CONFIG } from "~/route.config";
import { Modal } from "~/components/Modal";

export const meta: MetaFunction = () => {
  return [
    { title: "New Inventory | MCV" },
    { name: "description", content: "MCV account: New Inventory" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return Object.fromEntries(formData);
};

enum PRODUCT {
  NAME = "name",
  ID = "id",
  CATEGORY = "category",
  BUYING_PRICE = "buyingPrice",
  QUANTITY = "quantity",
  UNIT = "unit",
  EXPIRY_DATE = "expiryDate",
  THRESHOLD_VALUE = "thresholdValue",
  PHOTO = "photo",
}

export default function NewInventory() {
  return (
    <>
      <Modal>
        <AddForm
          label={[
            {
              label: "Product Name",
              inputProps: {
                type: "text",
                name: PRODUCT.NAME,
                placeholder: "Enter product name",
              },
            },
            {
              label: "Product ID",
              inputProps: {
                type: "text",
                name: PRODUCT.ID,
                placeholder: "Enter product ID",
              },
            },
            {
              label: "Category",
              inputProps: {
                type: "text",
                name: PRODUCT.CATEGORY,
                placeholder: "Select product category", // TODO: Implement select here
              },
            },
            {
              label: "Buying Price",
              inputProps: {
                type: "text",
                name: PRODUCT.BUYING_PRICE,
                placeholder: "Enter buying price",
              },
            },
            {
              label: "Quantity",
              inputProps: {
                type: "text",
                name: PRODUCT.QUANTITY,
                placeholder: "Enter product quantity",
              },
            },
            {
              label: "Unit",
              inputProps: {
                type: "text",
                name: PRODUCT.UNIT,
                placeholder: "Enter product unit",
              },
            },
            {
              label: "Expiry Date",
              inputProps: {
                type: "text",
                name: PRODUCT.EXPIRY_DATE,
                placeholder: "Enter expiry date",
              },
            },
            {
              label: "Threshold Value",
              inputProps: {
                type: "text",
                name: PRODUCT.THRESHOLD_VALUE,
                placeholder: "Enter threshold value",
              },
            },
          ]}
          filePickerProps={{
            icon: GalleryIcon,
            position: "center",
            maxSize: { mb: 1000 },
            fileTypes: ["image/*"],
            inputProps: {
              name: PRODUCT.PHOTO,
              "aria-label": "Add product image",
              required: true,
            },
          }}
          formProps={{ method: "POST", encType: "multipart/form-data" }}
          addBtnLabel={{
            default: "Add Product",
            submitting: "Adding Product...",
          }}
          formLabel={"New Product"}
          cancelRoute={ROUTE_CONFIG.INVENTORY}
        ></AddForm>
      </Modal>
    </>
  );
}
