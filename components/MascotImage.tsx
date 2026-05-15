import Image from "next/image";
import { cn } from "@/lib/utils";

export type MascotType = "planner" | "developer" | "designer" | "editor" | "community";
export type MascotSize = "sm" | "md" | "lg";

const mascotMap: Record<MascotType, { src: string; alt: string }> = {
  planner: { src: "/mascots/planner-rabbit.png", alt: "Planner rabbit mascot" },
  developer: { src: "/mascots/developer-hamster.png", alt: "Developer hamster mascot" },
  designer: { src: "/mascots/designer-cat.png", alt: "Designer cat mascot" },
  editor: { src: "/mascots/editor-chick.png", alt: "Editor chick mascot" },
  community: { src: "/mascots/community-bear.png", alt: "Community bear mascot" }
};

const sizeMap: Record<MascotSize, { width: number; height: number }> = {
  sm: { width: 32, height: 32 },
  md: { width: 56, height: 56 },
  lg: { width: 88, height: 88 }
};

export function MascotImage({ type, size = "md", className }: { type: MascotType; size?: MascotSize; className?: string }) {
  const mascot = mascotMap[type];
  const dimensions = sizeMap[size];

  return (
    <Image
      src={mascot.src}
      alt={mascot.alt}
      width={dimensions.width}
      height={dimensions.height}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
