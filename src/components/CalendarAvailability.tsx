import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Availability } from '../types';
import { format, addDays, isSameDay, parseISO } from 'date-fns';

interface CalendarAvailabilityProps {
  availability: Availability;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
}

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const CalendarAvailability = ({
  availability,
  onDateSelect,
  onTimeSelect,
  selectedDate,
  selectedTime,
}: CalendarAvailabilityProps) => {
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const borderColor = theme === 'dark' ? 'border-dark-border' : 'border-pink-border';
  const accentColor = theme === 'dark' ? 'bg-dark-accent' : 'bg-pink-accent';
  const hoverColor = theme === 'dark' ? 'hover:bg-dark-bg' : 'hover:bg-gray-50';

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(new Date(), i));
    }
    return days;
  };

  const getDayName = (date: Date) => {
    return DAYS[date.getDay()];
  };

  const isAvailable = (date: Date) => {
    const dayName = getDayName(date);
    return availability[dayName]?.available || false;
  };

  const getAvailableSlots = (date: Date) => {
    const dayName = getDayName(date);
    return availability[dayName]?.slots || [];
  };

  const days = getNext7Days();
  const selectedDaySlots = selectedDate
    ? getAvailableSlots(parseISO(selectedDate))
    : [];

  return (
    <div className={`${bgColor} rounded-lg p-4 space-y-4`}>
      <h3 className={`font-semibold ${textColor}`}>Select Date & Time</h3>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const available = isAvailable(day);
          const isSelected = selectedDate && isSameDay(parseISO(selectedDate), day);
          const dateStr = format(day, 'yyyy-MM-dd');

          return (
            <button
              key={dateStr}
              onClick={() => available && onDateSelect(dateStr)}
              disabled={!available}
              className={`p-3 rounded-lg text-center transition ${
                !available
                  ? `${textSecondary} opacity-50 cursor-not-allowed`
                  : isSelected
                  ? `${accentColor} text-white`
                  : `${borderColor} border ${textColor} ${hoverColor}`
              }`}
            >
              <div className="text-xs font-medium">{format(day, 'EEE')}</div>
              <div className="text-lg font-semibold mt-1">{format(day, 'd')}</div>
            </button>
          );
        })}
      </div>

      {selectedDate && selectedDaySlots.length > 0 && (
        <div>
          <h4 className={`font-medium ${textColor} mb-2`}>Available Times</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {selectedDaySlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`p-2 rounded-lg text-sm font-medium transition ${
                  selectedTime === time
                    ? `${accentColor} text-white`
                    : `${borderColor} border ${textColor} ${hoverColor}`
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedDaySlots.length === 0 && (
        <p className={`${textSecondary} text-sm text-center py-4`}>
          No available slots for this date
        </p>
      )}
    </div>
  );
};

