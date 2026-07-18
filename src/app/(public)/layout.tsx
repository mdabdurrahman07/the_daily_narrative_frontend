import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";
import { logout } from "@/services/logout";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const me = await getMe();
  const user = me.success ? me.data : undefined;

  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      {children}
    </div>
  );
}