import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPlaces, setShowAllPlaces] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) {
        return <div>Loading...</div>; // Show a loading state while place is being fetched
    }

    if (showAllPlaces) {
        return (
            <div className='text-white absolute inset-0 bg-black min-w-full min-h-screen'>
                <div className='bg-black grid p-8 gap-4'>
                    <div>
                        <h2 className=' text-2xl'>Photos for {place.title}</h2>
                        <button onClick={() => { setShowAllPlaces(false) }} className=' text-black right-12 top-10 shadow shadow-black fixed flex rounded-2xl py-1 px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {place.photos.length > 0 && (
                        place.photos.map(photo => {
                            return (

                                <div className='grid gap-4'>
                                    <img src={"http://localhost:4000/uploads/" + photo} alt="No photo" />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        )
    }
    return (
        <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8">
            <h1 className="text-2xl">{place.title}</h1>
            <a className='flex gap-1 underline m-3' target='_blank' href={`https://maps.google.com/?q=${place.address}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}
            </a>
            <div className='relative'>
                <div className=" rounded-xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.photos[0] && (
                            <img className='aspect-square lg:aspect-square object-cover' src={"http://localhost:4000/uploads/" + place.photos[0]} alt="No photo" />
                        )}
                    </div>
                    <div>
                        {place.photos[1] && (
                            <img className='aspect-square lg:aspect-square object-cover' src={"http://localhost:4000/uploads/" + place.photos[1]} alt="No photo" />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos[2] && (
                                <img className='aspect-square lg:aspect-square object-cover relative top-2' src={"http://localhost:4000/uploads/" + place.photos[2]} alt="No photo" />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPlaces(true)} className=' flex absolute right-2 bottom-2 py-1 px-2 rounded-xl shadow-md shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show more photos
                </button>
            </div>
            <div className='my-4'>
                <h2 className='font-semibold text-2xl'>Description</h2>
                {place.description}
            </div>
            <div className='grid grid-cols-2'>
                <div>
                    Check in: {place.checkIn} <br/>
                    Check out: {place.checkOut}<br/>
                    Maximum number of guests: {place.maxGuests}
                </div>
                <div className=' p-1 rounded-xl shadow-black text-center bg-white'>
                    Price: {place.price}
                    <div className='my-4 border bg-gray-200 rounded-xl p-4'>
                        <label >Check In: </label>
                        <input type='date'/>
                    </div>
                    <div className='my-4 border bg-gray-200 rounded-xl px-4 py-2'>
                        <label >Check Out: </label>
                        <input type='date'/>
                    </div>
                    <button className="primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
