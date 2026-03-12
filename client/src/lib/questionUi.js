export const OPTION_STYLES = [
  {
    letter: "A",
    gradient: "from-rose-500 to-orange-400",
    badgeClass: "bg-rose-950/35"
  },
  {
    letter: "B",
    gradient: "from-cyan-500 to-blue-500",
    badgeClass: "bg-cyan-950/35"
  },
  {
    letter: "C",
    gradient: "from-lime-400 to-emerald-500",
    badgeClass: "bg-emerald-950/35"
  },
  {
    letter: "D",
    gradient: "from-fuchsia-500 to-violet-500",
    badgeClass: "bg-fuchsia-950/35"
  }
];

export function getOptionStyle(index) {
  return OPTION_STYLES[index % OPTION_STYLES.length];
}