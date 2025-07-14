export function formatDateWithIntl(
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' },
  locale: string = 'zh-CN'
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}