import { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const useSignalR = (hubUrl, hubMethodName, onReceive) => {
    const [connection, setConnection] = useState(null);
  
    useEffect(() => {
      const connect = new HubConnectionBuilder()
        .withUrl(hubUrl)
        .build();
  
      connect.on(hubMethodName, (productRating) => {
        onReceive(productRating);
      });
  
      setConnection(connect);
    }, []);
  
    useEffect(() => {
      if (connection) {
        connection
          .start()
          .then(() => console.log("Connected to SignalR hub"))
          .catch((err) => console.log("Error while starting connection: " + err));
  
        return () => {
          connection.stop();
        };
      }
    }, [connection]);

    return connection;
  };