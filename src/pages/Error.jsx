import { ArrowLeft } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

export default function Error() {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className=" text-2xl font-semibold text-gray-50">404</p>
        <h1 className="mt-2 teamHeading tracking-tight  sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-100">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={()=>navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate('/events')}
          >
            Events
          </button>
        </div>
      </div>
    </div>
  );
}
