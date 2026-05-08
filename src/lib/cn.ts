// src/lib/cn.ts
type ClassValue = string | undefined | null | false | Record<string, boolean>;

export function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((cls) => {
      if (!cls) return [];
      if (typeof cls === 'string') return [cls];
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(' ');
}
