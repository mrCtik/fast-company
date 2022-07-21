import React from "react";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  rate,
  completedMeetings,
  qualities,
  profession,
  onHandleDelete,
  onHandleBookmark,
  bookmark,
}) => {
  return (
    <tr key={_id}>
      <th scope="row">{name}</th>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark
          _id={_id}
          bookmark={bookmark}
          onHandleBookmark={onHandleBookmark}
        />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onHandleDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
