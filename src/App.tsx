import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import React, { useEffect, useReducer } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

import './App.css';
import awsConfig from './aws-exports';
import { createNeigh } from './graphql/mutations';
import { listNeighs } from './graphql/queries';
import { onCreateNeigh } from './graphql/subscriptions';
import { from } from 'rxjs';

Amplify.configure(awsConfig);

type Neigh = {
  camera: string;
  present: string;
  number: string;
  status: string;
};

type AppState = {
  neighs: Neigh[];
  formData: Neigh;
};

type Action =
  | {
      type: 'QUERY';
      payload: Neigh[];
    }
  | {
      type: 'SUBSCRIPTION';
      payload: Neigh;
    }
  | {
      type: 'SET_FORM_DATA';
      payload: { [field: string]: string };
    };

type SubscriptionEvent<D> = {
  value: {
    data: D;
  };
};

const initialState: AppState = {
  neighs: [],
  formData: {
    camera: '',
    present: '',
    number: '',
    status: '',
  },
};
const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case 'QUERY':
      return { ...state, neighs: action.payload };
    case 'SUBSCRIPTION':
      return { ...state, neighs: [...state.neighs, action.payload] };
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const createNewNeigh = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const { camera, present, number, status } = state.formData;
    const neigh = {
      camera,
      present,
      number,
      status,
    };
    await API.graphql(graphqlOperation(createNeigh, { input: neigh }));
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //useEffect(() => {
    //getNeighList();


    //const subscription = API.graphql(graphqlOperation(onCreateNeigh)).subscribe({
      //next: (eventData: SubscriptionEvent<{ onCreateNeigh: Neigh }>) => {
        //const payload = eventData.value.data.onCreateNeigh;
        //dispatch({ type: 'SUBSCRIPTION', payload });
      //},
    //});

    //return () => subscription.unsubscribe();
  //}, []);

  //const getNeighList = async () => {
    //const neighs = await API.graphql(graphqlOperation(listNeighs));
    //dispatch({
      //type: 'QUERY',
      //payload: neighs.data.listNeighs.items,
    //});
  //};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: 'SET_FORM_DATA',
      payload: { [e.target.name]: e.target.value },
    });

  return (
    <div className="App">
      <Container>
        <Row className="mt-3">
          <Col md={4}>
            <Form>
              <Form.Group controlId="formDataCamera">
                <Form.Control onChange={handleChange} type="text" name="camera" placeholder="Camera" />
              </Form.Group>
              <Form.Group controlId="formDataPresent">
                <Form.Control onChange={handleChange} type="text" name="present" placeholder="Present" />
              </Form.Group>
              <Form.Group controlId="formDataNumber">
                <Form.Control onChange={handleChange} type="text" name="number" placeholder="Number" />
              </Form.Group>
              <Form.Group controlId="formDataStatus">
                <Form.Control onChange={handleChange} type="text" name="status" placeholder="Status" />
              </Form.Group>
              <Button onClick={createNewNeigh} className="float-left">
                Add New Stall
              </Button>
            </Form>
          </Col>
        </Row>

        {state.neighs.length ? (
          <Row className="my-3">
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Camera</th>
                    <th>Present?</th>
                    <th>Number of Horses</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {state.neighs.map((neigh, index) => (
                    <tr key={`neigh-${index}`}>
                      <td>{index + 1}</td>
                      <td>{neigh.camera}</td>
                      <td>{neigh.number}</td>
                      <td>{neigh.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default withAuthenticator(App);
