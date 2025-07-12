import Link from "next/link";

export function BookCard({ book }: { book: any }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out">
      <figure>
        <img src={book.image} alt={book.title} className="w-full h-60 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p className="text-gray-600">by {book.author}</p>
        <div className="card-actions justify-end">
          <Link href={`/book/${book.id}`}>
            <button className="btn btn-primary">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}