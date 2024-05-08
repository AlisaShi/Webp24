import React, { useState, useEffect } from 'react';

function TouristAttractions() {
    const [attractions, setAttractions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6');
            const data = await response.json();
            setAttractions(data);
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = attractions.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredItems = currentItems.filter((item) =>
        item.title.toUpperCase().includes(searchQuery.toUpperCase())
    );

    return (
        <div>
            <h1>景點觀光展覽資訊</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>地點</th>
                        <th>票價</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((attraction) => (
                        <tr key={attraction.id}>
                            <td>{attraction.title}</td>
                            <td>{attraction.showInfo[0].location}</td>
                            <td>{attraction.showInfo[0].price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <input
                type="number"
                value={currentPage}
                min="1"
                max={Math.ceil(attractions.length / itemsPerPage)}
                onChange={(e) => paginate(parseInt(e.target.value))}
            />頁
        </div>
    );
}

export default TouristAttractions;
