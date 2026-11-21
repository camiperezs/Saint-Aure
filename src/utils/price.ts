import type { Price, ServiceLabels } from "@/types/services";

type PriceLabels = Pick<ServiceLabels, "priceFrom" | "priceOnRequest">;

export function formatPrice(
  price: Price,
  locale: string,
  labels: PriceLabels,
): string {
  const money = (amount: number, currency: string) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
    }).format(amount);

  switch (price.type) {
    case "fixed":
      return money(price.amount, price.currency);
    case "starting-at":
      return `${labels.priceFrom} ${money(price.amount, price.currency)}`;
    case "range":
      return `${money(price.min, price.currency)} – ${money(price.max, price.currency)}`;
    case "quote":
      return price.label ?? labels.priceOnRequest;
    case "custom":
      return price.label;
  }
}
