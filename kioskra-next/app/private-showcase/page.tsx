import { redirect } from "next/navigation";

export default function PrivateShowcaseRedirectPage() {
  redirect("/portfolio-showcase");
}
