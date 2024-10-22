import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { ROUTE_CONFIG } from "~/route.config";
import { Modal } from "~/components/modal";

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

  return json({ orderData });
};

export default function NewOder() {
  return (
    <Modal>
      <AddForm
        formProps={{ method: "POST", encType: "multipart/form-data" }}
        addBtnLabel={{ default: "Add Order", submitting: "Adding Order..." }}
        formLabel={"New Order"}
        cancelRoute={ROUTE_CONFIG.INVENTORY}
        control={[
          {
            label: "Product Name",
            type: "input",
            inputProps: {
              type: "text",
              name: ODER.PRODUCT_NAME,
              placeholder: "Enter product name",
            },
          },
          {
            label: "Product ID",
            type: "input",
            inputProps: {
              type: "text",
              name: ODER.PRODUCT_ID,
              placeholder: "Enter product ID",
            },
          },
          {
            label: "Category",
            type: "select",
            required: true,
            name: ODER.CATEGORY,
            options: [
              { value: "newOder", label: "New Order" },
              { value: "oldOder", label: "Old Order" },
            ],
          },
          {
            label: "Order Value",
            type: "input",
            inputProps: {
              type: "number",
              name: ODER.ORDER_VALUE,
              placeholder: "Enter order value",
              min: 1,
            },
          },
          {
            label: "Quantity",
            type: "input",
            inputProps: {
              type: "number",
              name: ODER.QUANTITY,
              placeholder: "Enter product quantity",
              min: 1,
            },
          },
          {
            label: "Unit",
            type: "input",
            inputProps: {
              type: "number",
              name: ODER.UNIT,
              placeholder: "Enter product unit",
              min: 1,
            },
          },
          {
            label: "Buying Price",
            type: "input",
            inputProps: {
              type: "number",
              name: ODER.BUYING_PRICE,
              placeholder: "Enter buying price",
              min: 1,
            },
          },
          {
            label: "Date of delivery",
            type: "input",
            inputProps: {
              type: "date",
              name: ODER.DATE_OF_DELIVERY,
              placeholder: "Enter date of delivery",
            },
          },
        ]}
      ></AddForm>
    </Modal>
  );
}
