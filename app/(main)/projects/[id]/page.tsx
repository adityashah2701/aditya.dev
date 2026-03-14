import { redirect } from "next/navigation";

/**
 * /projects/[id] is deprecated.
 * Projects are now explored inline on the /projects page.
 * Redirect anyone with a bookmarked URL back to the explorer.
 */
export default function ProjectDetail() {
  redirect("/projects");
}
