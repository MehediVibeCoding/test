const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/**
 * ইংরেজি সংখ্যাকে বাংলা অঙ্কে রূপান্তর করে, ইচ্ছা করলে হাজার/লাখ কমা গ্রুপিং সহ।
 * যেমন: toBengaliDigits(10000, { grouped: true }) => "১০,০০০"
 */
export function toBengaliDigits(
  value: number,
  options: { grouped?: boolean } = {}
): string {
  const rounded = Math.round(value);
  const raw = options.grouped
    ? rounded.toLocaleString("en-US") // সাধারণ হাজার-কমা গ্রুপিং (১০,০০০ প্যাটার্ন), লাখ/কোটি গ্রুপিং নয়
    : String(rounded);

  return raw.replace(/[0-9]/g, (d) => BENGALI_DIGITS[Number(d)]);
}
