import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <div className="notFoundContent">
        <div className="notFoundCode">404</div>
        <h1>Stránka nenalezena</h1>
        <p>
          Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla
          přesunuta.
        </p>
        <Link href="/" className="primaryBtn">
          Zpět na dashboard
        </Link>
      </div>
    </div>
  );
}
