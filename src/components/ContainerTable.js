import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Spinner from './Spinner';

const ContainerTable = () => {
  const [containers, setContainers] = useState([]);
  // Add a loading state to indicate that the data is being fetched
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch('/api/handleCommand?'+new URLSearchParams({
        command: 'docker ps --format "{{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"'
      }));
      const containers = await response.json();
    const containerList = containers.split('\n').map(container => {
      const [id, name, image, status, ports] = container.split('\t');
      return { id, name, image, status, ports };
    });
      setContainers(containerList);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  if (isLoading) {
    return <Spinner/>
  }


  return (
    <DataTable
      columns={[
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Image', selector: row => row.image, sortable: true },
        { name: 'Status', selector: row => row.status, sortable: true },
        { name: 'Ports', selector: row => row.ports, sortable: true },
      ]}
      data={containers}
    />
  );
};

export default ContainerTable;