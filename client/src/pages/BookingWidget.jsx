import { useState } from "react";

const BookingWidget = ({ place }) => {
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckout]=useState('');
    const [numberOfGuests,setNumberOfGuests]=useState(1);

    return (
        <div className=' p-1 rounded-xl shadow-black text-center bg-white'>
            Price: {place.price}
            <div className="flex justify-center overflow-hidden">
                <div className='mt-4 mb-2 bg-gray-200 rounded-xl px-4 py-2'>
                    <label >Check In: </label>
                    <input 
                    className='rounded-2xl px-1' 
                    type='date'
                    value={checkIn}
                    onChange={ev=>setCheckIn(ev.target.value)} />
                </div>
                <div className='mt-4 mb-2 border-l bg-gray-200 rounded-xl px-4 py-2'>
                    <label >Check Out: </label>
                    <input 
                    className='rounded-2xl' 
                    type='date'
                    value={checkOut}
                    onChange={ev=>setCheckout(ev.target.value)} />
                </div>
            </div>
            <div className='mb-4 mt-1 text-left border-l bg-gray-200 rounded-xl px-4 py-2 max-w-max'>
                <label >Number of Guests: </label>
                <input 
                className='rounded-2xl' 
                value={numberOfGuests} 
                type='number'
                onChange={ev=>setNumberOfGuests(ev.target.value)} />
            </div>
            <button className="primary">Book Now</button>
        </div>
    )
}

export default BookingWidget;