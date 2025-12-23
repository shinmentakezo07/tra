import { auth } from "@/auth";
import HeaderClient from "./HeaderClient";

// Server Component - Fetch auth data on server
export default async function HeaderServer() {
  const session = await auth();
  
  return <HeaderClient user={session?.user} />;
}
