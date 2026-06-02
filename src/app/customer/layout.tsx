import Image from "next/image";
import { conciergeLogo } from "@/app/data";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-full overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-1 flex items-center justify-center opacity-[0.08]">
        <Image
          alt=""
          aria-hidden
          className="h-[68vw] max-h-[520px] min-h-[320px] w-[68vw] min-w-[320px] max-w-[520px] rounded-full object-cover"
          height={520}
          priority
          src={conciergeLogo}
          unoptimized
          width={520}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
