import { ActionFunction, MetaFunction } from "@remix-run/node";
import { AddForm } from "~/components/add-form";
import { ROUTES } from "~/routes";
import { Modal } from "~/components/modal";
import fetchClient, { END_POINT } from "~/fetch-client";
import { redirectWithErrorToast, redirectWithSuccessToast } from "~/toast";

enum USER {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  ROLE = "role",
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
  const formObj = {
    ...Object.fromEntries(formData),
    [USER.PASSWORD]: "password",
    [USER.CONFIRM_PASSWORD]: "password",
  };

  console.log(formObj);

  const { error } = await fetchClient({
    endpoint: END_POINT.SIGN_UP,
    init: {
      method: "POST",
      body: JSON.stringify(formObj),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (error) {
    return redirectWithErrorToast({
      redirectTo: ROUTES.ADD_USER,
      message: error.message,
    });
  }

  return redirectWithSuccessToast({
    message: "User created Successfully successfully",
    redirectTo: ROUTES.USERS,
  });
};

export default function AddSuppliers() {
  return (
    <Modal>
      <AddForm
        formProps={{ method: "POST" }}
        addBtnLabel={{
          submitting: "Adding user...",
          default: "Add user",
        }}
        formLabel={"New User"}
        cancelRoute={ROUTES.USERS}
        control={[
          {
            label: "Name",
            type: "input",
            inputProps: {
              type: "text",
              name: USER.NAME,
              placeholder: "Enter user name",
            },
          },
          {
            label: "Email",
            type: "input",
            inputProps: {
              type: "email",
              name: USER.EMAIL,
              placeholder: "Enter user email",
            },
          },
          {
            label: "Role",
            type: "select",
            required: true,
            name: USER.ROLE,
            options: [
              { value: "MANAGER", label: "Manager" },
              { value: "REPRESENTATIVE", label: "Sales Rep" },
            ],
          },
        ]}
      ></AddForm>
    </Modal>
  );
}
