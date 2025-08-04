import React from "react";
import Modal from "./modal";
import { Button } from "../ui/button";

export default function LogoutConfirmationAlert({
  showLogoutModal,
  setShowLogoutModal,
  onLogout,
}: {
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  onLogout?: () => void;
}) {


  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout?.();
  };

  return (
    <Modal open={showLogoutModal} onOpenChange={setShowLogoutModal}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Confirm Logout</h3>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to log out?
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
}
