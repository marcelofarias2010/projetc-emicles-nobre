import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Marca visual Nobre usada no cabeçalho, rodapé e ícones do site.
 */
export function BrandMark({ size = 36, className = "", priority = false }: Props) {
  return (
    <Image
      src="/modalidades/abertura/nobre_abertura.png"
      alt="Emicles Nogueira Nobre"
      width={size}
      height={size}
      className={`shrink-0 rounded-sm object-contain ${className}`}
      style={{ width: size, height: size }}
      priority={priority}
    />
  );
}
