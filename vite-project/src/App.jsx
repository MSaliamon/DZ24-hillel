import { useState, useEffect } from 'react';
import { Button, Table, Form, Input, Modal } from 'antd';


const App = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
      ),
    },
  ];

  const handleSave = () => {
    const newUser = {
      name: name,
      username: username,
      email: email,
      phone: phone,
      id: data.length + 1,
    };
    setData([...data, newUser]);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setData(data.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <Button onClick={() => setShowForm(true)}>Add Contact</Button>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Add Contact"
        visible={showForm}
        onCancel={() => setShowForm(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowForm(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
        ]}
      >
        <Form>
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Username">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone">
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;