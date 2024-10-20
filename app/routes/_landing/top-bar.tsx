import { Form, useNavigation } from "@remix-run/react";
import { ROUTE_CONFIG } from "~/route.config";
import { Avatar, NotificationIcon, SearchIcon } from "~/components/icons";
import { useEffect, useRef } from "react";

export function TopBar() {
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (navigation.state !== "submitting") {
      formRef?.current?.blur();
    }
  }, [navigation.state]);

  return (
    <div className={"flex h-24 w-full justify-between bg-white px-8 py-7"}>
      <Form
        className={
          "flex w-[400px] items-center gap-2 rounded-1 border px-4 py-2.5"
        }
        action={ROUTE_CONFIG.SEARCH}
      >
        <button>
          <SearchIcon />
        </button>
        <input
          placeholder={"Search product, supplier, order"}
          className={"w-full focus:outline-none"}
          type="search"
          aria-label={"search"}
        />
      </Form>

      <div className={"flex items-center gap-6"}>
        <Form>
          <button>
            <NotificationIcon />
          </button>
        </Form>
        <Avatar />
      </div>
    </div>
  );
}
