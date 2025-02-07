import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from "leaflet";

function App() {
  const [location, setLocation] = useState(null);

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
      console.log(data.features[0].geometry.coordinates, 'data')
      const latestLocation = data.features[0].geometry.coordinates;
      setLocation({
        lat: latestLocation[1],
        lon: latestLocation[0],
      });
    };

    fetchLocation();
  }, []);



  return (
    <React.Fragment>
      <div className="bg-gray-100">
        <Navbar />
      </div>
      {/* content */}
      <div className="md:flex gap-10 p-3">
        {/* info */}
        <div className="flex flex-col gap-5">
          <div className="flex p-5 justify-between bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col gap-3">
              <div className="w-fit inline-flex items-center text-red-600 text-sm bg-red-100 rounded-lg px-2 py-1">
                <span className="w-2 h-2 rounded-full bg-red-600 mr-2 inline-block"></span>
                Offline | Unplug
              </div>
              <div className="text-slate-500 text-base">Device ID</div>
              <div className="text-slate-500 text-base">Device Type</div>
              <div className="text-slate-500 text-base">Signal Status</div>
              <div className="text-slate-500 text-base">GNSS Satelite</div>
              <div className="text-slate-500 text-base">Temperature</div>
              <div className="text-slate-500 text-base">Subscription Expired Date</div>
            </div>
            <div className="flex flex-col gap-3 text-right">
              <div className="text-emerald-600 text-base">98% ⚡</div>
              <div className="text-slate-900 text-base">860896051280311</div>
              <div className="text-slate-900 text-base">TELTONIKA</div>
              <div className="text-emerald-600 text-base">Excellent</div>
              <div className="text-orange-500 text-base">Ok</div>
              <div className="text-slate-900 text-base">2030-04-04 10:09:32</div>
              <div className="text-slate-900 text-base">Thu, 04 Apr 2030 17:09:32</div>
            </div>
          </div>
          <div className="rounded-md p-5 bg-white rounded-lg shadow-md">
            <div className="text-black text-base font-bold pb-3">Vehicle Information</div>
            <span className="text-emerald-600 text-sm p-1 bg-emerald-100 rounded-lg mx-3">Safe Condition</span>
            <div className="flex pt-5 justify-between ">
              <div className="flex flex-col gap-3">
                <div className="text-slate-500 text-base">Vehicle Type</div>
                <div className="text-slate-500 text-base">Power Voltage</div>
                <div className="text-slate-500 text-base">Fuel Indicator</div>
                <div className="text-slate-500 text-base">ODO Meter</div>
              </div>
              <div className="flex flex-col gap-3 text-right">
                <div className="text-slate-900 text-base">SUV</div>
                <div className="text-slate-900 text-base">0 Volt</div>
                <div className="text-slate-900 text-base">Unavailable</div>
                <div className="text-slate-900 text-base">60,023 KM</div>
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
                <div className="text-slate-500 text-base">Jalan Sisingamangaraja, RW 01, Selong, Kebayoran Baru, South Jakarta, Special capital Region of Jakarta</div>
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
                        <div className="font-bold pb-1">B 1212 DX</div>
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
