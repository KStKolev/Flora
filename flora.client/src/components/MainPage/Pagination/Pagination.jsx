/* eslint-disable no-unused-vars */
import '/src/stylesheet/MainPage/Pagination/Pagination.css';
import { useState} from 'react';

export default function Pagination() {
    const beforePage = '<-';
    const afterPage = '->';
    const [pageNumber, setPageNumber] = useState(1);

    const changePage = (direction) => {
        setPageNumber((prevPage) => {
            if (direction === 'prev' && prevPage > 1) {
                return prevPage - 1;
            } else if (direction === 'next') {
                return prevPage + 1;
            }
            return prevPage;
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