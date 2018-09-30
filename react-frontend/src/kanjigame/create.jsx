import React from 'react';
import './create.css';
import decks from './decks.js';
import usernames from './usernames.js';
import ListPicker from '../controls/list_picker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
});

function RenderForm({ formikArgs }) {
  console.log(`Formik args ${JSON.stringify(formikArgs)}`);

  return (
    <Form>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">Select Categories</h5>
            </div>
            <div className="card-body">
              <ListPicker maxHeight="350px" items={listPickerItems} selectionUpdated={() => {}} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-block-title">
              <h5 className="card-title">Configuration</h5>
            </div>
            <div className="card-body">
                <label className="bmd-label-static" htmlFor="answerTimeLimit">Answer time limit (seconds)</label>
                <Field className="form-control" name="answerTimeLimit" />
                <label className="bmd-label-static mt-3" htmlFor="answerLeeway">Answer leeway (milliseconds)</label>
                <Field className="form-control" name="answerLeeway" />
              <div className="checkbox mt-4">
                <label>
                  <input type="checkbox" /> Private game
                </label>
              </div>
            </div>
          </div>
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
              <ErrorMessage className="alert alert-warning mt-3" name="answerTimeLimit" component="div" />
              <ErrorMessage className="alert alert-warning mt-3" name="answerLeeway" component="div" />
              <ErrorMessage className="alert alert-warning mt-3" name="username" component="div" />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

function render() {
  return (
    <div className="container-fluid p-5">
      <Formik
        initialValues={{ answerTimeLimit: 30, answerLeeway: 0, username: defaultUsername }}
        validationSchema={formSchema}
      >
      {(formikArgs) => (
        <RenderForm formikArgs={formikArgs} />
      )}
      </Formik>
    </div>
  );
}

export default render;
