import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { Modal } from "~/components/modal";
import { AddForm } from "~/components/add-form";
import { ROUTE_CONFIG } from "~/route.config";

enum STORE {
  NAME = "name",
  LOCATION = "location",
}

export const action: ActionFunction = async function ({ request }) {
  const formData = await request.formData();
  const newStoreData = Object.fromEntries(formData);

  return json({ newStoreData });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Add Store | MCV" },
    { name: "description", content: "MCV account: Add Store" },
  ];
};

export default function NewStore() {
  return (
    <Modal>
      <AddForm
        formLabel={"New Store"}
        formProps={{ encType: "application/x-www-form-urlencoded" }}
        addBtnLabel={{ default: "Add Store", submitting: "Adding Store.." }}
        cancelRoute={ROUTE_CONFIG.MANAGE_STORE}
        showFilePicker={true}
        filePickerProps={{ fileTypes: ["image/*"] }}
        control={[
          {
            type: "input",
            label: "Store Name",
            inputProps: {
              placeholder: "Enter store name",
              minLength: 4,
              name: STORE.NAME,
            },
          },
          {
            type: "input",
            label: "Store Location",
            inputProps: {
              placeholder: "Enter store location",
              minLength: 4,
              name: STORE.LOCATION,
            },
          },
        ]}
      />
    </Modal>
  );
}
