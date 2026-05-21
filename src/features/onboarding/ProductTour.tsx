// src/features/onboarding/ProductTour.tsx
import React, { useState, useEffect } from 'react';
import { Joyride, STATUS, Step } from 'react-joyride';

export default function ProductTour() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('nexus_tour_completed');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setRun(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps: Step[] = [
    {
      target: 'body',
      content: 'Welcome to the Nexus Platform! Let us give you a quick tour of your new command center.',
      placement: 'center',
      skipBeacon: true,
    },
    {
      target: '.tour-financial-hub',
      content: 'This is your Financial Hub. Manage your capital, track secure transactions, and monitor deal flow in real-time.',
      placement: 'top',
    },
    {
      target: '.tour-calendar',
      content: 'Your Scheduling engine. Set your availability or request pitches directly through our interactive calendar.',
      placement: 'top',
    },
    {
      target: '.tour-deal-room',
      content: 'Ready to negotiate? Enter the Deal Room to initiate encrypted video calls and sign contracts.',
      placement: 'bottom',
    }
  ];

  const handleJoyrideEvent = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('nexus_tour_completed', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      onEvent={handleJoyrideEvent}
      options={{
        buttons: ['skip', 'back', 'close', 'primary'],
        showProgress: true,
        primaryColor: 'hsl(var(--primary))',
        textColor: 'hsl(var(--foreground))',
        backgroundColor: 'hsl(var(--background))',
        arrowColor: 'hsl(var(--background))',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 10000,
      }}
    />
  );
}