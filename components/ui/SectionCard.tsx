import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  rightLabel?: string;
  className?: string;
};

export default function SectionCard({
  title,
  subtitle,
  children,
  rightLabel,
  className = "",
}: Props) {
  return (
    <section className={`sectionCard ${className}`.trim()}>
      <div className="sectionCardHead">
        <div>
          <div className="sectionKicker">{title}</div>
          <h3>{subtitle}</h3>
        </div>

        {rightLabel ? (
          <span className="sectionRightLabel">{rightLabel}</span>
        ) : null}
      </div>

      {children}
    </section>
  );
}