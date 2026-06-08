import {Button} from  "../ui/button";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function PropertyPagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          className={`px-3 py-1 rounded `}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
    </div>
  );
}

