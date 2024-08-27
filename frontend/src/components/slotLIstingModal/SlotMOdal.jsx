import React, { useState } from 'react'
import { Modal } from "react-responsive-modal";


const SlotMOdal = ({open,slots}) => {
    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

  return (

    <>
    <Modal open={open} onClose={onCloseModal} center>
        <div>
            {slots && <div>

            </div>}
        </div>

    </Modal>
    
    </>

  )
}

export default SlotMOdal
