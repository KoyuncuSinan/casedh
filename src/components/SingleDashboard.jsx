import React, {useState, useEffect, memo} from 'react';

import ViewColumnIcon from '@mui/icons-material/ViewColumn'; //Column
import BarChartIcon from '@mui/icons-material/BarChart'; // Stacked_column
import PieChartIcon from '@mui/icons-material/PieChart'; // PIE
import ShowChartIcon from '@mui/icons-material/ShowChart'; // LINE
import ScaleIcon from '@mui/icons-material/Scale'; // GAUGE
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';  // pivot table
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; //Year_by_year
import PublicIcon from '@mui/icons-material/Public'; // MAP
import FontDownloadIcon from '@mui/icons-material/FontDownload'; // TEXT
import StarBorderIcon from '@mui/icons-material/StarBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';


const Visualization = memo(({ type, name }) => {
    const visualizationTypes = {
        "COLUMN": ViewColumnIcon,
        "YEAR_OVER_YEAR_LINE": TrendingUpIcon,
        "PIVOT_TABLE": PivotTableChartIcon,
        "PIE": PieChartIcon,
        "LINE": ShowChartIcon,
        "GAUGE": ScaleIcon,
        "STACKED_COLUMN": BarChartIcon
    };

    const IconComponent = visualizationTypes[type];
    return (
        <div className='flex flex-row justify-start items-center'>
            <IconComponent className="mr-2 text-gray-700"/>
            <p>{name}</p>
        </div>
    );
});
Visualization.displayName = 'Visualization';


const Map = memo(({ name }) => (
    <div className='flex flex-row justify-start items-center'>
        <PublicIcon className="mr-2 text-gray-700"/>
        <p>{name}</p>
    </div>
));

const Text = memo(({ text }) => (
    <div className='flex flex-row justify-start items-center'>
        <FontDownloadIcon className="mr-2 text-gray-700"/>
        <p>{text}</p>
    </div>
));
Map.displayName = 'Map';
Text.displayName = 'Text';

export default function SingleDashboard({dashboard, expanded, onExpand, isStarred, toggleStarred, selectedFilter}){
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (expanded){
            fetch(`https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboard.id}.json`)
            .then(response => response.json())
            .then(data => setDetails(data)).catch((error) => {
                console.error("Error fetching data: ", error);
            
            })
        }
    }, [expanded, dashboard.id]);
        
    let displayDashboardItems = null;

    const getDashboardId = (dashboardItem) => {
        if (dashboardItem.visualization) {
            return dashboardItem.id;
        } else if (dashboardItem.map) {
            return dashboardItem.id;
        } else if (dashboardItem.text) {
            return dashboardItem.id;
        }
        return null;
    }
    
    
    if (details) {
        const dashboardItems = details.dashboardItems;
        displayDashboardItems = dashboardItems
            .filter(dashboardItem => selectedFilter === 'ALL' || dashboardItem.type === selectedFilter)
            .map((dashboardItem) => {
                const dashboardId = getDashboardId(dashboardItem);
                return (
                    <li key={dashboardId} className='text-sm'>
                        {dashboardItem.type === "VISUALIZATION" && <Visualization type={dashboardItem.visualization.type} name={dashboardItem.visualization.name} />}
                        {dashboardItem.type === "MAP" && <Map name={dashboardItem.map.name} />}
                        {dashboardItem.type === "TEXT" && <Text text={dashboardItem.text} />}
                        <hr className='h-[3px] bg-gray-200 my-3'></hr>
                    </li>
                )
            })
    }

   

    return(
        <div role='SingleDashboard' onClick={onExpand} className={`bg-white px-2 py-4 rounded-lg mb-3 items-center hover:cursor-pointer ${expanded ? 'border-4 border-blue-400' : ''}`}>
            <div className='flex flex-row justify-between ml-2'>
                <h2 className='font-bold text-lg'>{dashboard.displayName}</h2>
                <div className='flex flex-row justify-between'>
                    <div role="button" onClick={(e) => {e.stopPropagation(); toggleStarred(dashboard.id);}} className='mr-2 hover:cursor-pointer'>
                    {isStarred ? <StarIcon /> : <StarBorderIcon />}
                    </div>
                    {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
            </div>
           
            {expanded && details && displayDashboardItems && (
                <ul className='w-[95%] mx-auto mt-5'>
                    {displayDashboardItems}  
                </ul>
            )}
        </div>
    )
}