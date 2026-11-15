import { describe, it, expect } from "vitest";
import { getQuarters, quarterLabel, quarterSortKey } from "@/lib/constants";

describe("quarter helpers", () => {
  const now = new Date(2026, 10, 15); // 15 Nov 2026

  it("labels a date with the existing format", () => {
    expect(quarterLabel(now)).toBe("Oct – Dec 2026");
    expect(quarterLabel(new Date(2027, 0, 1))).toBe("Jan – Mar 2027");
  });

  it("generates a range around today, oldest first", () => {
    const qs = getQuarters(4, 7, now);
    expect(qs).toHaveLength(12);
    expect(qs[0]).toBe("Oct – Dec 2025");
    expect(qs[4]).toBe("Oct – Dec 2026");
    expect(qs[5]).toBe("Jan – Mar 2027");
    expect(qs[11]).toBe("Jul – Sep 2028");
  });

  it("sorts labels chronologically", () => {
    const shuffled = ["Jan – Mar 2027", "Apr – Jun 2025", "Oct – Dec 2026"];
    expect([...shuffled].sort((a, b) => quarterSortKey(a) - quarterSortKey(b))).toEqual([
      "Apr – Jun 2025",
      "Oct – Dec 2026",
      "Jan – Mar 2027",
    ]);
  });
});
