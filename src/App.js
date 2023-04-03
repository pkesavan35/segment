import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

const schemaOptions = [
  {
    label: "First Name",
    value: "first_name",
  },
  {
    label: "Last Name",
    value: "last_name",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Account Name",
    value: "account_name",
  },
  {
    label: "City",
    value: "city",
  },
  {
    label: "State",
    value: "state",
  },
];

export default function App() {
  const [inputFields, setInputFields] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInputFields([]);
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    if (value === "") {
      alert("schema is required");
      return false;
    }
    if (inputFields.map((field) => field.value).includes(value)) {
      event.preventDefault();
      alert("This schema is already exists");
      return false;
    }
    const fields = JSON.parse(JSON.stringify(inputFields));
    fields[index].label = schemaOptions.find(
      (schemaOption) => schemaOption.value === value
    ).label;
    fields[index].value = value;
    setInputFields(fields);
  };

  const handleAddFields = () => {
    const newSchema = schemaOptions.find((schemaOption) => {
      if (inputFields.find((field) => field.label === schemaOption.label))
        return false;
      else return true;
    });
    if (newSchema)
      setInputFields([...JSON.parse(JSON.stringify(inputFields)), newSchema]);
    else alert("No schema found to add");
  };

  const handleRemoveFields = (index) => {
    const values = JSON.parse(JSON.stringify(inputFields));
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleFromSubmit = (event) => {
    event.preventDefault();
    const { segment_name } = event.target;
    const dataToSend = {
      segment_name: segment_name.value,
      schema: inputFields,
    };
    console.log(dataToSend)
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Save Segment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleFromSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="segment_name"
                aria-label="Segment Name"
                aria-describedby="basic-addon1"
                name="segment_name"
                required={true}
              />
            </InputGroup>
            {inputFields.map((inputField, index) => (
              <div className="row mt-3" key={index}>
                <div className="col-md-8">
                  <select
                    className="form-control"
                    name={inputField.label}
                    value={inputField.value}
                    onChange={(event) => handleInputChange(index, event)}
                  >
                    <option value="" defaultValue={true}>
                      Select Schema
                    </option>
                    {schemaOptions.map((option, index) => {
                      return (
                        <option value={option.value} key={index}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
            <br />
            <a type="button" href="#/" onClick={handleAddFields}>
              + Add schema to Segment
            </a>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save the Segment
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
