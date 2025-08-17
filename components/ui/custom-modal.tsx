'use client';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  children,
  title,
  ...props
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      closeIcon={<img src="/icons/close-modal.svg" alt="close" />}
      center
      classNames={{
        modal: 'customModal',
        overlay: 'customOverlay',
      }}
      {...props}
    >
      <div className="text-white text-lg font-medium text-left">{title}</div>
      <div className="mt-4">{children}</div>
    </Modal>
  );
};

export default CustomModal;
