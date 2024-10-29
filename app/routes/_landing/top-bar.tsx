import { Form, useNavigation } from "@remix-run/react";
import { ROUTES } from "~/routes";
import { Avatar, NotificationIcon, SearchIcon } from "~/components/icons";
import { useEffect, useRef } from "react";
import { Input } from "~/components/Input";

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
      <Form className={"relative w-[400px]"} action={ROUTES.SEARCH}>
        <label className={"sr-only"} htmlFor={"search"}>
          Search
        </label>
        <Input
          id={"search"}
          placeholder={"Search product, supplier, order"}
          className={"h-full w-full py-2.5 pl-12"}
          type="search"
          aria-label={"search"}
        />
        <button className={"absolute left-4 top-1/2 -translate-y-1/2"}>
          <SearchIcon />
        </button>
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
