import { ArrowLeft, ArrowRight } from "lucide-react";
import PagModule from "@/styles/Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleChangePageNumber: (val: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  handleChangePageNumber,
}: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      handleChangePageNumber(page);
    }
  };

  const getPagesToRender = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPagesToRender();

  return (
    <div className={PagModule.paginationContainer}>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft /> Prev
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button key={index} onClick={() => goToPage(page)}>
            {page}
          </button>
        ) : (
          <span key={index} className={PagModule.dots}>
            ...
          </span>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
