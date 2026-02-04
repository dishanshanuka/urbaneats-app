import React from 'react';
import { LayoutDashboard, ShoppingCart, Utensils, Users, Settings, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { id: 1, name: 'Total Orders', value: '1,240', icon: <ShoppingCart />, color: 'bg-blue-500' },
    { id: 2, name: 'Active Menu', value: '45 Items', icon: <Utensils />, color: 'bg-orange-500' },
    { id: 3, name: 'Total Revenue', value: 'Rs. 150,000', icon: <TrendingUp />, color: 'bg-green-500' },
    { id: 4, name: 'Customers', value: '850', icon: <Users />, color: 'bg-purple-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-700 text-orange-500">
          UrbanEats <span className="text-white">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
          <NavItem icon={<ShoppingCart size={20}/>} label="Orders" />
          <NavItem icon={<Utensils size={20}/>} label="Menu Management" />
          <NavItem icon={<Users size={20}/>} label="Delivery Riders" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">A</div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`${item.color} p-3 rounded-lg text-white`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.name}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Recent Orders</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Items</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <TableRow id="#UE1024" name="Kasun Perera" item="Chicken Burger" status="Pending" price="Rs. 1,200" />
                <TableRow id="#UE1025" name="Nimal Silva" item="Veg Pizza" status="Delivered" price="Rs. 2,400" />
                <TableRow id="#UE1026" name="Amara Siri" item="Fried Rice" status="Processing" price="Rs. 950" />
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${active ? 'bg-orange-500 text-white' : 'hover:bg-slate-800 text-slate-400'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

const TableRow = ({ id, name, item, status, price }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="p-4 text-sm font-medium">{id}</td>
    <td className="p-4 text-sm">{name}</td>
    <td className="p-4 text-sm">{item}</td>
    <td className="p-4 text-sm">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {status}
      </span>
    </td>
    <td className="p-4 text-sm font-bold">{price}</td>
  </tr>
);

export default AdminDashboard;