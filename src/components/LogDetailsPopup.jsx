// components/LogDetailsPopup.jsx
import React from "react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
};

const LogDetailsPopup = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{log.type} Details</h2>
        <div className="space-y-2">
          {log.notes && (
            <div>
              <span className="font-semibold">Notes:</span> {log.notes}
            </div>
          )}
          {log.bloodPressure && (
            <div>
              <span className="font-semibold">Blood Pressure:</span> {log.bloodPressure}
            </div>
          )}
          {log.heartRate && (
            <div>
              <span className="font-semibold">Heart Rate:</span> {log.heartRate}
            </div>
          )}
          {log.sleepHours && (
            <div>
              <span className="font-semibold">Sleep Hours:</span> {log.sleepHours}
            </div>
          )}
          {log.temperature && (
            <div>
              <span className="font-semibold">Temperature:</span> {log.temperature}
            </div>
          )}
          {log.mood && (
            <div>
              <span className="font-semibold">Mood:</span> {log.mood}
            </div>
          )}
          <div>
            <span className="font-semibold">Date:</span> {formatDate(log.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogDetailsPopup;