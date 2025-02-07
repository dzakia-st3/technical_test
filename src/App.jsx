import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from "leaflet";

function App() {
  const [location, setLocation] = useState(null);
  const [infogeneral, setInfogeneral] = useState()
  const [address, setAddress] = useState('')

  const carIcon = Leaflet.divIcon({
    html: `<span class="material-symbols-outlined text-black text-4xl">directions_car</span>`,
    className: "custom-car-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch('https://insight.kkp.go.id/api/index/get_data');
      const data = await response.json();
      const latestLocation = data.features[0].geometry.coordinates;
      const newLocation = {
        lat: latestLocation[1],
        lon: latestLocation[0],
      };
      setLocation(newLocation)
      setInfogeneral(data.features[0].properties)


      // Reverse geocoding menggunakan Nominatim API
      const reverseGeocode = async (lat, lon) => {
        const url = `${import.meta.env.VITE_NOMINATIM_API}?lat=${lat}&lon=${lon}&format=json`;
        const response = await fetch(url);
        const data = await response.json();
        const address = data.address ? data.address : 'Alamat tidak ditemukan';
        setAddress(`${address.road}, ${address.city_block}, ${address.suburb}, ${address.neighbourhood}, ${address.city}`)
      };

      // Panggil reverse geocoding
      reverseGeocode(newLocation.lat, newLocation.lon);
    };

    fetchLocation();
  }, []);

  const dateString = infogeneral?.device_info?.subscription_expiry_date;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return (
    <React.Fragment>
      <div className="bg-gray-100">
        <Navbar />
      </div>
      {/* content */}
      <div className="md:flex md:justify-between p-3">
        {/* info */}
        <div className="flex flex-col gap-5 md:w-1/3">
          <div className="flex p-5 justify-between items-center bg-white rounded-lg shadow-md">
            <div className="flex flex-col gap-3">
              <div className="w-fit inline-flex items-center text-red-600 mx-2 text-sm bg-red-100 rounded-lg px-2 py-1">
                <span className="w-2 h-2 rounded-full bg-red-600 mr-2 inline-block"></span>Offline | Unplug
              </div>
              <div className="text-slate-500 text-base">Device ID</div>
              <div className="text-slate-500 text-base">Device Type</div>
              <div className="text-slate-500 text-base">Signal Status</div>
              <div className="text-slate-500 text-base">GNSS Satelite</div>
              <div className="text-slate-500 text-base">Temperature</div>
              <div className="text-slate-500 text-base">Subscription Expired Date</div>
            </div>
            <div className="flex flex-col gap-3 text-right">
              <div className="text-emerald-600 text-base">{infogeneral?.device_info?.battery} ⚡</div>
              <div className="text-slate-900 text-base">{infogeneral?.device_info?.device_id}</div>
              <div className="text-slate-900 text-base">{infogeneral?.device_info?.device_type.toUpperCase()}</div>
              <div className="text-emerald-600 text-base">{infogeneral?.device_info?.signal_status?.replace(/^(\w)/, (match) => match.toUpperCase())}</div>
              <div className="text-orange-500 text-base">{infogeneral?.device_info?.gnss_satelite?.replace(/^(\w)/, (match) => match.toUpperCase())}</div>
              <div className="text-slate-900 text-base">{infogeneral?.device_info?.temperature}</div>
              <div className="text-slate-900 text-base">{formattedDate}</div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-lg shadow-md">
            <div className="text-black text-base font-bold pb-3">Vehicle Information</div>
            <span className="text-emerald-600 text-sm p-1 bg-emerald-100 rounded-lg mx-2">Safe Condition</span>
            <div className="flex pt-5 justify-between ">
              <div className="flex flex-col gap-3">
                <div className="text-slate-500 text-base">Vehicle Type</div>
                <div className="text-slate-500 text-base">Power Voltage</div>
                <div className="text-slate-500 text-base">Fuel Indicator</div>
                <div className="text-slate-500 text-base">ODO Meter</div>
              </div>
              <div className="flex flex-col gap-3 text-right">
                <div className="text-slate-900 text-base">{infogeneral?.vehicle_information?.vehicle_type}</div>
                <div className="text-slate-900 text-base">{infogeneral?.vehicle_information?.power_voltage}</div>
                <div className="text-slate-900 text-base">{infogeneral?.vehicle_information?.fuel_indicator?.replace(/^(\w)/, (match) => match.toUpperCase())}</div>
                <div className="text-slate-900 text-base">{infogeneral?.vehicle_information?.ODO_meter}</div>
              </div>
            </div>
          </div>
        </div>

        {/* maps */}
        <div className="bg-white p-4 rounded-lg shadow-md md:w-2/3">
          <div className="text-black text-base font-bold pb-3">Last Location Seen</div>
          <div className="relative">
            <div className="absolute top-5 left-5 right-5 z-10 bg-white p-5 rounded-lg shadow-lg flex flex-col gap-5">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-slate-500">calendar_today</span>
                <div className="text-black text-base font-bold">Date & Time</div>
                <div className="text-slate-500 text-base">Mon, 11 Nov 2024 19:51:30</div>
              </div>
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-slate-500">location_on</span>
                <div className="text-black text-base font-bold">Location</div>
                <div className="text-slate-500 text-base">{address}</div>
              </div>
            </div>
            <div>
              <MapContainer center={location ? [location.lat, location.lon] : [-6.200000, 106.816666]} zoom={13} style={{ height: '500px', width: '100%', zIndex: 0 }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                  <Marker position={[location.lat, location.lon]} icon={carIcon}>
                    <Popup>
                      <div className="text-left">
                        <div className="font-bold pb-1">{infogeneral.number_plate}</div>
                        <div className="text-gray-500 text-sm">Last seen: Mon, 11 Nov 2024 19:51:30</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>


      {/* footer */}
    </React.Fragment>
  )
}

export default App
