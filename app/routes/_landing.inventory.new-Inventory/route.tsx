import type { MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { GalleryIcon } from "~/components/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "New Inventory | MCV" },
    { name: "description", content: "MCV account New Inventory" },
  ];
};

export default function NewInventory() {
  return (
    <>
      <AddForm
        label={[
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
          {
            label: "Product Name",
            inputProps: {
              type: "text",
              name: "productName",
              placeholder: "Enter Product Name",
            },
          },
        ]}
        filePickerProps={{
          icon: GalleryIcon,
          position: "center",
          inputProps: {
            name: "addProduct",
            "aria-label": "Add product image",
          },
        }}
        addBtnLabel={"Add Product"}
        formLabel={"New Product"}
      ></AddForm>
    </>
  );
}
