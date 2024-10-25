/* eslint-disable react/prop-types */
import '/src/stylesheet/MainPage/Pagination/Pagination.css';
import { useState, useEffect } from 'react';
export default function Pagination({ articlesPerPage, totalArticles, paginate, currentPage }) {
    const beforePage = '<-';
    const afterPage = '->';
    const [pageNumber, setPageNumber] = useState(currentPage);
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    useEffect(() => {
        setPageNumber(currentPage);
    }, [currentPage]);

    const changePage = (direction) => {
        setPageNumber((prevPage) => {
            let newPage = prevPage;
            if (direction === 'prev' && prevPage > 1) {
                newPage = prevPage - 1;
            } else if (direction === 'next' && prevPage < totalPages) {
                newPage = prevPage + 1;
            }
            paginate(newPage);
            return newPage;
        });
    };

    return (
        <>
            <div className="paginationMainPage">
                <a onClick={() => changePage('prev')}>
                    {beforePage}
                </a>
                <p>
                    {pageNumber}
                </p>
                <a onClick={() => changePage('next')}>
                    {afterPage}
                </a>
            </div>
        </>
    );
}