import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Personal Info | MCV" },
    { name: "description", content: "MCV account: Personal Info" },
  ];
};

export default function PersonalInfo() {
  return <></>;
}
