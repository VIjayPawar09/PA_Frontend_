import { Bell, Calendar, ChevronRight, Clock, FileText, Home, LogOut, Menu, MessageSquare, PieChart, Settings, User, Users } from 'lucide-react';
import { useState } from 'react';
import AssistantRegistrationHandler from './AssistantRequestHandler'

export default function Dashboard({ sidebarOpen, toggleSidebar, onLogout }) {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */} 
        <aside 
          className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-blue-800 text-white`}
        >
          <div className="flex items-center justify-between p-4 border-b border-blue-700">
            {sidebarOpen && (
              <h2 className="text-xl font-bold">Senior Care</h2>
            )}
            <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-blue-700">
              <Menu size={24} />
            </button>
          </div>
          
          <nav className="mt-6">
            <SidebarLink 
              icon={<Home size={24} />}
              text="Overview"
              isActive={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<Users size={24} />}
              text="Residents"
              isActive={activeTab === 'residents'}
              onClick={() => setActiveTab('residents')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<User size={24} />}
              text="Staff"
              isActive={activeTab === 'staff'}
              onClick={() => setActiveTab('staff')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<Calendar size={24} />}
              text="Schedule"
              isActive={activeTab === 'schedule'}
              onClick={() => setActiveTab('schedule')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<MessageSquare size={24} />}
              text="Messages"
              isActive={activeTab === 'messages'}
              onClick={() => setActiveTab('messages')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<FileText size={24} />}
              text="Reports"
              isActive={activeTab === 'reports'}
              onClick={() => setActiveTab('reports')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<Settings size={24} />}
              text="Settings"
              isActive={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
              sidebarOpen={sidebarOpen}
            />
            <SidebarLink 
              icon={<LogOut size={24} />}
              text="Logout"
              onClick={onLogout}
              sidebarOpen={sidebarOpen}
            />
          </nav>
        </aside>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'residents' && 'Resident Management'}
              {activeTab === 'staff' && 'Staff Directory'}
              {activeTab === 'schedule' && 'Care Schedule'}
              {activeTab === 'messages' && 'Communications'}
              {activeTab === 'reports' && 'Reports & Analytics'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200">
                <Bell size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
                <span className="font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'residents' && <ResidentsTab />}
            {activeTab === 'staff' && <StaffTab />}
            {activeTab === 'schedule' && <ScheduleTab />}
            {activeTab === 'messages' && <MessagesTab />}
            {activeTab === 'reports' && <ReportsTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </main>
        </div>
      </div>
    );
  }
  
  // Sidebar Link Component
  function SidebarLink({ icon, text, isActive, onClick, sidebarOpen }) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 transition-colors ${
          isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
        }`}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {sidebarOpen && <span className="ml-4">{text}</span>}
      </button>
    );
  }
  
  // Dashboard Tabs
  function OverviewTab() {
    const stats = [
      { label: 'Total Residents', value: '68', icon: <Users size={24} className="text-blue-600" /> },
      { label: 'Staff Members', value: '24', icon: <User size={24} className="text-green-600" /> },
      { label: 'Active Care Plans', value: '54', icon: <FileText size={24} className="text-purple-600" /> },
      { label: 'Today\'s Activities', value: '8', icon: <Calendar size={24} className="text-yellow-600" /> },
    ];
  
    const recentActivities = [
      { user: 'Martha Lewis', activity: 'Morning Medication', time: '8:30 AM', status: 'Completed' },
      { user: 'Robert Johnson', activity: 'Doctor Visit', time: '10:15 AM', status: 'Scheduled' },
      { user: 'Helen Davis', activity: 'Group Exercise', time: '11:00 AM', status: 'In Progress' },
      { user: 'William Smith', activity: 'Lunch Service', time: '12:30 PM', status: 'Upcoming' },
    ];
  
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Activities</h2>
              <button className="text-sm text-blue-600 hover:underline">View all</button>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="p-2">Resident</th>
                    <th className="p-2">Activity</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{activity.user}</td>
                      <td className="p-2">{activity.activity}</td>
                      <td className="p-2">{activity.time}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          activity.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
            </div>
            <div className="p-4 space-y-4">
              <ScheduleItem time="8:00 AM" event="Breakfast Service" />
              <ScheduleItem time="9:30 AM" event="Morning Medication" />
              <ScheduleItem time="10:30 AM" event="Physical Therapy" />
              <ScheduleItem time="12:00 PM" event="Lunch Service" />
              <ScheduleItem time="2:00 PM" event="Arts & Crafts" />
              <ScheduleItem time="4:00 PM" event="Afternoon Tea" />
              <ScheduleItem time="5:30 PM" event="Dinner Service" />
              <ScheduleItem time="7:00 PM" event="Evening Activities" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Emergency Contacts</h2>
            </div>
            <div className="p-4 space-y-3">
              <ContactCard name="Dr. Sarah Johnson" role="Medical Director" phone="(555) 123-4567" />
              <ContactCard name="Ambulance Service" role="Emergency Medical" phone="(555) 911-0000" />
              <ContactCard name="Security Office" role="Building Security" phone="(555) 987-6543" />
              <ContactCard name="Maintenance" role="Facility Issues" phone="(555) 456-7890" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Alerts</h2>
            </div>
            <div className="p-4 space-y-3">
              <AlertItem 
                type="warning" 
                message="Medication supply for resident #1023 running low" 
                time="2 hours ago" 
              />
              <AlertItem 
                type="info" 
                message="New dietary requirements uploaded for 3 residents" 
                time="4 hours ago" 
              />
              <AlertItem 
                type="error" 
                message="Maintenance request: Elevator #2 not working properly" 
                time="Yesterday" 
              />
              <AlertItem 
                type="success" 
                message="Staff schedule for next month approved" 
                time="Yesterday" 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function ScheduleItem({ time, event }) {
    return (
      <div className="flex items-center p-2 rounded-md hover:bg-gray-50">
        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-full">
          <Clock size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="font-medium">{event}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    );
  }
  
  function ContactCard({ name, role, phone }) {
    return (
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
        <div className="flex items-center">
          <p className="mr-2 font-medium">{phone}</p>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    );
  }
  
  function AlertItem({ type, message, time }) {
    return (
      <div className={`p-3 rounded-md ${
        type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
        type === 'error' ? 'bg-red-50 border-l-4 border-red-400' :
        type === 'success' ? 'bg-green-50 border-l-4 border-green-400' :
        'bg-blue-50 border-l-4 border-blue-400'
      }`}>
        <p className="font-medium">{message}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    );
  }
  
  // Placeholder components for other tabs
  function ResidentsTab() {
    const residents = [
      { id: 1001, name: 'Martha Lewis', age: 78, room: '101', careLevel: 'Medium' },
      { id: 1002, name: 'Robert Johnson', age: 82, room: '102', careLevel: 'High' },
      { id: 1003, name: 'Helen Davis', age: 75, room: '103', careLevel: 'Low' },
      { id: 1004, name: 'William Smith', age: 86, room: '104', careLevel: 'Medium' },
      { id: 1005, name: 'Elizabeth Brown', age: 79, room: '105', careLevel: 'Medium' },
      { id: 1006, name: 'James Wilson', age: 81, room: '106', careLevel: 'High' },
    ];
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Resident Directory</h2>
            <p className="text-gray-500">Manage resident information and care plans</p>
          </div>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Add New Resident
          </button>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Room</th>
                <th className="p-2">Care Level</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident) => (
                <tr key={resident.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{resident.id}</td>
                  <td className="p-2">{resident.name}</td>
                  <td className="p-2">{resident.age}</td>
                  <td className="p-2">{resident.room}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resident.careLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      resident.careLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {resident.careLevel}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        View
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  function StaffTab() {
    return (
      <AssistantRegistrationHandler/>
    );
  }
  
  function ScheduleTab() {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Calendar size={64} className="text-blue-600" />
        <h2 className="mt-4 text-2xl font-bold">Care Schedule</h2>
        <p className="mt-2 text-gray-600">Manage activities, medication schedules, and appointments</p>
      </div>
    );
  }
  
  function MessagesTab() {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <MessageSquare size={64} className="text-blue-600" />
        <h2 className="mt-4 text-2xl font-bold">Communication Center</h2>
        <p className="mt-2 text-gray-600">Send notifications to staff and family members</p>
      </div>
    );
  }
  
  function ReportsTab() {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <PieChart size={64} className="text-blue-600" />
        <h2 className="mt-4 text-2xl font-bold">Reports & Analytics</h2>
        <p className="mt-2 text-gray-600">Generate insights and reports on resident care</p>
      </div>
    );
  }
  
  function SettingsTab() {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Settings size={64} className="text-blue-600" />
        <h2 className="mt-4 text-2xl font-bold">System Settings</h2>
        <p className="mt-2 text-gray-600">Configure system preferences and user permissions</p>
      </div>
    );
  }