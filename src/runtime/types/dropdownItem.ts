export interface DropdownItem {
  name: string;
  icon?: string;
  href?: string;
  to?: string;
  callback?: () => void;
  color?: string;
  background?: string;
  id?: string | number;
}
