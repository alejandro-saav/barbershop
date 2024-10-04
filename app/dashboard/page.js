import React from "react";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Barbershop Dashboard</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Today's Appointments</h2>
            <ul className="">
              <li className="flex justify-between text-black">
                <span>John Doe</span>
                <span>10:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Jane Smith</span>
                <span>11:30 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Mike Johnson</span>
                <span>2:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Revenue */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Today's Revenue</h2>
            <p className="text-3xl font-bold text-green-600">$450.00</p>
          </div>

          {/* Services */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Popular Services</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Haircut</span>
                <span>32 bookings</span>
              </li>
              <li className="flex justify-between">
                <span>Beard Trim</span>
                <span>18 bookings</span>
              </li>
              <li className="flex justify-between">
                <span>Hair Coloring</span>
                <span>7 bookings</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
