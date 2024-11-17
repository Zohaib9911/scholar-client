import { Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function SignOutModel({ show, onClose, onClick, handleSignOut }) {

  return (

    <Modal
      show={show}
      onClose={onClose}
      popup
      size='md'
    >
      <Modal.Header />
      <Modal.Body>
        <div className=' text-center'>
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
          <h3 className=' mb-5 text-lg text-gray-500 dark:text-gray-400'>Are You sure You want to Sign Out This Account</h3>
          <div className=' flex justify-center gap-4'>
            <Button color='failure' onClick={handleSignOut}>
              Yes, i'm sure
            </Button>
            <Button color='gray' onClick={onClick}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>

    </Modal>

  )
}
