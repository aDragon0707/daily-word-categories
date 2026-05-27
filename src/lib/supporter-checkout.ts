type SupporterCheckoutContext = {
  puzzleId: string;
};

export function buildSupporterCheckoutUrl(
  checkoutUrl: string | undefined,
  context: SupporterCheckoutContext,
) {
  if (!checkoutUrl) return null;

  const url = new URL(checkoutUrl);
  url.searchParams.set("product", "supporter");
  url.searchParams.set("puzzle", context.puzzleId);
  return url.toString();
}
