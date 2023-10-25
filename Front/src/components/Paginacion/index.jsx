import React, { useEffect } from 'react';
import style from './styles.module.css';

const TablaPaginacion = ({ onPageChange, currentPage, totalCards }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const pages = [];
  const cardsPerPage = 15;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  useEffect(() => {
    // Actualizar la página actual si está fuera de rango después de cambiar la cantidad total de cards
    if ((currentPage > totalPages) && totalCards) {
      handlePageChange(totalPages);
    }
  }, [totalCards, totalPages, currentPage]);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={`${style.pageItem} ${i === currentPage ? style.active : ''}`}
      >
        <button
          className={`${style.pageLink}  ${i === currentPage ? style.active : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <nav aria-label="...">
      <ul className={style.pagination}>
        <li
          className={`${style.pageItem} ${currentPage === 1 ? style.disabled : ''}`}
        >
          <button
            className={style.pageLink}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pages}
        <li
          className={`${style.pageItem} ${currentPage === totalPages ? style.disabled : ''}`}
        >
          <button
            className={style.pageLink}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default TablaPaginacion;