/*
|-----------------------------------------
| setting up CountdownTimerComponent for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: rupushi2, May, 2025
|-----------------------------------------
*/

'use client';

import { useState, useEffect } from 'react';

// Define the target date: December 31, 2025, at 23:59:59
// Or, more simply, the very beginning of January 1, 2026
const TARGET_DATE_STRING = '2026-01-01T00:00:00'; // Counts down to the end of Dec 31, 2025

function calculateTimeRemaining(targetDateString: string) {
  const targetTime = new Date(targetDateString).getTime();
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    // Target date has passed or is now
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isComplete: false };
}

export default function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(TARGET_DATE_STRING));

  useEffect(() => {
    // If the countdown is already complete, no need to start the interval
    if (timeRemaining.isComplete) {
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        // Create a mutable copy
        let newSeconds = prev.seconds;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        newSeconds -= 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        if (newDays < 0) {
          clearInterval(interval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
          isComplete: false,
        };
      });
    }, 1000); // Update every 1 second

    // Cleanup function to clear the interval when the component unmounts
    // or before the effect runs again (though here it only runs once on mount
    // unless timeRemaining.isComplete changes from false to true and then back, which is unlikely)
    return () => clearInterval(interval);
  }, [timeRemaining.isComplete]); // Re-run effect if isComplete changes (e.g., to stop interval)

  // Helper function to render two-digit numbers
  const renderDigit = (digit: number) => {
    const displayDigit = digit.toString().padStart(2, '0');
    return displayDigit.split('').map((num, index) => (
      <div
        key={index}
        className="bg-gradient-to-b from-red-800 to-red-900 text-white text-5xl sm:text-6xl md:text-7xl font-bold flex items-center justify-center w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-md shadow-lg mx-1"
      >
        {num}
      </div>
    ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-8">
      {/* Header */}
      <div className="bg-[#e39366] p-4 rounded-t-lg text-center text-xl font-bold">
        The Big offer
      </div>

      {/* Countdown Timer */}
      <div className="bg-white p-4 flex flex-col items-center">
        <div className="border-1 border-red-600 rounded-md p-2 mb-6">
          <div className="text-red-600 text-2xl font-bold text-center">
            {timeRemaining.isComplete ? 'COUNTDOWN COMPLETE!' : 'TIME REMAINING'}
          </div>
        </div>

        {!timeRemaining.isComplete && (
          <div className="flex flex-row justify-center items-center w-full space-x-1 sm:space-x-2 gap-6 mt-2 mb-8">
            {/* Adjusted space for 4 items */}
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="text-gray-800 font-semibold mb-2 text-xs sm:text-base">DAYS</div>
              <div className="flex">{renderDigit(timeRemaining.days)}</div>
            </div>
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="text-gray-800 font-semibold mb-2 text-xs sm:text-base">HOURS</div>
              <div className="flex">{renderDigit(timeRemaining.hours)}</div>
            </div>
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="text-gray-800 font-semibold mb-2 text-xs sm:text-base">MINUTES</div>
              <div className="flex">{renderDigit(timeRemaining.minutes)}</div>
            </div>
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="text-gray-800 font-semibold mb-2 text-xs sm:text-base">SECONDS</div>
              <div className="flex">{renderDigit(timeRemaining.seconds)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-[#e39366] p-4 rounded-b-lg text-center text-xl font-bold">
        Who is the winner?
      </div>

      {/* Circular Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-8">
        {[
          { name: 'Cumilla' },
          { name: 'Dhaka' },
          { name: 'Sylhet' },
          { name: 'Khulna' },
          { name: 'Barishal' },
        ].map((location, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#e39366] rounded-full w-24 h-24 flex items-center justify-center text-4xl font-bold">
              ?
            </div>
            <div className="mt-2 text-center">
              <div className="font-semibold">Name</div>
              <div>{location.name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-8">
        {[
          { name: 'Cumilla' },
          { name: 'Dhaka' },
          { name: 'Sylhet' },
          { name: 'Khulna' },
          { name: 'Barishal' },
        ].map((location, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#e39366] rounded-full w-24 h-24 flex items-center justify-center text-4xl font-bold">
              ?
            </div>
            <div className="mt-2 text-center">
              <div className="font-semibold">Name</div>
              <div>{location.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
