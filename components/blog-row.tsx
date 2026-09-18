import Link from "next/link";

type BlogRowProps = {
  href: string;
  title: string;
  date: string;
};

function formatMonthYear(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, 1)).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );
}

export function BlogRow({ href, title, date }: BlogRowProps) {
  return (
    <Link href={href} className="blog-row">
      <span>{title}</span>
      <time dateTime={date}>{formatMonthYear(date)}</time>
    </Link>
  );
}
