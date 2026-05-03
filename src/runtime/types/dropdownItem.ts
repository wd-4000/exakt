export interface DropdownItem {
  name: string;
  icon?: string | null;
  href?: string;
  to?: string;
  callback?: () => void;
  color?: string;
  background?: string;
  id?: string | number | null;
}
