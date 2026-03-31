type Props = {
  title: string;
  subtitle: string;
};

export default function Topbar({ title, subtitle }: Props) {
  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="topbarActions">
        <button className="ghostBtn" type="button">
          Export
        </button>
        <button className="primaryBtn" type="button">
          Nový report
        </button>
      </div>
    </header>
  );
}