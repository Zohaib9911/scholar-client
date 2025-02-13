import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';
import DashPosts from '../Components/DashPosts';
import DashUsers from '../Components/DashUsers';
import DashComments from '../Components/DashComments';
import DashComponent from '../Components/DashComponent';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tatabFromUrlb = urlParams.get('tab');
    if (tatabFromUrlb) {
      setTab(tatabFromUrlb);
    }

  }, [location.search])
  return (
    <div className=' min-h-screen flex flex-col md:flex-row mt-[70px]'>
      <div className=' md:w-56'>
        {/* SideBar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && < DashProfile />}
      {/* Posts */}
      {tab === 'posts' && < DashPosts />}
      {/* users */}
      {tab === 'users' && < DashUsers />}
      {/* comments */}
      {tab === 'comments' && < DashComments />}
      {/* Dash */}
      {tab === 'dash' && < DashComponent />}

    </div>
  )
}
