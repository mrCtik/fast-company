import React, { useState } from "react";
import api from "../API";
import declOfNum from "./utils/utils";

const Header = ({ number }) => {
  const classes = `badge m-1 ${number === 0 ? "bg-danger" : "bg-primary"}`;

  const text =
    number === 0
      ? "Никто с тобой не тусанет"
      : `${number} ${declOfNum(number, [
          "человек тусанет",
          "человека тусанут",
          "человек тусанет",
        ])} с тобой сегодня`;
  return (
    <h2>
      <span className={classes}>{text}</span>
    </h2>
  );
};
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users.length);

  const getQualities = (qualities) => {
    return qualities.map((quality) => (
      <span key={quality._id} className={`badge m-1 bg-${quality.color}`}>
        {quality.name}
      </span>
    ));
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderUsers = () => {
    return users.map(
      ({ _id, name, rate, completedMeetings, qualities, profession }) => (
        <tr key={_id}>
          <th scope="row">{name}</th>
          <td>{getQualities(qualities)}</td>
          <td>{profession.name}</td>
          <td>{completedMeetings}</td>
          <td>{rate}/5</td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    );
  };

  if (users.length === 0) {
    return <Header number={users.length} />;
  }
  return (
    <>
      <Header number={users.length} />

      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      )}
    </>
  );
};

export default Users;
