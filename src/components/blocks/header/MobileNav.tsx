import MenuItemMobile from './MenuItemMobile';

type MobileNavItem = {
  id?: string | number;
  href?: string;
  label?: string;
  children?: unknown[];
};

export default function MobileNav({ items }: { items?: MobileNavItem[] | null }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="border-t bg-white lg:hidden">
      {items.map((item, index) => {
        if (!item) return null;

        return <MenuItemMobile key={item.id ?? `${item.href ?? 'item'}-${index}`} item={item} />;
      })}
    </nav>
  );
}
