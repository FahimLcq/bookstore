import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f0e6d8] text-[#3b3028] py-8 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>
            Email :{" "}
            <a href="mailto:contact@bookstore.com" className="underline">
              contact@bookstore.com
            </a>
          </p>
          <p>
            Téléphone :{" "}
            <a href="tel:+33123456789" className="underline">
              01 23 45 67 89
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Adresse</h3>
          <p>Bookstore SARL</p>
          <p>42 rue des Livres</p>
          <p>75000 Paris</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Liens utiles</h3>
          <p>
            <Link href="/mentions-legales" className="underline">
              Mentions légales
            </Link>
          </p>
          <p>
            <Link href="/conditions" className="underline">
              Conditions générales
            </Link>
          </p>
          <p>
            <Link href="/contact" className="underline">
              Formulaire de contact
            </Link>
          </p>
        </div>
      </div>
      <div className="text-center text-xs mt-8 text-[#998675]">
        © {new Date().getFullYear()} Bookstore. Tous droits réservés.
      </div>
    </footer>
  );
}
