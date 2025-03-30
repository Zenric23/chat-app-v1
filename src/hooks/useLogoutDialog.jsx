import { useState } from 'react';
import LogoutDialog from '../components/utils/LogoutDialog';

const useLogoutDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return {
    openLogoutDialog: openDialog,
    setOpenLogoutDialog: setOpenDialog,
    LogoutDialog: <LogoutDialog open={openDialog} setOpen={setOpenDialog} />
  };
};

export default useLogoutDialog;
