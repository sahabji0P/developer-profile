import Link from "next/link";

export default function NotFound() {
  return (
    <div className="content-frame">
      <p className="content-paragraph">
        This page does not exist. <Link href="/">Home</Link>
      </p>
    </div>
  );
}
