import React, { useState } from "react";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  placeholder: string;
  className?: string;
}

export default function PasswordInput(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
      />
      {
        !showPassword ? (
          <EyeOffIcon
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#EEE852]"
          />
        ) : (
          <EyeIcon
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#EEE852]"
          />
        )
      }
    </div>
  );
}
