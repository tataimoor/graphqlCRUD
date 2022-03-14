import { useQuery } from "@apollo/client";
import { useState } from "react";
import { IUser } from "../../src/types/IUsers";
import { GET_USERS } from "../apollo/gql/User";
import { Modal } from "../components/Modal";
import "../css/home.css";
import { EditIcon } from "../icons/EditIcon";
import { TrashIcon } from "../icons/TrashIcon";
export const Home = () => {
  const [modal, setModal] = useState(false);
  const { loading, error, data } = useQuery<{ users: { docs: IUser[] } }>(
    GET_USERS,
    {
      variables: { take: 10, skip: 0 },
    }
  );
  console.log(data);
  return (
    <>
      <h1>Home page</h1>
      <div className="header">
        <span> Users</span>
        <button onClick={() => setModal(!modal)} className="btn">
          Add User
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="column">id</th>
              <th className="column">name</th>
              <th className="column">email</th>
              <th className="column">type</th>
              <th className="column">action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td>loading...</td>
              </tr>
            ) : (
              data?.users.docs.map((item) => (
                <tr>
                  <td className="column">{item._id}</td>
                  <td className="column">{item.name}</td>
                  <td className="column">{item.email}</td>
                  <td className="column">{item.type}</td>
                  <td className="column">
                    <span className="trash"><TrashIcon/></span>
                  <span className="edit"><EditIcon/></span>  
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal onClose={() => setModal(false)} state={modal}>
        <div className="form-group">
            <label>
                <span className="title-input"> Name: </span>
                <input type="text" />
            </label>
            <label>
                <span className="title-input"> email: </span>
                <input type="text" />
            </label>
            
            <label>
                <span className="title-input"> type: </span>
                <input type="text" />
            </label>
        </div>
      </Modal>
    </>
  );
};

