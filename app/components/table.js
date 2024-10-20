'use client';
import React, { useState } from 'react';
import { Table, Select, Input } from 'antd';
import { Resizable } from 'react-resizable';
import TicketModal from './modal';  // Import the modal component

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={<span className="react-resizable-handle" onClick={(e) => e.stopPropagation()} />}
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const TicketTable = ({ datas, setTicketChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('ticket_number');
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = datas?.filter(item => {
    const matchesFilter = selectedFilter 
      ? (item[selectedFilter]?.toString().toLowerCase().includes(searchValue.toLowerCase())) 
      : true;
    const matchesSearch = 
      item.ticket_number.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.customer_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.account_number.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.kota.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.company.toLowerCase().includes(searchValue.toLowerCase());
    return matchesFilter && matchesSearch;
  });


  const showModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalVisible(true);
  };

  const [columns, setColumns] = useState([
    {
      title: 'Ticket Number',
      dataIndex: 'ticket_number',
      width: 130,
      ellipsis: true,
      align: 'center',
      fixed: 'left',
      render: (text, record) => (
        <a onClick={() => showModal(record)} className='font-bold text-sky-600'>{text}</a>
      ),
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Date Create',
      dataIndex: 'date_create',
      width: 150,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Date Response',
      dataIndex: 'date_response',
      width: 150,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Customer ID',
      dataIndex: 'account_number',
      width: 110,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Problem Subject',
      dataIndex: 'problem_subject',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Nature',
      dataIndex: 'nature',
      width: 140,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 130,
      ellipsis: true,
    },
    {
      title: 'Sub Category',
      dataIndex: 'sub_category',
      width: 130,
      ellipsis: true,
    },
    {
      title: 'SLA',
      dataIndex: 'sla',
      width: 80,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Vendor',
      dataIndex: 'company',
      width: 170,
      ellipsis: true,
    },
    {
      title: 'City',
      dataIndex: 'kota',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Kelurahan',
      dataIndex: 'kelurahan',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Argo Start',
      dataIndex: 'argo_start',
      width: 150,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      width: 120,
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'SLA Status',
      dataIndex: 'sla_status',
      width: 100,
      ellipsis: true,
    },
    // {
    //   title: 'Action',
    //   key: 'ticket_number',
    //   width: 100,
    //   render: () => <a>Delete</a>,
    // },
  ]);

  const handleResize = (index) => (_, { size }) => {
    const newColumns = [...columns];
    newColumns[index] = {
      ...newColumns[index],
      width: size.width > 100 ? size.width : 100,
    };
    setColumns(newColumns);
  };

  const mergedColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
      <div className=''>
        <Select 
          placeholder="Select filter" 
          onChange={handleFilterChange} 
          style={{ width: 150, marginBottom: 16, marginRight: 20 }}
          value={selectedFilter}
          // className='flex gap-10 bg-red-300'
        >
          <Select.Option value="ticket_number">Ticket Number</Select.Option>
          <Select.Option value="customer_name">Customer Name</Select.Option>
          <Select.Option value="account_number">Customer ID</Select.Option>
          <Select.Option value="kota">City</Select.Option>
          <Select.Option value="company">Vendor</Select.Option>
          
          {/* Add more options as needed */}
        </Select>
        
        <Input 
          placeholder="Search..." 
          onChange={handleSearchChange} 
          style={{ marginBottom: 16, width: 200 }} 
        />

      </div>

      <div className=''>
        <Table
          bordered
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          columns={mergedColumns}
          dataSource={filteredData}
          rowKey="ticket_number"
        />

        <TicketModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          selectedTicket={selectedTicket}
          setTicketChange={setTicketChange}
        />
      </div>
    </>
  );
};

export default TicketTable;
