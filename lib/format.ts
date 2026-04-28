export function eur(n: number): string {
  return `€${n.toFixed(2).replace(".", ",")}`;
}

export function priceToNumber(p: string): number {
  // "€13,49" -> 13.49
  const m = p.match(/(\d+[.,]?\d*)/);
  if (!m) return 0;
  return parseFloat(m[1].replace(",", "."));
}
