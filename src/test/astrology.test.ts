import { describe, it, expect } from "vitest";
import { computeSun, computeMoon, computeAscendant, signFromLongitude, localToUTC } from "@/lib/astrology";
import { computeAstrology } from "@/lib/lenses";

describe("signFromLongitude", () => {
  it("0° = Aries, 30° = Taurus, 120° = Leo, 359° = Pisces", () => {
    expect(signFromLongitude(0).name).toBe("Aries");
    expect(signFromLongitude(30).name).toBe("Taurus");
    expect(signFromLongitude(120.5).name).toBe("Leo");
    expect(signFromLongitude(359).name).toBe("Pisces");
  });
});

describe("computeSun", () => {
  it("1991-08-13 → Leo (regression for the +9 offset bug)", () => {
    const sun = computeSun(localToUTC("1991-08-13", "12:00", "America/New_York"));
    expect(sun.name).toBe("Leo");
  });
  it("2000-03-21 noon UTC → Aries", () => {
    const sun = computeSun(localToUTC("2000-03-21", "12:00"));
    expect(sun.name).toBe("Aries");
  });
});

describe("computeAstrology integration", () => {
  it("DEMO_BIRTH yields Sun=Leo and a real Ascendant", () => {
    const r = computeAstrology({
      name: "Ari", dob: "1991-08-13", tob: "04:33",
      birthLat: 40.6782, birthLon: -73.9442, birthTz: "America/New_York",
      intensity: "Mystic", lenses: [],
    });
    expect(r.sun.name).toBe("Leo");
    expect(r.ascendant).not.toBeNull();
    expect(r.ascendantAvailable).toBe(true);
  });
  it("ascendant null without lat/lon", () => {
    const r = computeAstrology({
      name: "x", dob: "1990-01-01", tob: "12:00",
      intensity: "Mystic", lenses: [],
    });
    expect(r.ascendant).toBeNull();
  });
});

describe("computeMoon", () => {
  it("returns a valid sign", () => {
    const m = computeMoon(new Date(Date.UTC(2024, 0, 1, 0, 0)));
    expect(m.name).toMatch(/Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces/);
  });
});

describe("computeAscendant", () => {
  it("returns a sign for known input", () => {
    const a = computeAscendant(new Date(Date.UTC(1991, 7, 13, 8, 33)), 40.6782, -73.9442);
    expect(a.name).toMatch(/Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces/);
  });
});
