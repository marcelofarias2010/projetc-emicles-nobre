import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Marca visual do brasão Nobre usada no cabeçalho, rodapé e ícones do site.
 */
export function BrandMark({ size = 36, className = "", priority = false }: Props) {
  return (
    <Image
      src="/brand/nobre-mark.png"
      alt="Brasão Nobre"
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ring-1 ring-white/20 ${className}`}
      priority={priority}
    />
  );
}
