import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";

import howThisWorksModal from "../../../../public/assets/how_this_works_modal.png";

export default function HowThisWorksModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How This Works?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex w-full flex-col items-center justify-center">
              <Image
                unoptimized={true}
                src={howThisWorksModal}
                alt="How This Works Modal"
                className="w-40"
              />

              <p className="text-center">
                Submit link is used so that websites not yet registered in our
                link checker can be included in our link checker database
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="w-full">
              <p className="text-center font-extralight opacity-50">
                Developed by Elephant Union
              </p>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
