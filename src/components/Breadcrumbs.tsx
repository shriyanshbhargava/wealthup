import Link from 'next/link';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="flex pt-16 lg:pt-28 w-full container text-white pb-4">
      <ol className="list-none p-0 inline-flex text-md md:text-lg">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {crumb.path ? (
              <>
                <Link href={crumb.path} className="text-white hover:underline">
                  {crumb.label}
                </Link>
                <span className="mx-2">&gt;</span>
              </>
            ) : (
              <span className="font-medium text-white">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
