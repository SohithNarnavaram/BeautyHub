import { useState } from 'react';
import { X, ChevronRight, Home, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Vendor, Service, VisitType, Booking } from '../types';
import { CalendarAvailability } from './CalendarAvailability';
import { ServiceCard } from './ServiceCard';
import { api } from '../api/mockApi';
import { useNavigate } from 'react-router-dom';

interface BookingDrawerProps {
  vendor: Vendor;
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 1 | 2 | 3 | 4;

export const BookingDrawer = ({ vendor, isOpen, onClose }: BookingDrawerProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [visitType, setVisitType] = useState<VisitType>('salon');
  const [address, setAddress] = useState<string>('');

  const bgColor = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const textSecondary = theme === 'dark' ? 'text-dark-textSecondary' : 'text-pink-textSecondary';
  const overlayBg = theme === 'dark' ? 'bg-black/80' : 'bg-black/50';
  const accentColor = theme === 'dark' ? 'bg-dark-accent hover:bg-opacity-90' : 'bg-pink-accent hover:bg-opacity-90';

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as BookingStep);
    }
  };

  const handleConfirm = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'> = {
      vendorId: vendor.id,
      vendorName: vendor.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      visitType,
      address: visitType === 'home' ? address : vendor.salonAddress,
      status: 'pending',
      price: selectedService.price,
    };

    const newBooking = await api.createBooking(booking);
    onClose();
    navigate(`/booking-success/${newBooking.bookingCode}`);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== '' && selectedTime !== '';
      case 3:
        return visitType === 'salon' || (visitType === 'home' && address.trim() !== '');
      case 4:
        return true;
      default:
        return false;
    }
  };

  const filteredServices = vendor.services.filter(
    (s) => s.homeVisit || visitType === 'salon'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className={`${overlayBg} absolute inset-0`}
        onClick={onClose}
      />
      <div
        className={`${bgColor} w-full sm:w-[600px] max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl relative z-10 flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className={`text-xl font-bold ${textColor}`}>Book Appointment</h2>
          <button
            onClick={onClose}
            className={`${textColor} hover:opacity-80`}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? theme === 'dark'
                        ? 'bg-dark-accent text-white'
                        : 'bg-pink-accent text-white'
                      : `${textSecondary} border-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s
                        ? theme === 'dark'
                          ? 'bg-dark-accent'
                          : 'bg-pink-accent'
                        : theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className={`font-semibold text-lg ${textColor}`}>Select Service</h3>
              <div className="space-y-3">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={selectedService?.id === service.id}
                    onSelect={() => setSelectedService(service)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className={`font-semibold text-lg ${textColor}`}>Select Date & Time</h3>
              <CalendarAvailability
                availability={vendor.availability}
                onDateSelect={setSelectedDate}
                onTimeSelect={setSelectedTime}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </div>
          )}

          {/* Step 3: Choose Location */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className={`font-semibold text-lg ${textColor}`}>Choose Location</h3>
              <div className="space-y-3">
                {vendor.homeVisit && (
                  <button
                    onClick={() => setVisitType('home')}
                    className={`w-full p-4 rounded-lg border-2 transition text-left ${
                      visitType === 'home'
                        ? theme === 'dark'
                          ? 'border-dark-accent bg-dark-accent/20'
                          : 'border-pink-accent bg-pink-accent/20'
                        : theme === 'dark'
                        ? 'border-gray-800 hover:border-gray-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Home
                        className={
                          visitType === 'home'
                            ? theme === 'dark'
                              ? 'text-dark-accent'
                              : 'text-pink-accent'
                            : textSecondary
                        }
                        size={24}
                      />
                      <div>
                        <div className={`font-semibold ${textColor}`}>Home Visit</div>
                        <div className={`text-sm ${textSecondary}`}>Service at your location</div>
                      </div>
                    </div>
                  </button>
                )}
                {vendor.salonAddress && (
                  <button
                    onClick={() => setVisitType('salon')}
                    className={`w-full p-4 rounded-lg border-2 transition text-left ${
                      visitType === 'salon'
                        ? theme === 'dark'
                          ? 'border-dark-accent bg-dark-accent/20'
                          : 'border-pink-accent bg-pink-accent/20'
                        : theme === 'dark'
                        ? 'border-gray-800 hover:border-gray-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building2
                        className={
                          visitType === 'salon'
                            ? theme === 'dark'
                              ? 'text-dark-accent'
                              : 'text-pink-accent'
                            : textSecondary
                        }
                        size={24}
                      />
                      <div>
                        <div className={`font-semibold ${textColor}`}>Salon Visit</div>
                        <div className={`text-sm ${textSecondary}`}>{vendor.salonName || 'Salon'}</div>
                        <div className={`text-xs ${textSecondary} mt-1`}>{vendor.salonAddress}</div>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {visitType === 'home' && (
                <div className="mt-4">
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>
                    Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-dark-bg text-dark-text border-dark-border' : 'bg-gray-50 text-pink-text border-pink-border'} border focus:outline-none focus:ring-2 ${
                      theme === 'dark' ? 'focus:ring-dark-accent' : 'focus:ring-pink-accent'
                    }`}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && selectedService && (
            <div className="space-y-4">
              <h3 className={`font-semibold text-lg ${textColor}`}>Confirm Booking</h3>
              <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg p-4 space-y-3`}>
                <div className="flex justify-between">
                  <span className={textSecondary}>Service:</span>
                  <span className={textColor}>{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={textSecondary}>Date:</span>
                  <span className={textColor}>
                    {new Date(selectedDate).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={textSecondary}>Time:</span>
                  <span className={textColor}>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className={textSecondary}>Location:</span>
                  <span className={textColor}>
                    {visitType === 'home' ? 'Home Visit' : vendor.salonName || 'Salon'}
                  </span>
                </div>
                {visitType === 'home' && address && (
                  <div className="flex justify-between">
                    <span className={textSecondary}>Address:</span>
                    <span className={`${textColor} text-right max-w-xs`}>{address}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-800">
                  <div className="flex justify-between">
                    <span className={`font-semibold text-lg ${textColor}`}>Total:</span>
                    <span className={`font-bold text-xl ${theme === 'dark' ? 'text-dark-accent' : 'text-pink-accent'}`}>
                      ₹{selectedService.price}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-gray-50'} rounded-lg p-4`}>
                <p className={`text-sm ${textSecondary}`}>
                  Payment will be processed after confirmation. You'll receive a booking code via email.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-800">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              step === 1
                ? 'opacity-50 cursor-not-allowed'
                : theme === 'dark'
                ? 'bg-dark-bg text-white hover:bg-opacity-80'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                canProceed()
                  ? `${accentColor} text-white`
                  : 'opacity-50 cursor-not-allowed bg-gray-500'
              }`}
            >
              Next <ChevronRight className="inline ml-1" size={18} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                canProceed()
                  ? `${accentColor} text-white`
                  : 'opacity-50 cursor-not-allowed bg-gray-500'
              }`}
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

