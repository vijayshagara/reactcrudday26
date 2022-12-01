import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
//import { logDOM } from "@testing-library/react";

function App() {
  let formValue = {
    id: "",
    name: "",
    age: "",
    email: "",
    gender: "",
    course: "",
    error: {
      name: "",
      age: "",
      email: "",
      gender: "",
      course: "",
    },
  };
  const [formData, setFormData] = useState(formValue);
  //console.log(formData)
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://63209503e3bdd81d8efdb0f9.mockapi.io/vijayDemo"
      );
      setUserData(response.data);
      // console.log(userData);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    let error = { ...formValue.error };

    if (e.target.value === "") {
      error[e.target.name] = `${e.target.name} is requird`;
    } else {
      error[e.target.name] = "";
    }
    setFormData({ ...formData, [e.target.name]: e.target.value, error });
  };

  const handlepopulate = (id) => {
    const selectedData = userData.filter((row) => row.id === id)[0];
    setFormData({
      ...formData,
      ...selectedData,

      /* id: selectedData.id,
      name: selectedData.name,
      email: selectedData.email,
      age: selectedData.age,
      gender: selectedData.gender,
      course: selectedData.course */
    });
    //console.log(selectedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errkeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key !== "error" && key !== "id") {
        return key;
      }
    });
    if (errkeys.length >= 1) {
      alert("please fill all the values");
    } else {
      // Updata
      if (formData.id) {
        const response = await axios.put(
          `https://63209503e3bdd81d8efdb0f9.mockapi.io/vijayDemo/${formData.id}`,
          {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            gender: formData.gender,
            course: formData.course,
          }
        );
        //console.log(response);
        let users = [...userData];
        let index = userData.findIndex((row) => row.id === response.data.id);
        users[index] = response.data;
        setUserData(users);
      } else {
        // create
        const response = await axios.post(
          "https://63209503e3bdd81d8efdb0f9.mockapi.io/vijayDemo",
          {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            gender: formData.gender,
            course: formData.course,
          }
        );
        setUserData([...userData, response.data]);
      }
      setFormData(formValue);
    }
    //console.log(errkeys);
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://63209503e3bdd81d8efdb0f9.mockapi.io/vijayDemo/${id}`
    );
    // console.log(response);
    const user = userData.filter((row) => row.id !== response.data.id);
    setUserData(user);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>user Form</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.name}</span>
        <br />
        <TextField
          id="age"
          label="Age"
          variant="standard"
          name="age"
          type="number"
          value={formData.age}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <span style={{ color: "red" }}>{formData.error.age}</span>
        <br />
        <TextField
          id="email"
          label="Email"
          variant="standard"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br />
        <span style={{ color: "red" }}>{formData.error.email}</span>
        <br />
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="gender"
          value={formData.gender}
          onChange={(e) => handleChange(e)}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <br />
        <span style={{ color: "red" }}>{formData.error.gender}</span>
        <FormControl fullWidth>
          <InputLabel id="Course">Course</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Course"
            name="course"
            value={formData.course}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="react">react</MenuItem>
            <MenuItem value="node">node</MenuItem>
            <MenuItem value="javascript">javascript</MenuItem>
          </Select>
          <br />
          <span style={{ color: "red" }}>{formData.error.course}</span>
        </FormControl>{" "}
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      <h3>user Data</h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.course}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => handlepopulate(row.id)}>
                    Edit
                  </Button>
                  <Button variant="text" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;


