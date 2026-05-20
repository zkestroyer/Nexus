import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function MeetingCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingTime, setMeetingTime] = useState('12:00');

  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Investor Pitch - Nexus Tech',
      start: new Date().toISOString().split('T')[0] + 'T10:00:00',
      end: new Date().toISOString().split('T')[0] + 'T11:00:00',
      backgroundColor: 'hsl(var(--primary))',
      borderColor: 'hsl(var(--primary))',
    }
  ]);

  const handleAddMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle) return;

    const todayDateString = new Date().toISOString().split('T')[0]; 
    const startHour = parseInt(meetingTime.split(':')[0]);
    const endTime = `${String(startHour + 1).padStart(2, '0')}:00`;

    const newEvent = {
      id: String(Date.now()),
      title: meetingTitle,
      start: `${todayDateString}T${meetingTime}:00`,
      end: `${todayDateString}T${endTime}:00`,
      backgroundColor: 'hsl(var(--primary))',
      borderColor: 'hsl(var(--primary))',
    };

    setEvents(prev => [...prev, newEvent]);
    
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) calendarApi.addEvent(newEvent);

    setIsModalOpen(false);
    setMeetingTitle('');
  };

  const handleEventClick = (clickInfo: any) => clickInfo.event.remove();

  // NOTE: We wrapped the return in <> </> so the Modal is OUTSIDE the Card!
  return (
    <>
      <Card className="p-6 bg-background border-border shadow-sm rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Meeting Schedule</h2>
            <p className="text-sm text-foreground/70">Manage your availability and requests.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>+ Request Meeting</Button>
        </div>
        
        <div className="calendar-container text-sm">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={false} 
            dayMaxEvents={true}
            weekends={false}
            events={events}
            eventClick={handleEventClick}
            height="60vh"
          />
        </div>
      </Card>

      {/* --- MODAL IS NOW OUTSIDE THE CARD --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-background border border-border shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-border bg-secondary/30">
              <h3 className="text-lg font-bold text-foreground">Schedule Meeting</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddMeetingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Meeting Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon size={16} className="text-foreground/50" />
                  </div>
                  <input
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="e.g. Series A Pitch"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Time (Today)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-foreground/50" />
                  </div>
                  <select
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" fullWidth onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" fullWidth>Confirm Slot</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}