import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Button, Textarea } from 'flowbite-react';
import { FaThumbsUp } from 'react-icons/fa';

export default function Comment({ comment, onLike, onEdit, onDelete }) {

  const [user, setUser] = useState({});
  const [isEdating, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content)

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsers = async () => {

      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error.message)
      }
    }
    getUsers();

  }, [comment]);

  const handleSave = async () => {

    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: editedContent
        }),
      });
      if (res.ok) {
        setIsEditing(false)
        onEdit(comment, editedContent)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  }

  return (
    <div className=' flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className=' flex shrink-0 mr-3'>
        <img
          className=' w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture} alt={user.username} />
      </div>
      <div className=' flex-1'>
        <div className=' flex items-center mb-1`'>
          <span className=' font-bold mr-1 text-sm truncate'>
            {user ? `@${user.username}` : `anonymous user`}
          </span>
          <span className=' text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {
          isEdating ? (
            <>
              <Textarea className=' mb-2' value={editedContent} onChange={(e) => setEditedContent(e.target.value)}>
              </Textarea>
              <div className=' flex justify-end gap-2 text-xs'>
                <Button
                  type='button'
                  size='sm'
                  gradientDuoTone='purpleToBlue'
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  type='button'
                  size='sm'
                  gradientDuoTone='purpleToBlue'
                  outline
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>

              </div>
            </>
          ) : (
            <>
              <p className=' text-gray-500 pb-2'>{comment.content}</p>
              <div className=' flex items-center pt-2 text-xs border-t dark:border-gray-500 max-w-fit gap-2'>
                <button type='button' onClick={() => onLike(comment._id)}
                  className={`text-gray-400 hover:text-blue-500 ${currentUser &&
                    comment.likes.includes(currentUser._id) &&
                    '!text-blue-500'
                    }`}
                >
                  <FaThumbsUp className='text-sm' />
                </button>
                <p>
                  {/* {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? "Like" : "Likes")} */}
                  {comment.numberOfLikes > 0 &&
                    `${comment.numberOfLikes}  ${comment.numberOfLikes === 1 ? "like" : "Likes"}`
                  }
                </p>
                {
                  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                      <button
                        type='button'
                        onClick={handleEdit}
                        className=' text-gray-400 
                        hover:text-blue-500'
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={() => onDelete(comment._id)}
                        className=' text-gray-400 
                        hover:text-red-500'
                      >
                        Delete
                      </button>
                    </>
                  )
                }
              </div>
            </>

          )
        }
      </div>

    </div>
  )
}
