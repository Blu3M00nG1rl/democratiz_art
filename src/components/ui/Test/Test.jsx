// App.js
import React, { useState, useEffect } from 'react';
import './../../../App.css';

function Test() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(
                'https://hn.algolia.com/api/v1/search?query=react',
            );
            const json = await res.json();
            setData(json.hits);
            setIsLoading(false);
        };
        fetchData();
    }, [setData]);

    return (
        <React.Fragment>
            {isLoading ? (
                <p>Loading ...</p>
            ) : (
                <ul>
                    {data.map(item => (
                        <li key={item.ObjectId}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </React.Fragment>
    );
}


export default Test;