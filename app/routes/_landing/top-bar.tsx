import { Form, useNavigation } from "@remix-run/react";
import { ROUTE_CONFIG } from "~/route.config";
import { NotificationIcon, SearchIcon } from "~/components/icons";
import avatar from "~/assets/images/avata.png";
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
    <div
      className={
        "w-ull flex h-24 justify-between rounded-xl bg-white px-8 py-7"
      }
    >
      <Form
        className={"flex w-[400px] items-center gap-2 border px-4 py-2.5"}
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
        <img
          src={avatar}
          height={40}
          width={40}
          className={"rounded-full"}
          alt="user avata"
        />
      </div>
    </div>
  );
}
