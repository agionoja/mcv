import type { MetaFunction } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs, Form, Outlet } from "@remix-run/react";
import fetchClient, { END_POINT } from "~/fetch-client";
import {
  cacheClientLoader,
  invalidateCache,
  useCachedLoaderData,
  useCacheInvalidator,
} from "remix-client-cache";
import { redirectWithErrorToast } from "~/toast";
import { ROUTES } from "~/routes";
import { useEffect } from "react";

export type Store = {
  id: string;
  userId: string;
  Store_Name: string;
  photo: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Manage Store | MCV" },
    { name: "description", content: "MCV account: Manage Store" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { error, data: stores } = await fetchClient<Store[]>({
    endpoint: END_POINT.STORE,
    init: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (error)
    return redirectWithErrorToast({
      message: error.message,
      redirectTo: ROUTES.MANAGE_STORE,
    });

  // console.log(stores);
  return { error, stores };
}

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  return cacheClientLoader(args, { key: ROUTES.MANAGE_STORE });
}

export default function ManageStore() {
  const { stores } = useCachedLoaderData<typeof loader>();
  // const invalidator = useCacheInvalidator();

  useEffect(() => {
    if (!Object.keys(stores).length)
      invalidateCache(ROUTES.MANAGE_STORE).then(() =>
        console.log("Cache invalidated"),
      );
  }, [stores]);

  return (
    <>
      <div className={"w-full bg-white px-4 py-4.5"}>
        <Outlet />
        <ul>
          {stores.map((store, index) => (
            <li key={index}>
              <Store Store_Name={store.Store_Name} location={store.location} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function Store({
  Store_Name,
  location,
}: Pick<Store, "Store_Name" | "location">) {
  return (
    <>
      <div className={"flex w-full gap-4"}>
        <div
          className={
            "flex basis-[40%] items-center justify-center bg-border-color py-14"
          }
        >
          <h3>{Store_Name}</h3>
        </div>
        <div className={"flex basis-full justify-between"}>
          <div className={"flex flex-col gap-4 bg-white"}>
            <span>{Store_Name}</span>
            <span>{location}</span>
          </div>
          <Form method={"POST"}>
            <button
              type={"submit"}
              className={"border-2 px-6 py-2 text-primary-cta"}
            >
              Edit
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
