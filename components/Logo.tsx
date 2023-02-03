import Image from "next/image";
import { basePath } from "@/next.config";
import { HTMLProps } from "react";

const Logo = (props: HTMLProps<HTMLAnchorElement>) => (
  <a
    href="https://tko-aly.fi"
    target="_blank"
    rel="noreferer noopener"
    {...props}
  >
    <Image
      src={`${basePath}/logo.svg`}
      width={72}
      height={72}
      alt="Logo of TKO-äly ry"
    />
  </a>
);

export default Logo;
