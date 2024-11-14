import { Product } from "~/routes/_landing.inventories/route";
import { HTMLAttributes } from "react";
import { Container } from "./container";

export function LowQualityStock({
  products,
  className,
  ...props
}: { products: Product[] } & HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <Container className={`${className}`} {...props}>
        <h2>Low Quality Stock</h2>
        <ul className={"flex flex-col gap-4"}>
          {products.map((product, index) => (
            <li
              key={index}
              className={"flex items-center justify-between gap-7"}
            >
              <img
                height={70}
                width={60}
                className={"aspect-auto h-[70px] w-[60px] rounded-md"}
                src={product.Image}
                alt={product.Product_name}
              />
              <div>
                <h3 className={"text-md font-bold"}>Tata Salt</h3>
                Remaining Quantity: {product.Quantity} Packet
              </div>
              <span className={"text-neutral-clr"}>Low</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
