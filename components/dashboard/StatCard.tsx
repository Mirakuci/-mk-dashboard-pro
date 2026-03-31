type Props = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export default function StatCard({
  label,
  value,
  change,
  positive,
}: Props) {
  return (
    <article className="statCard">
      <span className="statLabel">{label}</span>
      <strong className="statValue">{value}</strong>
      <small className={positive ? "statChange up" : "statChange down"}>
        {change}
      </small>
    </article>
  );
}