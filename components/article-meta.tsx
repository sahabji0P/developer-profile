import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { formatMonthYear } from "@/lib/mdx";

const hasAvatar = fs.existsSync(
  path.join(process.cwd(), "public", "sj.jpeg"),
);

type ArticleMetaProps = {
  date?: string;
};

export function ArticleMeta({ date }: ArticleMetaProps) {
  return (
    <Link className="article-meta" href="/">
      {hasAvatar ? (
        <Image
          src="/sj.jpeg"
          alt=""
          width={20}
          height={20}
          style={{ filter: "grayscale(1)", borderRadius: 9999 }}
        />
      ) : null}
      {date ? <time dateTime={date}>{formatMonthYear(date)}</time> : null}
      {date ? <span>·</span> : null}
      <span>{site.name}</span>
    </Link>
  );
}
