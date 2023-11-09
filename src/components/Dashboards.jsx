"use client";
import React, {useState, useEffect} from 'react';
import SingleDashboard from './SingleDashboard';
import CircularProgress from '@mui/material/CircularProgress';


export default function Dashboards() {
    const [dashboards, setDashboards] = useState([]);
    const [expandedDashboardId, setExpandedDashboardId] = useState(null);
    const [starredDashboards, setStarredDashboards] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedStarredDashboards = localStorage.getItem("starredDashboards");
            return savedStarredDashboards ? JSON.parse(savedStarredDashboards) : [];
        }
        return [];
    });
    const [selectedFilter, setSelectedFilter] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json`)
        .then(response => response.json())
        .then(data => {
            setDashboards(data.dashboards);
            setExpandedDashboardId(data.dashboards[0].id)
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        })
    }, []);

    useEffect(() => {
        try {
            const storedStarredDashboards = localStorage.getItem('starredDashboards');
            if (storedStarredDashboards) {
                setStarredDashboards(JSON.parse(storedStarredDashboards));
            }
        } catch (error) {
            console.error("Error reading from localStorage: ", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('starredDashboards', JSON.stringify(starredDashboards));
        } catch (error) {
            console.error("Error writing to localStorage: ", error);
        }
    }, [starredDashboards]);

    const toggleStarred = (id) => {
        setStarredDashboards(prevStarredDashboards => {
            if (prevStarredDashboards.includes(id)) {
                return prevStarredDashboards.filter(dashboardId => dashboardId !== id);
            } else {
                return [...prevStarredDashboards, id];
            }
        });
    };
    

    return(
        <section role='dashboard'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='font-bold lg:text-lg'>Dashboards</h1>
                <select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)} className='text-black p-1 rounded-sm border-[1px] border-gray-400 text-sm'>
                <option value="ALL" className='filter-items'>Filter items All</option>
                <option value="VISUALIZATION">Visualization</option>
                <option value="MAP">Map</option>
                <option value="TEXT">Text</option>
            </select>
            </div>
            <hr className='h-[3px] bg-gray-300 my-4'></hr>
            {loading ? <div className='flex justify-center items-center'><CircularProgress /></div>:
            dashboards.map(dashboard => (
                <SingleDashboard 
                    key={dashboard.id}
                    dashboard= {dashboard}
                    expanded={dashboard.id === expandedDashboardId}
                    onExpand= {expandedDashboardId === dashboard.id ? () => setExpandedDashboardId(null) : () => setExpandedDashboardId(dashboard.id) }
                    isStarred={starredDashboards.includes(dashboard.id)}
                    toggleStarred = {toggleStarred}
                    selectedFilter= {selectedFilter}
                />
            ))}
            
        </section>
    )
}