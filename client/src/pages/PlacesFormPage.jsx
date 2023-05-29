import { useState } from 'react';
import Perks from '../Perks';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PlacesFormPage = ({addedPhotoss,onChange}) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const [guests, setGuests] = useState('');
    const [price,setPrice]=useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(({ data }) => {
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setGuests(data.guests)
            setPrice(data.price)
        })
    }, [id])

    const linkUploader = async (ev) => {
        ev.preventDefault();
        try {
            const { data: fileName } = await axios.post('/upload_by_link', { link: photoLink })
            setAddedPhotos(prev => {
                return [...prev, fileName]
            })
            alert('Image Uploaded Succesfully');
            setPhotoLink('');
        } catch (error) {
            console.log(error);
        }
    }

    const directUploader = async (ev) => {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        const { data: fileNames } = await axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setAddedPhotos(prev => {
            return [...prev, ...fileNames];
        });
    }

    const placeUploader = (ev) => {
        const placeData = {
            title, address, photoLink,
            addedPhotos, description, perks,
            extraInfo, checkIn, checkOut, guests,price
        }
        ev.preventDefault();
        if (id) {
            axios.put('/places', { id, ...placeData })
        }
        axios.post('/places', placeData)
        setRedirect(true);
    }

    const removePhoto=(ev,fileName)=>{
        ev.preventDefault();
        return (onChange([...addedPhotoss.filter(photo=>photo!==fileName)] ))
        
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <form onSubmit={placeUploader}>
                <h2 className='text-2xl mt-4'>Title</h2>
                <p className='text-gray-500 text-sm'>Name it what u wnat</p>
                <input
                    type='text'
                    placeholder='your title my brotha'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Address</h2>
                <p className='text-gray-500 text-sm'>Name it what u wnat</p>
                <input
                    type='text'
                    placeholder='adress to this place'
                    value={address}
                    onChange={ev => setAddress(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Photo</h2>
                <p className='text-gray-500 text-sm'>more = better</p>
                <div className='flex gap-2'>
                    <input
                        type='text'
                        placeholder='upload by link.....jpg'
                        value={photoLink}
                        onChange={ev => setPhotoLink(ev.target.value)} />
                    <button className='bg-gray-3 rounded-xl px-2' onClick={linkUploader}>Add&nbsp;Photo</button>
                </div>
                <div className='mt-4 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-col-6'>
                    {addedPhotos.length > 0 && (
                        addedPhotos.map((photo) => {
                            return (
                                <div className='h-32 flex relative' key={photo}>
                                    <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/' + photo} alt="whyy" />
                                    
                                        <button onClick={(ev)=>removePhoto(ev,photo)} className=' cursor-pointer absolute bottom-1 right-1 text-white bg-gray-500 rounded-xl opacity-2 p-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    
                                </div>
                            )
                        })

                    )}
                    <label className='h-32 cursor-pointer flex justify-center items-center gap-1 bg-transparent p-8 border rounded-2xl text-2xl text-gray-600 '>
                        <input type='file' multiple className='hidden' onChange={directUploader} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        Upload
                    </label>
                </div>
                <h2 className='text-2xl mt-4'>Desription</h2>
                <p className='text-gray-500 text-sm'>Describe your place</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Perks</h2>
                <p className='text-gray-500 text-sm'>Perks of your place</p>
                <div className='grid mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                <h2 className='text-2xl mt-4'>Extra Info</h2>
                <p className='text-gray-500 text-sm'>House rules, etc</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                <h2 className='text-2xl mt-4'>Check in & out time</h2>
                <p className='text-gray-500 text-sm'>Ceck in and check out time</p>
                <div className='grid grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check In Time</h3>
                        <input
                            type='text'
                            placeholder='16:00'
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check Out Time</h3>
                        <input
                            type='text'
                            placeholder='16:00'
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Maximum no of guests</h3>
                        <input
                            type='text'
                            value={guests}
                            onChange={ev => setGuests(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price</h3>
                        <input
                            type='text'
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage;