import Link from "next/link";
export default async function Garments() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/garments">Garments</Link>
        </li>
        <li>
          <Link href="/outfits">Outfits</Link>
        </li>
      </ul>
    </div>
  );
}
