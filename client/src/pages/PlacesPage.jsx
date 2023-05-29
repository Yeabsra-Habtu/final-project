import { Link } from 'react-router-dom';
import AccountNavPage from './AccountNavPage';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);
    const[updated,setUpdated]=useState(false);


    useEffect(() => {
        const result =axios.get('/user_places')
            .then(({ data }) => {
                setPlaces(data);
                console.log(data)
            })

    }, []);

    return (
        <div>
            <AccountNavPage />
            <div className='text-center'>
                <Link to={'/account/places/new'} className='inline-flex gap-2 bg-primary py-3 px-6 rounded-full text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokewidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokelinecap="round" strokelinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Place
                </Link>
            </div>
            <div className='mt-4 '>
                {places?.map((place) => (
                    <Link to={'/account/places/' + place._id} key={place.id} className=' p-4 cursor-pointer bg-gray-200 rounded-2xl flex gap-4'>
                        <div className=' flex w-32 h-32 bg-gray-500 rounded-xl grow shrink-0'>
                            {place.photos.length > 0 && (
                                <img className='object-cover' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                            )}
                            
                        </div>
                        <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PlacesPage;
