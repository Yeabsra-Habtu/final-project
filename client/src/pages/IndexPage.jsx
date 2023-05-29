import { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  }, [])
  return (
    <div className="grid mt-5 gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && (
        places.map(place => (
          <Link to={'/place/'+place._id}>
            <div className="bg-gray-500 rounded-2xl">
              {place.photos[0] && (
                <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="No photo" />
              )}
            </div>
            <h2 className="font-bold ">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <h2 className="text-bold">{place.price} birr per month</h2>
            
          </Link>
        ))
      )}
    </div>
  )
}

export default IndexPage;