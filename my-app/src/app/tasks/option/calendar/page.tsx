'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Month view
import timeGridPlugin from '@fullcalendar/timegrid'; // Week/Day view
import interactionPlugin from '@fullcalendar/interaction'; // Enables date selection
import listPlugin from '@fullcalendar/list'; // List view
import { Sidebar } from '@/components/sidebar';

export default function Calendar() {
  const events = [
    { title: 'Meeting with Team', start: '2024-06-28T10:00:00', end: '2024-06-28T11:00:00' },
    { title: 'Lunch Break', start: '2024-06-28T13:00:00', end: '2024-06-28T14:00:00' },
    { title: 'Code Review', start: '2024-06-29T15:00:00' },
    { title: 'Deadline for Project', start: '2024-07-01' },
  ];

  const handleDateClick = (info) => {
    alert(`You clicked on date: ${info.dateStr}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Calendar */}
      <div className="flex-1 p-5">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',  // Change to custom icons or text
            center: 'title',  // You can customize the title format here
            right: 'dayGridMonth,timeGridWeek',  // You can add custom views here
          }}
          events={events}
          selectable={true}
          dateClick={handleDateClick}
          editable={true}
          eventColor="#3788d8"
          height="auto"
          titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}  // Custom title format (e.g., "February 2025")

        />
      </div>
    </div>
  );
}
