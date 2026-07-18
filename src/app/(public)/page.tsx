import { Button } from "@/components/ui/button";
import { getMe } from "@/services/getMe";
import React from "react";

const HomePage = async () => {
  const user = await getMe();
  console.log(user);
  return (
    <div className="text-4xl font-semibold text-center py-5">
      Home Page <Button variant={"secondary"}>Click Me</Button>
    </div>
  );
};

export default HomePage;
