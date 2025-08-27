import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/outline';

const Book = ({ id, name, author, year, onClick }) =>
    <div key={id} className="group relative">
        <div className="w-full bg-gray-100 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none flex justify-center">
            <BookOpenIcon className="h-30 text-indigo-500" />
        </div>
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">
                <Link href={`#${id}`} scroll={false} passHref>
                    <a onClick={onClick}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {name}
                    </a>
                </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">by {author}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{year}</p>
        </div>
    </div>
    

export default Book;