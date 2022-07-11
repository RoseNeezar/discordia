import Link from "next/link";
import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1 className="bg-red-400">Discord app</h1>
      <Link href={"/app"}>
        <a>Click</a>
      </Link>
    </div>
  );
}
