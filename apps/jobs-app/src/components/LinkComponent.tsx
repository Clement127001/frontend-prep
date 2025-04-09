import Link from "next/link";
import React, { ReactNode } from "react";

const LinkComponent = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} className="linkButton">
      {children}
    </Link>
  );
};

export default LinkComponent;
