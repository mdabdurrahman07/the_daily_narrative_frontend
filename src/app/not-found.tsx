import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-svh w-screen flex flex-col justify-center items-center text-center">
      <h2 className="text-4xl">Not Found</h2>
      <p className="text-xl my-2">Could not find requested resource</p>
      <Button className="my-2">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
