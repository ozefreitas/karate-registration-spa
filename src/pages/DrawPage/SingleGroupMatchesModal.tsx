import { Dialog } from "@mui/material";

const SingleGroupMatchesModal = (props: {
  isModalOpen: boolean;
  handleModalClose: any;
}) => {
  return (
    <Dialog
      fullScreen
      open={props.isModalOpen}
      onClose={props.handleModalClose}
    ></Dialog>
  );
};

export default SingleGroupMatchesModal;
