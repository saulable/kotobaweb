import React, { Component } from 'react';
import './create.css';
import decks from './decks.js';
import usernames from './usernames.js';
import ListPicker from '../controls/list_picker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import socketIO from 'socket.io-client';

const SOCKET_SERVER_URI = 'http://localhost:3020';

const listPickerItems = decks.map(deckInformation => ({
  key: deckInformation.shortName,
  value: deckInformation.longName,
}));

const defaultUsername = usernames[Math.floor(Math.random() * usernames.length)];

const formSchema = Yup.object().shape({
  answerTimeLimit: Yup.number()
    .min(5, 'Answer time limit must be between 5 and 120 seconds')
    .max(120, 'Answer time limit must be between 5 and 120 seconds')
    .required('Answer time limit is required'),
  answerLeeway: Yup.number()
    .min(0, 'Answer leeway must be between 0 and 1000 ms')
    .max(1000, 'Answer leeway must be between 0 and 1000 ms')
    .required('Answer leeway is required'),
  username: Yup.string()
    .min(1, 'Username must be between 1 and 20 characters long')
    .max(20, 'Username must be between 1 and 20 characters long')
    .required('Username is required'),
  decks: Yup.array()
    .min(1, 'You must choose at least one category'),
});

function RenderForm({ formikArgs }) {
  return (
    <Form>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">Select Categories</h5>
            </div>
            <div className="card-body">
              <ListPicker
                name="decks"
                maxHeight="350px"
                items={listPickerItems}
                selectedItems={formikArgs.values.decks}
                selectionUpdated={newValue => { formikArgs.setFieldValue('decks', newValue); }} />
            </div>
          </div>
          { formikArgs.errors.decks &&
            <div className="alert alert-warning mt-3" role="alert">
              {formikArgs.errors.decks}
            </div>
          }
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">Configuration</h5>
            </div>
            <div className="card-body">
              <div>
                <label className="bmd-label-static" htmlFor="answerTimeLimit">Answer time limit (seconds)</label>
                <Field className="form-control" name="answerTimeLimit" />
              </div>
              <div>
                <label className="bmd-label-static mt-3" htmlFor="answerLeeway">Answer leeway (milliseconds)</label>
                <Field className="form-control" name="answerLeeway" />
              </div>
              <div className="checkbox mt-4">
                <label>
                  <input type="checkbox" /> Private game
                </label>
              </div>
            </div>
          </div>
          <ErrorMessage className="alert alert-warning mt-3" name="answerTimeLimit" component="div" />
          <ErrorMessage className="alert alert-warning mt-3" name="answerLeeway" component="div" />
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">User</h5>
            </div>
            <div className="card-body">
              <label className="bmd-label-static" htmlFor="username">Username</label>
              <Field className="form-control" name="username" />
              <button
                type="submit"
                className="btn btn-raised btn-primary mt-3"
                disabled={formikArgs.isSubmitting || Object.keys(formikArgs.errors)[0]}
              >
                Start game
              </button>
            </div>
          </div>
          <ErrorMessage className="alert alert-warning mt-3" name="username" component="div" />
        </div>
      </div>
    </Form>
  );
}

function submitCreate(values, socket) {
  console.log(values);
  fetch('http://localhost:3000/users').then(response => {
    response.json().then(t => console.log('REEEEEEE ' + JSON.stringify(t)));
  });

  const gameConfig = {
    decks: Object.keys(values.decks),
    answerTimeLimitInMs: values.answerTimeLimit * 1000,
    answerForgivenessWindow: values.answerLeeway,
    private: true, // TODO
  };

  socket.on('room created', function(response) {
    console.log('Response: ' + response);
  });

  socket.emit('create', gameConfig);
}

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socketIO(SOCKET_SERVER_URI),
    };
  }

  render() {
    return (
      <div className="container-fluid p-5">
        <Formik
          initialValues={{ answerTimeLimit: 30, answerLeeway: 0, username: defaultUsername, decks: [] }}
          validationSchema={formSchema}
          onSubmit={(values) => submitCreate(values, this.state.socket)}
        >
        {(formikArgs) => (
          <RenderForm formikArgs={formikArgs} />
        )}
        </Formik>
      </div>
    );
  }
}

export default Create;