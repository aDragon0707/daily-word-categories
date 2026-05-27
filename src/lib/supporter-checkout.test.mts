import test from "node:test";
import assert from "node:assert/strict";

import { buildSupporterCheckoutUrl } from "./supporter-checkout.ts";

test("builds supporter checkout URL with puzzle and product context", () => {
  const checkoutUrl = buildSupporterCheckoutUrl("https://checkout.dodopayments.com/buy/abc?coupon=launch", {
    puzzleId: "2026-05-28",
  });

  assert.equal(
    checkoutUrl,
    "https://checkout.dodopayments.com/buy/abc?coupon=launch&product=supporter&puzzle=2026-05-28",
  );
});

test("returns null when checkout URL is not configured", () => {
  assert.equal(buildSupporterCheckoutUrl(undefined, { puzzleId: "2026-05-28" }), null);
  assert.equal(buildSupporterCheckoutUrl("", { puzzleId: "2026-05-28" }), null);
});
