import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { ROUTE_CONFIG } from "~/route.config";
import { Modal } from "~/components/Modal";

enum ODER {
  PRODUCT_NAME = "product",
  PRODUCT_ID = "productId",
  CATEGORY = "category",
  ORDER_VALUE = "orderValue",
  QUANTITY = "quantity",
  UNIT = "unit",
  BUYING_PRICE = "buyingPrice",
  DATE_OF_DELIVERY = "dateOfDelivery",
}

export const meta: MetaFunction = () => {
  return [
    { title: "Add Order | MCV" },
    { name: "description", content: "MCV account: Add Order" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const orderData = Object.fromEntries(formData);

  console.log(orderData);

  return json({ orderData });
};

export default function NewOder() {
  return (
    <Modal>
      <AddForm
        label={[
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: ODER.PRODUCT_NAME,
              placeholder: "Enter product name",
            },
          },
          {
            label: "Product ID",
            inputProps: {
              type: "text",
              name: ODER.PRODUCT_ID,
              placeholder: "Select product category", // TODO: Implement select here
            },
          },
          {
            label: "Category",
            inputProps: {
              type: "text",
              name: ODER.CATEGORY,
              placeholder: "Enter product category",
            },
          },
          {
            label: "Order Value",
            inputProps: {
              type: "number",
              name: ODER.ORDER_VALUE,
              placeholder: "Enter order value",
              min: 1,
            },
          },
          {
            label: "Quantity",
            inputProps: {
              type: "number",
              name: ODER.QUANTITY,
              placeholder: "Enter product quantity",
              min: 1,
            },
          },
          {
            label: "Unit",
            inputProps: {
              type: "number",
              name: ODER.UNIT,
              placeholder: "Enter product unit",
              min: 1,
            },
          },
          {
            label: "Buying Price",
            inputProps: {
              type: "number",
              name: ODER.BUYING_PRICE,
              placeholder: "Enter buying price",
              min: 1,
            },
          },
          {
            label: "Date of delivery",
            inputProps: {
              type: "date",
              name: ODER.DATE_OF_DELIVERY,
              placeholder: "Enter date of delivery",
            },
          },
        ]}
        formProps={{ method: "POST", encType: "multipart/form-data" }}
        addBtnLabel={{ default: "Add Order", submitting: "Adding Order..." }}
        formLabel={"New Order"}
        cancelRoute={ROUTE_CONFIG.INVENTORY}
      ></AddForm>
    </Modal>
  );
}
