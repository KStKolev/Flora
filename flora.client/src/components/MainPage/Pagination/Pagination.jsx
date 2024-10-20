import '/src/stylesheet/MainPage/Pagination/Pagination.css';
import { useState, useEffect } from 'react';

export default function Pagination() {
    const beforePage = '<-';
    const afterPage = '->';
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setPageNumber(p => p + 1);
    }, [beforePage, afterPage])

    return (
        <>
            <div className="paginationMainPage">
                <a>
                    {beforePage}
                </a>
                <p>
                    {pageNumber}
                </p>
                <a>
                    {afterPage}
                </a>
            </div>
        </>
    );
}