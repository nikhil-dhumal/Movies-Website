import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Box, Modal } from "@mui/material"

import Logo from "./Logo"
import SigninForm from "./SigninForm"
import SignupForm from "./SignupForm"

import { setAuthModalOpen } from "../../redux/features/authModalSlice"

const actionState = {
  signin: "signin",
  signup: "signup"
}

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal)

  const dispatch = useDispatch()

  const [action, setAction] = useState(actionState.signin)

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin)
  }, [authModalOpen])

  const handleClose = () => dispatch(setAuthModalOpen(false))

  const switchAuthState = (state) => setAction(state)

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "600px",
        p: 4,
        outline: "none"
      }}>
        <Box sx={{ p: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          <Box sx={{ textAlign: "center", mb: "2rem" }}>
            <Logo />
          </Box>

          {action === actionState.signin && <SigninForm switchAuthState={() => switchAuthState(actionState.signup)} />}

          {action === actionState.signup && <SignupForm switchAuthState={() => switchAuthState(actionState.signin)} />}
        </Box>
      </Box>
    </Modal>
  )
}

export default AuthModal