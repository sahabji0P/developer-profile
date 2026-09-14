import Link from "next/link";
import { formatMonthYear } from "@/lib/mdx";

type BlogRowProps = {
  href: string;
  title: string;
  date: string;
};

export function BlogRow({ href, title, date }: BlogRowProps) {
  return (
    <Link href={href} className="blog-row">
      <span>{title}</span>
      <time dateTime={date}>{formatMonthYear(date)}</time>
    </Link>
  );
}
