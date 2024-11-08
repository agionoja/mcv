import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { ROUTES } from "~/routes";
import { Modal } from "~/components/modal";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast, redirectWithSuccessToast } from "~/toast";
import { Product } from "~/routes/_landing.inventories/route";
import { GalleryIcon } from "~/components/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "New Inventory | MCV" },
    { name: "description", content: "MCV account: New Inventory" },
  ];
};

export enum PRODUCT {
  NAME = "Product_name",
  CATEGORY = "Category",
  BUYING_PRICE = "Buying_Price",
  SELLING_PRICE = "Selling_Price",
  QUANTITY = "Quantity",
  UNIT = "Unit",
  EXPIRY_DATE = "Expiry_Date",
  THRESHOLD_VALUE = "Threshold_Value",
  IMAGE = "Image",
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const date = formData.get(PRODUCT.EXPIRY_DATE);
  formData.delete(PRODUCT.EXPIRY_DATE);
  formData.append(PRODUCT.EXPIRY_DATE, new Date(String(date)).toISOString());

  const { error, data: product } = await fetchClient<Product>({
    endpoint: END_POINT.PRODUCT,
    init: {
      method: "POST",
      body: formData,
    },
  });

  if (error)
    return redirectWithErrorToast({
      redirectTo: ROUTES.NEW_INVENTORY,
      message: error.message,
    });

  console.log(product);
  return redirectWithSuccessToast({
    redirectTo: ROUTES.INVENTORIES,
    message: "Product added successfully!",
  });
}

export default function NewInventory() {
  return (
    <>
      <Modal>
        <AddForm
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
            {
              label: "Category",
              type: "select",
              name: PRODUCT.CATEGORY,
              required: true,
              options: [
                { value: "babyOil", label: "Baby Oil" },
                { value: "cream", label: "Cream" },
                { value: "perfume", label: "Perfume" },
                { value: "deodorant", label: "Deodorant" },
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
              label: "Selling Price",
              type: "input",
              inputProps: {
                type: "number",
                name: PRODUCT.SELLING_PRICE,
                placeholder: "Enter selling price",
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
            },
          }}
        ></AddForm>
      </Modal>
    </>
  );
}
