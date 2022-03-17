import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Comments } from "../../src/types/Comments";
import {
  ADD_Comment,
  DELETE_Comment,
  GET_COMMENTS,
} from "../apollo/gql/Comments";

export const CommentSection = () => {
  //state

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [commentsList, setCommentList] = useState<Comments[]>([]);
  const [count, setCount] = useState(0);

  const [text, setText] = useState("");

  // queries
  const CommentsData = useQuery<{
    comments: { docs: Comments[]; count: number };
  }>(GET_COMMENTS, {
    variables: { take: limit, skip: skip },
  });
  useEffect(() => {
    if (CommentsData.data) {
      setCommentList(CommentsData.data.comments.docs);
      setCount(CommentsData.data.comments.count);
    }
  }, [CommentsData.data]);

  // mutations
  const [addComment] = useMutation(ADD_Comment, {
    variables: {
      input: {
        text,
      },
    },
  });

  // const [deleteUser] = useMutation(DELETE_USER);

  //Effects
  // useEffect(() => {
  //   if (!modal) {
  //     setName("");
  //     setEmail("");
  //     setType(1);
  //     setId(undefined);
  //   } else if (id) {
  //     const user = userGraph.data?.users.docs.find((item) => item._id == id)!;
  //     setName(user.name);
  //     setEmail(user.email);
  //     setType(user.type);
  //   }
  // }, [modal]);

  // Functions
  const addUserData = async () => {
    try {
      await addComment();
      Swal.fire("comment Created!", undefined, "success");
      CommentsData.refetch();
    } catch (error) {
      Swal.fire("Comment Creation Failed!", undefined, "error");
    }
  };

  // const deleteUserData = async (id: string) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await deleteUser({
  //         variables: {
  //           input: id,
  //         },
  //       });
  //       userGraph.refetch();
  //       Swal.fire("Deleted!", "User has been deleted.", "success");
  //     }
  //   });
  // };
  console.log("comments>>>>.", commentsList);

  return (
    <>
      <h1>Home page</h1>
      <div className="header">
        <b> Comments ( {count} )</b>
      </div>
      <div>{commentsList[0]?.text}</div>

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="d-flex flex-column col-md-8">
            <div className="coment-bottom bg-white p-2 px-4">
              <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                <img
                  className="img-fluid img-responsive rounded-circle mr-2"
                  src="https://i.imgur.com/qdiP4DB.jpg"
                  width="38"
                />
                <input
                  type="text"
                  className="form-control mr-3"
                  placeholder="Add comment"
                  onInput={(e) => setText(e.currentTarget.value)}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={addUserData}
                >
                  Comment
                </button>
              </div>

              {commentsList.map((item) => (
                <div className="commented-section mt-2">
                  <div className="d-flex flex-row align-items-center commented-user">
                    <h5 className="mr-2">{item.email}</h5>
                    <span className="dot mb-1"></span>
                    <span className="mb-1 ml-2">4 hours ago</span>
                  </div>
                  <div className="comment-text-sm">
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
