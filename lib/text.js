// name có thể là "An" hoặc ["An","Bình"] hoặc ["Hà","Mai","Linh"] → "Hà, Mai & Linh"
export function joinNames(n) {
  const a = [].concat(n || []).filter(Boolean);
  if (a.length < 2) return a[0] || "";
  return a.slice(0, -1).join(", ") + " & " + a[a.length - 1];
}
export const fill = (s, name) => s.replaceAll("{who}", name ? `bạn ${name}` : "bạn");
