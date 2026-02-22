import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isLast?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-sm text-slate-500">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.isLast ? (
            <span className="text-primary font-bold bg-primary/10 px-1 rounded-none">
              {item.label}
            </span>
          ) : (
            <>
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="hover:text-primary cursor-pointer transition-colors">
                  {item.label}
                </span>
              )}
              <span>/</span>
            </>
          )}
        </span>
      ))}
    </div>
  );
}
