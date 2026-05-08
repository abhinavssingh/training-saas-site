import { MenuItemMobile } from './MenuItemMobile';

export function MobileNav({ items }: { items: any[] }) {
  return (
    <nav className="border-t bg-white lg:hidden">
      {items.map((item) => (
        <MenuItemMobile key={item.id} item={item} />
      ))}
    </nav>
  );
}
