import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Security | MCV" },
    { name: "description", content: "MCV account: Security" },
  ];
};

export default function Security() {
  return <></>;
}
