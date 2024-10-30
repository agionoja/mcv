import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { GalleryIcon } from "~/components/icons";
import { ROUTES } from "~/routes";
import { Modal } from "~/components/modal";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast, redirectWithSuccessToast } from "~/toast";
import { SuccessResponse } from "~/dto";

export const meta: MetaFunction = () => {
  return [
    { title: "New Inventory | MCV" },
    { name: "description", content: "MCV account: New Inventory" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newInventoryData = Object.fromEntries(formData);

  console.log({ newInventoryData });
  const { error, data } = await fetchClient<SuccessResponse<{ data: null }>>({
    endpoint: END_POINT.PRODUCT,
    init: {
      method: "POST",
      body: JSON.stringify(newInventoryData),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  if (error)
    return redirectWithErrorToast({
      redirectTo: ROUTES.NEW_INVENTORY,
      message: error.message,
    });

  console.log(data);
  return redirectWithSuccessToast({
    redirectTo: ROUTES.INVENTORIES,
    message: "Product added successfully!",
  });
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
  IMAGE = "image",
}

export default function NewInventory() {
  return (
    <>
      <Modal>
        <AddForm
          showFilePicker={true}
          formProps={{ method: "POST", encType: "multipart/form-data" }}
          addBtnLabel={{
            default: "Add Product",
            submitting: "Adding Product...",
          }}
          formLabel={"New Product"}
          cancelRoute={ROUTES.INVENTORIES}
          control={[
            {
              label: "Product Name",
              type: "input",
              inputProps: {
                type: "text",
                name: PRODUCT.NAME,
                placeholder: "Enter product name",
              },
            },
            // {
            //   label: "Product ID",
            //   type: "input",
            //   inputProps: {
            //     type: "text",
            //     name: PRODUCT.ID,
            //     placeholder: "Enter product ID",
            //   },
            // },
            {
              label: "Category",
              type: "select",
              name: PRODUCT.CATEGORY,
              required: true,
              options: [
                { value: "Electronics", label: "Electronics" },
                { value: "apparel", label: "Apparel" },
              ],
            },
            {
              label: "Buying Price",
              type: "input",
              inputProps: {
                type: "number",
                name: PRODUCT.BUYING_PRICE,
                placeholder: "Enter buying price",
              },
            },
            {
              label: "Quantity",
              type: "input",
              inputProps: {
                type: "number",
                name: PRODUCT.QUANTITY,
                placeholder: "Enter product quantity",
              },
            },
            {
              label: "Unit",
              type: "input",
              inputProps: {
                type: "text",
                name: PRODUCT.UNIT,
                placeholder: "Enter product unit",
              },
            },
            {
              label: "Threshold Value",
              type: "input",
              inputProps: {
                type: "number",
                name: PRODUCT.THRESHOLD_VALUE,
                placeholder: "Enter threshold value",
              },
            },
            {
              label: "Expiry Date",
              type: "input",
              inputProps: {
                type: "date",
                name: PRODUCT.EXPIRY_DATE,
                placeholder: "Enter expiry date",
              },
            },
          ]}
          filePickerProps={{
            icon: GalleryIcon,
            position: "center",
            maxSize: { mb: 1000 },
            fileTypes: ["image/*"],
            inputProps: {
              name: PRODUCT.IMAGE,
              "aria-label": "Add product image",
              required: true,
            },
          }}
        ></AddForm>
      </Modal>
    </>
  );
}