"use client"
import React, { useState, useEffect } from "react";

const DebugComponent: React.FC = () => {
  // Define the state for storing debug logs
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Function to log messages to the state and console
  const logMessage = (message: string) => {
    setDebugLogs((prevLogs) => [...prevLogs, message]);
    console.log(message); // Log to console as well
  };

  // Log a message when the component is mounted
  useEffect(() => {
    logMessage("Telegram Web App loaded.");
  }, []);

  return (
    <div>
      {/* Your app components go here */}
      
      {/* Debug log display */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "10px",
          width: "100%",
          maxHeight: "200px",
          overflowY: "auto",
          zIndex: 9999, // Ensure the debug panel stays on top
        }}
      >
        {debugLogs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default DebugComponent;