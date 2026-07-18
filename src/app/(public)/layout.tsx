// src/app/(public)/layout.tsx
import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const me = await getMe();
  const user = me.success ? me.data : undefined;

  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
}