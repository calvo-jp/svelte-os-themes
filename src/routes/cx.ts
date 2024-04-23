type Classname = string | null | undefined;

export function cx(...classes: Classname[]) {
  return classes.filter(Boolean).join(' ');
}
