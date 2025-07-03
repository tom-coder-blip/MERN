import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';

const Login = (props) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    console.log(`${name} (ID: ${id}) has logged in.`);
  }, [name, id]);

  const onChangeName = (e) => setName(e.target.value);
  const onChangeId = (e) => setId(e.target.value);

  const login = () => {
    props.login({ name: name, id: id });
    props.history.push('/');
  };

  return (
    <div className="App">
      <div className="App-header">
        <Container style={{ maxWidth: '500px' }}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ color: '#0dcaf0' }}>
                🔐 Login to RateMyFilm
              </Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={name}
                    onChange={onChangeName}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={onChangeId}
                  />
                </Form.Group>

                <Button variant="primary" className="mt-4 w-100" onClick={login}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default Login;