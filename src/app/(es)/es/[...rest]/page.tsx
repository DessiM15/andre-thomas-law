import { notFound } from "next/navigation";

/** Spanish twin of `(en)/[...rest]` — see the note there. */
export default function CatchAll() {
  notFound();
}
